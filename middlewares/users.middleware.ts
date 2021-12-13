import express from 'express';
import {UsersService} from '../services/user.services';

export class UsersMiddleware {
    private static instance: UsersMiddleware;

    static getInstance() {
        if (!UsersMiddleware.instance) {
            UsersMiddleware.instance = new UsersMiddleware();
        }
        return UsersMiddleware.instance;
    }

    validateRequiredCreateUserBodyFields(req: express.Request, res: express.Response, next: express.NextFunction) {
        console.log(req.body);
        if (req.body && req.body.email && req.body.password) {
            next();
        } else {
            res.status(400).send({error: `Missing required fields email and password`});
        }
    }

    async validateSameEmailDoesntExist(req: express.Request, res: express.Response, next: express.NextFunction) {
        const userService = UsersService.getInstance();
        const user = await userService.getByEmail(req.body.email);
        if (user) {
            res.status(400).send({error: `User email already exists`});
        } else {
            next();
        }
    }

    async validateUserExists(req: express.Request, res: express.Response, next: express.NextFunction) {
        const userService = UsersService.getInstance();
        const user = await userService.readById(req.params.id);
        if (user) {
            next();
        } else {
            res.status(404).send({error: `User ${req.params.id} not found`});
        }
    }

}