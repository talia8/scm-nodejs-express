/**
 * Controller functions for handling product order-related HTTP requests.
 * @module ProductOrderController
 * @requires module:express-validator
 * @requires module:../services/productOrderService
 */

const { validationResult } = require('express-validator');
const {
  getProductOrders,
  getProductOrderById,
  addProductOrder,
  updateProductOrder,
  deleteProductOrder
} = require('../services/productOrderService');

/**
 * Retrieves details of all product orders and sends a JSON response.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing details of all product orders.
 */
const getAllProductOrdersController = async (req, res) => {
    try {
        const productorders = await getProductOrders();
    
        res.render('productorder', { productorders });
    } catch (error) {
        res.status(500).json({ message: `Failed to retrieve product orders, ${error.message}` });
    }
};

/**
 * Retrieves details of a specific product order by OrderID and ProductID and sends a JSON response.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing details of the specified product order.
 */
const getProductOrderByIdController = async (req, res) => {
    const { OrderID, ProductID } = req.body;
    try{
        const productOrder = await getProductOrderById(OrderID, ProductID);

        res.status(200).json({ productOrder });
    } catch(error){
        res.status(500).json({message:`Failed to retrieve product order, ${error.message}` })
    }
};

/**
 * Adds a new product order and sends a JSON response.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing details of the newly added product order.
 */
const addProductOrderController = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {OrderID, ProductID, Quantity} = req.body;

    try{
        await addProductOrder(OrderID, ProductID, Quantity);
        
        res.redirect('/api/productOrders');
    } catch(error){
        res.status(500).json({message: `Failed to add product order, ${error.message}`});
    }
};

/**
 * Updates the details of a specific product order and sends a JSON response.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing the result of the update operation.
 */
const updateProductOrderController = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {Quantity, OrderID, ProductID, productOrderID} = req.body;

    try{
        await updateProductOrder(Quantity, OrderID, ProductID, productOrderID);
        res.redirect('/api/productOrders');
    } catch(error){
        res.status(500).json({message: `Update failed, ${error.message}`});
    }
};

/**
 * Deletes a specific product order and sends a JSON response.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing the result of the delete operation.
 */
const deleteProductOrderController = async (req, res) => {
    const {productOrderID} = req.body;

    try{
        await deleteProductOrder(productOrderID);
        res.redirect('/api/productOrders');
    } catch(error){
        res.status(500).json({message: `Delete failed, ${error.message}`});
    }

};

// Export the controllers
module.exports = {
    getAllProductOrdersController,
    getProductOrderByIdController,
    addProductOrderController,
    updateProductOrderController,
    deleteProductOrderController
};
