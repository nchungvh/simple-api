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
exports.UsersMiddleware = void 0;
const user_services_1 = require("../services/user.services");
class UsersMiddleware {
    static getInstance() {
        if (!UsersMiddleware.instance) {
            UsersMiddleware.instance = new UsersMiddleware();
        }
        return UsersMiddleware.instance;
    }
    validateRequiredCreateUserBodyFields(req, res, next) {
        console.log(req.body);
        if (req.body && req.body.email && req.body.password) {
            next();
        }
        else {
            res.status(400).send({ error: `Missing required fields email and password` });
        }
    }
    validateSameEmailDoesntExist(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userService = user_services_1.UsersService.getInstance();
            const user = yield userService.getByEmail(req.body.email);
            if (user) {
                res.status(400).send({ error: `User email already exists` });
            }
            else {
                next();
            }
        });
    }
    validateUserExists(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userService = user_services_1.UsersService.getInstance();
            const user = yield userService.readById(req.params.id);
            if (user) {
                next();
            }
            else {
                res.status(404).send({ error: `User ${req.params.id} not found` });
            }
        });
    }
}
exports.UsersMiddleware = UsersMiddleware;
