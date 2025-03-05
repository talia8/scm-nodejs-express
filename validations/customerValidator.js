/**
 * Validation middleware for customer-related operations.
 * @module CustomerValidator
 * @requires module:express-validator
 * @requires module:../services/customerService
 */

const { check } = require('express-validator');
const { getCustomerIdsArray } = require('../services/customerService');

/**
 * @description Validation middleware for adding a customer
 * @middleware addCustomerValidation
 * @checks - Check for non-empty CustomerName and valid PhoneNumber
 */
const addCustomerValidation = [
  check('CustomerName').notEmpty().withMessage('Customer Name is required'),
  check('PhoneNumber').isInt().withMessage('Invalid Phone Number')
    .notEmpty().withMessage('Phone Number is required')
];

/**
 * @description Validation middleware for updating a customer
 * @middleware updateCustomerValidation
 * @checks - Check for non-empty CustomerID, valid CustomerID, non-empty CustomerName, and valid PhoneNumber
 */
const updateCustomerValidation = [
  check('CustomerID').notEmpty().withMessage('Customer ID is required')
    .custom(async (value, { req }) => {
      const validCustomerIds = await getCustomerIdsArray();
      if (!validCustomerIds.includes(parseInt(value, 10))) {
        throw new Error('Invalid Customer ID.');
      }
      return true;
    }),
  check('CustomerName').notEmpty().withMessage('Customer Name is required'),
  check('PhoneNumber').isInt().withMessage('Invalid Phone Number')
    .notEmpty().withMessage('Phone Number is required')
];

module.exports = {
  addCustomerValidation,
  updateCustomerValidation,
};
