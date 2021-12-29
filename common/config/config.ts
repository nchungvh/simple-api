import { keyStores } from "near-api-js";
import path from "path";
import { homedir } from "os";

export const CREDENTIALS_DIR = ".near-credentials";

export const ACCOUNT_HELPER_URL = 'https://near-contract-helper.onrender.com';

export const credentialsPath = path.join(homedir(), CREDENTIALS_DIR);

export const keyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);

export const devAccount = "dev-1640278483180-51542310503751";

export const fail = "ZmFsc2U=";
export const Config = {
  keyStore,
  networkId: "testnet",
  nodeUrl: "https://rpc.testnet.near.org",
  headers: {}
};


