/**
 * Validation middleware for order-related operations.
 * @module OrderValidator
 * @requires module:express-validator
 * @requires module:../services/customerService
 * @requires module:../services/orderService
 */

const { check } = require('express-validator');
const { getCustomerIdsArray } = require('../services/customerService');

/**
 * @description Validation middleware for adding an order
 * @middleware addOrderValidation
 * @checks - Check for non-empty CustomerID and valid CustomerID
 */
const addOrderValidation = [
  check('CustomerID').notEmpty().withMessage('Customer ID is required.')
    .custom(async (value, { req }) => {
      const validCustomerIds = await getCustomerIdsArray();
      if (!validCustomerIds.includes(parseInt(value, 10))) {
        throw new Error('Invalid Customer ID.');
      }
      return true;
    }),
];

/**
 * @description Validation middleware for updating an order
 * @middleware updateOrderValidation
 * @checks - Check for valid OrderID, non-empty OrderID, non-empty CustomerID, 
 * valid CustomerID, valid OrderDate, and non-empty OrderDate
 */
const updateOrderValidation = [
  check('OrderID').isInt().withMessage('Invalid orderID.')
    .notEmpty().withMessage('Order ID is required.')
    .custom(async (value, { req }) => {
      const validOrderIds = await getOrderIdsArray();
      if (!validOrderIds.includes(parseInt(value, 10))) {
        throw new Error('Invalid Order ID.');
      }
      return true;
    }),
  check('CustomerID').notEmpty().withMessage('Customer ID is required.')
    .custom(async (value, { req }) => {
      const validCustomerIds = await getCustomerIdsArray();
      if (!validCustomerIds.includes(parseInt(value, 10))) {
        throw new Error('Invalid Customer ID.');
      }
      return true;
    }),
  check('OrderDate').isDate().withMessage('Invalid date format.')
    .notEmpty().withMessage('Order Date is required.'),
];

module.exports = {
  addOrderValidation,
  updateOrderValidation,
};
