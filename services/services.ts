import { keyStore, Config, devAccount, fail, ACCOUNT_HELPER_URL } from "../common/config/config";
import { NEAR } from "../common/near-api/config-near";
import { KeyPair, utils, connect } from "near-api-js";
import * as nearAPI from "near-api-js";
import sha256 from "js-sha256";
import { parseSeedPhrase } from "../utils/utils";
import { resultHoldToken } from "./types";
import { Logger } from "../logger";

export class Service {
  private static instance: Service;

  constructor() {}

  static getInstance(): Service {
    if (!this.instance) {
      this.instance = new Service();
    }
    return this.instance;
  }

  async createAccount(resource: any) {
    try {
      const near = await connect(Config);
      const creatorAccount = await near.account(devAccount);
      const keyPair = KeyPair.fromString(parseSeedPhrase(resource.seedPhrase));
      const publicKey = keyPair.getPublicKey().toString();
      await keyStore.setKey(Config.networkId, resource.newAccountId, keyPair);
      const response = await creatorAccount.functionCall({
        contractId: "testnet",
        methodName: "create_account",
        args: {
          new_account_id: resource.newAccountId,
          new_public_key: publicKey,
        },
        gas: "300000000000000",
        attachedDeposit: utils.format.parseNearAmount(resource.amount),
      });

      if (
        typeof response.status === "object" &&
        "SuccessValue" in response.status &&
        response.status.SuccessValue === fail
      ) {
        Logger.error("Cannot create account");
        throw "Error: Cannot create account";
      }
      return response;
    } catch (e) {
      Logger.error(e);
      throw e;
    }
  }

  async getBalanceByAddress(id: any) {
    try {
      const account = await NEAR.account(id);
      return await account.getAccountBalance();
    } catch (e) {
      Logger.error(e);
      throw e;
    }
  }

  async getTokenHoldByAddress(id: any) {
    const provider = new nearAPI.providers.JsonRpcProvider(Config.nodeUrl);
    try {
      const response: resultHoldToken = await provider.sendJsonRpc("query", {
        request_type: "call_function",
        finality: "final",
        account_id: id,
        method_name: "ft_metadata",
        args_base64: "",
      });
      var str = String.fromCharCode.apply(String, response.result);
      return JSON.parse(str);
    } catch (e) {
      Logger.error(e);
      throw e;
    }
  }

  async transferNativeToken(resource: any) {
    try {
      const account = await NEAR.account(resource.senderId);
      return await account.sendMoney(
        resource.receiverId,
        resource.amount // amount in yoctoNEAR
      );
    } catch (e) {
      Logger.error(e);
      throw e;
    }
  }

  async transferFungibleToken(resource: any) {
    try {
      const provider = new nearAPI.providers.JsonRpcProvider(Config.nodeUrl);
      const keyPair: KeyPair = await keyStore.getKey(
        Config.networkId,
        resource.senderId
      );
      const publicKey = keyPair.getPublicKey();
      const accessKey = await provider.query(
        `access_key/${resource.senderId}/${publicKey.toString()}`,
        ""
      );
      const account = await NEAR.account(resource.senderId);
      const accessKeys = (await account.getAccessKeys()).filter(
        (item) => item.public_key === publicKey.toString()
      );
      const nonce =
        accessKeys.length > 0 ? ++accessKeys[0].access_key.nonce : 0;
      const actions = [nearAPI.transactions.transfer(resource.amount)];
      const recentBlockHash = nearAPI.utils.serialize.base_decode(
        accessKey.block_hash
      );
      const transaction = nearAPI.transactions.createTransaction(
        resource.senderId,
        publicKey,
        resource.receiverId,
        nonce,
        actions,
        recentBlockHash
      );
      const serializedTx = nearAPI.utils.serialize.serialize(
        nearAPI.transactions.SCHEMA,
        transaction
      );
      const serializedTxHash = new Uint8Array(
        sha256.sha256.array(serializedTx)
      );
      const signature = keyPair.sign(serializedTxHash);
      const signedTransaction = new nearAPI.transactions.SignedTransaction({
        transaction,
        signature: new nearAPI.transactions.Signature({
          keyType: transaction.publicKey.keyType,
          data: signature.signature,
        }),
      });
      const signedSerializedTx = signedTransaction.encode();
      return await provider.sendJsonRpc("broadcast_tx_commit", [
        Buffer.from(signedSerializedTx).toString("base64"),
      ]);
    } catch (e) {
      Logger.error(e);
      throw e;
    }
  }

  async getWalletHistoryByAddress(id: any) {
    try {
        const txs = await fetch(`${ACCOUNT_HELPER_URL}/account/${id}/activity`).then((res) => res.json());
    
        return txs.map((t: any, i: number) => ({
            ...t,
            kind: t.action_kind.split('_').map((s: any) => s.substr(0, 1) + s.substr(1).toLowerCase()).join(''),
            block_timestamp: parseInt(t.block_timestamp.substr(0, 13), 10),
            hash_with_index: t.action_index + ':' + t.hash,
            checkStatus: !(i && t.hash === txs[i - 1].hash)
        }));
    } catch (e) {
      Logger.error(e);
      throw e;
    }
  }
}
