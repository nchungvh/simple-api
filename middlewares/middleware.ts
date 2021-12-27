import express from "express";
import { Logger } from "../logger";

export class Middleware {
  private static instance: Middleware;

  static getInstance() {
    if (!Middleware.instance) {
      Middleware.instance = new Middleware();
    }
    return Middleware.instance;
  }

  validateRequiredCreateAccount(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (
      req.body &&
      req.body.seedPhrase &&
      req.body.newAccountId &&
      req.body.amount
    ) {
      if (req.body.seedPhrase.split(" ").length !== 12) {
        res.status(400).send({ error: `Invalid seedPhrase param` });
        Logger.error(`Create fail: Invalid seedPhrase param`);
      } else {
        next();
      }
    } else {
      res
        .status(400)
        .send({
          error: `Input must have fields: seedPhrase, newAccountId, amount`,
        });
      Logger.error(
        `Create fail: Input must have fields: seedPhrase, newAccountId, amount`
      );
    }
  }

  validateRequiredTransfer(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (
      req.body &&
      req.body.receiverId &&
      req.body.senderId &&
      req.body.amount
    ) {
      next();
    } else {
      res
        .status(400)
        .send({
          error: `Input must have fields: receiverId, senderId, amount`,
        });
      Logger.error(
        `Create fail: Input must have fields: receiverId, senderId, amount`
      );
    }
  }
}
