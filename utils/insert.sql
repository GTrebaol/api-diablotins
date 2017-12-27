-- MySQL dump 10.13  Distrib 5.7.13, for linux-glibc2.5 (x86_64)
--
-- Host: 127.0.0.1    Database: diablotins
-- ------------------------------------------------------
-- Server version	5.7.18-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `brand`
--

LOCK TABLES `brand` WRITE;
/*!40000 ALTER TABLE `brand` DISABLE KEYS */;
INSERT INTO `brand` VALUES (1,"Acebo's"),(2,"Achile"),(3,"Adidas Originals"),(4,"Adidas Performance"),(5,"Adolie"),(6,"Agatha Ruiz de la Prada"),(7,"Aigle"),(8,"Akid"),(9,"Art"),(10,"Ash"),(11,"Asics"),(12,"ASSO"),(13,"Aster"),(14,"Babybotte"),(15,"Batman"),(16,"Bensimon"),(17,"Be Only"),(18,"Beppi"),(19,"Birkenstock"),(20,"Birki'"),(21,"Bisgaard"),(22,"Bloch"),(23,"Bopy"),(24,"Buggy"),(25,"Bullboxer"),(26,"C'Entre Maman & Moi!"),(27,"Camper"),(28,"Canguro"),(29,"Cars"),(30,"Cash Money"),(31,"Caterpillar"),(32,"Catimini"),(33,"Chicco"),(34,"chipie bis"),(35,"Cienta"),(36,"Clarks"),(37,"Colors of California"),(38,"Columbia"),(39,"Conguitos"),(40,"Converse"),(41,"Crocs"),(42,"DC Shoes"),(43,"Desigual"),(44,"Disney by Naturino"),(45,"Dr. Martens"),(46,"Easy Peasy"),(47,"Eliane & lena"),(48,"El Naturalista"),(49,"Emu Australia"),(50,"Esprit"),(51,"EURO 16"),(52,"Faguo"),(53,"Feiyue"),(54,"Freeun");
/*!40000 ALTER TABLE `brand` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1, "Ballerines"),(2, "Baskets"),(3, "Bottes"),(4, "Bottines d'été"),(5, "Bottines et boots"),(6, "Chaussons"),(7, "Chaussures à lacets"),(8, "Chaussures à scratch"),(9, "Chaussures de sport"),(10, "Espadrilles"),(11, "Mocassins"),(12, "Sandales et nu-pieds"),(13, "Tongs");
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `collection`
--

LOCK TABLES `collection` WRITE;
/*!40000 ALTER TABLE `collection` DISABLE KEYS */;
INSERT INTO `collection` VALUES (1,'Hiver','2017-10-01 00:00:00','2018-03-30 00:00:00');
/*!40000 ALTER TABLE `collection` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `color`
--

LOCK TABLES `color` WRITE;
/*!40000 ALTER TABLE `color` DISABLE KEYS */;
INSERT INTO `color` VALUES (5,'noir'),(3,'bleu'),(2,'vert'),(1,'rouge'),(6,'blanc'),(4,'jaune');
/*!40000 ALTER TABLE `color` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `image`
--

LOCK TABLES `image` WRITE;
/*!40000 ALTER TABLE `image` DISABLE KEYS */;
INSERT INTO `image` VALUES (1, 'Stan_Smith_1', 'http://yayomart.com/wp-content/uploads/2017/11/63611743034-adidas-stan-smith-j-gs-ftwwht-ftwwht-green-201231_1.jpg', '2017-12-28', '2017-12-28', 1, 1);
/*!40000 ALTER TABLE `image` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Dumping data for table `shoe`
--

LOCK TABLES `shoe` WRITE;
/*!40000 ALTER TABLE `shoe` DISABLE KEYS */;
INSERT INTO `shoe` VALUES (1,'Stan Smith', 45.99, '123456789', 3, 1);
/*!40000 ALTER TABLE `shoe` ENABLE KEYS */;
UNLOCK TABLES;



--
-- Dumping data for table `description`
--

LOCK TABLES `description` WRITE;
/*!40000 ALTER TABLE `description` DISABLE KEYS */;
INSERT INTO `description` VALUES (1, "full description stan smith", "short description stan smith");
/*!40000 ALTER TABLE `description` ENABLE KEYS */;
UNLOCK TABLES;



--
-- Dumping data for table `shoe_categories`
--

LOCK TABLES `shoe_categories` WRITE;
/*!40000 ALTER TABLE `shoe_categories` DISABLE KEYS */;
INSERT INTO `shoe_categories` VALUES (3,1);
/*!40000 ALTER TABLE `shoe_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `shoe_collection`
--

LOCK TABLES `shoe_collection` WRITE;
/*!40000 ALTER TABLE `shoe_collection` DISABLE KEYS */;
INSERT INTO `shoe_collection` VALUES (1,1);
/*!40000 ALTER TABLE `shoe_collection` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `shoe_colors`
--

LOCK TABLES `shoe_colors` WRITE;
/*!40000 ALTER TABLE `shoe_colors` DISABLE KEYS */;
INSERT INTO `shoe_colors` VALUES (1,2),(1,4),(1,6);
/*!40000 ALTER TABLE `shoe_colors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `shoe_sizes`
--

LOCK TABLES `shoe_sizes` WRITE;
/*!40000 ALTER TABLE `shoe_sizes` DISABLE KEYS */;
INSERT INTO `shoe_sizes` VALUES (2,1),(3,1),(4,1),(5,1),(6,1);
/*!40000 ALTER TABLE `shoe_sizes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `size`
--

LOCK TABLES `size` WRITE;
/*!40000 ALTER TABLE `size` DISABLE KEYS */;
INSERT INTO `size`(value) VALUES ("3M"),("6M"),("9M"),("12M"),("15"),("16"),("17"),("18"),("19"),("20"),("21"),("22"),("23"),("24"),("25"),("26"),("27"),("28"),("29"),("30"),("31"),("32"),("33"),("34"),("35"),("36"),("37"),("38"),("39"),("40");
/*!40000 ALTER TABLE `size` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'admin','$2a$12$GnbjACdzrtvlPgJ45g8O.u9GWCY8yg58D6r5M0OuL2oZZ7/WzBWcS',1),(2,'admin2','$2a$12$3IhUTBaJV/MsCWNlb94exuaVAjK9nxzUzv38wHq2v/hl4zJrhR9L.',1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-12-27 14:49:24