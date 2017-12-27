-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema diablotins
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `diablotins` ;

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
  `brand_id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(120) NULL DEFAULT NULL,
  PRIMARY KEY (`brand_id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC))
  ENGINE = InnoDB
  AUTO_INCREMENT = 5
  DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `diablotins`.`category`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `diablotins`.`category` ;

CREATE TABLE IF NOT EXISTS `diablotins`.`category` (
  `category_id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC))
  ENGINE = InnoDB
  AUTO_INCREMENT = 6
  DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `diablotins`.`color`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `diablotins`.`color` ;

CREATE TABLE IF NOT EXISTS `diablotins`.`color` (
  `color_id` INT(11) NOT NULL AUTO_INCREMENT,
  `value` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`color_id`),
  UNIQUE INDEX `name_UNIQUE` (`value` ASC))
  ENGINE = InnoDB
  AUTO_INCREMENT = 7
  DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `diablotins`.`description`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `diablotins`.`description` ;

CREATE TABLE IF NOT EXISTS `diablotins`.`description` (
  `description_id` INT NOT NULL,
  `full_description` TEXT NOT NULL,
  `short_description` VARCHAR(120) NOT NULL,
  PRIMARY KEY (`description_id`))
  ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `diablotins`.`shoe`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `diablotins`.`shoe` ;

CREATE TABLE IF NOT EXISTS `diablotins`.`shoe` (
  `shoe_id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `reference` VARCHAR(120) NOT NULL,
  `brand_id` INT(11) NOT NULL,
  `description_id` INT NOT NULL,
  PRIMARY KEY (`shoe_id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC),
  INDEX `fk_shoe_brand_idx` (`brand_id` ASC),
  INDEX `fk_shoe_description1_idx` (`description_id` ASC),
  CONSTRAINT `fk_shoe_brand`
  FOREIGN KEY (`brand_id`)
  REFERENCES `diablotins`.`brand` (`brand_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_shoe_description1`
  FOREIGN KEY (`description_id`)
  REFERENCES `diablotins`.`description` (`description_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
  ENGINE = InnoDB
  AUTO_INCREMENT = 2
  DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `diablotins`.`shoe_categories`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `diablotins`.`shoe_categories` ;

CREATE TABLE IF NOT EXISTS `diablotins`.`shoe_categories` (
  `category_id` INT(11) NOT NULL,
  `shoe_id` INT(11) NOT NULL,
  INDEX `fk_shoe_categories_category_idx` (`category_id` ASC),
  INDEX `fk_shoe_categories_shoe_idx` (`shoe_id` ASC),
  CONSTRAINT `fk_shoe_categories_category`
  FOREIGN KEY (`category_id`)
  REFERENCES `diablotins`.`category` (`category_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_shoe_categories_shoe`
  FOREIGN KEY (`shoe_id`)
  REFERENCES `diablotins`.`shoe` (`shoe_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
  ENGINE = InnoDB
  DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `diablotins`.`shoe_colors`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `diablotins`.`shoe_colors` ;

CREATE TABLE IF NOT EXISTS `diablotins`.`shoe_colors` (
  `shoe_id` INT(11) NOT NULL,
  `color_id` INT(11) NOT NULL,
  INDEX `fk_shoe_colors_shoe_idx` (`shoe_id` ASC),
  INDEX `fk_shoe_colors_color_idx` (`color_id` ASC),
  CONSTRAINT `fk_shoe_colors_color`
  FOREIGN KEY (`color_id`)
  REFERENCES `diablotins`.`color` (`color_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_shoe_colors_shoe1`
  FOREIGN KEY (`shoe_id`)
  REFERENCES `diablotins`.`shoe` (`shoe_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
  ENGINE = InnoDB
  DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `diablotins`.`size`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `diablotins`.`size` ;

CREATE TABLE IF NOT EXISTS `diablotins`.`size` (
  `size_id` INT(11) NOT NULL AUTO_INCREMENT,
  `value` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`size_id`),
  UNIQUE INDEX `value_UNIQUE` (`value` ASC))
  ENGINE = InnoDB
  AUTO_INCREMENT = 9
  DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `diablotins`.`shoe_sizes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `diablotins`.`shoe_sizes` ;

CREATE TABLE IF NOT EXISTS `diablotins`.`shoe_sizes` (
  `size_id` INT(11) NOT NULL,
  `shoe_id` INT(11) NOT NULL,
  INDEX `fk_shoe_sizes_size_idx` (`size_id` ASC),
  INDEX `fk_shoe_sizes_shoe_idx` (`shoe_id` ASC),
  CONSTRAINT `fk_shoe_sizes_shoe`
  FOREIGN KEY (`shoe_id`)
  REFERENCES `diablotins`.`shoe` (`shoe_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_shoe_sizes_size`
  FOREIGN KEY (`size_id`)
  REFERENCES `diablotins`.`size` (`size_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
  ENGINE = InnoDB
  DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `diablotins`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `diablotins`.`user` ;

CREATE TABLE IF NOT EXISTS `diablotins`.`user` (
  `user_id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `password_digest` VARCHAR(128) NULL DEFAULT NULL,
  `is_admin` TINYINT(1) NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC))
  ENGINE = InnoDB
  AUTO_INCREMENT = 7
  DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `diablotins`.`image`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `diablotins`.`image` ;

CREATE TABLE IF NOT EXISTS `diablotins`.`image` (
  `image_id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `url` VARCHAR(120) NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT current_timestamp,
  `updated_at` TIMESTAMP NULL DEFAULT current_timestamp,
  `shoe_id` INT(11) NOT NULL,
  `is_primary` TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`image_id`),
  INDEX `fk_picture_shoe1_idx` (`shoe_id` ASC),
  CONSTRAINT `fk_picture_shoe1`
  FOREIGN KEY (`shoe_id`)
  REFERENCES `diablotins`.`shoe` (`shoe_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
  ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `diablotins`.`collection`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `diablotins`.`collection` ;

CREATE TABLE IF NOT EXISTS `diablotins`.`collection` (
  `collection_id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `from` DATETIME NOT NULL,
  `to` DATETIME NOT NULL,
  PRIMARY KEY (`collection_id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC))
  ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `diablotins`.`shoe_collection`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `diablotins`.`shoe_collection` ;

CREATE TABLE IF NOT EXISTS `diablotins`.`shoe_collection` (
  `shoe_id` INT(11) NOT NULL,
  `collection_id` INT NOT NULL,
  PRIMARY KEY (`shoe_id`, `collection_id`),
  INDEX `fk_shoe_has_collection_collection1_idx` (`collection_id` ASC),
  INDEX `fk_shoe_has_collection_shoe1_idx` (`shoe_id` ASC),
  CONSTRAINT `fk_shoe_has_collection_shoe1`
  FOREIGN KEY (`shoe_id`)
  REFERENCES `diablotins`.`shoe` (`shoe_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_shoe_has_collection_collection1`
  FOREIGN KEY (`collection_id`)
  REFERENCES `diablotins`.`collection` (`collection_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
  ENGINE = InnoDB
  DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
