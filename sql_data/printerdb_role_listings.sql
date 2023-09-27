-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: printerdb
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `role_listings`
--

DROP TABLE IF EXISTS `role_listings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_listings` (
  `role_listing_id` int NOT NULL,
  `role_id` int NOT NULL,
  `role_listing_desc` mediumtext,
  `role_listing_source` int NOT NULL,
  `role_listing_open` date NOT NULL,
  `role_listing_close` date NOT NULL,
  `role_listing_creator` int NOT NULL,
  `role_listing_updater` int NOT NULL,
  `role_listing_ts_create` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `role_listing_ts_update` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`role_listing_id`),
  KEY `ROLE_LISTINGS_fk1` (`role_listing_source`),
  KEY `ROLE_LISTINGS_fk2` (`role_listing_creator`),
  KEY `ROLE_LISTINGS_fk3` (`role_listing_updater`),
  CONSTRAINT `ROLE_LISTINGS_fk1` FOREIGN KEY (`role_listing_source`) REFERENCES `staff_details` (`staff_id`),
  CONSTRAINT `ROLE_LISTINGS_fk2` FOREIGN KEY (`role_listing_creator`) REFERENCES `staff_details` (`staff_id`),
  CONSTRAINT `ROLE_LISTINGS_fk3` FOREIGN KEY (`role_listing_updater`) REFERENCES `staff_details` (`staff_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_listings`
--

LOCK TABLES `role_listings` WRITE;
/*!40000 ALTER TABLE `role_listings` DISABLE KEYS */;
INSERT INTO `role_listings` VALUES (531,27431,'Technology Consultant',2049,'2023-09-20','2023-10-04',8857,8857,'2023-09-25 12:07:09','2023-09-25 12:07:09');
/*!40000 ALTER TABLE `role_listings` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-27  8:31:46
