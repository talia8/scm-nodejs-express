/**
 * Service functions related to product orders.
 * @module ProductOrderService
 * @requires module:../database/db
 * @requires module:../services/productService
 */

const { query } = require('../database/db');
const { getProductQuantity, updateProductQuantity } = require('../services/productService');

/**
 * Adds a new product order to the database.
 * @function
 * @async
 * @param {number} OrderID - The ID of the order associated with the product.
 * @param {number} ProductID - The ID of the product being ordered.
 * @param {number} Quantity - The quantity of the product being ordered.
 * @returns {Promise<Array>} - An array containing the details of the added product order and the remaining product quantity.
 * @throws {Error} - If an error occurs during the database operation.
 */
const addProductOrder = async (OrderID, ProductID, Quantity) => {
  try {
    let sql = `INSERT INTO productOrder
      (OrderID, ProductID, Quantity)
      VALUES (?, ?, ?);`;

    const result = await query(sql, [OrderID, ProductID, Quantity]);

    const oldQuantity = await getProductQuantity(ProductID);

    const newQuantity = Math.max(oldQuantity - Quantity, 0);

    const remainingProductQuantity = await updateProductQuantity(newQuantity, ProductID);

    const addedProductOrder = await query(`SELECT * FROM productorder WHERE ProductOrderID = ?`, [result?.insertId]);
    
    return [addedProductOrder, remainingProductQuantity];
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Retrieves all product orders from the database.
 * @function
 * @async
 * @returns {Promise<Array>} - An array containing details of all product orders.
 * @throws {Error} - If an error occurs during the database operation.
 */
const getProductOrders = async () => {
  try {
    let sql = `SELECT * FROM productOrder`;

    const productOrders = await query(sql);

    return productOrders;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Retrieves a specific product order by its ID from the database.
 * @function
 * @async
 * @param {number} ProductOrderID - The ID of the product order to retrieve.
 * @returns {Promise<object>} - The details of the retrieved product order.
 * @throws {Error} - If an error occurs during the database operation.
 */
const getProductOrderById = async (ProductOrderID) => {
  try {
    let sql = `SELECT * FROM productOrder 
    WHERE ProductOrderID = ?`;

    const productOrder = await query(sql, [ProductOrderID]);

    return productOrder;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Updates an existing product order in the database.
 * @function
 * @async
 * @param {number} Quantity - The new quantity of the product order.
 * @param {number} OrderID - The ID of the order associated with the product order.
 * @param {number} ProductID - The ID of the product associated with the product order.
 * @returns {Promise<object>} - The result of the update operation.
 * @throws {Error} - If an error occurs during the database operation.
 */
const updateProductOrder = async (Quantity, OrderID, ProductID, productOrderID) => {
  try {
    let sql = `UPDATE productorder SET
    Quantity = ?
    WHERE productOrderID = ?`;

    result = await query(sql, [Quantity, OrderID, ProductID, productOrderID]);

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Deletes a product order from the database.
 * @function
 * @async
 * @param {number} OrderID - The ID of the order associated with the product order.
 * @param {number} ProductID - The ID of the product associated with the product order.
 * @returns {Promise<object>} - The result of the delete operation.
 * @throws {Error} - If an error occurs during the database operation.
 */
const deleteProductOrder = async (productOrderID) => {
  try {
    let sql = `DELETE FROM productorder 
    WHERE productOrderID = ?`;
  
    const result = await query(sql, [productOrderID]);

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

// Export the services
module.exports = {
  getProductOrders,
  getProductOrderById,
  addProductOrder,
  updateProductOrder,
  deleteProductOrder,
};
