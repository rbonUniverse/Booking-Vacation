-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 25, 2022 at 10:17 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacationBooking`
--
CREATE DATABASE IF NOT EXISTS `vacationBooking` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `vacationBooking`;

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `userId` int(11) NOT NULL,
  `vacationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`userId`, `vacationId`) VALUES
(5, 30),
(5, 31);

-- --------------------------------------------------------

--
-- Table structure for table `rolls`
--

CREATE TABLE `rolls` (
  `roleId` int(5) NOT NULL,
  `roleName` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `rolls`
--

INSERT INTO `rolls` (`roleId`, `roleName`) VALUES
(2, 'Admin'),
(1, 'User');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(150) NOT NULL,
  `roleId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `username`, `password`, `roleId`) VALUES
(4, 'Asaf', 'Fink', 'AsaFink', 'df124c0fbecc3f223bfca5eeb374dc6185cd81bf4b667d72cfc9452c39a70d58408eda8151843dda1f0d1c721cb684061a4d612643f85325cf4487ae36f3e4c1', 2),
(5, 'Eran', 'Zigi', 'eranZ', '8eeb0499ba8f485a9c9376a95208deffeeb3c24aa0ee9729c96cfeec9019ec71131108b6fc3d80496bc64dfff7e0bead63a75d0040f56249d3f6fa9e6c924f39', 1);

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationId` int(11) NOT NULL,
  `description` varchar(500) NOT NULL,
  `destination` varchar(50) NOT NULL,
  `imageName` varchar(250) NOT NULL,
  `departDate` date NOT NULL,
  `returnDate` date NOT NULL,
  `price` decimal(6,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `description`, `destination`, `imageName`, `departDate`, `returnDate`, `price`) VALUES
(30, 'Universally adored, Italy is food, is weather, is history. There’s always something different to fall head over heels for in the boot-shaped nation. Travel packages to Italy tend to start in the historic cities—Rome, Florence, Venice or Milan—where elegant design, Roman architecture, and sophisticated hotels reign supreme. Wherever you head, it’s guaranteed to be wonderful!', 'Italy', '1d78570d-5af8-48b4-b8f8-6908360a7b2c.jpeg', '2022-11-30', '2022-12-07', '467.00'),
(31, 'It may be small, but Puerto Rico is perfectly formed and packs a personality punch. Puerto Rico known for the beautiful beaches and turquoise shores of the Caribbean. For relaxed resort fun, check out the sunsets on the west coast, or to see the world\'s brightest bioluminescent bay.', 'Puerto Rico', '034580dd-30cd-4749-9747-3c3589b88c99.jpeg', '2023-01-10', '2023-01-28', '348.00'),
(32, 'Head south of the border to find all-inclusive vacations in Mexico that offer an endless array of things to do, including a thriving nightlife, inviting beaches, and fascinating historical sites. With all-inclusive package deals, you can find relaxation and luxury whether you choose to stay in the city or the countryside.', 'Mexico', '75ab0ba5-3b6e-46d6-bcb0-938e2ede1d6c.webp', '2023-03-19', '2023-04-06', '1100.00'),
(33, 'Get away to Greece on a vacation full of awesome ancient history. This laidback Mediterranean gem, one-time home to thinkers Aristotle and Hippocrates, can be a relaxed beach vacation or an educational family adventure.', 'Greece', '0f03614a-ef42-4f08-96b8-e1def2ef9cd9.jpeg', '2022-12-10', '2022-12-13', '330.00'),
(34, 'Cool Britain is on full display on the streets of Brixton, Notting Hill, and Camden where you can sit in a pub for a pint and people watch. Britain vacation give you a lifetime of memories exploring Britain’s iconic landmarks.', 'Britain', '4e371d88-9ca9-48ef-97f7-97f4174d65e5.jpeg', '2023-05-16', '2023-06-13', '890.00'),
(35, 'Colombia is a friendly country with immense geographical and cultural diversity. Relax on palm-lined beaches, hike through coffee plantations, spot wildlife amid lush rainforests and experience festive culture.', 'Colombia', 'af4f24a2-8f99-479e-8975-029d89054164.jpeg', '2023-01-01', '2023-01-23', '1350.00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD PRIMARY KEY (`userId`,`vacationId`),
  ADD KEY `userId` (`userId`),
  ADD KEY `vacationId` (`vacationId`);

--
-- Indexes for table `rolls`
--
ALTER TABLE `rolls`
  ADD PRIMARY KEY (`roleId`),
  ADD KEY `roleName` (`roleName`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD KEY `authId` (`roleId`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `rolls`
--
ALTER TABLE `rolls`
  MODIFY `roleId` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `rolls` (`roleId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
