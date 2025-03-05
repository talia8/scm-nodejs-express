/**
 * Service functions related to suppliers.
 * @module SupplierService
 * @requires module:../database/db
 */

const { query } = require("../database/db");

/**
 * Retrieves all suppliers from the database.
 * @function
 * @async
 * @returns {Promise<Array>} - An array containing details of all suppliers.
 * @throws {Error} - If an error occurs during the database operation.
 */
const getSuppliers = async() => {
    try{
        let sql = `select * from supplier`;
        const suppliers = await query(sql);
        return suppliers;
    }catch(error)
    {
        throw new Error(error);
    }
};

/**
 * Retrieves details of a specific supplier from the database.
 * @function
 * @async
 * @param {number} SupplierID - The ID of the supplier to retrieve details for.
 * @returns {Promise<Array>} - An array containing details of the specified supplier.
 * @throws {Error} - If an error occurs during the database operation.
 */
const getSupplierById = async (SupplierID) => {
    try {
        let sql = `SELECT * FROM supplier WHERE SupplierID = ?`;
        const supplier = await query(sql, [SupplierID]);

        return supplier;
    } catch (error) {
        throw new Error(error);
    }
};

const getSupplierByName = async (SupplierName) => {
    try {
        let sql = `SELECT * FROM supplier WHERE SupplierName LIKE ?`;
        const supplier = await query(sql, [`%${SupplierName}%`]);

        return supplier;
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Adds a new supplier to the database.
 * @function
 * @async
 * @param {string} SupplierName - The name of the supplier.
 * @param {string} PhoneNumber - The phone number of the supplier.
 * @param {string} Email - The email address of the supplier.
 * @returns {Promise<Array>} - An array containing details of the newly added supplier.
 * @throws {Error} - If an error occurs during the database operation.
 */
const addSupplier = async (SupplierName, PhoneNumber, Email) => {
    try {
        let sql = `INSERT INTO supplier 
    (SupplierName, PhoneNumber, Email) 
    VALUES (?, ?, ?);`;
        const result = await query(sql, [SupplierName, PhoneNumber, Email]);
        let addedSupplier = await query(`SELECT * FROM Supplier WHERE SupplierID = ?;`, [result?.insertId]);
        return addedSupplier;
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Updates the details of a specific supplier in the database.
 * @function
 * @async
 * @param {string} SupplierName - The updated name of the supplier.
 * @param {string} PhoneNumber - The updated phone number of the supplier.
 * @param {string} Email - The updated email address of the supplier.
 * @param {number} SupplierID - The ID of the supplier to update.
 * @returns {Promise<Array>} - An array containing the result of the update operation.
 * @throws {Error} - If an error occurs during the database operation.
 */
const updateSupplier = async (SupplierName, PhoneNumber, Email, SupplierID) => {
    try{
        let sql = `UPDATE supplier SET 
        SupplierName = ?,
        PhoneNumber = ?, 
        Email = ? 
        WHERE SupplierID = ?;`;

        const result = await query(sql, [SupplierName, PhoneNumber, Email, SupplierID]);
    
        return result;
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Deletes a specific supplier from the database.
 * @function
 * @async
 * @param {number} SupplierID - The ID of the supplier to delete.
 * @returns {Promise<Array>} - An array containing the result of the delete operation.
 * @throws {Error} - If an error occurs during the database operation.
 */
const deleteSupplier = async(SupplierID) =>{
    try{
        return await query("DELETE FROM supplier WHERE SupplierID = ?", [SupplierID]);

    }catch(error){
        throw new Error(error);
    }
};

/**
 * Retrieves all supplier IDs from the database.
 * @function
 * @async
 * @returns {Promise<Array>} - An array containing all supplier IDs.
 * @throws {Error} - If an error occurs during the database operation.
 */
const getAllSupplierIds = async () => {
    try {
      return await query('SELECT SupplierID FROM supplier');
    } catch (error) {
      throw new Error(error);
    }
};

/**
 * Retrieves an array of all supplier IDs from the database.
 * @function
 * @async
 * @returns {Promise<Array>} - An array containing all supplier IDs.
 * @throws {Error} - If an error occurs during the database operation.
 */
const getSupplierIdsArray = async () => {
    try {
      const SupplierIdsResultSet = await getAllSupplierIds();
      
      // Extracting the SupplierID values into an array of integers
      const SupplierIdsArray = SupplierIdsResultSet.map(row => row.SupplierID);
  
      return SupplierIdsArray;
    } catch (error) {
      throw new Error(error);
    }
};

// Export the services
module.exports = {
    getSuppliers,
    getSupplierById,
    addSupplier,
    updateSupplier,
    deleteSupplier,
    getSupplierIdsArray,
    getSupplierByName
}
