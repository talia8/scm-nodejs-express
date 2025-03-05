/**
 * Module for handling MySQL database connections and queries.
 * @module db
 * @requires mysql2/promise
 * @requires module:./config
 */

const mysql = require('mysql2/promise');
const config = require('./config');

/** 
 * MySQL database connection object.
 * @type {object}
 */
let connection;

/**
 * Establishes a connection to the MySQL database using the provided configuration.
 * @function
 * @async
 * @throws {Error} Throws an error if the connection attempt fails.
 */
const connect = async () => {
    try {
        connection = await mysql.createConnection(config.db);
        console.log("==========================");
        console.log(`>>>> Connected to ${process.env.DB_NAME} Successfully`);
        console.log("==========================");
    } catch (error) {
        console.error(`>>> Error connecting to ${process.env.DB_NAME}`, error);
        process.exit();
    }
};

/**
 * Executes a SQL query on the connected MySQL database.
 * @function
 * @async
 * @param {string} sql - SQL query string.
 * @param {Array} params - Array of parameters to be used in the SQL query.
 * @returns {Array} - The results of the SQL query.
 * @throws {Error} Throws an error if the query execution fails.
 */
const query = async (sql, params) => {
    if (!connection) {
        await connect();
    }

    try {
        const [results] = await connection.execute(sql, params);
        return results;
    } catch (error) {
        console.error(`Query error -> ${sql}: ${error.message}`);
        throw new Error(error);
    }
};

module.exports = {
    query
};
