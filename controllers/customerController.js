/**
 * Controller functions for handling customer-related HTTP requests.
 * @module CustomerController
 * @requires module:express-validator
 * @requires module:../services/customerService
 */

const { validationResult } = require('express-validator');
const {
  getCustomers,
  getCustomerById,
  addCustomer,
  updateCustomer,
  deleteCustomer,
} = require('../services/customerService');

/**
 * Retrieves details of all customers and sends a JSON response.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing details of all customers.
 */
const getAllCustomersController = async (req, res) => {
  try {
    const customers = await getCustomers();

    res.render('customer', { customers });
  } catch (error) {
    res.status(500).json({ message: `Failed to retrieve customers, ${error.message}` });
  }
};

/**
 * Retrieves details of a specific customer by ID and sends a JSON response.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing details of the specified customer.
 */
const getCustomerByIdController = async (req, res) => {
  const { CustomerID } = req.body;

  try {
    const customer = await getCustomerById(CustomerID);

    if (!customer) {
      return res.status(404).json({ message: `Error, ${error.message}` });
    }

    res.status(200).json({ customer });
  } catch (error) {
    res.status(500).json({ message: `Failed to retrieve customer by ID, ${error.message}` });
  }
};

/**
 * Adds a new customer and sends a JSON response.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing details of the newly added customer.
 */
const addCustomerController = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { CustomerName, PhoneNumber, CustomerAddress } = req.body;

  try {
    await addCustomer(CustomerName, PhoneNumber, CustomerAddress);

    res.redirect('/api/customers');
  } catch (error) {
    res.status(500).json({ message: `Customer wasn't added, ${error.message}` });
  }
};

/**
 * Updates the details of a specific customer and sends a JSON response.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing the result of the update operation.
 */
const updateCustomerController = async (req, res) => {
  const { CustomerName, PhoneNumber, CustomerAddress, CustomerID } = req.body;

  if (!CustomerID) {
    return res.status(400).json({ error: 'Missing data, update failed.' });
  }

  try {
    await updateCustomer(
      CustomerName,
      PhoneNumber,
      CustomerAddress,
      CustomerID
    );

    res.redirect('/api/customers');
  } catch (error) {
    res.status(500).json({ message: `Update failed, ${error.message}` });
  }
};

/**
 * Deletes a specific customer and sends a JSON response.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing the result of the delete operation.
 */
const deleteCustomerController = async (req, res) => {
  const { CustomerID } = req.body;

  if (!CustomerID) {
    return res.status(400).json({ message: `Delete failed, ${error.message}` });
  }

  try {
    await deleteCustomer(CustomerID);

    res.redirect('/api/customers');
  } catch (error) {
    res.status(500).json({ message: `Delete failed, ${error.message}` });
  }
};

// Export the controllers
module.exports = {
  getAllCustomersController,
  getCustomerByIdController,
  addCustomerController,
  updateCustomerController,
  deleteCustomerController,
};
