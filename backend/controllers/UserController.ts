import {UserModel} from "../models";
import {CreateUser} from "../common/interfaces";

const userModel = new UserModel();
export class UserController {

    async getAllUsers() {
        return await userModel.getAll();
    }
    async getUserById(id: string) {
        return await userModel.getById(id);
    }
    async createUser(user: CreateUser) {
        return await userModel.create(user);
    }
    updateUser(id: string, user: any) {
        return userModel.update(id, user);
    }
    async deleteUser(id: string) {
        return await userModel.delete(id);
    }
}