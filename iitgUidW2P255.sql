-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Mar 26, 2013 at 06:36 AM
-- Server version: 5.5.27
-- PHP Version: 5.4.7

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `iitgUidW2P`
--

-- --------------------------------------------------------

--
-- Table structure for table `allResidents`
--

CREATE TABLE IF NOT EXISTS `allResidents` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(15) NOT NULL COMMENT 'randomINT',
  `name` varchar(255) NOT NULL,
  `gender` enum('male','female') NOT NULL,
  `type` enum('stud','fac','staff','other') NOT NULL,
  `emergencyPh` varchar(15) NOT NULL,
  `photo` longblob NOT NULL COMMENT '1 mb max size',
  `dob` date NOT NULL,
  `fbLink` varchar(255) DEFAULT NULL,
  `personalPh` varchar(15) DEFAULT NULL,
  `privilegeNum` binary(60) NOT NULL,
  `interestedIn` text NOT NULL,
  `bloodGroup` enum('AB+','AB-','O-','O+','A+','A-','B+','B-','O+','O-','other') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uid_2` (`uid`),
  KEY `uid` (`uid`,`type`),
  KEY `type` (`type`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

-- --------------------------------------------------------

--
-- Table structure for table `faculty`
--

CREATE TABLE IF NOT EXISTS `faculty` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(15) NOT NULL,
  `webmailId` varchar(100) NOT NULL,
  `dept` varchar(100) NOT NULL,
  `post` enum('assistant prof','associate prof','prof') NOT NULL,
  `homepageLink` varchar(100) DEFAULT NULL,
  `officePh` int(10) NOT NULL,
  `blockNo` varchar(10) NOT NULL,
  `houseNo` varchar(10) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `webmailId` (`webmailId`,`officePh`),
  UNIQUE KEY `uid` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `loginDetails`
--

CREATE TABLE IF NOT EXISTS `loginDetails` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(15) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uid` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE IF NOT EXISTS `post` (
  `id` int(6) NOT NULL AUTO_INCREMENT COMMENT 'for mapping table of privileges',
  `postName` varchar(100) NOT NULL,
  `webmailID` varchar(100) DEFAULT NULL,
  `holderUid` int(15) DEFAULT NULL,
  `postPrivilege` binary(60) NOT NULL,
  `section` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `postId` (`id`),
  KEY `holderUid` (`holderUid`),
  KEY `holderUid_2` (`holderUid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `relationship`
--

CREATE TABLE IF NOT EXISTS `relationship` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(15) NOT NULL,
  `relatedtoUid` int(15) NOT NULL,
  `relname` varchar(100) NOT NULL,
  `relnameInverse` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uid` (`uid`),
  KEY `relatedtoUid` (`relatedtoUid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE IF NOT EXISTS `staff` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(15) NOT NULL,
  `webmailId` varchar(100) NOT NULL,
  `address` varchar(1000) NOT NULL,
  `post` varchar(100) NOT NULL,
  `section` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `webmailId` (`webmailId`),
  UNIQUE KEY `uid` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE IF NOT EXISTS `student` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(15) NOT NULL,
  `webmailId` varchar(100) NOT NULL,
  `hostel` varchar(32) NOT NULL,
  `roomNo` varchar(10) NOT NULL,
  `rollNo` varchar(14) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `webamilId` (`webmailId`,`rollNo`),
  UNIQUE KEY `uid_3` (`uid`),
  KEY `uid` (`uid`),
  KEY `webamilId_2` (`webmailId`),
  KEY `hostel` (`hostel`),
  KEY `hostel_2` (`hostel`),
  KEY `hostel_3` (`hostel`),
  KEY `hostel_4` (`hostel`),
  KEY `webamilId_3` (`webmailId`),
  KEY `uid_2` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `vehicle`
--

CREATE TABLE IF NOT EXISTS `vehicle` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `regNo` varchar(15) NOT NULL,
  `type` varchar(100) NOT NULL,
  `owneruid` int(15) NOT NULL,
  `instiRegNo` varchar(15) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `regNo` (`regNo`),
  KEY `owneruid` (`owneruid`),
  KEY `owneruid_2` (`owneruid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `faculty`
--
ALTER TABLE `faculty`
  ADD CONSTRAINT `faculty_ibfk_3` FOREIGN KEY (`uid`) REFERENCES `allResidents` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `post_ibfk_3` FOREIGN KEY (`holderUid`) REFERENCES `allResidents` (`uid`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `relationship`
--
ALTER TABLE `relationship`
  ADD CONSTRAINT `relationship_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `allResidents` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `relationship_ibfk_2` FOREIGN KEY (`relatedtoUid`) REFERENCES `allResidents` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `staff`
--
ALTER TABLE `staff`
  ADD CONSTRAINT `staff_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `allResidents` (`uid`) ON DELETE CASCADE;

--
-- Constraints for table `student`
--
ALTER TABLE `student`
  ADD CONSTRAINT `student_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `allResidents` (`uid`) ON DELETE CASCADE;

--
-- Constraints for table `vehicle`
--
ALTER TABLE `vehicle`
  ADD CONSTRAINT `vehicle_ibfk_2` FOREIGN KEY (`owneruid`) REFERENCES `allResidents` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;