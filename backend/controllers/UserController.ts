import { UserModel } from "../models";
import { CreateUserDTO, UpdateUserDTO, UserDTO } from "../common/interfaces";
import { UserValidator } from "../common/validator";
import { UserMapper } from "../common/mappers";

export class UserController {
    private userModel: UserModel;

    constructor() {
        this.userModel = new UserModel();
    }

    async getAllUsers(): Promise<UserDTO[]> {
        const users = await this.userModel.getAll();
        return UserMapper.toDTOList(users);
    }

    async getUserById(id: string): Promise<UserDTO | null> {
        const validation = UserValidator.validateId(id);
        if (!validation.valid) {
            throw new Error(validation.errors.join(', '));
        }

        const user = await this.userModel.getById(Number(id));
        return user ? UserMapper.toDTO(user) : null;
    }

    async createUser(userData: any): Promise<{ id: number; message: string }> {
        const validation = UserValidator.validateCreate(userData);
        if (!validation.valid) {
            throw new Error(validation.errors.join(', '));
        }

        const user = userData as CreateUserDTO;
        const id = await this.userModel.create(user);

        return {
            id,
            message: `User with id ${id} created successfully`
        };
    }

    async updateUser(id: string, userData: any): Promise<{ success: boolean; message: string }> {
        const idValidation = UserValidator.validateId(id);
        if (!idValidation.valid) {
            throw new Error(idValidation.errors.join(', '));
        }

        const dataValidation = UserValidator.validateUpdate(userData);
        if (!dataValidation.valid) {
            throw new Error(dataValidation.errors.join(', '));
        }

        const user = userData as UpdateUserDTO;
        const success = await this.userModel.update(Number(id), user);

        return {
            success,
            message: success
                ? `User with id ${id} updated successfully`
                : `User with id ${id} not found or no changes made`
        };
    }

    async deleteUser(id: string): Promise<{ success: boolean; message: string }> {
        const validation = UserValidator.validateId(id);
        if (!validation.valid) {
            throw new Error(validation.errors.join(', '));
        }

        const success = await this.userModel.delete(Number(id));

        return {
            success,
            message: success
                ? `User with id ${id} deleted successfully`
                : `User with id ${id} not found`
        };
    }
}