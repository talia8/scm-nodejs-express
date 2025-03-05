const express = require('express');

const { 
  getAllProductOrdersController, 
  addProductOrderController, 
  updateProductOrderController, 
  deleteProductOrderController, 
  getProductOrderByIdController 
} = require('../controllers/productOrderController');
const { addProductOrderValidation, updateProductOrderValidation } = require('../validations/productOrderValidator');

const router = express.Router();

/**
 * @description Route to get all product orders
 * @method GET
 * @endpoint /productOrders/allProductOrders
 */
router.get('/', getAllProductOrdersController);

/**
 * @description Route to get product order by ID
 * @method POST
 * @endpoint /productOrders/productOrder
 */
router.post('/productOrder', getProductOrderByIdController);

/**
 * @description Route to add a new product order with validation
 * @method POST
 * @endpoint /productOrders/addProductOrder
 * @middleware addProductOrderValidation - Validation middleware for adding a product order
 */
router.post('/', addProductOrderValidation, addProductOrderController);

/**
 * @description Route to update a product order with validation
 * @method POST
 * @endpoint /productOrders/updateProductOrder
 * @middleware updateProductOrderValidation - Validation middleware for updating a product order
 */
router.post('/update/:id', updateProductOrderValidation, updateProductOrderController);

/**
 * @description Route to delete a product order
 * @method DELETE
 * @endpoint /productOrders/deleteProductOrder
 */
router.delete('/delete/:id', deleteProductOrderController);

module.exports = router;
