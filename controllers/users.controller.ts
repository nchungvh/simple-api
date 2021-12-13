import express from 'express';
import {UsersService} from '../services/user.services';

export class UsersController {
    constructor() {
    }

    async listUsers(req: express.Request, res: express.Response) {
        const usersService = UsersService.getInstance();
        const users = await usersService.list(100, 0);
        res.status(200).send(users);
    }

    async getUserById(req: express.Request, res: express.Response) {
        const usersService = UsersService.getInstance();
        const user = await usersService.readById(req.params.id);
        res.status(200).send(user);
    }

    async createUser(req: express.Request, res: express.Response) {
        const usersService = UsersService.getInstance();
        const userId = await usersService.create(req.body);
        res.status(201).send(`create complete`);
    }

    async put(req: express.Request, res: express.Response) {
        const usersService = UsersService.getInstance();
        await usersService.updateById(req.params.id, req.body);
        res.status(204).send(`update complete`);
    }

    async removeUser(req: express.Request, res: express.Response) {
        const usersService = UsersService.getInstance();
        await usersService.deleteById(req.params.id);
        res.status(204).send(`remove complete`);
    }

}