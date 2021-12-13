import {CRUD} from '../common/interfaces/crud.interface';
import {Repository} from '../repository/repository';
export class UsersService implements CRUD {
    private static instance: UsersService;

    constructor() {
    }

    static getInstance(): UsersService {
        if (!UsersService.instance) {
            UsersService.instance = new UsersService();
        }
        return UsersService.instance;
    }

    create(resource: any) {
        return Repository.getInstance().addUser(resource);
    }

    deleteById(id: any) {
        return Repository.getInstance().removeUserById(id);
    };

    list(limit: number, page: number) {
        return Repository.getInstance().listUsers(limit, page);
    };

    readById(id: any) {
        return Repository.getInstance().getUserById(id);
    };

    updateById(id: any, body: any) {
        return Repository.getInstance().patchUser(id, body);
    };

    async getByEmail(email: string) {
        return Repository.getInstance().getUserByEmail(email);
    }
}