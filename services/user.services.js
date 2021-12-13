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
exports.UsersService = void 0;
const repository_1 = require("../repository/repository");
class UsersService {
    constructor() {
    }
    static getInstance() {
        if (!UsersService.instance) {
            UsersService.instance = new UsersService();
        }
        return UsersService.instance;
    }
    create(resource) {
        return repository_1.Repository.getInstance().addUser(resource);
    }
    deleteById(id) {
        return repository_1.Repository.getInstance().removeUserById(id);
    }
    ;
    list(limit, page) {
        return repository_1.Repository.getInstance().listUsers(limit, page);
    }
    ;
    readById(id) {
        return repository_1.Repository.getInstance().getUserById(id);
    }
    ;
    updateById(id, body) {
        return repository_1.Repository.getInstance().patchUser(id, body);
    }
    ;
    getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return repository_1.Repository.getInstance().getUserByEmail(email);
        });
    }
}
exports.UsersService = UsersService;
