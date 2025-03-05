const express = require('express');

const { 
  getAllProductsController, 
  addProductController, 
  updateProductController, 
  deleteProductController, 
  getProductByIdController, 
  getAllProductIdsController 
} = require('../controllers/productController');
const { addProductValidation, updateProductValidation } = require('../validations/ProductValidator');

const router = express.Router();

/**
 * @description Route to get all products
 * @method GET
 * @endpoint /products
 */
router.get('/', getAllProductsController);

/**
 * @description Route to get product by ID
 * @method POST
 * @endpoint /products/product
 */
router.post('/product', getProductByIdController);

/**
 * @description Route to add a new product with validation
 * @method POST
 * @endpoint /products/addProduct
 * @middleware addProductValidation - Validation middleware for adding a product
 */
router.post('/', addProductValidation, addProductController);

/**
 * @description Route to update a product with validation
 * @method POST
 * @endpoint /products/updateProduct
 * @middleware updateProductValidation - Validation middleware for updating a product
 */
router.post('/update/:id', updateProductValidation, updateProductController);

/**
 * @description Route to delete a product
 * @method DELETE
 * @endpoint /products/deleteProduct
 */
router.post('/delete/:id', deleteProductController);

/**
 * @description Route to get all product IDs
 * @method GET
 * @endpoint /products/prodIds
 */
router.get('/prodIds', getAllProductIdsController);

module.exports = router;
