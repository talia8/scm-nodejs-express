/**
 * Service functions related to customer.
 * @module customerService
 * @requires module:../database/db
 **/


const { query } = require('../database/db');

/**
 * Adds a new customer to the database.
 * @param {string} CustomerName - The name of the customer.
 * @param {string} PhoneNumber - The phone number of the customer.
 * @param {string} CustomerAddress - The address of the customer.
 * @returns {Object} - The details of the added customer.
 * @throws {Error} - If an error occurs during the database operation.
 */
const addCustomer = async (CustomerName, PhoneNumber, CustomerAddress) => {
    try {
        let sql = `INSERT INTO customer 
        (CustomerName, PhoneNumber, CustomerAddress) 
        VALUES (?, ?, ?);`;

        const result = await query(sql, [CustomerName, PhoneNumber, CustomerAddress]);
        const addedCustomer = await query('SELECT * FROM customer WHERE CustomerID = ?', [result?.insertId]);
        return addedCustomer;
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Retrieves all customers from the database.
 * @returns {Array} - An array containing details of all customers.
 * @throws {Error} - If an error occurs during the database operation.
 */
const getCustomers = async () => {
    try {
        let sql = `SELECT * FROM customer`;
        const customers = await query(sql);
        return customers;
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Retrieves a customer by their ID from the database.
 * @param {number} CustomerID - The ID of the customer to retrieve.
 * @returns {Object} - The details of the specified customer.
 * @throws {Error} - If the customer is not found or an error occurs during the database operation.
 */
const getCustomerById = async (CustomerID) => {
    try {
        let sql = `SELECT * FROM customer WHERE CustomerID = ?`;
        const customer = await query(sql, [CustomerID]);
        return customer;
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Updates the details of a customer in the database.
 * @param {string} CustomerName - The new name of the customer.
 * @param {string} PhoneNumber - The new phone number of the customer.
 * @param {string} CustomerAddress - The new address of the customer.
 * @param {number} CustomerID - The ID of the customer to update.
 * @returns {Object} - The result of the database update operation.
 * @throws {Error} - If an error occurs during the database operation.
 */
const updateCustomer = async (CustomerName, PhoneNumber, CustomerAddress, CustomerID) => {
    try {
        let sql = `UPDATE customer SET 
      CustomerName = ?, 
      PhoneNumber = ?, 
      CustomerAddress = ? 
      WHERE CustomerID = ?;`;

        const result = await query(sql, [CustomerName, PhoneNumber, CustomerAddress, CustomerID]);

        return result;
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Deletes a customer from the database.
 * @param {number} CustomerID - The ID of the customer to delete.
 * @returns {Object} - The result of the database delete operation.
 * @throws {Error} - If an error occurs during the database operation.
 */
const deleteCustomer = async (CustomerID) => {
    try {
        return await query('DELETE FROM customer WHERE CustomerID = ?', [CustomerID]);

    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Retrieves all customer IDs from the database.
 * @returns {Array} - An array containing all customer IDs.
 * @throws {Error} - If an error occurs during the database operation.
 */
const getAllCustomerIds = async() => {
    try{
        return await query('SELECT CustomerID from customer');
      } catch(error){
        throw new Error(error);
      }
};

/**
 * Retrieves an array containing all customer IDs.
 * @returns {Array} - An array of integers representing all customer IDs.
 * @throws {Error} - If an error occurs during the database operation.
 */
const getCustomerIdsArray = async () => {
    try {
        const CustomerIdsResultSet = await getAllCustomerIds();
        
        // Extracting the CustomerID values into an array of integers
        const CustomerIdsArray = CustomerIdsResultSet.map(row => row.CustomerID);

        return CustomerIdsArray;
    } catch (error) {
        throw new Error(error);
    }
};

// Export the services
module.exports = {
    getCustomers,
    getCustomerById,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    getCustomerIdsArray
};
