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
-- Table structure for table `role_details`
--

DROP TABLE IF EXISTS `role_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_details` (
  `role_id` int NOT NULL,
  `role_name` varchar(50) NOT NULL,
  `role_description` mediumtext,
  `role_status` enum('inactive','active') NOT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_details`
--

LOCK TABLES `role_details` WRITE;
/*!40000 ALTER TABLE `role_details` DISABLE KEYS */;
INSERT INTO `role_details` VALUES (16877,'Talent Recruiter, HR','The Talent Recruiter is responsible for attracting, sourcing, evaluating, and hiring top talent for the organization.  They construct a talented and motivated workforce by employing effective recruitment strategies and ensuring a positive candidate experience throughout the hiring process.\n\nThe Talent Recruiter key responsibilities include:\n1. Interview Coordination\n2. Employer Branding and Recruitment Marketing\n3. Recruitment Metrics and Reporting\n\nQualifications and Skills include:\n- Bachelor\'s degree in Human Resources, Business Administration, or related field.\n- Familiarity with recruitment methods and tools, including applicant tracking systems (ATS) and social media platforms.\n- Understanding of employment laws and regulations related to recruitment.','active'),(27431,'Consultant, Technology','The Technology Consultant analyzes client needs, design solutions, and implements strategies to enhance efficiency, security, and overall performance.\n\nThe Technology Consultant key responsibilities include:\n1. Client Consultation and Needs Analysis\n2. Solution Design and Architecture\n3. Vendor Management\n\nQualifications and Skills include:\n- Bachelor\'s degree in Information Technology, Computer Science, or a related field.\n- Understanding of business processes and their alignment with technology solutions.\n- Excellent communication and presentation abilities.','active'),(33745,'Analyst, Operations','The Operations Analyst designs, coordinates, and optimizes operational plans and schedules to ensure efficient resource utilization, production capacity, and timely delivery of products or services. They analyze data, collaborate with various departments, and develop strategies to streamline processes and meet organizational objectives.\n\nThe Operations Analyst key responsibilities include:\n1. Resource Allocation and Capacity Planning\n2. Demand Forecasting and Analysis\n3. Inventory Management\n\nQualifications and Skills include:\n- Bachelor\'s degree in Operations Management, Supply Chain Management, Business Administration, or a related field (Master\'s degree is a plus)\n- Proficiency in data analysis and the use of relevant software/tools for planning and forecasting.\n- Knowledge of inventory management, demand forecasting, and production planning principles.','active'),(34729,'Manager, Regional Sales','The Regional Manager is responsible for overseeing and coordinating the operations, sales, and performance of multiple locations or branches within a designated region.\n\nThe Regional Manager key responsibilities include:\n1. Strategic Planning\n2. Operational Management\n3. Sales and Business Development\n\nQualifications and Skills include:\n- Bachelor\'s degree in business administration or a related field (Master\'s degree preferred).\n- Strong leadership, communication, and interpersonal skills.\n- Knowledge of industry trends, market dynamics, and regulatory requirements.','inactive'),(35969,'Developer, DevOps','The DevOps Developer focus on automating processes, improving collaboration between development and operations teams, and ensuring efficient and reliable delivery of software. They utilise DevOps practices and principles to optimize the software development lifecycle.\n\nThe DevOps Developer key responsibilities include:\n1. DevOps Toolchain Implementation\n2. Continuous Integration and Deployment\n3. Monitoring and Logging\n4. Performance Optimization\n\nQualifications and Skills include:\n- Bachelor\'s degree in Computer Science, Engineering, or a related field\n- Proficiency in programming languages such as Python, Bash, or PowerShell.\n- Familiarity with CI/CD tools (e.g., Jenkins, GitLab CI, Travis CI) and version control systems (e.g., Git, SVN).\n- Experience with automation tools (e.g., Ansible, Puppet, Chef) and IaC principles.\n- Strong understanding of cloud platforms (e.g., AWS, Azure, GCP) and containerization (e.g., Docker, Kubernetes).','active');
/*!40000 ALTER TABLE `role_details` ENABLE KEYS */;
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
