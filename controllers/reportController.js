/**
 * Controller functions for handling report-related HTTP requests.
 * @module ReportController
 * @requires module:express-validator
 * @requires module:../services/reportService
 */

const { validationResult } = require('express-validator');
const {
    getOrdersByProductId,
    getProductOrdersByCustomerId,
    getOrderDetails,
    getProductYearlyOrders,
    getProductYearlySales,
    getProductYearlyProfit,
    getCustomerYearlyOrders,
    getOrderTotal,
    getBill
} = require('../services/reportService');

/**
 * Retrieves details of orders by a specific product ID and sends a JSON response.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing details of orders by the specified product ID.
 */
const getOrdersByProductIdController = async(req, res) => {
    const {ProductID} = req.body;

    try {
        const orders = await getOrdersByProductId(ProductID);
    
        res.render('prodIdOrders', { orders });
      } catch (error) {
        res.status(500).json({ message:`Error, ${error.message}` });
    }
};

/**
 * Retrieves details of product orders by a specific customer ID and sends a JSON response.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing details of product orders by the specified customer ID.
 */
const getProductOrdersByCustomerIdController = async(req, res) => {
    const {CustomerID} = req.body;

    try {
        const orders = await getProductOrdersByCustomerId(CustomerID);
    
        res.status(200).json({ orders });
      } catch (error) {
        res.status(500).json({ message:`Error, ${error.message}` });
    }
};

/**
 * Retrieves details of a specific order by OrderID and sends a JSON response.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing details of the specified order.
 */
const getOrderDetailsController = async(req, res) => {
    const {OrderID} = req.body;

    try {
        const orderDetails = await getOrderDetails(OrderID);
    
        res.status(200).json({ orderDetails });
      } catch (error) {
        res.status(500).json({ message:`Error, ${error.message}` });
    }
};

/**
 * Retrieves yearly orders of a specific product and sends a JSON response.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing yearly orders of the specified product.
 */
const getProductYearlyOrdersController = async(req, res) => {
    const {ProductID, year} = req.body;

    try {
        const yearlyOrders = await getProductYearlyOrders(ProductID, year);
    
        res.status(200).json({ yearlyOrders });
      } catch (error) {
        res.status(500).json({ message:`Error, ${error.message}` });
    }
};

/**
 * Retrieves yearly sales of a specific product and sends a JSON response.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing yearly sales of the specified product.
 */
const getProductYearlySalesController = async(req, res) => {
    const {ProductID, year} = req.body;

    try {
        const yearlySales = await getProductYearlySales(ProductID, year);
    
        res.status(200).json({ yearlySales });
      } catch (error) {
        res.status(500).json({ message:`Error, ${error.message}` });
    }
};

/**
 * Retrieves yearly profit of a specific product and sends a JSON response.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing yearly profit of the specified product.
 */
const getProductYearlyProfitController = async(req, res) => {
    const {ProductID, year} = req.body;

    try {
        const yearlyProfit = await getProductYearlyProfit(ProductID, year);
    
        res.status(200).json({ yearlyProfit });
      } catch (error) {
        res.status(500).json({ message:`Error, ${error.message}` });
    }
};

/**
 * Retrieves yearly orders of a specific customer and sends a JSON response.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing yearly orders of the specified customer.
 */
const getCustomerYearlyOrdersController = async(req, res) => {
    const {CustomerID, year} = req.body;

    try {
        const yearlyOrders = await getCustomerYearlyOrders(CustomerID, year);
    
        res.status(200).json({ yearlyOrders });
      } catch (error) {
        res.status(500).json({ message:`Error, ${error.message}` });
    }
};

/**
 * Retrieves the total price of a specific order and sends a JSON response.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing the total price of the specified order.
 */
const getOrderTotalController = async(req, res) => {
    const {OrderID} = req.body;

    try {
        const total = await getOrderTotal(OrderID);
    
        res.status(200).json({ total });
      } catch (error) {
        res.status(500).json({ message:`Error, ${error.message}` });
    }
};

/**
 * Retrieves the bill details of a specific order and sends a JSON response.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing the bill details of the specified order.
 */
const getBillController = async(req, res) => {
    const { OrderID } = req.body;

    try {
        const bill = await getBill(OrderID);
    
        res.status(200).json({ bill });
      } catch (error) {
        res.status(500).json({ message:`Error, ${error.message}` });
    }
};

// Export the controllers
module.exports = {
    getOrdersByProductIdController,
    getProductOrdersByCustomerIdController,
    getOrderDetailsController,
    getProductYearlyOrdersController,
    getProductYearlySalesController,
    getProductYearlyProfitController,
    getCustomerYearlyOrdersController,
    getOrderTotalController,
    getBillController
};
