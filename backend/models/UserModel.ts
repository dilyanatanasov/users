import { RowDataPacket, ResultSetHeader } from "mysql2/promise";
import { Database } from "./Database";
import { User, CreateUserDTO, UpdateUserDTO } from "../common/interfaces";
import { UserMapper } from "../common/mappers";

export class UserModel {
    private db: Database['conn'];

    constructor() {
        this.db = new Database().conn;
    }

    async getAll(): Promise<User[]> {
        try {
            const [rows] = await this.db.query<User[] & RowDataPacket[]>("SELECT * FROM users");
            return rows;
        } catch (error) {
            console.error("Error fetching all users:", error);
            throw new Error("Failed to fetch users");
        }
    }

    async getById(id: number): Promise<User | null> {
        try {
            const [rows] = await this.db.execute<User[] & RowDataPacket[]>(
                "SELECT * FROM users WHERE id = ?",
                [id]
            );

            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            console.error(`Error fetching user with id ${id}:`, error);
            throw new Error(`Failed to fetch user with id ${id}`);
        }
    }

    async create(userData: CreateUserDTO): Promise<number> {
        try {
            const dbUser = UserMapper.toDBModel(userData);

            const [result] = await this.db.execute<ResultSetHeader>(
                "INSERT INTO users(username, password, is_active) VALUES (?, ?, ?)",
                [dbUser.username, dbUser.password, dbUser.is_active]
            );

            return result.insertId;
        } catch (error) {
            console.error("Error creating user:", error);
            throw new Error("Failed to create user");
        }
    }

    async update(id: number, userData: UpdateUserDTO): Promise<boolean> {
        try {
            const dbUser = UserMapper.toUpdateDBModel(userData);
            const fields = Object.keys(dbUser);

            if (fields.length === 0) {
                return false;
            }

            const setClause = fields.map(field => `${field} = ?`).join(', ');
            const values = [...Object.values(dbUser), id];

            const [result] = await this.db.execute<ResultSetHeader>(
                `UPDATE users SET ${setClause} WHERE id = ?`,
                values
            );

            return result.affectedRows > 0;
        } catch (error) {
            console.error(`Error updating user with id ${id}:`, error);
            throw new Error(`Failed to update user with id ${id}`);
        }
    }

    async delete(id: number): Promise<boolean> {
        try {
            const [result] = await this.db.execute<ResultSetHeader>(
                "DELETE FROM users WHERE id = ?",
                [id]
            );

            return result.affectedRows > 0;
        } catch (error) {
            console.error(`Error deleting user with id ${id}:`, error);
            throw new Error(`Failed to delete user with id ${id}`);
        }
    }
}