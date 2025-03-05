# Supply Chain Management System

This System is designed to streamline supply chain operations, providing a comprehensive solution for businesses to manage various components of their supply chain. It leverages Node.js and Express for the server-side logic and MySQL as the database to store and retrieve relevant information.

## Table of Contents
- [Supply Chain Management System](#supply-chain-management-system)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Database Setup](#database-setup)
  - [Project Structure](#project-structure)
  - [API Endpoints](#api-endpoints)

## Installation
```bash
# Install dependencies:
cd scm-system
npm install
```
## Usage
```bash
# Start the server:
nodemon index.js
```
Access the SCM system in your web browser at http://localhost:3001.

## Database Setup
1. Open your MySQL Workbench.
2. Run the schema.sql script provided in the database folder to set up the database schema.
3. Adjust the database connection configuration in .env if needed.
   
## Project Structure
- src/: Contains the main source code.
- database/: Contains database-related scripts.

## API Endpoints
- /api/customers: Manage customers.
- /api/suppliers: Manage suppliers.
- /api/products: Manage products.
- /api/orders: Manage orders.
- /api/reports: Generate reports.
