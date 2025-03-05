/**
 * Validation middleware for product order-related operations.
 * @module ProductOrderValidator
 * @requires module:express-validator
 * @requires module:../services/productService
 * @requires module:../services/orderService
 */

const { check } = require('express-validator');
const { getProductIdsArray, getProductQuantity } = require('../services/productService');
const { getOrderIdsArray } = require('../services/orderService');

/**
 * @description Validation middleware for adding a product order
 * @middleware addProductOrderValidation
 * @checks - Check for non-empty OrderID, valid OrderID, non-empty ProductID, valid ProductID, 
 * and Quantity as a positive integer not exceeding available product quantity.
 */
const addProductOrderValidation = [
  check('OrderID').notEmpty().withMessage('Order ID is required'),
  check('OrderID').isInt().withMessage('Order Id must be an integer')
    .custom(async (value, { req }) => {
      const validOrderIds = await getOrderIdsArray();
      if (!validOrderIds.includes(parseInt(value, 10))) {
        throw new Error('Invalid Order ID');
      }
      return true;
    }),
  check('ProductID').notEmpty().withMessage('Product ID is required'),
  check('ProductID').isInt().withMessage('Order Id must be an integer')
    .custom(async (value, { req }) => {
      const validProductIds = await getProductIdsArray();
      if (!validProductIds.includes(parseInt(value, 10))) {
        throw new Error('Invalid Product ID');
      }
      return true;
    }),
  check('Quantity').isInt({ min: 0 }).withMessage('Quantity must be a positive integer')
    .custom(async (value, { req }) => {
      const ProductID = req.body.ProductID;

      const maxQuantity = await getProductQuantity(ProductID);

      if (parseInt(value) > maxQuantity) {
        throw new Error(`Quantity must be less than or equal to ${maxQuantity}`);
      }

      return true;
    }),
];

/**
 * @description Validation middleware for updating a product order
 * @middleware updateProductOrderValidation
 * @checks - Check for non-empty OrderID, valid OrderID, non-empty ProductID, valid ProductID, and Quantity as a positive integer not exceeding available product quantity.
 */
const updateProductOrderValidation = [
  check('OrderID').notEmpty().withMessage('Order ID is required'),
  check('OrderID').isInt().withMessage('Order Id must be an integer')
    .custom(async (value, { req }) => {
      const validOrderIds = await getOrderIdsArray();
      if (!validOrderIds.includes(parseInt(value, 10))) {
        throw new Error('Invalid Order ID');
      }
      return true;
    }),
  check('ProductID').notEmpty().withMessage('Product ID is required'),
  check('ProductID').isInt().withMessage('Order Id must be an integer')
    .custom(async (value, { req }) => {
      const validProductIds = await getProductIdsArray();
      if (!validProductIds.includes(parseInt(value, 10))) {
        throw new Error('Invalid Product ID');
      }
      return true;
    }),
  check('Quantity').isInt({ min: 0 }).withMessage('Quantity must be a positive integer')
    .custom(async (value, { req }) => {
      const ProductID = req.body.ProductID;

      // Assuming getProductQuantity returns a promise
      const maxQuantity = await getProductQuantity(ProductID);

      if (parseInt(value) > maxQuantity) {
        throw new Error(`Quantity must be more than or equal to ${maxQuantity}`);
      }

      return true;
    }),
];

module.exports = {
  addProductOrderValidation,
  updateProductOrderValidation,
};
