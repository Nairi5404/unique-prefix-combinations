import { MySQLConnection } from "../databases/MySQLConnection.js";

export class SchemaInitializer {

    static async initializeSchema() {

        const tempConnection = await MySQLConnection.getConnection(false);
        try {
            await tempConnection.query(`CREATE DATABASE IF NOT EXISTS combinations_db`);
            await tempConnection.end();
        } catch (err) {
            console.error('Failed to create database:', err.message);
            await tempConnection.end();
            return;
        }
        
        const connection = await MySQLConnection.getConnection();
        try {
            await connection.query(`CREATE DATABASE IF NOT EXISTS combinations_db`);
            await connection.beginTransaction();
            await connection.query(`
                CREATE TABLE IF NOT EXISTS items (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(10) NOT NULL
                )
            `);

            await connection.query(`
                CREATE TABLE IF NOT EXISTS combinations (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    combination JSON NOT NULL
                )
            `);

            await connection.query(`
                CREATE TABLE IF NOT EXISTS responses (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    combination_id INT,
                    response JSON NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (combination_id) REFERENCES combinations(id)
                )
            `);
            await connection.commit();
            console.log('Tables initialized successfully: ');
        } catch (err) {
            await connection.rollback();
            console.error('Schema initialization failed:', err.message);
        } finally {
            await connection.end();
        }
    }
}
