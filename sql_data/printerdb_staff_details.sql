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
-- Table structure for table `staff_details`
--

DROP TABLE IF EXISTS `staff_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `staff_details` (
  `staff_id` int NOT NULL,
  `fname` varchar(50) NOT NULL,
  `lname` varchar(50) NOT NULL,
  `dept` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `biz_address` varchar(255) NOT NULL,
  `sys_role` enum('staff','hr','manager','inactive') NOT NULL,
  PRIMARY KEY (`staff_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff_details`
--

LOCK TABLES `staff_details` WRITE;
/*!40000 ALTER TABLE `staff_details` DISABLE KEYS */;
INSERT INTO `staff_details` VALUES (1,'JOHN','SIM','MANAGEMENT','john.sim.1@all-in-one.com.sg','87821918','65 Paya Lebar Rd, #06-33 Paya Lebar Square, Singapore 409065','inactive'),(2,'JACK','SIM','MANAGEMENT','jack.sim.2@all-in-one.com.sg','86808357','65 Paya Lebar Rd, #06-33 Paya Lebar Square, Singapore 409065','hr'),(786,'DEREK','TAN','SALES','derek.tan.786@all-in-one.com.sg','92935171','60 Paya Lebar Rd, #06-33 Paya Lebar Square, Singapore 409060','manager'),(909,'DAVID','YAP','FINANCE','david.yap.909@all-in-one.com.sg','94365220','7 Toh Yi Dr #02-265 Singapore 590007','manager'),(1013,'PHILIP','LEE','OPERATIONS','philip.lee.1013@all-in-one.com.sg','94182129','84 Marine Parade Central #01-70 Singapore 440084','manager'),(1340,'PETER','HENG','IT SUPPORT','peter.heng.1340@all-in-one.com.sg','96786049','505 Bedok North Ave 3 #05-23 Singapore 460505','manager'),(1877,'SALLY','LOH','HR','sally.loh.1877@all-in-one.com.sg','92273549','46 Boon Teck Road #08-02 Singapore 329610','hr'),(2049,'ERNST','SIM','CONSULTANCY','ernst.sim.2049@all-in-one.com.sg','86808357','1 North Bridge Road, #06-31 High Street Centre, Singapore 179094','manager'),(2126,'ERIC','LOH','INFORMATION','eric.loh.2126@all-in-one.com.sg','83200969','34 Whampoa West #01-15 Singapore 330034','manager'),(3498,'LINDA','NG','CONSULTANCY','linda.ng.3498@all-in-one.com.sg','96220903','528 Hougang Ave 6, #06-237 Singapore 530528','staff'),(6516,'JOANNE','LIM','INFORMATION','joanne.lim.6516@all-in-one.com.sg','83267062','13 Fernvale Close, #18-154 Singapore 797622','staff'),(8857,'ANNA','SNG','HR','anna.sng.8857@all-in-one.com.sg','89769294','73 Commonwealth Drive, #11-227 Singapore 140073','staff');
/*!40000 ALTER TABLE `staff_details` ENABLE KEYS */;
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
