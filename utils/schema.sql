-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema diablotins
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema diablotins
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `diablotins` DEFAULT CHARACTER SET utf8 ;
USE `diablotins` ;

-- -----------------------------------------------------
-- Table `diablotins`.`brand`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `diablotins`.`brand` ;

CREATE TABLE IF NOT EXISTS `diablotins`.`brand` (
  `id_brand` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(120) NULL,
  PRIMARY KEY (`id_brand`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC))
  ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `diablotins`.`shoe`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `diablotins`.`shoe` ;

CREATE TABLE IF NOT EXISTS `diablotins`.`shoe` (
  `shoe_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `brand_id_brand` INT NOT NULL,
  PRIMARY KEY (`shoe_id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC),
  INDEX `fk_shoe_brand_idx` (`brand_id_brand` ASC),
  CONSTRAINT `fk_shoe_brand`
  FOREIGN KEY (`brand_id_brand`)
  REFERENCES `diablotins`.`brand` (`id_brand`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
  ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `diablotins`.`color`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `diablotins`.`color` ;

CREATE TABLE IF NOT EXISTS `diablotins`.`color` (
  `color_id` INT NOT NULL AUTO_INCREMENT,
  `value` VARCHAR(45) NULL,
  PRIMARY KEY (`color_id`),
  UNIQUE INDEX `name_UNIQUE` (`value` ASC))
  ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `diablotins`.`size`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `diablotins`.`size` ;

CREATE TABLE IF NOT EXISTS `diablotins`.`size` (
  `size_id` INT NOT NULL AUTO_INCREMENT,
  `value` VARCHAR(45) NULL,
  PRIMARY KEY (`size_id`),
  UNIQUE INDEX `value_UNIQUE` (`value` ASC))
  ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `diablotins`.`category`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `diablotins`.`category` ;

CREATE TABLE IF NOT EXISTS `diablotins`.`category` (
  `category_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC))
  ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `diablotins`.`shoe_categories`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `diablotins`.`shoe_categories` ;

CREATE TABLE IF NOT EXISTS `diablotins`.`shoe_categories` (
  `category_category_id` INT NOT NULL,
  `shoe_shoe_id` INT NOT NULL,
  INDEX `fk_shoe_categories_category_idx` (`category_category_id` ASC),
  INDEX `fk_shoe_categories_shoe_idx` (`shoe_shoe_id` ASC),
  CONSTRAINT `fk_shoe_categories_category`
  FOREIGN KEY (`category_category_id`)
  REFERENCES `diablotins`.`category` (`category_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_shoe_categories_shoe`
  FOREIGN KEY (`shoe_shoe_id`)
  REFERENCES `diablotins`.`shoe` (`shoe_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
  ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `diablotins`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `diablotins`.`user` ;

CREATE TABLE IF NOT EXISTS `diablotins`.`user` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `password` VARCHAR(128) NULL,
  `is_admin` TINYINT(1) NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC))
  ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `diablotins`.`shoe_colors`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `diablotins`.`shoe_colors` ;

CREATE TABLE IF NOT EXISTS `diablotins`.`shoe_colors` (
  `shoe_shoe_id` INT NOT NULL,
  `color_color_id` INT NOT NULL,
  INDEX `fk_shoe_colors_shoe_idx` (`shoe_shoe_id` ASC),
  INDEX `fk_shoe_colors_color_idx` (`color_color_id` ASC),
  CONSTRAINT `fk_shoe_colors_shoe1`
  FOREIGN KEY (`shoe_shoe_id`)
  REFERENCES `diablotins`.`shoe` (`shoe_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_shoe_colors_color`
  FOREIGN KEY (`color_color_id`)
  REFERENCES `diablotins`.`color` (`color_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
  ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `diablotins`.`shoe_sizes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `diablotins`.`shoe_sizes` ;

CREATE TABLE IF NOT EXISTS `diablotins`.`shoe_sizes` (
  `size_size_id` INT NOT NULL,
  `shoe_shoe_id` INT NOT NULL,
  INDEX `fk_shoe_sizes_size_idx` (`size_size_id` ASC),
  INDEX `fk_shoe_sizes_shoe_idx` (`shoe_shoe_id` ASC),
  CONSTRAINT `fk_shoe_sizes_size`
  FOREIGN KEY (`size_size_id`)
  REFERENCES `diablotins`.`size` (`size_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_shoe_sizes_shoe`
  FOREIGN KEY (`shoe_shoe_id`)
  REFERENCES `diablotins`.`shoe` (`shoe_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
  ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
