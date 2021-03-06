-- MySQL Script generated by MySQL Workbench
-- Sun Apr 11 17:01:52 2021
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `goodeats` DEFAULT CHARACTER SET utf8 ;
USE `goodeats` ;

-- -----------------------------------------------------
-- Table `mydb`.`Produit`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Produit` (
  `id` INT(11) NOT NULL,
  `nom` VARCHAR(30) NOT NULL,
  `descrip` text NOT NULL,
  `img` longblob NOT NULL,
  `prix` INT(11) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`User` (
  `id` INT(11) NOT NULL,
  `role VARCHAR(30) NOT NULL,
  `nom` VARCHAR(30) NOT NULL,
  `mdp` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Commande`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Commande` (
  `User_idUser` INT NOT NULL,
  `Produit_idProduit` INT NOT NULL,
  `PrixTotal` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`User_idUser`, `Produit_idProduit`),
  INDEX `fk_User_has_Produit_Produit1_idx` (`Produit_idProduit` ASC) VISIBLE,
  INDEX `fk_User_has_Produit_User_idx` (`User_idUser` ASC) VISIBLE,
  CONSTRAINT `fk_User_has_Produit_User`
    FOREIGN KEY (`User_idUser`)
    REFERENCES `mydb`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_User_has_Produit_Produit1`
    FOREIGN KEY (`Produit_idProduit`)
    REFERENCES `mydb`.`Produit` (`idProduit`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
