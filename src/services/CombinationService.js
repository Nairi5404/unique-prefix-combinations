import { MySQLConnection } from "../databases/MySQLConnection.js";
import { CombinationUtils } from "../utils/CombinationUtils.js";

export class CombinationService {

    constructor(items, length) {

        this.items = items;
        this.length = length;
    }

    async executeTransaction() {

        const connection = await MySQLConnection.getConnection();
        const itemNames = CombinationUtils.createItemNames(this.items);
        const combinations = CombinationUtils.createCombination(this.items, this.length);

        try {
            await connection.beginTransaction();
            await this.insertItems(connection, itemNames);
            const combinationId = await this.insertCombinations(connection, combinations);
            const responseId = await this.insertResponse(connection, combinations, combinationId);
            await connection.commit();
            return { id: responseId, combination: combinations };
        } catch (err) {
            await connection.rollback();
            throw err;
        } finally {
            await connection.end();
        }
    }

    async insertItems(connection, itemNames) {
        
        for (const name of itemNames) {
            await connection.execute('INSERT INTO items (name) VALUES (?)', [name]);
        }
    }

    async insertCombinations(connection, combinations) {

        let lastInsertId = null;
        for (const comb of combinations) {
            const json = JSON.stringify(comb);
            const [result] = await connection.execute('INSERT INTO combinations (combination) VALUES (?)', [json]);
            lastInsertId = result.insertId;
        }
        return lastInsertId;
    }

    async insertResponse(connection, combinations, combinationId) {

        const json = JSON.stringify({ combination: combinations });
        const [result] = await connection.execute('INSERT INTO responses (combination_id, response) VALUES (?, ?)', [combinationId, json]);
        return result.insertId;
    }
}