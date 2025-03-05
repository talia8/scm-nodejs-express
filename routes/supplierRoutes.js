const express = require('express');
const { getSupplierByNameController, getAllSuppliersController, addSupplierController, updateSupplierController, deleteSupplierController, getSupplierByIdController } = require('../controllers/supplierController');
const { addSupplierValidation, updateSupplierValidation } = require('../validations/supplierValidator');

const router = express.Router();

/**
 * @description Route to get all suppliers
 * @method GET
 * @endpoint /suppliers
 * @controller getAllSuppliersController - Controller for retrieving all suppliers
 */
router.get('/', getAllSuppliersController);

/**
 * @description Route to get a supplier by ID
 * @method POST
 * @endpoint /suppliers/supplier
 * @controller getSupplierByIdController - Controller for retrieving a supplier by ID
 */
router.post('/supplier', getSupplierByIdController);

router.post('/searchSupplier', getSupplierByNameController);

/**
 * @description Route to add a new supplier
 * @method POST
 * @endpoint /suppliers/addSupplier
 * @middleware addSupplierValidation - Validation middleware for adding a supplier
 * @controller addSupplierController - Controller for adding a new supplier
 */
router.post('/', addSupplierValidation, addSupplierController);

/**
 * @description Route to update an existing supplier
 * @method POST
 * @endpoint /suppliers/updateSupplier
 * @middleware updateSupplierValidation - Validation middleware for updating a supplier
 * @controller updateSupplierController - Controller for updating an existing supplier
 */
router.post('/update/:id', updateSupplierValidation, updateSupplierController);

/**
 * @description Route to delete a supplier by ID
 * @method DELETE
 * @endpoint /suppliers/deleteSupplier
 * @controller deleteSupplierController - Controller for deleting a supplier by ID
 */
router.post('/delete/:id', deleteSupplierController);

router.post('/searchSupplier', getSupplierByNameController);

module.exports = router;
