import {User, UserDTO, CreateUserDTO, UpdateUserDTO} from './interfaces';

export class UserMapper {
    static toDTO(user: User): UserDTO {
        return {
            id: user.id,
            username: user.username,
            password: user.password,
            isActive: user.is_active,
        };
    }

    static toDTOList(users: User[]): UserDTO[] {
        return users.map(user => this.toDTO(user));
    }

    static toDBModel(dto: CreateUserDTO): Omit<User, 'id'> {
        return {
            username: dto.username,
            password: dto.password,
            is_active: dto.isActive
        };
    }

    static toUpdateDBModel(dto: UpdateUserDTO): Partial<Omit<User, 'id'>> {
        const result: Partial<User> = {};

        if (dto.username !== undefined) {
            result.username = dto.username;
        }

        if (dto.password !== undefined) {
            result.password = dto.password;
        }

        if (dto.isActive !== undefined) {
            result.is_active = dto.isActive;
        }

        return result;
    }
}
