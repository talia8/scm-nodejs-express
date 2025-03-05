/**
 * Configuration module for the database connection.
 * @module config
 * @requires dotenv
 */

require("dotenv").config();

/**
 * Database configuration object.
 * @const {object} config
 * @property {object} db - Database connection parameters.
 * @property {string} db.host - Database host address (default: "127.0.0.1").
 * @property {string} db.user - Database user.
 * @property {number} db.port - Database port (default: 3307).
 * @property {string} db.password - Database password.
 * @property {string} db.database - Database name (default: "webproj_db").
 * @property {number} db.connectionLimit - Maximum number of connections in the pool (default: 10).
 */
const config = {
    db: {
        host: process.env.DB_HOST || "127.0.0.1",
        user: process.env.DB_USER,
        port: 3307,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME || "webproj_db",
        connectionLimit: 10,
    }
};

module.exports = config;
