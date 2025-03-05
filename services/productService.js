/**
 * Service functions related to products.
 * @module ProductService
 * @requires module:../database/db
 */

const { query } = require('../database/db');

/**
 * Retrieves all products from the database.
 * @function
 * @async
 * @returns {Promise<Array>} - An array containing details of all products.
 * @throws {Error} - If an error occurs during the database operation.
 */
const getProducts = async () => {
  try {
    let sql = `SELECT * FROM product`;

    const products = await query(sql);

    return products;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Retrieves a specific product by its ID from the database.
 * @function
 * @async
 * @param {number} ProductID - The ID of the product to retrieve.
 * @returns {Promise<object>} - The details of the retrieved product.
 * @throws {Error} - If an error occurs during the database operation or if the product is not found.
 */
const getProductById = async (ProductID) => {
  try {
    let sql = `SELECT * FROM product WHERE ProductID = ?`;

    const product = await query(sql, [ProductID]);
    
    if (product.length === 0) {
      throw new Error('Product not found.');
    }

    return product;
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Adds a new product to the database.
 * @function
 * @async
 * @param {string} ProductName - The name of the product.
 * @param {number} Quantity - The quantity of the product.
 * @param {string} ExpiryDate - The expiry date of the product.
 * @param {number} PricePerUnit - The price per unit of the product.
 * @param {number} CostPerUnit - The cost per unit of the product.
 * @returns {Promise<Array>} - An array containing the details of the added product.
 * @throws {Error} - If an error occurs during the database operation.
 */
const addProduct = async (ProductName, Quantity, ExpiryDate, PricePerUnit, CostPerUnit) => {
  try {
    let sql = `INSERT INTO product 
      (ProductName, Quantity, ExpiryDate, PricePerUnit, CostPerUnit) 
      VALUES (?, ?, ?, ?, ?);`;

    const result = await query(sql, [ProductName, Quantity, ExpiryDate, PricePerUnit, CostPerUnit]);

    const addedProduct = await query('SELECT * FROM product WHERE ProductID = ?', [result?.insertId]);

    return addedProduct;
  } catch (error) {
    throw new Error('Failed to add product.');
  }
};

/**
 * Updates an existing product in the database.
 * @function
 * @async
 * @param {string} ProductName - The new name of the product.
 * @param {number} Quantity - The new quantity of the product.
 * @param {string} ExpiryDate - The new expiry date of the product.
 * @param {number} PricePerUnit - The new price per unit of the product.
 * @param {number} CostPerUnit - The new cost per unit of the product.
 * @param {number} ProductID - The ID of the product to update.
 * @returns {Promise<object>} - The result of the update operation.
 * @throws {Error} - If an error occurs during the database operation.
 */
const updateProduct = async (ProductName, Quantity, ExpiryDate, PricePerUnit, CostPerUnit, ProductID) => {
  try {

    let sql = `UPDATE product SET 
    ProductName = ?, 
    Quantity = ?, 
    ExpiryDate = ?, 
    PricePerUnit = ?, 
    CostPerUnit = ? 
    WHERE ProductID = ?;`;

    const result = await query(sql, [ProductName, Quantity, ExpiryDate, PricePerUnit, CostPerUnit, ProductID]);

    return result;

  } catch (error) {
    console.error(`Error in updateProduct service: ${error.message}`);
  }
};

/**
 * Deletes a product from the database.
 * @function
 * @async
 * @param {number} ProductID - The ID of the product to delete.
 * @returns {Promise<object>} - The result of the delete operation.
 * @throws {Error} - If an error occurs during the database operation.
 */
const deleteProduct = async (ProductID) => {
  try {
    return await query('DELETE FROM product WHERE ProductID = ?', [ProductID]);

  } catch (error) {
    throw new Error('Failed to delete the product.');
  }
};

/**
 * Retrieves all product IDs from the database.
 * @function
 * @async
 * @returns {Promise<Array>} - An array containing all product IDs.
 * @throws {Error} - If an error occurs during the database operation.
 */
const getAllProductIds = async () => {
  try {
    return await query('SELECT ProductID FROM product');

  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Updates the quantity of a product in the database.
 * @function
 * @async
 * @param {number} Quantity - The new quantity of the product.
 * @param {number} ProductID - The ID of the product to update.
 * @returns {Promise<object>} - The result of the update operation.
 * @throws {Error} - If an error occurs during the database operation.
 */
const updateProductQuantity = async (Quantity, ProductID) => {
  try {

    let sql = `UPDATE product SET 
    Quantity = ? 
    WHERE ProductID = ?;`;

    const result = await query(sql, [Quantity, ProductID]);

    return result;

  } catch (error) {
    console.error(`Error in updateProductQuantity service: ${error.message}`);
  }
};

/**
 * Retrieves the quantity of a product from the database.
 * @function
 * @async
 * @param {number} ProductID - The ID of the product to retrieve the quantity for.
 * @returns {Promise<number|null>} - The quantity of the product. Returns null if the product is not found.
 * @throws {Error} - If an error occurs during the database operation.
 */
const getProductQuantity = async (ProductID) => {
  try {
    let sql = `SELECT Quantity FROM product WHERE ProductID = ?`;

    const result = await query(sql, [ProductID]);
    
    return result.length > 0 ? parseInt(result[0].Quantity, 10) : null;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Retrieves an array of all product IDs from the database.
 * @function
 * @async
 * @returns {Promise<Array>} - An array containing all product IDs.
 * @throws {Error} - If an error occurs during the database operation.
 */
const getProductIdsArray = async () => {
  try {
    const productIdsResultSet = await getAllProductIds();
    
    // Extracting the ProductID values into an array of integers
    const productIdsArray = productIdsResultSet.map(row => row.ProductID);

    return productIdsArray;
  } catch (error) {
    throw new Error('Failed to retrieve ProductIDs from the product table.');
  }
};

// Export the services
module.exports = {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProductIds,
  updateProductQuantity,
  getProductQuantity,
  getProductIdsArray
};
