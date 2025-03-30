import mysql, {Pool} from "mysql2/promise";

export class Database {
    conn: Pool;

    constructor() {
        this.conn = mysql.createPool({
            host: "localhost",
            database: "upr2",
            user: "root",
            password: "",
        })
    }
}