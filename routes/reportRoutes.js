const express = require('express');
const {
    getOrdersByProductIdController,
    getProductOrdersByCustomerIdController,
    getOrderDetailsController,
    getProductYearlyOrdersController,
    getProductYearlySalesController,
    getProductYearlyProfitController,
    getCustomerYearlyOrdersController,
    getOrderTotalController,
    getBillController
} = require('../controllers/reportController');

const router = express.Router();

/**
 * @description Route to get orders by product ID
 * @method POST
 * @endpoint /reports/prodIdOrders
 * @controller getOrdersByProductIdController - Controller for retrieving orders by product ID
 */
router.post('/prodIdOrders', getOrdersByProductIdController);

/**
 * @description Route to get product orders by customer ID
 * @method POST
 * @endpoint /reports/customerOrders
 * @controller getProductOrdersByCustomerIdController - Controller for retrieving product orders by customer ID
 */
router.post('/customerOrders', getProductOrdersByCustomerIdController);

/**
 * @description Route to get order details by order ID
 * @method POST
 * @endpoint /reports/orderDetails
 * @controller getOrderDetailsController - Controller for retrieving order details by order ID
 */
router.post('/orderDetails', getOrderDetailsController);

/**
 * @description Route to get yearly orders for a product
 * @method POST
 * @endpoint /reports/prodYearlyOrders
 * @controller getProductYearlyOrdersController - Controller for retrieving yearly orders for a product
 */
router.post('/prodYearlyOrders', getProductYearlyOrdersController);

/**
 * @description Route to get yearly sales for a product
 * @method POST
 * @endpoint /reports/prodYearlySales
 * @controller getProductYearlySalesController - Controller for retrieving yearly sales for a product
 */
router.post('/prodYearlySales', getProductYearlySalesController);

/**
 * @description Route to get yearly profit for a product
 * @method POST
 * @endpoint /reports/prodYearlyProfit
 * @controller getProductYearlyProfitController - Controller for retrieving yearly profit for a product
 */
router.post('/prodYearlyProfit', getProductYearlyProfitController);

/**
 * @description Route to get yearly orders for a customer
 * @method POST
 * @endpoint /reports/customerYearlyOrders
 * @controller getCustomerYearlyOrdersController - Controller for retrieving yearly orders for a customer
 */
router.post('/customerYearlyOrders', getCustomerYearlyOrdersController);

/**
 * @description Route to get total cost of an order
 * @method POST
 * @endpoint /reports/orderTotal
 * @controller getOrderTotalController - Controller for retrieving total cost of an order
 */
router.post('/orderTotal', getOrderTotalController);

/**
 * @description Route to get bill details for an order
 * @method POST
 * @endpoint /reports/bills
 * @controller getBillController - Controller for retrieving bill details for an order
 */
router.post('/bills', getBillController);

module.exports = router;
