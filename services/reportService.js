/**
 * Service functions related to reports and order details.
 * @module reportService
 * @requires module:../database/db
 */

const { query } = require('../database/db');

/**
 * Retrieves all product orders for a specific product from the database.
 * @function
 * @async
 * @param {number} ProductID - The ID of the product to retrieve orders for.
 * @returns {Promise<Array>} - An array containing details of all product orders for the specified product.
 * @throws {Error} - If an error occurs during the database operation.
 */
const getOrdersByProductId = async (ProductID) => {
    try {
      let sql = `SELECT * FROM productOrder
      WHERE ProductID = ? 
      ORDER BY ProductID`;
  
      const productOrders = await query(sql, [ProductID]);
  
      return productOrders;
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Retrieves all product orders for a specific customer from the database.
 * @function
 * @async
 * @param {number} CustomerID - The ID of the customer to retrieve orders for.
 * @returns {Promise<Array>} - An array containing details of all product orders for the specified customer.
 * @throws {Error} - If an error occurs during the database operation.
 */
const getProductOrdersByCustomerId = async (CustomerID) => {
    try{
        let sql = `SELECT * FROM
        productOrder JOIN orders ON productOrder.OrderID = orders.OrderID
        WHERE orders.CustomerID = ?
        ORDER BY productorder.OrderID`;

        const CustomerProductOrders = await query(sql, [CustomerID]);

        return CustomerProductOrders;
    } catch (error){
        throw new Error(error);
    }
};

/**
 * Retrieves details of product orders for a specific order from the database.
 * @function
 * @async
 * @param {number} OrderID - The ID of the order to retrieve details for.
 * @returns {Promise<Array>} - An array containing details of all product orders for the specified order.
 * @throws {Error} - If an error occurs during the database operation.
 */
const getOrderDetails = async(OrderID) => {
    try{
        let sql = `SELECT * FROM productOrder
        WHERE OrderID = ?`;

        const orderDetails = await query(sql, [OrderID]);

        return orderDetails;
    } catch (error){
        throw new Error(error);
    }
};

/**
 * Retrieves the total quantity of a specific product ordered in a given year.
 * @function
 * @async
 * @param {number} ProductID - The ID of the product.
 * @param {number} year - The year for which to retrieve the total quantity.
 * @returns {Promise<Array>} - An array containing the total quantity ordered for the specified product in the given year.
 * @throws {Error} - If an error occurs during the database operation.
 */
const getProductYearlyOrders = async(ProductID, year) => {
    try{
        let sql = `SELECT SUM(productorder.Quantity) AS totalQuantityOrdered
        FROM productorder
        JOIN orders ON productorder.OrderID = orders.OrderID
        WHERE productorder.ProductID = ?
        AND YEAR(orders.OrderDate) = ?`;

        const totalQuantity = await query(sql, [ProductID, year]);

        return totalQuantity;
    } catch (error){
        throw new Error(error);
    }
    
};

/**
 * Retrieves the total sales revenue of a specific product in a given year.
 * @function
 * @async
 * @param {number} ProductID - The ID of the product.
 * @param {number} year - The year for which to retrieve the total sales revenue.
 * @returns {Promise<Array>} - An array containing the total sales revenue for the specified product in the given year.
 * @throws {Error} - If an error occurs during the database operation.
 */
const getProductYearlySales = async(ProductID, year) => {
    try{
        let sql = `SELECT SUM(product.PricePerUnit * productorder.Quantity) AS totalSalesRevenue
        FROM productorder 
        JOIN product ON productorder.ProductID = product.ProductID
        JOIN orders ON productorder.OrderID = orders.OrderID
        WHERE productorder.ProductID = ?
        AND YEAR(orders.OrderDate) = ?`;

        const yearlySales = await query(sql, [ProductID, year]);

        return yearlySales;
    } catch (error){
        throw new Error(error);
    }
};

/**
 * Retrieves the total profit of a specific product in a given year.
 * @function
 * @async
 * @param {number} ProductID - The ID of the product.
 * @param {number} year - The year for which to retrieve the total profit.
 * @returns {Promise<Array>} - An array containing the total profit for the specified product in the given year.
 * @throws {Error} - If an error occurs during the database operation.
 */
const getProductYearlyProfit = async(ProductID, year) => {
    try{
        let sql = `SELECT SUM((product.PricePerUnit - product.CostPerUnit) * productorder.Quantity) AS totalProfit
        FROM productorder 
        JOIN product ON productorder.ProductID = product.ProductID
        JOIN orders ON productorder.OrderID = orders.OrderID
        WHERE productorder.ProductID = ?
        AND YEAR(orders.OrderDate) = ?`;

        const yearlyProfit = await query(sql, [ProductID, year]);

        return yearlyProfit;
    } catch (error){
        throw new Error(error);
    }
};

/*
const getMostProfitableProduct = async(year) =>{
    try{
        let sql = `SELECT SUM((product.PricePerUnit - product.CostPerUnit) * productorder.Quantity) AS totalProfit
        FROM productorder 
        JOIN product ON productorder.ProductID = product.ProductID
        JOIN orders ON productorder.OrderID = orders.OrderID
        WHERE YEAR(orders.OrderDate) = ?
        ORDER BY product.ProductID DESC`;

        const mostProfitable = await query(sql, [year]);

        return mostProfitable[0];
    }
}*/

/**
 * Retrieves all orders placed by a specific customer in a given year.
 * @function
 * @async
 * @param {number} CustomerID - The ID of the customer.
 * @param {number} year - The year for which to retrieve the orders.
 * @returns {Promise<Array>} - An array containing details of all orders placed by the specified customer in the given year.
 * @throws {Error} - If an error occurs during the database operation.
 */
const getCustomerYearlyOrders = async(CustomerID, year) => {
    try{
        let sql = `SELECT *
    FROM productorder 
    JOIN orders ON orders.OrderID = productorder.OrderID
    WHERE orders.CustomerID = ?
    AND YEAR(orders.OrderDate) = ?`;

        const yearlyOrders = await query(sql, [CustomerID, year]);

        return yearlyOrders;
    } catch (error){
        throw new Error(error);
    }
};

/**
 * Retrieves the total cost of a specific order.
 * @function
 * @async
 * @param {number} OrderID - The ID of the order.
 * @returns {Promise<Array>} - An array containing the total cost of the specified order.
 * @throws {Error} - If an error occurs during the database operation.
 */
const getOrderTotal = async(OrderID) => {
    try{
        let sql = `SELECT SUM(product.PricePerUnit * productorder.Quantity) AS TOTAL
        FROM product JOIN productorder ON product.ProductID = productorder.ProductID
        WHERE productorder.OrderID = ?`;

        const total = await query(sql, [OrderID]);
        
        return total;
    }catch(error){
        throw new Error(error);
    }
};

/**
 * Retrieves the bill details for a specific order, including product details and total cost.
 * @function
 * @async
 * @param {number} OrderID - The ID of the order.
 * @returns {Promise<Array>} - An array containing details of the bill for the specified order, including product details and total cost.
 * @throws {Error} - If an error occurs during the database operation.
 */
const getBill = async(OrderID) => {
    try{
        let sql = `SELECT 
        orders.OrderID, 
        productorder.ProductID, 
        productorder.Quantity, 
        (product.PricePerUnit * productorder.Quantity) AS totalPrice
        FROM orders 
        JOIN productorder ON orders.OrderID = productorder.OrderID
        JOIN product ON productorder.ProductID = product.ProductID
        WHERE orders.OrderID = ?`;

        const bill = await query(sql, [OrderID]);

        const total = await getOrderTotal(OrderID);
        
        return bill, total;
    }catch(error){
        throw new Error(error);
    }
};

// Export the services
module.exports = {
  getOrdersByProductId,
  getProductOrdersByCustomerId,
  getOrderDetails,
  getProductYearlyOrders,
  getProductYearlySales,
  getProductYearlyProfit,
  getCustomerYearlyOrders,
  getOrderTotal,
  getBill
};
