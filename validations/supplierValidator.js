/**
 * Validation middleware for supplier-related operations.
 * @module SupplierValidator
 * @requires module:express-validator
 * @requires module:../services/supplierService
 */

const { check } = require('express-validator');
const { getSupplierIdsArray } = require('../services/supplierService');

/**
 * @description Validation middleware for adding a supplier
 * @middleware addSupplierValidation
 * @checks - Check for non-empty SupplierName, valid PhoneNumber, and valid Email format.
 */
const addSupplierValidation = [
  check('SupplierName').notEmpty().withMessage('Supplier Name is required'),
  check('PhoneNumber').isInt().withMessage('Invalid Phone Number')
    .notEmpty().withMessage('Phone Number is required'),
  check('Email').isEmail().withMessage('Invalid Email Format'),
];

/**
 * @description Validation middleware for updating a supplier
 * @middleware updateSupplierValidation
 * @checks - Check for non-empty SupplierID, valid SupplierID, non-empty SupplierName, 
 * valid PhoneNumber, and valid Email format.
 */
const updateSupplierValidation = [
  check('SupplierID').notEmpty().withMessage('Supplier ID is required')
    .custom(async (value, { req }) => {
      const validSupplierIds = await getSupplierIdsArray();
      if (!validSupplierIds.includes(parseInt(value, 10))) {
        throw new Error('Invalid Supplier ID');
      }
      return true;
    }),
  check('SupplierName').notEmpty().withMessage('Supplier Name is required'),
  check('PhoneNumber').isInt().withMessage('Invalid Phone Number')
    .notEmpty().withMessage('Phone Number is required'),
  check('Email').isEmail().withMessage('Invalid Email Format'),
];

module.exports = {
  addSupplierValidation,
  updateSupplierValidation,
};
