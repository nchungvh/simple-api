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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repository = void 0;
const mongoose_1 = require("../common/database/mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
class Repository {
    constructor() {
        this.mongooseService = mongoose_1.MongooseService.getInstance();
        this.Schema = mongoose_2.default.Schema;
        this.userSchema = new this.Schema({
            name: String,
            email: String,
            password: String,
        });
        this.User = mongoose_2.default.model('Users', this.userSchema);
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new Repository();
        }
        return this.instance;
    }
    addUser(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new this.User(body);
            yield user.save();
            return user._id;
        });
    }
    removeUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.User.deleteOne({ _id: id });
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.User.findOne({ email: email });
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.User.findOne({ _id: id });
        });
    }
    listUsers(limit, page) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.User.find()
                .limit(limit)
                .skip(limit * page)
                .exec();
        });
    }
    patchUser(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield this.User.findById(id);
            if (user) {
                for (let i in body) {
                    user[i] = body[i];
                }
                return yield user.save();
            }
        });
    }
}
exports.Repository = Repository;
