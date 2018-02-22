-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 08, 2017 at 06:06 AM
-- Server version: 5.7.14
-- PHP Version: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `a2i_am`
--

-- --------------------------------------------------------

--
-- Table structure for table `sa_lookup_data`
--

CREATE TABLE `sa_lookup_data` (
  `LOOKUP_DATA_ID` int(8) NOT NULL COMMENT 'Primary key of sa_lookup_data table.',
  `LOOKUP_GRP_ID` tinyint(3) DEFAULT NULL COMMENT 'Parent Group of each Look up data',
  `LOOKUP_DATA_NAME` varchar(60) NOT NULL COMMENT 'Lookup data name',
  `CHAR_LOOKUP` varchar(40) DEFAULT NULL COMMENT 'Character identification value',
  `NUMB_LOOKUP` tinyint(2) DEFAULT NULL COMMENT 'Number Identification value',
  `ORDER_SL_NO` tinyint(3) DEFAULT NULL COMMENT 'Ascending order',
  `UD_LKPDATA_ID` varchar(20) DEFAULT NULL COMMENT 'User Define Lookup data Id',
  `ACTIVE_FLAG` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'It keeps boolean value representing Active/Inactive. e.g. 1 = Active, 0 = Inactive',
  `CRE_BY` int(10) UNSIGNED DEFAULT NULL,
  `CRE_DT` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UPD_BY` int(10) UNSIGNED DEFAULT NULL,
  `UPD_DT` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Group wise detail data entry i.e Male, female for gender group ';

--
-- Dumping data for table `sa_lookup_data`
--

INSERT INTO `sa_lookup_data` (`LOOKUP_DATA_ID`, `LOOKUP_GRP_ID`, `LOOKUP_DATA_NAME`, `CHAR_LOOKUP`, `NUMB_LOOKUP`, `ORDER_SL_NO`, `UD_LKPDATA_ID`, `ACTIVE_FLAG`, `CRE_BY`, `CRE_DT`, `UPD_BY`, `UPD_DT`) VALUES
(1, 1, 'Propeitor', 'PR', 0, 1, NULL, 1, NULL, '2015-05-13 12:00:00', NULL, '2015-05-25 03:01:04'),
(2, 1, 'Partnership', 'PA', 0, 2, NULL, 1, NULL, '2015-05-13 12:00:00', NULL, '2015-05-14 17:18:04'),
(3, 1, 'Private Limited', 'LI', 0, 3, NULL, 1, NULL, '2015-05-13 12:00:00', NULL, '2015-05-19 10:40:09'),
(4, 2, 'Supplier', NULL, NULL, 1, NULL, 1, NULL, '2015-05-14 04:59:32', NULL, '2015-05-24 19:12:18'),
(5, 2, 'Manufacturer', NULL, NULL, 2, NULL, 1, NULL, '2015-05-14 04:59:57', NULL, '2015-05-24 19:12:43'),
(10, 2, 'Importer', NULL, NULL, 7, NULL, 1, NULL, '2015-05-14 05:01:54', NULL, '2015-05-14 17:01:54'),
(11, 2, 'Exporter', NULL, NULL, 8, NULL, 1, NULL, '2015-05-14 05:02:13', NULL, '2015-05-24 19:18:08'),
(12, 4, 'Islam', 'I', 0, 1, NULL, 1, NULL, '2015-05-17 21:57:32', NULL, '2015-05-18 14:47:25'),
(13, 4, 'Hinduism', 'H', NULL, 2, NULL, 1, NULL, '2015-05-17 21:58:42', NULL, '2015-05-18 14:47:28'),
(14, 4, 'Buddhist', 'B', NULL, 3, NULL, 1, NULL, '2015-05-17 22:17:57', NULL, '2015-05-18 14:47:30'),
(15, 4, 'Christian', 'C', NULL, 4, NULL, 1, NULL, '2015-05-17 22:18:54', NULL, '2015-05-18 14:47:33'),
(19, 5, 'Group 1 to 12 (Except 4 and 10) for Local & Foreign', '', 2, 2, NULL, 1, NULL, '2015-05-17 22:28:44', NULL, '2015-12-27 16:45:04'),
(20, 5, 'Group 1 to 12 (Except 4 and 10) for Local only', '', 1, 1, NULL, 1, NULL, '2015-05-17 22:29:20', NULL, '2015-12-27 16:45:17'),
(21, 5, 'All Groups', 'AG', 5, 5, NULL, 1, NULL, '2015-05-17 22:29:34', NULL, '2015-11-22 12:34:19'),
(22, 5, 'Group 1 to 12 (Except 10) for Local & Foreign', '', 4, 4, NULL, 1, NULL, '2015-05-17 22:29:46', NULL, '2015-12-27 16:45:26'),
(24, 3, 'Boddho', NULL, NULL, 0, NULL, 1, NULL, '2015-05-17 23:26:06', NULL, '2017-09-10 06:15:29'),
(26, 4, 'Others', 'O', NULL, 5, NULL, 1, NULL, '2015-05-18 02:34:26', NULL, '2015-05-18 00:00:00'),
(27, 6, 'S.S.C', NULL, NULL, 0, NULL, 1, NULL, '2015-05-18 23:26:51', NULL, '2015-11-22 00:00:00'),
(28, 6, 'H.S.C', NULL, NULL, 0, NULL, 1, NULL, '2015-05-18 23:27:01', NULL, '2017-09-10 06:15:29'),
(29, 6, 'B.Sc', NULL, NULL, 0, NULL, 1, NULL, '2015-05-18 23:27:14', NULL, '2015-05-21 00:00:00'),
(30, 6, 'M.sc', NULL, NULL, 0, NULL, 1, NULL, '2015-05-18 23:27:23', NULL, '2017-09-10 06:15:29'),
(31, 7, 'Science', NULL, NULL, 0, NULL, 1, NULL, '2015-05-18 23:29:14', NULL, '2017-09-10 06:15:29'),
(32, 7, 'Arts', NULL, NULL, 0, NULL, 1, NULL, '2015-05-18 23:29:21', NULL, '2017-09-10 06:15:29'),
(33, 7, 'Commerce', NULL, NULL, 0, NULL, 1, NULL, '2015-05-18 23:29:30', NULL, '2017-09-10 06:15:29'),
(34, 8, 'Saving Account', NULL, NULL, 0, NULL, 1, NULL, '2015-05-19 02:59:35', NULL, '2017-09-10 06:15:29'),
(35, 8, 'Current Account', NULL, NULL, 0, NULL, 1, NULL, '2015-05-19 02:59:48', NULL, '2017-09-10 06:15:29'),
(36, 8, 'Company Account', NULL, NULL, 0, NULL, 1, NULL, '2015-05-19 02:59:57', NULL, '2017-09-10 06:15:29'),
(37, 8, 'Personal Account', NULL, NULL, 0, NULL, 1, NULL, '2015-05-19 03:00:07', NULL, '2017-09-10 06:15:29'),
(38, 9, 'Uttara', NULL, NULL, 0, NULL, 1, NULL, '2015-05-19 03:00:58', NULL, '2015-05-21 00:00:00'),
(39, 9, 'Banani', NULL, NULL, 0, NULL, 1, NULL, '2015-05-19 03:01:07', NULL, '2017-09-10 06:15:29'),
(40, 9, 'Gulshan', NULL, NULL, 0, NULL, 1, NULL, '2015-05-19 03:01:15', NULL, '2017-09-10 06:15:29'),
(41, 9, 'Mohakhali', NULL, NULL, 0, NULL, 1, NULL, '2015-05-19 03:01:29', NULL, '2017-09-10 06:15:29'),
(42, 10, 'Mr.', NULL, NULL, 0, NULL, 1, NULL, '2015-05-22 00:48:44', NULL, '2017-09-10 06:15:29'),
(43, 10, 'Mrs.', NULL, NULL, 0, NULL, 1, NULL, '2015-05-22 00:48:53', NULL, '2017-09-10 06:15:29'),
(44, 10, 'Miss', NULL, NULL, 0, NULL, 1, NULL, '2015-05-22 00:50:02', NULL, '2015-12-27 16:45:58'),
(45, 6, 'BA', NULL, NULL, 0, NULL, 1, NULL, '2015-06-01 06:34:05', NULL, '2015-06-01 18:34:13'),
(46, 11, 'Executive', NULL, NULL, 0, NULL, 1, NULL, '2015-11-21 00:45:09', NULL, '2015-11-21 00:00:00'),
(47, 11, 'SFC', NULL, NULL, 0, NULL, 1, NULL, '2015-11-21 00:45:18', NULL, '2015-11-21 00:00:00'),
(48, 5, 'Group 1 to 12 (Except 4 ) for Local & Foreign', 'OE4', 3, 3, NULL, 0, NULL, '2015-11-21 23:08:18', NULL, '2015-12-27 16:45:34'),
(49, 12, 'Group 1 to 12 (Except 4 and 10)', NULL, 1, 1, NULL, 1, NULL, '2015-11-22 00:13:10', NULL, '2015-12-27 16:46:10'),
(50, 12, 'Group 4 and 10', NULL, 2, 2, NULL, 1, NULL, '2015-11-22 00:14:09', NULL, '2015-11-22 12:16:53'),
(51, 12, 'Group 4', NULL, 3, 3, NULL, 1, NULL, '2015-11-22 00:14:25', NULL, '2015-11-22 12:16:55'),
(52, 12, 'Group 13', NULL, 4, 4, NULL, 1, NULL, '2015-11-22 00:14:39', NULL, '2015-11-22 12:16:59'),
(53, 13, 'In Progress', NULL, NULL, 1, NULL, 1, NULL, '2015-11-23 04:13:10', NULL, '2015-11-23 16:14:46'),
(54, 13, 'Completed', NULL, NULL, 2, NULL, 1, NULL, '2015-11-23 04:13:27', NULL, '2015-11-23 16:14:51'),
(55, 13, 'Incomplete', NULL, NULL, 3, NULL, 1, NULL, '2015-11-23 04:13:55', NULL, '2015-11-23 16:14:55'),
(56, 14, 'Trade License', 'TL', NULL, 0, NULL, 1, NULL, '2015-12-08 23:45:58', NULL, '2015-12-09 11:47:14'),
(57, 14, 'Importer Registration Certificate', 'IL', NULL, 0, NULL, 1, NULL, '2015-12-08 23:46:22', NULL, '2015-12-09 11:47:21'),
(60, 16, 'Own', 'O', 0, 1, NULL, 1, NULL, '2015-12-17 00:52:56', NULL, '2015-12-17 00:00:00'),
(61, 16, 'Wife', 'W', 0, 3, NULL, 1, NULL, '2015-12-17 00:53:13', NULL, '2015-12-17 15:27:07'),
(62, 16, 'Son', 'S', 0, 4, NULL, 1, NULL, '2015-12-17 00:53:19', NULL, '2015-12-17 15:27:09'),
(63, 16, 'Daughter', 'D', 0, 5, NULL, 1, NULL, '2015-12-17 00:53:34', NULL, '2015-12-17 15:27:12'),
(64, 17, 'Immovable', NULL, NULL, 1, NULL, 1, NULL, '2015-12-17 02:15:09', NULL, '2015-12-17 15:27:14'),
(65, 17, 'Movable', NULL, NULL, 2, NULL, 1, NULL, '2015-12-17 02:15:31', NULL, '2015-12-17 15:27:16'),
(66, 18, 'Trade License Image', NULL, NULL, 1, NULL, 1, NULL, '2015-12-19 02:35:27', NULL, '2015-12-19 15:08:42'),
(67, 18, 'Undertaking Certificate', NULL, NULL, 2, NULL, 1, NULL, '2015-12-19 02:36:01', NULL, '2015-12-19 00:00:00'),
(68, 18, 'Loyalty Certificate', NULL, NULL, 3, NULL, 1, NULL, '2015-12-19 02:36:55', NULL, '2015-12-19 15:10:30'),
(69, 18, 'Affidavit Certificate', NULL, NULL, 4, NULL, 1, NULL, '2015-12-19 02:37:48', NULL, '2015-12-19 15:10:33'),
(70, 18, 'Education Certificate', NULL, NULL, 5, NULL, 1, NULL, '2015-12-19 02:45:17', NULL, '2015-12-19 15:10:39'),
(71, 18, 'Court/Police Case Certificate', NULL, NULL, 6, NULL, 1, NULL, '2015-12-19 02:46:01', NULL, '2015-12-19 15:10:41'),
(72, 18, 'Character Certificate', NULL, NULL, 7, NULL, 1, NULL, '2015-12-19 02:46:32', NULL, '2015-12-19 15:10:44'),
(73, 18, 'Property Statement', NULL, NULL, 8, NULL, 1, NULL, '2015-12-19 02:47:25', NULL, '2015-12-19 15:10:46'),
(74, 18, 'Bank Solvency Certificate', NULL, NULL, 9, NULL, 1, NULL, '2015-12-19 02:48:15', NULL, '2015-12-19 15:10:48'),
(75, 18, 'Bank Statement', NULL, NULL, 10, NULL, 1, NULL, '2015-12-19 02:48:53', NULL, '2015-12-19 15:10:50'),
(76, 18, 'Memorandum of Articles', NULL, NULL, 11, NULL, 1, NULL, '2015-12-19 02:50:15', NULL, '2015-12-19 15:10:53'),
(77, 18, 'Partnership deed', NULL, NULL, 12, NULL, 1, NULL, '2015-12-19 02:51:07', NULL, '2015-12-19 15:10:55'),
(78, 18, 'Indentors Registration Certificate', NULL, NULL, 13, NULL, 1, NULL, '2015-12-19 02:52:15', NULL, '2015-12-19 15:10:59'),
(79, 18, 'Import Registration Certificate', NULL, NULL, 14, NULL, 1, NULL, '2015-12-19 02:52:34', NULL, '2015-12-19 15:11:01'),
(80, 18, 'DCCI/Indenting Agents Association Membership Certificate', NULL, NULL, 15, NULL, 1, NULL, '2015-12-19 03:03:18', NULL, '2015-12-19 15:11:04'),
(81, 18, 'Agency Agreement Certificate', NULL, NULL, 16, NULL, 1, NULL, '2015-12-19 03:05:53', NULL, '2015-12-19 15:11:11'),
(82, 19, 'Warning', NULL, NULL, 0, NULL, 0, NULL, '2015-12-20 02:33:04', NULL, '2015-12-20 14:33:04'),
(83, 19, 'Temporary Embargo', NULL, NULL, 0, NULL, 1, NULL, '2015-12-20 02:34:58', NULL, '2015-12-20 14:37:10'),
(84, 19, 'Permanent Embargo', NULL, NULL, 0, NULL, 1, NULL, '2015-12-20 02:37:32', NULL, '2015-12-20 14:37:32'),
(85, 20, 'Local Agency', NULL, NULL, 0, NULL, 1, NULL, '2015-12-20 02:38:26', NULL, '2015-12-20 14:38:26'),
(86, 20, 'Foreign Agency', NULL, NULL, 0, NULL, 1, NULL, '2015-12-20 02:38:45', NULL, '2015-12-20 14:38:45'),
(87, 21, 'First Deposit', NULL, NULL, 0, NULL, 1, NULL, '2015-12-29 05:11:42', NULL, '2016-01-03 16:53:00'),
(88, 21, 'Renewal', NULL, NULL, 0, NULL, 1, NULL, '2015-12-29 05:11:58', NULL, '2016-01-03 16:52:56'),
(89, 21, 'Reissue of ID Card', NULL, NULL, 0, NULL, 1, NULL, '2015-12-29 05:12:44', NULL, '2015-12-29 17:12:44'),
(90, 21, 'Payment of form for Changing Representative', NULL, NULL, 0, NULL, 1, NULL, '2015-12-29 05:13:35', NULL, '2015-12-29 17:13:35'),
(91, 21, 'Enlistment fee for inclusion of another group', NULL, NULL, 0, NULL, 1, NULL, '2015-12-29 05:14:37', NULL, '2015-12-29 17:14:37'),
(92, 21, 'Enlistment fee for inclusion of another group', NULL, NULL, 0, NULL, 1, NULL, '2015-12-28 23:16:39', NULL, '2016-01-11 15:28:30'),
(93, 19, 'Black  Listing', NULL, NULL, 0, NULL, 1, NULL, '2016-01-02 19:54:33', NULL, '2016-01-11 15:28:30'),
(94, 21, 'Renew of ID Card', NULL, NULL, 0, NULL, 1, NULL, '2016-01-02 20:08:34', NULL, '2016-01-11 15:28:30'),
(95, 21, 'New Issue of ID Card', NULL, NULL, 0, NULL, 1, NULL, '2016-01-02 20:08:57', NULL, '2016-01-11 15:28:30'),
(96, 21, 'Payment of form for Enlistment', NULL, NULL, 0, NULL, 1, NULL, '2016-01-02 20:10:14', NULL, '2016-01-11 15:28:30'),
(97, 21, 'Payment of form for Inclusion of another Group', NULL, NULL, 0, NULL, 1, NULL, '2016-01-02 20:12:02', NULL, '2016-01-11 15:28:30'),
(127, 31, 'Male', NULL, NULL, 0, NULL, 1, NULL, '2016-01-28 06:42:06', NULL, NULL),
(128, 31, 'Female', NULL, NULL, 0, NULL, 1, NULL, '2016-01-28 06:42:14', NULL, NULL),
(129, 32, 'Certified Investment Management Analyst', NULL, NULL, 0, NULL, 1, NULL, '2016-01-28 23:05:18', NULL, NULL),
(130, 32, 'Certified Private Wealth Advisor', NULL, NULL, 0, NULL, 1, NULL, '2016-01-28 23:05:40', NULL, NULL),
(131, 32, 'Developer', NULL, NULL, 0, NULL, 1, NULL, '2016-01-28 23:06:28', NULL, NULL),
(132, 32, 'Programmer', NULL, NULL, 0, NULL, 1, NULL, '2016-01-28 23:06:36', NULL, NULL),
(133, 32, 'Designer ', NULL, NULL, 0, NULL, 1, NULL, '2016-01-28 23:06:56', NULL, NULL),
(134, 32, 'QA', NULL, NULL, 0, NULL, 1, NULL, '2016-01-28 23:07:05', NULL, NULL),
(135, 32, 'System Engineer', NULL, NULL, 0, NULL, 1, NULL, '2016-01-28 23:07:17', NULL, NULL),
(136, 33, 'Advanced level', NULL, NULL, 0, NULL, 1, NULL, '2016-01-28 23:08:58', NULL, NULL),
(137, 33, 'Mid Level', NULL, NULL, 0, NULL, 1, NULL, '2016-01-28 23:09:18', NULL, NULL),
(138, 33, 'Entry Level', NULL, NULL, 0, NULL, 1, NULL, '2016-01-28 23:09:34', NULL, NULL),
(139, 34, 'Army Wing-1', NULL, NULL, 0, NULL, 1, NULL, '2016-01-28 23:32:32', NULL, NULL),
(140, 34, 'Army Wing-2', NULL, NULL, 0, NULL, 1, NULL, '2016-01-28 23:32:38', NULL, NULL),
(141, 34, 'NAvy Wing', NULL, NULL, 0, NULL, 1, NULL, '2016-01-28 23:33:12', NULL, NULL),
(142, 34, 'Air Force Wing', NULL, NULL, 0, NULL, 1, NULL, '2016-01-28 23:33:37', NULL, NULL),
(143, 35, 'Married', 'M', NULL, 0, NULL, 1, NULL, '2016-01-28 23:42:21', NULL, NULL),
(144, 35, 'Unmarried', 'UM', NULL, 0, NULL, 1, NULL, '2016-01-28 23:42:35', NULL, NULL),
(179, 22, 'Brown', NULL, NULL, 0, NULL, 1, NULL, '2016-01-10 15:42:03', NULL, '2016-01-11 09:42:03'),
(180, 22, 'Black', NULL, NULL, 0, NULL, 1, NULL, '2016-01-10 15:42:22', NULL, '2016-01-11 09:42:22'),
(181, 22, 'White', NULL, NULL, 0, NULL, 1, NULL, '2016-01-10 15:42:32', NULL, '2016-01-11 09:42:32'),
(182, 23, 'Blue', NULL, NULL, 0, NULL, 1, NULL, '2016-01-11 10:01:32', NULL, '2016-01-12 04:01:32'),
(183, 23, 'Black', NULL, NULL, 0, NULL, 1, NULL, '2016-01-11 10:01:40', NULL, '2016-01-12 04:01:40'),
(184, 23, 'Brown', NULL, NULL, 0, NULL, 1, NULL, '2016-01-11 10:02:09', NULL, '2016-01-12 04:02:09'),
(185, 24, 'Tall', NULL, NULL, 0, NULL, 1, NULL, '2016-01-11 10:03:45', NULL, '2016-01-12 04:03:45'),
(186, 24, 'Medium', NULL, NULL, 0, NULL, 1, NULL, '2016-01-12 16:13:53', NULL, NULL),
(187, 24, 'Short', NULL, NULL, 0, NULL, 1, NULL, '2016-01-12 16:14:03', NULL, NULL),
(188, 26, 'Export', NULL, NULL, 0, NULL, 1, NULL, '2016-01-17 23:07:49', NULL, NULL),
(189, 26, 'Import', NULL, NULL, 0, NULL, 1, NULL, '2016-01-17 23:07:59', NULL, NULL),
(190, 26, 'Indenting', NULL, NULL, 0, NULL, 1, NULL, '2016-01-17 23:08:20', NULL, NULL),
(191, 26, 'Buying House', NULL, NULL, 0, NULL, 1, NULL, '2016-01-17 23:08:44', NULL, NULL),
(194, 15, 'Only Partner', 'OP', 0, 1, NULL, 1, NULL, '2016-02-08 12:00:00', NULL, '2016-02-09 03:01:04'),
(195, 15, 'Only Representative', 'OR', 0, 2, NULL, 1, NULL, '2016-02-08 12:00:00', NULL, '2016-02-09 17:18:04'),
(196, 15, 'Partner & Signatory', 'PS', 0, 3, NULL, 1, NULL, '2016-02-08 12:00:00', NULL, '2016-02-09 10:40:09'),
(197, 15, 'Representative & Signatory', 'RS', 0, 4, NULL, 1, NULL, '2016-02-09 04:59:32', NULL, '2016-02-09 19:12:18'),
(198, 15, 'Partner & Representative', 'PR', 0, 5, NULL, 1, NULL, '2016-02-09 04:59:57', NULL, '2016-02-09 19:12:43'),
(199, 15, 'Partner & Representative & Signatory', 'OS', 0, 6, NULL, 1, NULL, '2016-02-09 05:01:54', NULL, '2016-02-09 17:01:54'),
(200, 38, 'A', '', 1, 0, NULL, 0, NULL, '2016-02-10 04:43:37', NULL, NULL),
(201, 38, 'B', '', 2, 0, NULL, 1, NULL, '2016-02-10 04:43:45', NULL, NULL),
(202, 38, 'C', '', 3, 0, NULL, 1, NULL, '2016-02-10 04:43:54', NULL, NULL),
(203, 16, 'Husband', 'H', 0, 2, NULL, 1, NULL, '2016-02-10 22:42:51', NULL, NULL),
(204, 16, 'Brother', 'B', 0, 6, NULL, 1, NULL, '2016-02-10 22:43:03', NULL, NULL),
(205, 16, 'Sister', 'SI', 0, 7, NULL, 1, NULL, '2016-02-10 22:43:12', NULL, NULL),
(206, 39, 'package One', '', 1, 0, NULL, 1, NULL, '2016-03-22 04:18:42', NULL, NULL),
(207, 39, 'package Two', '', 2, 0, NULL, 1, NULL, '2016-03-22 04:19:01', NULL, NULL),
(208, 39, 'package Three', '', 3, 0, NULL, 1, NULL, '2016-03-22 04:19:19', NULL, NULL),
(209, 40, 'Controlled', 'C', 0, 0, NULL, 1, NULL, '2016-03-23 02:45:28', NULL, NULL),
(210, 40, 'Uncontrolled', 'U', 0, 0, NULL, 1, NULL, '2016-03-23 02:45:42', NULL, NULL),
(211, 41, 'Non Standardized', 'NS', 0, 0, NULL, 1, NULL, '2016-03-23 02:46:17', NULL, NULL),
(212, 41, 'Standardized', 'S', 0, 0, NULL, 1, NULL, '2016-03-23 02:46:32', NULL, NULL),
(213, 43, 'Organization', 'O', 0, NULL, NULL, 1, NULL, '2016-03-27 04:28:20', NULL, NULL),
(214, 43, 'Inspectorate', 'Ins', NULL, NULL, NULL, 1, NULL, '2016-03-27 04:28:36', NULL, NULL),
(215, 43, 'Section', 'Sec', NULL, NULL, NULL, 1, NULL, '2016-03-27 04:28:55', NULL, NULL),
(216, 43, 'Wing', 'W', NULL, NULL, NULL, 1, NULL, '2016-03-27 04:29:20', NULL, NULL),
(217, 43, 'User  Dte', 'U', NULL, NULL, NULL, 1, NULL, '2016-03-27 04:30:20', NULL, NULL),
(218, 43, 'Indenter', 'Ind', 0, NULL, NULL, 1, NULL, '2016-03-27 04:30:44', NULL, NULL),
(219, 42, 'General Procurement Meeting', 'GSPC', NULL, NULL, NULL, 1, NULL, '2016-03-27 22:41:05', NULL, NULL),
(220, 42, 'Navy procurement meeting', 'NSPC', NULL, NULL, NULL, 1, NULL, '2016-03-29 00:55:57', NULL, NULL),
(221, 42, 'Air Procurement Meeting', 'PCM', NULL, NULL, NULL, 1, NULL, '2016-03-29 00:56:35', NULL, NULL),
(222, 14, 'Driving License', 'DL', NULL, NULL, NULL, 1, NULL, '2016-03-31 04:08:08', NULL, NULL),
(223, 44, 'Text', 'Char', NULL, NULL, NULL, 1, NULL, '2016-04-12 00:31:28', NULL, NULL),
(224, 44, 'Number', 'int', NULL, NULL, NULL, 1, NULL, '2016-04-12 00:31:58', NULL, NULL),
(225, 45, 'Less than', '<', 1, NULL, NULL, 1, NULL, '2016-04-12 01:57:08', NULL, NULL),
(226, 45, 'Greater than', '>', 1, NULL, NULL, 1, NULL, '2016-04-12 01:57:56', NULL, NULL),
(227, 45, 'Equal', '=', 1, NULL, NULL, 1, NULL, '2016-04-12 01:58:28', NULL, NULL),
(228, 45, 'Less than or equal', '<=', 1, NULL, NULL, 1, NULL, '2016-04-12 01:59:07', NULL, NULL),
(229, 45, 'Greater than or equal', '>=', 1, NULL, NULL, 1, NULL, '2016-04-12 02:00:48', NULL, NULL),
(230, 46, 'Check Box', 'checkbox', NULL, NULL, NULL, 1, NULL, '2016-04-12 02:20:31', NULL, NULL),
(231, 46, 'Radio', 'radio', NULL, NULL, NULL, 1, NULL, '2016-04-12 02:20:49', NULL, NULL),
(232, 45, 'Between', 'between', 2, NULL, NULL, 1, NULL, '2016-04-12 03:11:37', NULL, NULL),
(233, 45, 'Or', 'or', 2, NULL, NULL, 1, NULL, '2016-04-12 03:12:11', NULL, NULL),
(234, 47, 'Arial', 'arial', NULL, NULL, NULL, 1, NULL, '2016-04-19 23:06:29', NULL, NULL),
(235, 47, 'Verdana', 'verdana', NULL, NULL, NULL, 1, NULL, '2016-04-19 23:06:53', NULL, NULL),
(236, 47, 'Times New Roman', 'Times New Roman', NULL, NULL, NULL, 1, NULL, '2016-04-19 23:07:43', NULL, NULL),
(237, 47, 'Tahoma', 'Tahoma', NULL, NULL, NULL, 1, NULL, '2016-04-19 23:08:03', NULL, NULL),
(238, 47, 'Georgia', 'Georgia', NULL, NULL, NULL, 1, NULL, '2016-04-19 23:08:25', NULL, NULL),
(239, 48, 'Bold', 'text-bold', 0, NULL, NULL, 1, NULL, '2016-04-19 23:08:38', NULL, NULL),
(240, 48, 'Italic', 'text-italic', NULL, NULL, NULL, 1, NULL, '2016-04-19 23:08:48', NULL, NULL),
(241, 48, 'Bold Italic', 'text-bold-italic', NULL, NULL, NULL, 1, NULL, '2016-04-19 23:29:42', NULL, NULL),
(242, 48, 'Bold Italic Underline', 'text-bold-italic-underline', NULL, NULL, NULL, 1, NULL, '2016-04-19 23:30:27', NULL, NULL),
(243, 48, 'Underline', 'text-underline', NULL, NULL, NULL, 1, NULL, '2016-04-19 23:31:12', NULL, NULL),
(244, 49, 'Limited', 'Ltd', 0, NULL, NULL, 1, NULL, '2016-04-20 03:21:37', NULL, NULL),
(245, 49, 'Secret', 'Secret', NULL, NULL, NULL, 1, NULL, '2016-04-20 03:36:59', NULL, NULL),
(246, 49, 'Restricted', 'Restricted', NULL, NULL, NULL, 1, NULL, '2016-04-20 03:37:14', NULL, NULL),
(247, 50, 'Open', 'Open', NULL, NULL, NULL, 1, NULL, '2016-04-20 03:38:11', NULL, NULL),
(248, 50, 'Limted', 'Ltd', NULL, NULL, NULL, 1, NULL, '2016-04-20 03:38:22', NULL, NULL),
(249, 51, 'Single Envelop', 'SE', NULL, NULL, NULL, 1, NULL, '2016-04-20 03:40:03', NULL, NULL),
(250, 51, 'Double Envelop', 'DE', NULL, NULL, NULL, 1, NULL, '2016-04-20 03:40:17', NULL, NULL),
(253, 31, 'Others', NULL, NULL, NULL, NULL, 1, NULL, '2016-04-27 06:02:55', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `sa_lookup_grp`
--

CREATE TABLE `sa_lookup_grp` (
  `LOOKUP_GRP_ID` tinyint(3) NOT NULL COMMENT 'Primary key of sa_lookup_grp table.',
  `LOOKUP_GRP_NAME` varchar(50) NOT NULL COMMENT 'Look up group name',
  `GRP_CATEGORY` tinyint(2) DEFAULT NULL COMMENT 'Group category',
  `USE_CHAR_NUMB` varchar(1) DEFAULT 'N' COMMENT 'Character Identification of the group',
  `SYSTEM_FG` tinyint(1) DEFAULT '0' COMMENT 'System Flag',
  `INSERT_FG` tinyint(1) DEFAULT '0',
  `UPDATE_FG` tinyint(1) DEFAULT '0',
  `DELETE_FG` tinyint(1) DEFAULT '0',
  `ORDER_SL_NO` tinyint(3) DEFAULT NULL COMMENT 'Ascending order',
  `UD_LKPGRP_ID` varchar(20) DEFAULT NULL COMMENT 'User Define Charge Head Id',
  `ACTIVE_FLAG` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'It keeps boolean value representing Active/Inactive. e.g. 1 = Active, 0 = Inactive',
  `CRE_BY` int(10) UNSIGNED DEFAULT NULL,
  `CRE_DT` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UPD_BY` int(10) UNSIGNED DEFAULT NULL,
  `UPD_DT` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='All master data group entry i.e. Gender';

--
-- Dumping data for table `sa_lookup_grp`
--

INSERT INTO `sa_lookup_grp` (`LOOKUP_GRP_ID`, `LOOKUP_GRP_NAME`, `GRP_CATEGORY`, `USE_CHAR_NUMB`, `SYSTEM_FG`, `INSERT_FG`, `UPDATE_FG`, `DELETE_FG`, `ORDER_SL_NO`, `UD_LKPGRP_ID`, `ACTIVE_FLAG`, `CRE_BY`, `CRE_DT`, `UPD_BY`, `UPD_DT`) VALUES
(1, 'Type of the Company', NULL, 'C', 1, 0, 0, 0, 1, NULL, 1, NULL, '2015-05-14 04:18:19', NULL, '2015-05-14 17:17:29'),
(2, 'Type of Business', NULL, 'N', 0, 0, 0, 0, 0, NULL, 1, NULL, '2015-05-14 04:54:30', NULL, '2015-05-14 17:17:34'),
(3, 'Type of Account Type', NULL, 'N', 0, 0, 0, 0, 0, NULL, 1, NULL, '2015-05-16 02:16:35', NULL, '2015-05-16 14:30:33'),
(4, 'Religion', NULL, 'C', 0, 0, 0, 0, 0, NULL, 1, NULL, '2015-05-17 21:13:50', NULL, '2015-05-18 14:45:13'),
(5, 'Enlistment Groups', NULL, 'N', 0, 0, 0, 0, 0, NULL, 1, NULL, '2015-05-17 22:27:44', NULL, '2015-05-18 10:27:44'),
(6, 'Degree', NULL, 'N', 0, 0, 0, 0, 0, NULL, 1, NULL, '2015-05-18 23:26:36', NULL, '2015-05-19 11:26:36'),
(7, 'Education Type', NULL, 'N', 0, 0, 0, 0, 0, NULL, 1, NULL, '2015-05-18 23:29:01', NULL, '2015-05-19 11:29:01'),
(8, 'Bank Account Type', NULL, 'N', 0, 0, 0, 0, 0, NULL, 1, NULL, '2015-05-19 02:59:12', NULL, '2015-05-19 14:59:12'),
(9, 'Bank Brach Name', NULL, 'N', 0, 0, 0, 0, 0, NULL, 1, NULL, '2015-05-19 03:00:34', NULL, '2015-05-19 15:00:34'),
(10, 'Salutation', NULL, 'N', 0, 0, 0, 0, 0, NULL, 1, NULL, '2015-05-22 00:47:39', NULL, '2015-05-22 12:47:39'),
(11, 'Units', NULL, 'N', 0, 0, 0, 0, 0, NULL, 1, NULL, '2015-11-21 00:44:45', NULL, '2015-11-21 12:44:45'),
(12, 'DGFI Clearance Group', NULL, 'N', 0, 0, 0, 0, 0, NULL, 1, NULL, '2015-11-22 00:11:02', NULL, '2015-11-22 12:11:02'),
(13, 'Contract Status', NULL, 'N', 0, 0, 0, 0, 0, NULL, 1, NULL, '2015-11-23 04:12:31', NULL, '2015-11-23 16:12:31'),
(14, 'License Type', NULL, 'C', 0, 0, 0, 0, 0, NULL, 1, NULL, '2015-12-08 23:45:23', NULL, '2015-12-09 12:11:58'),
(15, 'Partner/Representative Type', NULL, 'C', 1, 0, 0, 0, 1, NULL, 1, NULL, '2015-05-14 04:18:19', NULL, '2015-05-14 17:17:29'),
(16, 'Relation Types', NULL, 'C', 0, 0, 0, 0, 0, NULL, 1, NULL, '2015-12-17 00:52:43', NULL, '2015-12-17 12:52:43'),
(17, 'Asset Types', NULL, 'N', 0, 0, 0, 0, 0, NULL, 1, NULL, '2015-12-17 02:14:50', NULL, '2015-12-17 14:14:50'),
(18, 'Attachment Types', NULL, 'N', 0, 0, 0, 0, 0, NULL, 1, NULL, '2015-12-19 02:34:31', NULL, '2015-12-19 14:34:31'),
(19, 'Embargo Types', NULL, 'N', 0, 0, 0, 0, 0, NULL, 1, NULL, '2015-12-20 02:31:57', NULL, '2015-12-20 14:31:57'),
(20, 'Agency Types', NULL, 'N', 0, 0, 0, 0, 0, NULL, 1, NULL, '2015-12-20 02:37:57', NULL, '2015-12-20 14:37:57'),
(21, 'Pay Order For', NULL, 'N', 0, 0, 0, 0, 0, NULL, 1, NULL, '2015-12-29 05:10:57', NULL, '2015-12-29 17:10:57'),
(22, 'Color or Race', NULL, 'N', 0, 0, 0, 0, 0, NULL, 1, NULL, '2016-01-10 15:41:49', NULL, '2016-01-11 09:41:49'),
(23, 'Eye Color', NULL, 'N', 0, 0, 0, 0, 0, NULL, 1, NULL, '2016-01-11 10:01:22', NULL, '2016-01-12 04:01:22'),
(24, 'Body Structure', NULL, 'N', 0, 0, 0, 0, 0, NULL, 1, NULL, '2016-01-11 10:02:29', NULL, '2016-01-12 04:03:04'),
(26, 'Category of License', NULL, 'N', 0, 0, 0, 0, 0, NULL, 1, NULL, '2016-01-17 23:07:34', NULL, NULL),
(31, 'Gender', NULL, 'N', 0, 0, 0, 0, 0, NULL, 0, NULL, '2016-01-28 06:41:50', NULL, NULL),
(32, 'Degisnation', NULL, 'N', 0, 0, 0, 0, 0, NULL, 0, NULL, '2016-01-28 23:02:42', NULL, NULL),
(33, 'Rank', NULL, 'N', 0, 0, 0, 0, 0, NULL, 0, NULL, '2016-01-28 23:03:24', NULL, NULL),
(34, 'Department', NULL, 'N', 0, 0, 0, 0, 0, NULL, 0, NULL, '2016-01-28 23:30:33', NULL, NULL),
(35, 'Marital Status', NULL, 'N', 0, 0, 0, 0, 0, NULL, 0, NULL, '2016-01-28 23:42:02', NULL, NULL),
(38, 'Country Category', NULL, 'N', 0, 0, 0, 0, 0, NULL, 0, NULL, '2016-01-29 05:41:28', NULL, NULL),
(39, 'Package', NULL, 'N', 0, 0, 0, 0, 0, NULL, 0, NULL, '2016-03-22 04:18:21', NULL, NULL),
(40, 'Item Category', NULL, 'C', 0, 0, 0, 0, 0, NULL, 0, NULL, '2016-03-23 02:45:06', NULL, NULL),
(41, 'Item Type', NULL, 'C', 0, 0, 0, 0, 0, NULL, 0, NULL, '2016-03-23 02:46:02', NULL, NULL),
(42, 'Meeting Name', NULL, 'C', 0, 0, 0, 0, NULL, NULL, 0, NULL, '2016-03-24 00:13:46', NULL, NULL),
(43, 'Organization Types', NULL, 'C', 0, 0, 0, 0, NULL, NULL, 0, NULL, '2016-03-27 04:27:46', NULL, NULL),
(44, 'Specs Attribute Value Type', NULL, 'C', 0, 0, 0, 0, NULL, NULL, 0, NULL, '2016-04-12 00:30:06', NULL, NULL),
(45, 'Operator Type', NULL, 'C', 0, 0, 0, 0, NULL, NULL, 0, NULL, '2016-04-12 01:53:02', NULL, NULL),
(46, 'VALUE ELEMENT', NULL, 'C', 0, 0, 0, 0, NULL, NULL, 0, NULL, '2016-04-12 02:20:09', NULL, NULL),
(47, 'Font Family', NULL, 'C', 0, 0, 0, 0, NULL, NULL, 0, NULL, '2016-04-19 23:04:44', NULL, NULL),
(48, 'Font Format', NULL, 'C', 0, 0, 0, 0, NULL, NULL, 0, NULL, '2016-04-19 23:05:48', NULL, NULL),
(49, 'Tender Security Level', NULL, 'C', 0, 0, 0, 0, NULL, NULL, 0, NULL, '2016-04-20 03:21:03', NULL, NULL),
(50, 'Tender Type', NULL, 'C', 0, 0, 0, 0, NULL, NULL, 0, NULL, '2016-04-20 03:37:52', NULL, NULL),
(51, 'Tender Method', NULL, 'C', 0, 0, 0, 0, NULL, NULL, 0, NULL, '2016-04-20 03:39:41', NULL, NULL),
(52, 'test-asif', NULL, 'N', 0, 0, 0, 0, NULL, NULL, 0, NULL, '2017-04-15 23:51:14', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `sa_modules`
--

CREATE TABLE `sa_modules` (
  `MODULE_ID` int(11) NOT NULL COMMENT 'Primary Key',
  `MODULE_NAME` varchar(70) NOT NULL COMMENT 'Name of the Module',
  `SHORT_NAME` char(10) CHARACTER SET latin1 NOT NULL COMMENT 'Short Name of the Module',
  `MODULE_NAME_BN` varchar(500) DEFAULT NULL COMMENT 'Bnagla Name of the Module',
  `SL_NO` tinyint(2) NOT NULL COMMENT 'Ascending Order',
  `ACTIVE_STATUS` tinyint(1) DEFAULT '1' COMMENT 'It keeps boolean value representing Active/Inactive. e.g. 1 = Active, 0 = Inactive',
  `CRE_BY` int(10) UNSIGNED DEFAULT NULL,
  `CRE_DT` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UPD_BY` int(10) UNSIGNED DEFAULT NULL,
  `UPD_DT` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Modules list entry here ';

--
-- Dumping data for table `sa_modules`
--

INSERT INTO `sa_modules` (`MODULE_ID`, `MODULE_NAME`, `SHORT_NAME`, `MODULE_NAME_BN`, `SL_NO`, `ACTIVE_STATUS`, `CRE_BY`, `CRE_DT`, `UPD_BY`, `UPD_DT`) VALUES
(1, 'Access Control', 'AC', 'প্রবেশাধিকার নিয়ন্ত্রণ', 1, 1, 1, '2017-09-09 06:49:22', 1, '2017-09-09 08:55:57'),
(2, 'All Setup', 'AS', 'সেটআপ সমূহ', 2, 1, 1, '2017-09-10 04:09:01', 1, '2017-09-10 04:09:19');

-- --------------------------------------------------------

--
-- Table structure for table `sa_module_links`
--

CREATE TABLE `sa_module_links` (
  `LINK_ID` int(11) NOT NULL COMMENT 'Primary Key',
  `LINK_NAME` varchar(60) NOT NULL COMMENT 'Link name will be stored',
  `LINK_NAME_BN` varchar(500) DEFAULT NULL COMMENT 'Link Name in Bangla',
  `MODULE_ID` int(2) DEFAULT NULL COMMENT 'Parent Module name Primary Key of sa_modules table',
  `URL_URI` varchar(200) DEFAULT NULL COMMENT 'URI location of the link ',
  `LINK_DESC` varchar(100) DEFAULT NULL COMMENT 'Link description',
  `SL_NO` tinyint(2) NOT NULL COMMENT 'Ascending order',
  `CREATE` tinyint(1) DEFAULT '0' COMMENT 'Flag for create action',
  `READ` tinyint(1) DEFAULT '0' COMMENT 'Flag for view action',
  `UPDATE` tinyint(1) DEFAULT '0' COMMENT 'Flag for update action',
  `DELETE` tinyint(1) DEFAULT '0' COMMENT 'Flag for Delete action',
  `STATUS` tinyint(4) DEFAULT NULL COMMENT 'Flag for Active/Inactive action',
  `SA_MLINK_PAGES` varchar(10) DEFAULT NULL COMMENT 'Each action first character is stored with comma seperation',
  `ACTIVE_STATUS` tinyint(1) DEFAULT '1' COMMENT 'It keeps boolean value representing Active/Inactive. e.g. 1 = Active, 0 = Inactive',
  `CRE_BY` int(10) UNSIGNED DEFAULT NULL,
  `CRE_DT` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UPD_BY` int(10) UNSIGNED DEFAULT NULL,
  `UPD_DT` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='All application pages link entry here ';

--
-- Dumping data for table `sa_module_links`
--

INSERT INTO `sa_module_links` (`LINK_ID`, `LINK_NAME`, `LINK_NAME_BN`, `MODULE_ID`, `URL_URI`, `LINK_DESC`, `SL_NO`, `CREATE`, `READ`, `UPDATE`, `DELETE`, `STATUS`, `SA_MLINK_PAGES`, `ACTIVE_STATUS`, `CRE_BY`, `CRE_DT`, `UPD_BY`, `UPD_DT`) VALUES
(1, 'Modules', 'মডিউল', 1, 'accessControl/index', NULL, 1, 1, 1, 1, 1, 1, 'I,V,U,D,S', 1, 1, '2017-09-09 06:54:28', NULL, NULL),
(2, 'Module Links', 'মডিউল লিংক', 1, 'accessControl/moduleLinks', NULL, 2, 1, 1, 1, 1, 1, 'I,V,U,D,S', 1, 1, '2017-09-09 06:55:14', 1, '2017-09-10 04:19:51'),
(3, 'Organization Modules', 'ওআরজি মডিউল', 1, 'accessControl/orgModuleSetup', NULL, 3, 1, 1, 1, 1, 1, 'I,V,U,D,S', 1, 1, '2017-09-09 06:57:06', NULL, NULL),
(4, 'User Group', 'ইউজার গ্রুপ', 1, 'accessControl/allGroup', NULL, 4, 1, 1, 1, 1, 1, 'I,V,U,D,S', 1, 1, '2017-09-09 06:58:12', NULL, NULL),
(5, 'Assign Link To Group', 'এসাইন লিংক গ্রুপ', 1, 'accessControl/assignModuleToGroup', NULL, 5, 1, 1, 1, 1, 1, 'I,V,U,D,S', 1, 1, '2017-09-09 07:00:32', NULL, NULL),
(6, 'User Setup', 'ইউজার সেটআপ', 1, 'setup/user', NULL, 6, 1, 1, 1, 1, 1, 'I,V,U,D,S', 1, 1, '2017-09-09 07:01:22', NULL, NULL),
(7, 'Base Setup', 'বেসিক সেটআপ', 2, 'accessControl/allGroup', NULL, 7, 1, 1, 1, 1, 1, 'I,V,U,D,S', 1, 1, '2017-09-10 04:19:41', 1, '2017-09-10 04:20:02');

-- --------------------------------------------------------

--
-- Table structure for table `sa_organizations`
--

CREATE TABLE `sa_organizations` (
  `ORG_ID` int(11) NOT NULL COMMENT 'Primary Key',
  `ORG_NAME` varchar(100) NOT NULL COMMENT 'Organization Name',
  `ADDRESS` varchar(160) DEFAULT NULL COMMENT 'Address 2',
  `ZIP_CODE` varchar(8) DEFAULT NULL COMMENT 'Zip/Postal Code',
  `TEL` varchar(80) DEFAULT NULL COMMENT 'Contact Number',
  `PHONE` varchar(80) DEFAULT NULL COMMENT 'Mobile Number',
  `FAX` varchar(80) DEFAULT NULL COMMENT 'Fax Number',
  `EMAIL` varchar(40) DEFAULT NULL COMMENT 'Email Address',
  `WEBSITE` varchar(40) DEFAULT NULL COMMENT 'Organization Website',
  `LOGO` varchar(100) DEFAULT NULL COMMENT 'Organization Logo',
  `ACTIVE_STATUS` tinyint(1) DEFAULT '1' COMMENT 'It keeps boolean value representing Active/Inactive. e.g. 1 = Active, 0 = Inactive',
  `CRE_BY` int(10) UNSIGNED DEFAULT NULL,
  `CRE_DT` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UPD_BY` int(10) UNSIGNED DEFAULT NULL,
  `UPD_DT` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='DGDP organizational basic information ';

--
-- Dumping data for table `sa_organizations`
--

INSERT INTO `sa_organizations` (`ORG_ID`, `ORG_NAME`, `ADDRESS`, `ZIP_CODE`, `TEL`, `PHONE`, `FAX`, `EMAIL`, `WEBSITE`, `LOGO`, `ACTIVE_STATUS`, `CRE_BY`, `CRE_DT`, `UPD_BY`, `UPD_DT`) VALUES
(1, 'Thikana', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Thikana.jpg', 1, NULL, '2017-09-09 04:22:52', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `sa_org_mlinks`
--

CREATE TABLE `sa_org_mlinks` (
  `SA_MLINKS_ID` int(11) NOT NULL COMMENT 'Primary Key',
  `SA_MODULE_ID` int(11) DEFAULT NULL COMMENT 'Primary Key of sa_modules table',
  `ORG_ID` int(11) DEFAULT NULL COMMENT 'Primary key of sa_organization table',
  `LINK_ID` int(7) DEFAULT NULL COMMENT 'Primary Key of sa_module_links table to assign previledge of module links',
  `CREATE` tinyint(1) DEFAULT '0' COMMENT 'Defined to assign previledge to particular organization for Insert action',
  `READ` tinyint(1) DEFAULT '0' COMMENT 'Defined to assign previledge to particular organization for View action',
  `UPDATE` tinyint(1) DEFAULT '0' COMMENT 'Defined to assign previledge to particular organization for Update action',
  `DELETE` tinyint(1) DEFAULT '0' COMMENT 'Defined to assign previledge to particular organization for Delete action',
  `STATUS` tinyint(4) DEFAULT NULL COMMENT 'Defined to assign previledge to particular organization for Active/Inactive action',
  `URL_URI` varchar(200) DEFAULT NULL COMMENT 'Keeps URL',
  `SA_MLINK_NAME` varchar(60) DEFAULT NULL,
  `SA_MLINK_PAGES` varchar(10) DEFAULT NULL,
  `ACTIVE_STATUS` tinyint(1) DEFAULT '1' COMMENT 'It keeps boolean value representing Active/Inactive. e.g. 1 = Active, 0 = Inactive',
  `CRE_BY` int(10) UNSIGNED DEFAULT NULL,
  `CRE_DT` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UPD_BY` int(10) UNSIGNED DEFAULT NULL,
  `UPD_DT` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='organizational modules wise link assign ';

--
-- Dumping data for table `sa_org_mlinks`
--

INSERT INTO `sa_org_mlinks` (`SA_MLINKS_ID`, `SA_MODULE_ID`, `ORG_ID`, `LINK_ID`, `CREATE`, `READ`, `UPDATE`, `DELETE`, `STATUS`, `URL_URI`, `SA_MLINK_NAME`, `SA_MLINK_PAGES`, `ACTIVE_STATUS`, `CRE_BY`, `CRE_DT`, `UPD_BY`, `UPD_DT`) VALUES
(1, 1, 1, 1, 1, 1, 1, 1, 1, NULL, NULL, NULL, 1, 1, '2017-09-09 08:31:55', 1, '2017-09-09 08:32:00'),
(2, 1, 1, 2, 1, 1, 1, 1, 1, NULL, NULL, NULL, 1, 1, '2017-09-09 08:32:02', 1, '2017-09-09 08:32:07'),
(3, 1, 1, 3, 1, 1, 1, 1, 1, NULL, NULL, NULL, 1, 1, '2017-09-09 08:32:08', 1, '2017-09-09 08:32:12'),
(4, 1, 1, 4, 1, 1, 1, 1, 1, NULL, NULL, NULL, 1, 1, '2017-09-09 08:32:13', 1, '2017-09-09 08:32:17'),
(5, 1, 1, 5, 1, 1, 1, 1, 1, NULL, NULL, NULL, 1, 1, '2017-09-09 08:32:18', 1, '2017-09-09 08:32:21'),
(6, 1, 1, 6, 1, 1, 1, 1, 1, NULL, NULL, NULL, 1, 1, '2017-09-09 08:32:23', 1, '2017-09-09 08:32:26'),
(7, 2, 1, 7, 1, 1, 1, 1, 1, NULL, NULL, NULL, 1, 1, '2017-09-10 10:07:45', 1, '2017-09-10 10:07:48');

-- --------------------------------------------------------

--
-- Table structure for table `sa_org_modules`
--

CREATE TABLE `sa_org_modules` (
  `SA_MODULE_ID` int(7) NOT NULL COMMENT 'Primary Key',
  `SA_MODULE_NAME` varchar(70) NOT NULL COMMENT 'Name of the Module',
  `ORG_ID` int(11) DEFAULT NULL COMMENT 'Primary key of sa_organization table',
  `DEFAULT_FLAG` tinyint(1) DEFAULT NULL COMMENT 'Keeps Deafult Flag Boolean value',
  `MODULE_ID` int(11) DEFAULT NULL COMMENT 'Primary key of sa_modules Table',
  `ACTIVE_STATUS` tinyint(1) DEFAULT '1' COMMENT 'It keeps boolean value representing Active/Inactive. e.g. 1 = Active, 0 = Inactive',
  `CRE_BY` int(10) UNSIGNED DEFAULT NULL,
  `CRE_DT` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UPD_BY` int(10) UNSIGNED DEFAULT NULL,
  `UPD_DT` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='organizational wise existing modules assign ';

--
-- Dumping data for table `sa_org_modules`
--

INSERT INTO `sa_org_modules` (`SA_MODULE_ID`, `SA_MODULE_NAME`, `ORG_ID`, `DEFAULT_FLAG`, `MODULE_ID`, `ACTIVE_STATUS`, `CRE_BY`, `CRE_DT`, `UPD_BY`, `UPD_DT`) VALUES
(1, 'Access Control', 1, NULL, 1, 1, NULL, '2017-09-09 08:30:50', NULL, NULL),
(2, 'All Setup', 1, NULL, 2, 1, NULL, '2017-09-10 10:07:40', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `sa_uglw_mlink`
--

CREATE TABLE `sa_uglw_mlink` (
  `SA_UGLWM_LINK` int(11) NOT NULL COMMENT 'Primary Key',
  `SA_MLINKS_ID` int(11) DEFAULT NULL COMMENT 'Primary key of sa_org_mlinks table. Only permitted link ids for org will be stored ',
  `ORG_ID` int(11) DEFAULT NULL COMMENT 'Primary key of sa_organization table',
  `USER_ID` bigint(14) DEFAULT NULL COMMENT 'Primary key of sa_users table. Assign priveledge by user id.',
  `USERGRP_ID` int(11) DEFAULT NULL COMMENT 'Primary key of sa_user_group table. Assigning priveledge agains group id',
  `UG_LEVEL_ID` int(11) DEFAULT NULL COMMENT 'Primary key of sa_ug_level table. Assigning priveledge agains level id',
  `SA_MODULE_ID` int(7) DEFAULT NULL COMMENT 'Primary key of sa_module table',
  `LINK_ID` int(7) DEFAULT NULL COMMENT 'primary key of sa_org_mlinks table ',
  `CREATE` tinyint(1) DEFAULT '0' COMMENT 'Defined to assign previledge for Insert action',
  `READ` tinyint(1) DEFAULT '0' COMMENT 'Defined to assign previledge for View action',
  `UPDATE` tinyint(1) DEFAULT '0' COMMENT 'Defined to assign previledge for Update action',
  `DELETE` tinyint(1) DEFAULT '0' COMMENT 'Defined to assign previledge for Delete action',
  `STATUS` tinyint(4) DEFAULT NULL COMMENT 'Defined to assign previledge for Active/Inactive action',
  `URL_URI` varchar(200) DEFAULT NULL COMMENT 'URL for query enhencement',
  `ACTIVE_STATUS` tinyint(1) DEFAULT '1' COMMENT 'It keeps boolean value representing Active/Inactive. e.g. 1 = Active, 0 = Inactive',
  `CRE_BY` int(10) UNSIGNED DEFAULT NULL,
  `CRE_DT` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UPD_BY` int(10) UNSIGNED DEFAULT NULL,
  `UPD_DT` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='User level wise module link define ';

--
-- Dumping data for table `sa_uglw_mlink`
--

INSERT INTO `sa_uglw_mlink` (`SA_UGLWM_LINK`, `SA_MLINKS_ID`, `ORG_ID`, `USER_ID`, `USERGRP_ID`, `UG_LEVEL_ID`, `SA_MODULE_ID`, `LINK_ID`, `CREATE`, `READ`, `UPDATE`, `DELETE`, `STATUS`, `URL_URI`, `ACTIVE_STATUS`, `CRE_BY`, `CRE_DT`, `UPD_BY`, `UPD_DT`) VALUES
(1, 1, 1, NULL, 1, 1, 1, NULL, 1, 1, 1, 1, 1, NULL, 1, 1, '2017-09-09 08:34:49', 1, '2017-09-09 08:34:53'),
(2, 2, 1, NULL, 1, 1, 1, NULL, 1, 1, 1, 1, 1, NULL, 1, 1, '2017-09-09 08:34:54', 1, '2017-09-09 08:34:58'),
(3, 3, 1, NULL, 1, 1, 1, NULL, 1, 1, 1, 1, 1, NULL, 1, 1, '2017-09-09 08:34:59', 1, '2017-09-09 08:35:03'),
(4, 4, 1, NULL, 1, 1, 1, NULL, 1, 1, 1, 1, 1, NULL, 1, 1, '2017-09-09 08:35:04', 1, '2017-09-09 08:35:08'),
(5, 5, 1, NULL, 1, 1, 1, NULL, 1, 1, 1, 1, 1, NULL, 1, 1, '2017-09-09 08:35:09', 1, '2017-09-09 08:35:11'),
(6, 6, 1, NULL, 1, 1, 1, NULL, 1, 1, 1, 1, 1, NULL, 1, 1, '2017-09-09 08:35:13', 1, '2017-09-09 08:35:17'),
(7, 7, 1, NULL, 1, 1, 2, NULL, 1, 1, 1, 1, 1, NULL, 1, 1, '2017-09-10 10:08:44', 1, '2017-09-10 10:08:47');

-- --------------------------------------------------------

--
-- Table structure for table `sa_ug_level`
--

CREATE TABLE `sa_ug_level` (
  `UG_LEVEL_ID` int(11) NOT NULL COMMENT 'Primary Key',
  `USERGRP_ID` int(11) DEFAULT NULL COMMENT 'Primary key of sa_user_group table',
  `ORG_ID` int(11) DEFAULT NULL COMMENT 'Primary key of sa_organization table',
  `UGLEVE_NAME` varchar(50) DEFAULT NULL COMMENT 'Name of the Level',
  `ORDER_SL` tinyint(2) DEFAULT NULL COMMENT 'Ascending Order',
  `ACTIVE_STATUS` tinyint(1) DEFAULT '1' COMMENT 'It keeps boolean value representing Active/Inactive. e.g. 1 = Active, 0 = Inactive',
  `CRE_BY` int(10) UNSIGNED DEFAULT NULL,
  `CRE_DT` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UPD_BY` int(10) UNSIGNED DEFAULT NULL,
  `UPD_DT` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Organization wise user level define for access application ';

--
-- Dumping data for table `sa_ug_level`
--

INSERT INTO `sa_ug_level` (`UG_LEVEL_ID`, `USERGRP_ID`, `ORG_ID`, `UGLEVE_NAME`, `ORDER_SL`, `ACTIVE_STATUS`, `CRE_BY`, `CRE_DT`, `UPD_BY`, `UPD_DT`) VALUES
(1, 1, 1, 'Admin', NULL, 1, 1, '2017-09-09 06:44:30', 1, '2017-09-09 06:44:46'),
(2, 2, 1, 'Admin', NULL, 1, 1, '2017-09-10 04:47:50', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `sa_users`
--

CREATE TABLE `sa_users` (
  `USER_ID` bigint(20) NOT NULL COMMENT 'Primary Key',
  `ORG_ID` int(11) DEFAULT NULL COMMENT 'Primary Key of sa_organization table.',
  `USERGRP_ID` int(11) DEFAULT NULL COMMENT 'Primary Key of sa_user_group table. This will be used for Access Control',
  `USERLVL_ID` int(11) DEFAULT NULL COMMENT 'Primary Key of sa_ug_level. This will be used for user Access Control',
  `USERNAME` varchar(16) DEFAULT NULL COMMENT 'User username will be stored. This will be used while login as iser',
  `USERPW` varchar(60) NOT NULL COMMENT 'Password of user to be used while login',
  `FULL_NAME` varchar(250) DEFAULT NULL COMMENT 'User Full Name',
  `DESIG_ID` int(11) DEFAULT NULL COMMENT 'Come from sa_designation',
  `FATHER_NAME` varchar(250) DEFAULT NULL COMMENT 'Father Name of user',
  `MOTHER_NAME` varchar(250) DEFAULT NULL COMMENT 'Mother Name of User',
  `MOBILE` varchar(40) DEFAULT NULL COMMENT 'User Mobile Number',
  `EMAIL` varchar(40) NOT NULL COMMENT 'User Email Address',
  `NID` varchar(30) DEFAULT NULL COMMENT 'National ID of User',
  `GENDER` varchar(5) DEFAULT 'M' COMMENT 'M= Male, F= Female, O=Others',
  `RELIGION` int(11) DEFAULT NULL COMMENT 'Come from lookup',
  `MARITAL_STATUS` int(11) DEFAULT NULL COMMENT 'Come from lookup',
  `USERIMG` varchar(100) DEFAULT NULL COMMENT 'User Photo',
  `USER_ENTITY` varchar(20) DEFAULT NULL COMMENT 'Define whether a user is Org user/ Doctor/ Patients/ Guardian',
  `USERTYPE` int(11) DEFAULT NULL,
  `ACTIVE_STATUS` tinyint(1) DEFAULT '1' COMMENT 'It keeps boolean value representing Active/Inactive. e.g. 1 = Active, 0 = Inactive',
  `CRE_DT` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `CRE_BY` int(10) UNSIGNED DEFAULT NULL,
  `UPD_DT` datetime DEFAULT NULL,
  `UPD_BY` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Basic information of All user';

--
-- Dumping data for table `sa_users`
--

INSERT INTO `sa_users` (`USER_ID`, `ORG_ID`, `USERGRP_ID`, `USERLVL_ID`, `USERNAME`, `USERPW`, `FULL_NAME`, `DESIG_ID`, `FATHER_NAME`, `MOTHER_NAME`, `MOBILE`, `EMAIL`, `NID`, `GENDER`, `RELIGION`, `MARITAL_STATUS`, `USERIMG`, `USER_ENTITY`, `USERTYPE`, `ACTIVE_STATUS`, `CRE_DT`, `CRE_BY`, `UPD_DT`, `UPD_BY`) VALUES
(1, 1, 1, 1, 'admin', 'e10adc3949ba59abbe56e057f20f883e', 'Super Admin', NULL, NULL, NULL, NULL, 'admin@gmail.com', NULL, 'M', NULL, NULL, NULL, NULL, NULL, 1, '2017-09-08 22:04:05', NULL, NULL, NULL),
(2, 1, 2, 2, 'admin', 'e10adc3949ba59abbe56e057f20f883e', 'Full Name', 129, 'Father\'s Name', 'Mother\'s Name', 'Phone', 'dgdfg@mail.com', 'National ID', '127', 12, 143, '2017_09_10_b0bef4c.png', NULL, NULL, 1, '2017-09-10 12:53:21', 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `sa_user_group`
--

CREATE TABLE `sa_user_group` (
  `USERGRP_ID` int(11) NOT NULL COMMENT 'Primary Key',
  `ORG_ID` int(11) DEFAULT NULL COMMENT 'Primary Key of sa_user_group table. Group may be created against org',
  `USERGRP_NAME` varchar(50) DEFAULT NULL COMMENT 'Name of the Group',
  `ACTIVE_STATUS` tinyint(1) DEFAULT '1' COMMENT 'It keeps boolean value representing Active/Inactive. e.g. 1 = Active, 0 = Inactive',
  `CRE_BY` int(10) UNSIGNED DEFAULT NULL,
  `CRE_DT` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UPD_BY` int(10) UNSIGNED DEFAULT NULL,
  `UPD_DT` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Application user divided into multiple group ';

--
-- Dumping data for table `sa_user_group`
--

INSERT INTO `sa_user_group` (`USERGRP_ID`, `ORG_ID`, `USERGRP_NAME`, `ACTIVE_STATUS`, `CRE_BY`, `CRE_DT`, `UPD_BY`, `UPD_DT`) VALUES
(1, 1, 'Administrative', 1, 1, '2017-09-09 06:42:28', NULL, NULL),
(2, 1, 'Thikana Admin', 1, 1, '2017-09-10 04:47:42', NULL, NULL),
(3, 1, 'Test Group', 1, 1, '2017-09-10 05:28:19', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sa_lookup_data`
--
ALTER TABLE `sa_lookup_data`
  ADD PRIMARY KEY (`LOOKUP_DATA_ID`),
  ADD KEY `FK01_LOOKUP_GRP_ID` (`LOOKUP_GRP_ID`);

--
-- Indexes for table `sa_lookup_grp`
--
ALTER TABLE `sa_lookup_grp`
  ADD PRIMARY KEY (`LOOKUP_GRP_ID`);

--
-- Indexes for table `sa_modules`
--
ALTER TABLE `sa_modules`
  ADD PRIMARY KEY (`MODULE_ID`);

--
-- Indexes for table `sa_module_links`
--
ALTER TABLE `sa_module_links`
  ADD PRIMARY KEY (`LINK_ID`),
  ADD KEY `FK_MLINK_MODULE_ID` (`MODULE_ID`);

--
-- Indexes for table `sa_organizations`
--
ALTER TABLE `sa_organizations`
  ADD PRIMARY KEY (`ORG_ID`);

--
-- Indexes for table `sa_org_mlinks`
--
ALTER TABLE `sa_org_mlinks`
  ADD PRIMARY KEY (`SA_MLINKS_ID`),
  ADD KEY `FK02_ORG_ID` (`ORG_ID`),
  ADD KEY `FK01_SA_MODULE_ID` (`SA_MODULE_ID`);

--
-- Indexes for table `sa_org_modules`
--
ALTER TABLE `sa_org_modules`
  ADD PRIMARY KEY (`SA_MODULE_ID`),
  ADD KEY `FK01_ORG_ID` (`ORG_ID`);

--
-- Indexes for table `sa_uglw_mlink`
--
ALTER TABLE `sa_uglw_mlink`
  ADD PRIMARY KEY (`SA_UGLWM_LINK`),
  ADD KEY `FK01_USER_ID` (`USER_ID`),
  ADD KEY `FK02_SA_MODULE_ID` (`SA_MODULE_ID`),
  ADD KEY `FK01_SA_MLINKS_ID` (`SA_MLINKS_ID`),
  ADD KEY `FK02_USERGRP_ID` (`USERGRP_ID`),
  ADD KEY `FK01_UG_LEVEL_ID` (`UG_LEVEL_ID`),
  ADD KEY `FK05_ORG_ID` (`ORG_ID`);

--
-- Indexes for table `sa_ug_level`
--
ALTER TABLE `sa_ug_level`
  ADD PRIMARY KEY (`UG_LEVEL_ID`),
  ADD KEY `FK04_ORG_ID` (`ORG_ID`),
  ADD KEY `FK01_USERGRP_ID` (`USERGRP_ID`);

--
-- Indexes for table `sa_users`
--
ALTER TABLE `sa_users`
  ADD PRIMARY KEY (`USER_ID`),
  ADD KEY `sa_users_ibfk_1` (`USERLVL_ID`),
  ADD KEY `sa_users_ibfk_2` (`USERGRP_ID`),
  ADD KEY `sa_users_ibfk_3` (`ORG_ID`);

--
-- Indexes for table `sa_user_group`
--
ALTER TABLE `sa_user_group`
  ADD PRIMARY KEY (`USERGRP_ID`),
  ADD KEY `FK03_ORG_ID` (`ORG_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sa_lookup_data`
--
ALTER TABLE `sa_lookup_data`
  MODIFY `LOOKUP_DATA_ID` int(8) NOT NULL AUTO_INCREMENT COMMENT 'Primary key of sa_lookup_data table.', AUTO_INCREMENT=254;
--
-- AUTO_INCREMENT for table `sa_lookup_grp`
--
ALTER TABLE `sa_lookup_grp`
  MODIFY `LOOKUP_GRP_ID` tinyint(3) NOT NULL AUTO_INCREMENT COMMENT 'Primary key of sa_lookup_grp table.', AUTO_INCREMENT=53;
--
-- AUTO_INCREMENT for table `sa_modules`
--
ALTER TABLE `sa_modules`
  MODIFY `MODULE_ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Primary Key', AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `sa_module_links`
--
ALTER TABLE `sa_module_links`
  MODIFY `LINK_ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Primary Key', AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `sa_organizations`
--
ALTER TABLE `sa_organizations`
  MODIFY `ORG_ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Primary Key', AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `sa_org_mlinks`
--
ALTER TABLE `sa_org_mlinks`
  MODIFY `SA_MLINKS_ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Primary Key', AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `sa_org_modules`
--
ALTER TABLE `sa_org_modules`
  MODIFY `SA_MODULE_ID` int(7) NOT NULL AUTO_INCREMENT COMMENT 'Primary Key', AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `sa_uglw_mlink`
--
ALTER TABLE `sa_uglw_mlink`
  MODIFY `SA_UGLWM_LINK` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Primary Key', AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `sa_ug_level`
--
ALTER TABLE `sa_ug_level`
  MODIFY `UG_LEVEL_ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Primary Key', AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `sa_users`
--
ALTER TABLE `sa_users`
  MODIFY `USER_ID` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'Primary Key', AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `sa_user_group`
--
ALTER TABLE `sa_user_group`
  MODIFY `USERGRP_ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Primary Key', AUTO_INCREMENT=4;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `sa_lookup_data`
--
ALTER TABLE `sa_lookup_data`
  ADD CONSTRAINT `FK01_LOOKUP_GRP_ID` FOREIGN KEY (`LOOKUP_GRP_ID`) REFERENCES `sa_lookup_grp` (`LOOKUP_GRP_ID`);

--
-- Constraints for table `sa_module_links`
--
ALTER TABLE `sa_module_links`
  ADD CONSTRAINT `FK_MLINK_MODULE_ID` FOREIGN KEY (`MODULE_ID`) REFERENCES `sa_modules` (`MODULE_ID`);

--
-- Constraints for table `sa_org_mlinks`
--
ALTER TABLE `sa_org_mlinks`
  ADD CONSTRAINT `FK01_SA_MODULE_ID` FOREIGN KEY (`SA_MODULE_ID`) REFERENCES `sa_org_modules` (`SA_MODULE_ID`),
  ADD CONSTRAINT `FK02_ORG_ID` FOREIGN KEY (`ORG_ID`) REFERENCES `sa_organizations` (`ORG_ID`);

--
-- Constraints for table `sa_org_modules`
--
ALTER TABLE `sa_org_modules`
  ADD CONSTRAINT `FK01_ORG_ID` FOREIGN KEY (`ORG_ID`) REFERENCES `sa_organizations` (`ORG_ID`);

--
-- Constraints for table `sa_uglw_mlink`
--
ALTER TABLE `sa_uglw_mlink`
  ADD CONSTRAINT `FK01_SA_MLINKS_ID` FOREIGN KEY (`SA_MLINKS_ID`) REFERENCES `sa_org_mlinks` (`SA_MLINKS_ID`),
  ADD CONSTRAINT `FK01_UG_LEVEL_ID` FOREIGN KEY (`UG_LEVEL_ID`) REFERENCES `sa_ug_level` (`UG_LEVEL_ID`),
  ADD CONSTRAINT `FK01_USER_ID` FOREIGN KEY (`USER_ID`) REFERENCES `sa_users` (`USER_ID`),
  ADD CONSTRAINT `FK02_SA_MODULE_ID` FOREIGN KEY (`SA_MODULE_ID`) REFERENCES `sa_org_modules` (`SA_MODULE_ID`),
  ADD CONSTRAINT `FK02_USERGRP_ID` FOREIGN KEY (`USERGRP_ID`) REFERENCES `sa_user_group` (`USERGRP_ID`),
  ADD CONSTRAINT `FK05_ORG_ID` FOREIGN KEY (`ORG_ID`) REFERENCES `sa_organizations` (`ORG_ID`);

--
-- Constraints for table `sa_ug_level`
--
ALTER TABLE `sa_ug_level`
  ADD CONSTRAINT `FK01_USERGRP_ID` FOREIGN KEY (`USERGRP_ID`) REFERENCES `sa_user_group` (`USERGRP_ID`),
  ADD CONSTRAINT `FK04_ORG_ID` FOREIGN KEY (`ORG_ID`) REFERENCES `sa_organizations` (`ORG_ID`);

--
-- Constraints for table `sa_users`
--
ALTER TABLE `sa_users`
  ADD CONSTRAINT `sa_users_ibfk_1` FOREIGN KEY (`USERLVL_ID`) REFERENCES `sa_ug_level` (`UG_LEVEL_ID`),
  ADD CONSTRAINT `sa_users_ibfk_2` FOREIGN KEY (`USERGRP_ID`) REFERENCES `sa_user_group` (`USERGRP_ID`),
  ADD CONSTRAINT `sa_users_ibfk_3` FOREIGN KEY (`ORG_ID`) REFERENCES `sa_organizations` (`ORG_ID`);

--
-- Constraints for table `sa_user_group`
--
ALTER TABLE `sa_user_group`
  ADD CONSTRAINT `FK03_ORG_ID` FOREIGN KEY (`ORG_ID`) REFERENCES `sa_organizations` (`ORG_ID`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
