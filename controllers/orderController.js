/**
 * Controller functions for handling order-related HTTP requests.
 * @module OrderController
 * @requires module:express-validator
 * @requires module:../services/orderService
 */

const { validationResult } = require('express-validator');
const {
  getOrders,
  getOrderById,
  addOrder,
  updateOrder,
  deleteOrder,
} = require('../services/orderService');
const moment = require('moment');

/**
 * Retrieves details of all orders and sends a JSON response.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing details of all orders.
 */
const getAllOrdersController = async (req, res) => {
  try {
    const orders = await getOrders();

    res.render('order', { orders });
  } catch (error) {
    res.status(500).json({ message: `Failed to retrieve orders, ${error.message}` });
  }
};

/**
 * Retrieves details of a specific order by ID and sends a JSON response.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing details of the specified order.
 */
const getOrderByIdController = async (req, res) => {
  const { OrderID } = req.body;

  try {
    const order = await getOrderById(OrderID);

    if (!order) {
      return res.status(404).json({ message: `Error, ${error.message}` });
    }

    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ message: `Failed to retrieve order by ID, ${error.message}` });
  }
};

/**
 * Adds a new order and sends a JSON response.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing details of the newly added order.
 */
const addOrderController = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { CustomerID } = req.body;

  try {
    await addOrder(CustomerID);

    res.redirect('/api/orders/');
  } catch (error) {
    res.status(500).json({ message: `Order wasn't added, ${error.message}` });
  }
};

/**
 * Updates the details of a specific order and sends a JSON response.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing the result of the update operation.
 */
const updateOrderController = async (req, res) => {
  const { CustomerID, OrderDate, OrderID } = req.body;

  if (!OrderID) {
    return res.status(400).json({ message: `Error, ${error.message}` });
  }

  try {
    await updateOrder(CustomerID, OrderDate.format('YYYY-MM-DD'), OrderID);
    
    res.redirect('/api/orders/');
  } catch (error) {
    res.status(500).json({ message: `Update failed, ${error.message}` });
  }
};

/**
 * Deletes a specific order and sends a JSON response.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing the result of the delete operation.
 */
const deleteOrderController = async (req, res) => {
  const { OrderID } = req.body;

  if (!OrderID) {
    return res.status(400).json({ message: `Error, ${error.message}` });
  }

  try {
    await deleteOrder(OrderID);

    res.redirect('/api/orders/');
  } catch (error) {
    res.status(500).json({ message: `Delete failed, ${error.message}` });
  }
};

// Export the controllers
module.exports = {
  getAllOrdersController,
  getOrderByIdController,
  addOrderController,
  updateOrderController,
  deleteOrderController,
};
