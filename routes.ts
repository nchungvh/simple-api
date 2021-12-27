import { Controller } from "./controllers/controller";
import { Middleware } from "./middlewares/middleware";
import express from "express";

export class Routes {
  app: express.Application;

  constructor(app: express.Application) {
    this.app = app;
    this.configureRoutes();
  }

  configureRoutes() {
    const controller = new Controller();
    const middleware = Middleware.getInstance();
    this.app.post(`/create`, [
      middleware.validateRequiredCreateAccount,
      controller.createAccount,
    ]);

    this.app.get(`/balance/:id`, [controller.getBalanceByAddress]);

    this.app.post(`/transfer`, [
      middleware.validateRequiredTransfer,
      controller.transferNativeToken,
    ]);

    this.app.post(`/fungibletransfer`, [
      middleware.validateRequiredTransfer,
      controller.transferFungibleToken,
    ]);

    this.app.get(`/history/:id`, [controller.getWalletHistoryByAddress]);

    this.app.get(`/hold/:id`, [controller.getTokenHoldByAddress]);
  }
}
