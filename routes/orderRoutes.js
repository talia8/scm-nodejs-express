const express = require('express');
const { 
  getAllOrdersController, 
  addOrderController, 
  updateOrderController, 
  deleteOrderController, 
  getOrderByIdController 
} = require('../controllers/orderController');
const { addOrderValidation, updateOrderValidation } = require('../validations/orderValidator');

const router = express.Router();

/**
 * @description Route to get all orders
 * @method GET
 * @endpoint /orders/allOrders
 */
router.get('/', getAllOrdersController);

/**
 * @description Route to get order by ID
 * @method POST
 * @endpoint /orders/order
 */
router.post('/order', getOrderByIdController);

/**
 * @description Route to add a new order with validation
 * @method POST
 * @endpoint /orders/addOrder
 * @middleware addOrderValidation - Validation middleware for adding an order
 */
router.post('/', addOrderValidation, addOrderController);

/**
 * @description Route to update an order with validation
 * @method POST
 * @endpoint /orders/updateOrder
 * @middleware updateOrderValidation - Validation middleware for updating an order
 */
router.post('/update/:id', updateOrderValidation, updateOrderController);

/**
 * @description Route to delete an order
 * @method DELETE
 * @endpoint /orders/deleteOrder
 */
router.delete('/delete/:id', deleteOrderController);

module.exports = router;
