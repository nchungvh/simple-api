import express from "express";
import { Service } from "../services/services";
import { Logger } from "../logger";

export class Controller {
  constructor() {}

  async createAccount(req: express.Request, res: express.Response) {
    const service = Service.getInstance();
    await service.createAccount(req.body).catch((e) => {
      Logger.error(e);
      res.status(400).send(e);
    });
    Logger.info("Done create Account");
    res.status(201).send("account created");
  }

  async getBalanceByAddress(req: express.Request, res: express.Response) {
    const service = Service.getInstance();
    const response = await service
      .getBalanceByAddress(req.params.id)
      .catch((e) => {
        Logger.error(e);
        res.status(400).send(e);
      });
    Logger.info("Done get Wallet balance");
    res.status(200).send(response);
  }

  async getTokenHoldByAddress(req: express.Request, res: express.Response) {
    const service = Service.getInstance();
    const response = await service
      .getTokenHoldByAddress(req.params.id)
      .catch((e) => {
        Logger.error(e);
        res.status(400).send(e);
      });
    Logger.info("Done get list of token hold");
    res.status(200).send(response);
  }

  async transferNativeToken(req: express.Request, res: express.Response) {
    const service = Service.getInstance();
    const response = await service.transferNativeToken(req.body).catch((e) => {
      Logger.error(e);
      res.status(400).send(e);
    });
    Logger.info("Done transfer native token");
    res.status(200).send(response);
  }

  async transferFungibleToken(req: express.Request, res: express.Response) {
    const service = Service.getInstance();
    const response = await service
      .transferFungibleToken(req.body)
      .catch((e) => {
        Logger.error(e);
        res.status(400).send(e);
      });
    Logger.info("Done transfer fungible token");
    res.status(200).send(response ? response : "fail");
  }

  async getWalletHistoryByAddress(req: express.Request, res: express.Response) {
    const service = Service.getInstance();
    const response = await service
      .getWalletHistoryByAddress(req.params.id)
      .catch((e) => {
        Logger.error(e);
        res.status(400).send(e);
      });
    Logger.info("Done get Wallet history");
    res.status(200).send(response);
  }
}
