/**
 * Validation middleware for product-related operations.
 * @module ProductValidator
 * @requires module:express-validator
 * @requires module:../services/productService
 */

const { check } = require('express-validator');
const { getProductIdsArray } = require('../services/productService');

/**
 * @description Validation middleware for adding a product
 * @middleware addProductValidation
 * @checks - Check for non-empty ProductName, positive Quantity, non-empty ExpiryDate with valid date format (YYYY-MM-DD), and non-empty PricePerUnit and CostPerUnit as decimal numbers.
 */
const addProductValidation = [
  check('ProductName').notEmpty().withMessage('Product Name is required'),
  check('Quantity').isInt({ min: 0 }).withMessage('Quantity must be a positive integer'),
  check('ExpiryDate').notEmpty().withMessage('Expiry Date is required'),
  check('ExpiryDate').isDate().withMessage('Invalid date. correct format: YYYY-MM-DD'),
  check('PricePerUnit').isDecimal().withMessage('Price Per Unit must be a decimal number')
    .notEmpty().withMessage('Price Per Unit is required'),
  check('CostPerUnit').isDecimal().withMessage('Cost Per Unit must be a decimal number')
    .notEmpty().withMessage('Cost Per Unit is required'),
];

/**
 * @description Validation middleware for updating a product
 * @middleware updateProductValidation
 * @checks - Check for non-empty ProductID, valid ProductID, non-empty ProductName, 
 * positive Quantity, non-empty ExpiryDate with valid date format (YYYY-MM-DD), 
 * and non-empty PricePerUnit and CostPerUnit as decimal numbers.
 */
const updateProductValidation = [
  check('ProductID').notEmpty().withMessage('Product ID is required')
    .custom(async (value, { req }) => {
      const validProductIds = await getProductIdsArray();
      if (!validProductIds.includes(parseInt(value, 10))) {
        throw new Error('Invalid Product ID');
      }
      return true;
    }),
  check('ProductName').notEmpty().withMessage('Product Name is required'),
  check('Quantity').isInt({ min: 0 }).withMessage('Quantity must be a positive integer'),
  check('ExpiryDate').notEmpty().withMessage('Expiry Date is required'),
  check('ExpiryDate').isDate().withMessage('Invalid date. correct format: YYYY-MM-DD'),
  check('PricePerUnit').isDecimal().withMessage('Price Per Unit must be a decimal number')
    .notEmpty().withMessage('Price Per Unit is required'),
  check('CostPerUnit').isDecimal().withMessage('Cost Per Unit must be a decimal number')
    .notEmpty().withMessage('Cost Per Unit is required'),
];

module.exports = {
  addProductValidation,
  updateProductValidation,
};
