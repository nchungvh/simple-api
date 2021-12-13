"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongooseService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class MongooseService {
    constructor() {
        this.options = {
            autoIndex: false,
            poolSize: 10,
            bufferMaxEntries: 0,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        };
        this.count = 0;
        this.connectWithRetry();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new MongooseService();
        }
        return this.instance;
    }
    connectWithRetry() {
        console.log('MongoDB connection with retry');
        mongoose_1.default.connect("mongodb://localhost/api-db", this.options).then(() => {
            console.log('MongoDB is connected');
        }).catch(err => {
            console.log('MongoDB connection unsuccessful, retry after 5 seconds. ', ++this.count);
            setTimeout(this.connectWithRetry, 5000);
        });
    }
    ;
}
exports.MongooseService = MongooseService;
