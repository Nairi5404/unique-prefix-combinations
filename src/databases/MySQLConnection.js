import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export class MySQLConnection {

    static async getConnection(useDatabase = true) {

        const config = {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
        };

        if (useDatabase) {
            config.database = process.env.DB_NAME;
        }
        
        return mysql.createConnection(config);
    }
}
