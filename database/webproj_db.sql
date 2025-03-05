-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema webproj_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema webproj_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `webproj_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `webproj_db` ;

-- -----------------------------------------------------
-- Table `webproj_db`.`customer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `webproj_db`.`customer` (
  `CustomerID` INT NOT NULL AUTO_INCREMENT,
  `CustomerName` VARCHAR(45) NOT NULL,
  `PhoneNumber` INT NOT NULL,
  `CustomerAddress` VARCHAR(145) NULL DEFAULT NULL,
  PRIMARY KEY (`CustomerID`),
  UNIQUE INDEX `CustomerID_UNIQUE` (`CustomerID` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `webproj_db`.`orders`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `webproj_db`.`orders` (
  `OrderID` INT NOT NULL AUTO_INCREMENT,
  `CustomerID` INT NOT NULL,
  `OrderDate` DATE NOT NULL,
  PRIMARY KEY (`OrderID`),
  INDEX `CustomerID_idx` (`CustomerID` ASC) VISIBLE,
  CONSTRAINT `CustomerID`
    FOREIGN KEY (`CustomerID`)
    REFERENCES `webproj_db`.`customer` (`CustomerID`)
    ON DELETE RESTRICT)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `webproj_db`.`product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `webproj_db`.`product` (
  `ProductID` INT NOT NULL AUTO_INCREMENT,
  `ProductName` VARCHAR(45) NOT NULL,
  `Quantity` INT NOT NULL,
  `ExpiryDate` DATE NOT NULL,
  `PricePerUnit` DECIMAL(10,2) NOT NULL,
  `CostPerUnit` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`ProductID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `webproj_db`.`productorder`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `webproj_db`.`productorder` (
  `ProductOrderID` INT NOT NULL AUTO_INCREMENT,
  `ProductID` INT NOT NULL,
  `OrderID` INT NOT NULL,
  `Quantity` INT NOT NULL,
  PRIMARY KEY (`ProductOrderID`),
  INDEX `ProductID_idx` (`ProductID` ASC) VISIBLE,
  INDEX `OrderID_idx` (`OrderID` ASC) VISIBLE,
  CONSTRAINT `OrderID`
    FOREIGN KEY (`OrderID`)
    REFERENCES `webproj_db`.`orders` (`OrderID`)
    ON DELETE RESTRICT,
  CONSTRAINT `ProductID`
    FOREIGN KEY (`ProductID`)
    REFERENCES `webproj_db`.`product` (`ProductID`)
    ON DELETE RESTRICT)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `webproj_db`.`supplier`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `webproj_db`.`supplier` (
  `SupplierID` INT NOT NULL AUTO_INCREMENT,
  `SupplierName` VARCHAR(45) NOT NULL,
  `PhoneNumber` INT NOT NULL,
  `Email` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`SupplierID`),
  UNIQUE INDEX `SupplierID_UNIQUE` (`SupplierID` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
