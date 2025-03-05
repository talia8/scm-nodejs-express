/**
 * Service functions related to orders.
 * @module OrderService
 * @requires module:moment
 * @requires module:../database/db
 */

const { query } = require('../database/db');
const moment = require('moment');

/**
 * Adds a new order to the database.
 * @param {number} CustomerID - The ID of the customer placing the order.
 * @returns {Promise<object>} - The details of the added order.
 * @throws {Error} - If an error occurs during the database operation.
 */
const addOrder = async (CustomerID) => {
  try {
    let sql = `INSERT INTO orders 
    (CustomerID, OrderDate)
    VALUES (?, ?);`;

    const OrderDate = moment().format('YYYY-MM-DD');

    const result = await query(sql, [CustomerID, OrderDate]);

    const addedOrder = await query('SELECT * FROM orders WHERE OrderID = ?', [result?.insertId]);

    return addedOrder;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Retrieves all orders from the database.
 * @returns {Promise<Array>} - An array containing details of all orders.
 * @throws {Error} - If an error occurs during the database operation.
 */
const getOrders = async () => {
  try {
    let sql = `SELECT * FROM orders`;

    const orders = await query(sql);

    return orders;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Retrieves a specific order by its ID from the database.
 * @param {number} OrderID - The ID of the order to retrieve.
 * @returns {Promise<object>} - The details of the retrieved order.
 * @throws {Error} - If an error occurs during the database operation.
 */
const getOrderById = async (OrderID) => {
  try {
    let sql = `SELECT * FROM orders WHERE OrderID = ?`;

    const order = await query(sql, [OrderID]);

    return order;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Updates an existing order in the database.
 * @param {number} CustomerID - The ID of the customer placing the order.
 * @param {moment} OrderDate - The date of the order.
 * @param {number} OrderID - The ID of the order to update.
 * @returns {Promise<object>} - The details of the updated order.
 * @throws {Error} - If an error occurs during the database operation.
 */
const updateOrder = async (CustomerID, OrderDate, OrderID) => {
  try {
    let sql = `UPDATE orders SET
    CustomerID = ?,
    OrderDate = ?
    WHERE OrderID = ?;`;

    result = await query(sql, [CustomerID, OrderDate.format('YYYY-MM-DD'), OrderID]);

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Deletes an order from the database.
 * @param {number} OrderID - The ID of the order to delete.
 * @returns {Promise<object>} - The result of the delete operation.
 * @throws {Error} - If an error occurs during the database operation.
 */
const deleteOrder = async (OrderID) => {
  try {
    return await query('DELETE FROM orders WHERE OrderID = ?', [OrderID]);

  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Retrieves all order IDs from the database.
 * @returns {Promise<Array>} - An array containing all order IDs.
 * @throws {Error} - If an error occurs during the database operation.
 */
const getAllOrderIds = async() => {
  try{
    return await query('SELECT OrderID from orders');

  } catch(error){
    throw new Error(error);
  }
};

/**
 * Retrieves all order IDs as an array.
 * @returns {Promise<Array>} - An array containing all order IDs.
 * @throws {Error} - If an error occurs during the database operation.
 */
const getOrderIdsArray = async () => {
  try {
    const orderIdsResultSet = await getAllOrderIds();
    
    const orderIdsArray = orderIdsResultSet.map(row => row.OrderID);

    return orderIdsArray;
  } catch (error) {
    throw new Error(error);
  }
};

// Export the services
module.exports = {
  getOrders,
  getOrderById,
  addOrder,
  updateOrder,
  deleteOrder,
  getOrderIdsArray
};
