"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const user_services_1 = require("../services/user.services");
class UsersController {
    constructor() {
    }
    listUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usersService = user_services_1.UsersService.getInstance();
            const users = yield usersService.list(100, 0);
            res.status(200).send(users);
        });
    }
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usersService = user_services_1.UsersService.getInstance();
            const user = yield usersService.readById(req.params.id);
            res.status(200).send(user);
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usersService = user_services_1.UsersService.getInstance();
            const userId = yield usersService.create(req.body);
            res.status(201).send({ _id: userId });
        });
    }
    put(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usersService = user_services_1.UsersService.getInstance();
            yield usersService.updateById(req.params.id, req.body);
            res.status(204).send(``);
        });
    }
    removeUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usersService = user_services_1.UsersService.getInstance();
            yield usersService.deleteById(req.params.id);
            res.status(204).send(``);
        });
    }
}
exports.UsersController = UsersController;
