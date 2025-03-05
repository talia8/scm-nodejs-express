const express = require('express');
const { 
  getAllCustomersController, 
  addCustomerController, 
  updateCustomerController, 
  deleteCustomerController, 
  getCustomerByIdController 
} = require('../controllers/customerController');
const { addCustomerValidation, updateCustomerValidation } = require('../validations/customerValidator');

const router = express.Router();

/**
 * @description Route to get all customers
 * @method GET
 * @endpoint /customers
 */
router.get('/', getAllCustomersController);

/**
 * @description Route to get customer by ID
 * @method POST
 * @endpoint /customers/customer
 */
router.post('/customer', getCustomerByIdController);

/**
 * @description Route to add a new customer with validation
 * @method POST
 * @endpoint /customers/addCustomer
 * @middleware addCustomerValidation - Validation middleware for adding a customer
 */
router.post('/', addCustomerValidation, addCustomerController);

/**
 * @description Route to update customer with validation
 * @method POST
 * @endpoint /customers/updateCustomer
 * @middleware updateCustomerValidation - Validation middleware for updating a customer
 */
router.post('/update/:id', updateCustomerValidation, updateCustomerController);

/**
 * @description Route to delete a customer
 * @method DELETE
 * @endpoint /customers/deleteCustomer
 */
router.post('/delete/:id', deleteCustomerController);

module.exports = router;
