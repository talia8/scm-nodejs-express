/**
 * Controller functions for handling product-related HTTP requests.
 * @module ProductController
 * @requires module:express-validator
 * @requires module:../services/productService
 */

const { validationResult } = require('express-validator');
const {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProductIds,
  updateProductQuantity,
} = require('../services/productService');

/**
 * Retrieves details of all products and sends a JSON response.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing details of all products.
 */
const getAllProductsController = async (req, res) => {
  try {
    const products = await getProducts();
    res.render('product', { products });
  } catch (error) {
    res.status(500).json({ message: `Failed to retrieve products, ${error.message}` });
  }
};

/**
 * Retrieves details of a specific product by ID and sends a JSON response.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing details of the specified product.
 */
const getProductByIdController = async (req, res) => {
  const { ProductID } = req.body;

  try {
    const product = await getProductById(ProductID);
    
    if (!product) {
      return res.status(404).json({ message: `Error, ${error.message}` });
    }

    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ message: `Failed to retrieve product by ID, ${error.message}` });
  }
};

/**
 * Adds a new product and sends a JSON response.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing details of the newly added product.
 */
const addProductController = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { ProductName, Quantity, ExpiryDate, PricePerUnit, CostPerUnit } = req.body;

  try {
    await addProduct(ProductName, Quantity, ExpiryDate, PricePerUnit, CostPerUnit);
    res.redirect('/api/products');

  } catch (error) {
    res.status(500).json({ message: `Error, product wasn't added, ${error.message}` });
  }
};

/**
 * Updates the details of a specific product and sends a JSON response.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing the result of the update operation.
 */
const updateProductController = async (req, res) => {
  const errors = validationResult(req);
    
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { ProductName, Quantity, ExpiryDate, PricePerUnit, CostPerUnit, ProductID } = req.body;

  try {
    await updateProduct(
      ProductName,
      Quantity,
      ExpiryDate,
      PricePerUnit,
      CostPerUnit,
      ProductID
    );
    res.redirect('/api/products');
  } catch (error) {
    res.status(500).json({ message: `Update failed, ${error.message}` });
  }
};

/**
 * Deletes a specific product and sends a JSON response.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing the result of the delete operation.
 */
const deleteProductController = async (req, res) => {
  const { ProductID } = req.body;

  if (!ProductID) {
    return res.status(400).json({ message: `Error, ${error.message}` });
  }

  try {
    await deleteProduct(ProductID);
    res.redirect('/api/products');
  } catch (error) {
    res.status(500).json({ message: `Delete failed, ${error.message}` });
  }
};

/**
 * Retrieves all product IDs and sends a JSON response.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing an array of product IDs.
 */
const getAllProductIdsController = async (req, res) => {
  try {
    const productIds = await getAllProductIds();
    res.status(200).json({ productIds });
  } catch (error) {
    res.status(500).json({ message: `Failed to retrieve products, ${error.message} ` });
  }
};

// Export the controllers
module.exports = {
  getAllProductsController,
  getProductByIdController,
  addProductController,
  updateProductController,
  deleteProductController,
  getAllProductIdsController,
};

