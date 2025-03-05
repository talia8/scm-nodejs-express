/**
 * Controller functions for handling supplier-related HTTP requests.
 * @module SupplierController
 * @requires module:express-validator
 * @requires module:../services/supplierService
 */

const { validationResult } = require("express-validator");
const { getSupplierByName, getSuppliers, getSupplierById, addSupplier, updateSupplier, deleteSupplier } = require("../services/supplierService");

/**
 * Retrieves all suppliers and sends a JSON response.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing details of all suppliers.
 */
const getAllSuppliersController = async (req, res) => {
    try {
        const suppliers = await getSuppliers();
        res.render('supplier', { suppliers });
    } catch (error) {
        res.status(500).json({ message: `Failed to retrieve suppliers, ${error.message}` })
    }
};

/**
 * Retrieves details of a specific supplier by SupplierID and sends a JSON response.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing details of the specified supplier.
 */
const getSupplierByIdController = async (req, res) => {
    const { SupplierID } = req.body;
  
    try {
      const supplier = await getSupplierById(SupplierID);

      if (!supplier) {
        return res.status(404).json({ error:`Error, supplier not found` });
      }
  
      return { supplier };
    } catch (error) {
        return res.status(500).json({ message:`Failed to retrieve supplier by ID: ${error.message}` });
    }
};

/**
 * Retrieves details of a specific supplier by SupplierName and renders it in a page.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing details of the specified supplier.
 */
const getSupplierByNameController = async (req, res) => {
    const { SupplierName } = req.body;
  
    try {
      const suppliers = await getSupplierByName(SupplierName);

      if (!suppliers) {
        return res.status(404).json({ error:`Error, supplier not found` });
      }
  
      res.render('supplierSearch', { suppliers });
    } catch (error) {
        return res.status(500).json({ message:`Failed to retrieve supplier by Name: ${error.message}` });
    }
};
  
/**
 * Adds a new supplier and sends a JSON response.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing details of the added supplier.
 */
const addSupplierController = async (req, res) => {

    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { SupplierName, PhoneNumber, Email } = req.body;

    try {

        const addedSupplier = await addSupplier(SupplierName, PhoneNumber, Email);
        res.redirect('/api/suppliers');
    } catch (error) {
        res.status(500).json({ message: `Error, supplier wasn't added, ${error.message}` });
    }
};

/**
 * Updates details of a specific supplier and sends a JSON response.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing details of the updated supplier.
 */
const updateSupplierController = async (req, res) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { SupplierName, PhoneNumber, Email, SupplierID } = req.body;

    
    try {
        await updateSupplier(SupplierName, PhoneNumber, Email, SupplierID);
        res.redirect('/api/suppliers/');
       
    } catch (error) {
        res.status(500).json({ message: `Update failed: ${error.message}` });
    }
};

/**
 * Deletes a specific supplier by SupplierID and sends a JSON response.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing the result of the delete operation.
 */
const deleteSupplierController = async (req, res) => {
    const { SupplierID } = req.body;

    if(!SupplierID) {
        return res.status(400).json({ message: `Error, invalid supplier Id.` });
    }

    try {
        await deleteSupplier(SupplierID);
        res.redirect('/api/suppliers/');
    } catch(error){
        res.status(500).json({ message: `Delete failed, ${error.message}`});
    }
};

// Export the controllers
module.exports = {
    getAllSuppliersController,
    getSupplierByIdController,
    addSupplierController,
    updateSupplierController,
    deleteSupplierController,
    getSupplierByNameController
};
