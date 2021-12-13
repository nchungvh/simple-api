import {UsersController} from './controllers/users.controller';
import {UsersMiddleware} from './middlewares/users.middleware';

import express from 'express';

export class Routes {
    app: express.Application;

    constructor(app: express.Application) {
        this.app = app;
        this.configureRoutes();
    }

    configureRoutes() {
        const usersController = new UsersController();
        const usersMiddleware = UsersMiddleware.getInstance();
        this.app.get(`/users`, [
            usersController.listUsers
        ]);

        this.app.post(`/users`, [
            usersMiddleware.validateRequiredCreateUserBodyFields,
            usersMiddleware.validateSameEmailDoesntExist,
            usersController.createUser
        ]);

        this.app.put(`/users/:id`, [
            usersMiddleware.validateUserExists,
            usersController.put
        ]);

        this.app.delete(`/users/:id`, [
            usersMiddleware.validateUserExists,
            usersController.removeUser
        ]);
        this.app.get(`/users/:id`, [
            usersMiddleware.validateUserExists,
            usersController.getUserById
        ]);
    }


}