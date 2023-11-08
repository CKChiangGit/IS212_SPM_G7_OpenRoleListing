-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Nov 08, 2023 at 03:41 AM
-- Server version: 8.0.31
-- PHP Version: 8.0.26

DROP DATABASE IF EXISTS spm;
CREATE DATABASE spm;
USE spm;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `spm`
--

-- --------------------------------------------------------

--
-- Table structure for table `role_applications`
--

DROP TABLE IF EXISTS `role_applications`;
CREATE TABLE IF NOT EXISTS `role_applications` (
  `role_app_id` int NOT NULL AUTO_INCREMENT,
  `role_listing_id` int NOT NULL,
  `staff_id` int NOT NULL,
  `role_app_status` enum('applied','accepted','rejected') NOT NULL,
  `role_app_ts_create` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`role_app_id`),
  KEY `ROLE_APPLICATIONS_fk1` (`role_listing_id`),
  KEY `ROLE_APPLICATIONS_fk2` (`staff_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2147483647 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `role_applications`
--

INSERT INTO `role_applications` (`role_app_id`, `role_listing_id`, `staff_id`, `role_app_status`, `role_app_ts_create`) VALUES
(103, 531, 1, 'accepted', '2023-11-06 09:58:02'),
(105, 101, 2, 'applied', '2023-11-07 05:56:09'),
(10000, 531, 12500, 'applied', '2023-11-07 17:23:38'),
(2147483647, 531, 3498, 'applied', '2023-11-08 01:16:29');

-- --------------------------------------------------------

--
-- Table structure for table `role_details`
--

DROP TABLE IF EXISTS `role_details`;
CREATE TABLE IF NOT EXISTS `role_details` (
  `role_id` int NOT NULL,
  `role_name` varchar(50) NOT NULL,
  `role_description` mediumtext,
  `role_status` enum('inactive','active') NOT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `role_details`
--

INSERT INTO `role_details` (`role_id`, `role_name`, `role_description`, `role_status`) VALUES
(16877, 'Talent Recruiter, HR', 'The Talent Recruiter is responsible for attracting, sourcing, evaluating, and hiring top talent for the organization.  They construct a talented and motivated workforce by employing effective recruitment strategies and ensuring a positive candidate experience throughout the hiring process.\n\nThe Talent Recruiter key responsibilities include:\n1. Interview Coordination\n2. Employer Branding and Recruitment Marketing\n3. Recruitment Metrics and Reporting\n\nQualifications and Skills include:\n- Bachelor\'s degree in Human Resources, Business Administration, or related field.\n- Familiarity with recruitment methods and tools, including applicant tracking systems (ATS) and social media platforms.\n- Understanding of employment laws and regulations related to recruitment.', 'active'),
(27431, 'Consultant, Technology', 'The Technology Consultant analyzes client needs, design solutions, and implements strategies to enhance efficiency, security, and overall performance.\n\nThe Technology Consultant key responsibilities include:\n1. Client Consultation and Needs Analysis\n2. Solution Design and Architecture\n3. Vendor Management\n\nQualifications and Skills include:\n- Bachelor\'s degree in Information Technology, Computer Science, or a related field.\n- Understanding of business processes and their alignment with technology solutions.\n- Excellent communication and presentation abilities.', 'active'),
(33745, 'Analyst, Operations', 'The Operations Analyst designs, coordinates, and optimizes operational plans and schedules to ensure efficient resource utilization, production capacity, and timely delivery of products or services. They analyze data, collaborate with various departments, and develop strategies to streamline processes and meet organizational objectives.\n\nThe Operations Analyst key responsibilities include:\n1. Resource Allocation and Capacity Planning\n2. Demand Forecasting and Analysis\n3. Inventory Management\n\nQualifications and Skills include:\n- Bachelor\'s degree in Operations Management, Supply Chain Management, Business Administration, or a related field (Master\'s degree is a plus)\n- Proficiency in data analysis and the use of relevant software/tools for planning and forecasting.\n- Knowledge of inventory management, demand forecasting, and production planning principles.', 'active'),
(34729, 'Manager, Regional Sales', 'The Regional Manager is responsible for overseeing and coordinating the operations, sales, and performance of multiple locations or branches within a designated region.\n\nThe Regional Manager key responsibilities include:\n1. Strategic Planning\n2. Operational Management\n3. Sales and Business Development\n\nQualifications and Skills include:\n- Bachelor\'s degree in business administration or a related field (Master\'s degree preferred).\n- Strong leadership, communication, and interpersonal skills.\n- Knowledge of industry trends, market dynamics, and regulatory requirements.', 'inactive'),
(35969, 'Developer, DevOps', 'The DevOps Developer focus on automating processes, improving collaboration between development and operations teams, and ensuring efficient and reliable delivery of software. They utilise DevOps practices and principles to optimize the software development lifecycle.\n\nThe DevOps Developer key responsibilities include:\n1. DevOps Toolchain Implementation\n2. Continuous Integration and Deployment\n3. Monitoring and Logging\n4. Performance Optimization\n\nQualifications and Skills include:\n- Bachelor\'s degree in Computer Science, Engineering, or a related field\n- Proficiency in programming languages such as Python, Bash, or PowerShell.\n- Familiarity with CI/CD tools (e.g., Jenkins, GitLab CI, Travis CI) and version control systems (e.g., Git, SVN).\n- Experience with automation tools (e.g., Ansible, Puppet, Chef) and IaC principles.\n- Strong understanding of cloud platforms (e.g., AWS, Azure, GCP) and containerization (e.g., Docker, Kubernetes).', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `role_listings`
--

DROP TABLE IF EXISTS `role_listings`;
CREATE TABLE IF NOT EXISTS `role_listings` (
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
  KEY `ROLE_LISTINGS_fk3` (`role_listing_updater`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `role_listings`
--

INSERT INTO `role_listings` (`role_listing_id`, `role_id`, `role_listing_desc`, `role_listing_source`, `role_listing_open`, `role_listing_close`, `role_listing_creator`, `role_listing_updater`, `role_listing_ts_create`, `role_listing_ts_update`) VALUES
(101, 33745, 'Analyst, Operations', 8857, '2023-11-07', '2024-02-02', 2, 2, '2023-11-07 06:19:18', '2023-11-08 01:04:05'),
(531, 27431, 'Technology Consultant', 2049, '2023-09-20', '2024-10-04', 8857, 8857, '2023-09-25 12:07:09', '2023-11-05 10:36:12');

-- --------------------------------------------------------

--
-- Table structure for table `role_skills`
--

DROP TABLE IF EXISTS `role_skills`;
CREATE TABLE IF NOT EXISTS `role_skills` (
  `role_id` int NOT NULL,
  `skill_id` int NOT NULL,
  PRIMARY KEY (`role_id`,`skill_id`),
  KEY `ROLE_SKILLS_fk2` (`skill_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `role_skills`
--

INSERT INTO `role_skills` (`role_id`, `skill_id`) VALUES
(27431, 6),
(33745, 6),
(27431, 10),
(33745, 10),
(33745, 12);

-- --------------------------------------------------------

--
-- Table structure for table `skill_details`
--

DROP TABLE IF EXISTS `skill_details`;
CREATE TABLE IF NOT EXISTS `skill_details` (
  `skill_id` int NOT NULL,
  `skill_name` varchar(50) NOT NULL,
  `skill_status` enum('inactive','active') NOT NULL,
  PRIMARY KEY (`skill_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `skill_details`
--

INSERT INTO `skill_details` (`skill_id`, `skill_name`, `skill_status`) VALUES
(6, 'Management Communication', 'active'),
(10, 'Consulting 101', 'active'),
(12, 'Pascal Programming', 'inactive'),
(15, 'Financial Analytics', 'active'),
(18, 'Business Management', 'active'),
(22, 'Financial Risk Management', 'inactive'),
(26, 'Public Relations', 'active'),
(29, 'Python Programming', 'active'),
(30, 'Organizational Behavior', 'active'),
(35, 'Network Fundamentals and Support', 'active'),
(48, 'Strategic Human Resource Management', 'inactive');

-- --------------------------------------------------------

--
-- Table structure for table `staff_details`
--

DROP TABLE IF EXISTS `staff_details`;
CREATE TABLE IF NOT EXISTS `staff_details` (
  `staff_id` int NOT NULL,
  `fname` varchar(50) NOT NULL,
  `lname` varchar(50) NOT NULL,
  `dept` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `biz_address` varchar(255) NOT NULL,
  `sys_role` enum('staff','hr','manager','inactive') NOT NULL,
  `pw` varchar(255) NOT NULL,
  PRIMARY KEY (`staff_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `staff_details`
--

INSERT INTO `staff_details` (`staff_id`, `fname`, `lname`, `dept`, `email`, `phone`, `biz_address`, `sys_role`, `pw`) VALUES
(1, 'JOHN', 'SIM', 'MANAGEMENT', 'john.sim.1@all-in-one.com.sg', '87821918', '65 Paya Lebar Rd, #06-33 Paya Lebar Square, Singapore 409065', 'inactive', '123123'),
(2, 'JACK', 'SIM', 'MANAGEMENT', 'jack.sim.2@all-in-one.com.sg', '86808359', '65 Paya Lebar Rd, #06-33 Paya Lebar Square, Singapore 409065', 'hr', '345345'),
(9, 'asd', 'asd', 'asd', 'asd@gmail.com', '87821918', '99', 'hr', '99'),
(786, 'DEREK', 'TAN', 'SALES', 'derek.tan.786@all-in-one.com.sg', '92935171', '60 Paya Lebar Rd, #06-33 Paya Lebar Square, Singapore 409060', 'manager', '234234'),
(909, 'DAVID', 'YAP', 'FINANCE', 'david.yap.909@all-in-one.com.sg', '94365220', '7 Toh Yi Dr #02-265 Singapore 590007', 'manager', '234234'),
(1013, 'PHILIP', 'LEE', 'OPERATIONS', 'philip.lee.1013@all-in-one.com.sg', '94182129', '84 Marine Parade Central #01-70 Singapore 440084', 'manager', '234234'),
(1340, 'PETER', 'HENG', 'IT SUPPORT', 'peter.heng.1340@all-in-one.com.sg', '96786049', '505 Bedok North Ave 3 #05-23 Singapore 460505', 'manager', '234234'),
(1877, 'SALLY', 'LOH', 'HR', 'sally.loh.1877@all-in-one.com.sg', '92273549', '46 Boon Teck Road #08-02 Singapore 329610', 'hr', '345345'),
(2049, 'ERNST', 'SIM', 'CONSULTANCY', 'ernst.sim.2049@all-in-one.com.sg', '86808360', '1 North Bridge Road, #06-31 High Street Centre, Singapore 179094', 'manager', '234234'),
(2126, 'ERIC', 'LOH', 'INFORMATION', 'eric.loh.2126@all-in-one.com.sg', '83200969', '34 Whampoa West #01-15 Singapore 330034', 'manager', '234234'),
(3498, 'LINDA', 'NG', 'CONSULTANCY', 'linda.ng.3498@all-in-one.com.sg', '96220904', '528 Hougang Ave 6, #06-237 Singapore 530528', 'staff', '123123'),
(6516, 'JOANNE', 'LIM', 'INFORMATION', 'joanne.lim.6516@all-in-one.com.sg', '83267062', '13 Fernvale Close, #18-154 Singapore 797622', 'staff', '123123'),
(8857, 'ANNA', 'SNG', 'HR', 'anna.sng.8857@all-in-one.com.sg', '89769294', '73 Commonwealth Drive, #11-227 Singapore 140073', 'hr', '123123'),
(12500, 'MERVIN', 'TAN', 'SCIS Student', 'mervin.tan.2021@scis.smu.edu.sg', '98781131', '80 Stamford Rd, Singapore 178902', 'hr', '123123');

-- --------------------------------------------------------

--
-- Table structure for table `staff_ro`
--

DROP TABLE IF EXISTS `staff_ro`;
CREATE TABLE IF NOT EXISTS `staff_ro` (
  `staff_id` int NOT NULL,
  `RO_id` int NOT NULL,
  PRIMARY KEY (`staff_id`,`RO_id`),
  KEY `STAFF_RO_fk2` (`RO_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `staff_ro`
--

INSERT INTO `staff_ro` (`staff_id`, `RO_id`) VALUES
(1, 1),
(2, 2),
(786, 2),
(909, 2),
(1013, 2),
(1340, 2),
(1877, 2),
(2049, 2),
(2126, 2),
(8857, 1877),
(3498, 2049),
(6516, 2126);

-- --------------------------------------------------------

--
-- Table structure for table `staff_roles`
--

DROP TABLE IF EXISTS `staff_roles`;
CREATE TABLE IF NOT EXISTS `staff_roles` (
  `staff_id` int NOT NULL,
  `staff_role` int NOT NULL,
  `role_type` enum('primary','secondary') NOT NULL,
  `sr_status` enum('inactive','active') NOT NULL,
  PRIMARY KEY (`staff_id`,`staff_role`),
  KEY `STAFF_ROLES_fk2` (`staff_role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `staff_roles`
--

INSERT INTO `staff_roles` (`staff_id`, `staff_role`, `role_type`, `sr_status`) VALUES
(786, 34729, 'primary', 'active'),
(6516, 27431, 'secondary', 'active'),
(6516, 35969, 'primary', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `staff_skills`
--

DROP TABLE IF EXISTS `staff_skills`;
CREATE TABLE IF NOT EXISTS `staff_skills` (
  `staff_id` int NOT NULL,
  `skill_id` int NOT NULL,
  `ss_status` enum('active','unverified','in-progress') NOT NULL,
  PRIMARY KEY (`staff_id`,`skill_id`),
  KEY `STAFF_SKILLS_fk2` (`skill_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `staff_skills`
--

INSERT INTO `staff_skills` (`staff_id`, `skill_id`, `ss_status`) VALUES
(2, 6, 'active'),
(2, 10, 'active'),
(9, 6, 'active'),
(9, 10, 'active'),
(6516, 6, 'in-progress'),
(8857, 26, 'active'),
(8857, 30, 'active'),
(8857, 35, 'unverified'),
(12500, 29, 'active');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `role_applications`
--
ALTER TABLE `role_applications`
  ADD CONSTRAINT `ROLE_APPLICATIONS_fk1` FOREIGN KEY (`role_listing_id`) REFERENCES `role_listings` (`role_listing_id`),
  ADD CONSTRAINT `ROLE_APPLICATIONS_fk2` FOREIGN KEY (`staff_id`) REFERENCES `staff_details` (`staff_id`);

--
-- Constraints for table `role_listings`
--
ALTER TABLE `role_listings`
  ADD CONSTRAINT `ROLE_LISTINGS_fk1` FOREIGN KEY (`role_listing_source`) REFERENCES `staff_details` (`staff_id`),
  ADD CONSTRAINT `ROLE_LISTINGS_fk2` FOREIGN KEY (`role_listing_creator`) REFERENCES `staff_details` (`staff_id`),
  ADD CONSTRAINT `ROLE_LISTINGS_fk3` FOREIGN KEY (`role_listing_updater`) REFERENCES `staff_details` (`staff_id`);

--
-- Constraints for table `role_skills`
--
ALTER TABLE `role_skills`
  ADD CONSTRAINT `ROLE_SKILLS_fk1` FOREIGN KEY (`role_id`) REFERENCES `role_details` (`role_id`),
  ADD CONSTRAINT `ROLE_SKILLS_fk2` FOREIGN KEY (`skill_id`) REFERENCES `skill_details` (`skill_id`);

--
-- Constraints for table `staff_ro`
--
ALTER TABLE `staff_ro`
  ADD CONSTRAINT `STAFF_RO_fk1` FOREIGN KEY (`staff_id`) REFERENCES `staff_details` (`staff_id`),
  ADD CONSTRAINT `STAFF_RO_fk2` FOREIGN KEY (`RO_id`) REFERENCES `staff_details` (`staff_id`);

--
-- Constraints for table `staff_roles`
--
ALTER TABLE `staff_roles`
  ADD CONSTRAINT `STAFF_ROLES_fk1` FOREIGN KEY (`staff_id`) REFERENCES `staff_details` (`staff_id`),
  ADD CONSTRAINT `STAFF_ROLES_fk2` FOREIGN KEY (`staff_role`) REFERENCES `role_details` (`role_id`);

--
-- Constraints for table `staff_skills`
--
ALTER TABLE `staff_skills`
  ADD CONSTRAINT `STAFF_SKILLS_fk1` FOREIGN KEY (`staff_id`) REFERENCES `staff_details` (`staff_id`),
  ADD CONSTRAINT `STAFF_SKILLS_fk2` FOREIGN KEY (`skill_id`) REFERENCES `skill_details` (`skill_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
