CREATE DATABASE  IF NOT EXISTS `printerdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `printerdb`;
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
-- Table structure for table `staff_skill`
--

DROP TABLE IF EXISTS `staff_skill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `staff_skill` (
  `Staff_ID` int NOT NULL,
  `Role_Name` varchar(20) DEFAULT NULL,
  `Skill_Name` varchar(20) DEFAULT NULL,
  KEY `staff_skill_fk1` (`Staff_ID`),
  KEY `staff_skill_fk2` (`Role_Name`,`Skill_Name`),
  CONSTRAINT `staff_skill_fk1` FOREIGN KEY (`Staff_ID`) REFERENCES `staff` (`Staff_ID`),
  CONSTRAINT `staff_skill_fk2` FOREIGN KEY (`Role_Name`, `Skill_Name`) REFERENCES `role_skill` (`Role_Name`, `Skill_Name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff_skill`
--

LOCK TABLES `staff_skill` WRITE;
/*!40000 ALTER TABLE `staff_skill` DISABLE KEYS */;
INSERT INTO `staff_skill` VALUES (8276,'Sales Associate','Sales Purchase'),(644,'Hiring Associate','HR Management'),(4739,'Marketing Associate','Digital Marketing'),(9210,'Marketing Associate','Digital Marketing'),(5763,'Hiring Associate','HR Management');
/*!40000 ALTER TABLE `staff_skill` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-15 15:36:48
