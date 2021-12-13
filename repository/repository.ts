import {MongooseService} from '../common/database/mongoose';
import mongoose from 'mongoose';

export class Repository {
    mongooseService: MongooseService = MongooseService.getInstance();
    private static instance: Repository;

    Schema = mongoose.Schema;

    userSchema = new this.Schema({
        name: String,
        email: String,
        password: String,
    });

    User = mongoose.model('Users', this.userSchema);


    constructor() {
    }

    public static getInstance() {
        if (!this.instance) {
            this.instance = new Repository();
        }
        return this.instance;
    }

    async addUser(body: any) {
        const user = new this.User(body);
        await user.save();
        return user._id;
    }

    async removeUserById(id: string) {
        await this.User.deleteOne({_id: id});
    }

    async getUserByEmail(email: string) {
        return this.User.findOne({email: email});
    }

    async getUserById(id: string) {
        return this.User.findOne({_id: id});
    }

    async listUsers(limit: number, page: number) {
        return this.User.find()
            .limit(limit)
            .skip(limit * page)
            .exec();
    }

    async patchUser(id: any, body: any) {
        let user: any = await this.User.findById(id);
        if(user){
            for (let i in body) {
                user[i] = body[i];
            }
            return await user.save();
        }
    }
}