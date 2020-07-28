-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Gostitelj: 127.0.0.1
-- Čas nastanka: 13. apr 2020 ob 00.26
-- Različica strežnika: 10.1.38-MariaDB
-- Različica PHP: 7.3.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Zbirka podatkov: `aiitchat`
--
CREATE DATABASE IF NOT EXISTS `aiitchat` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `aiitchat`;

-- --------------------------------------------------------

--
-- Struktura tabele `groups`
--

CREATE TABLE `groups` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Odloži podatke za tabelo `groups`
--

INSERT INTO `groups` (`id`, `name`) VALUES
(1, 'Group1'),
(2, 'HelloWorld');

-- --------------------------------------------------------

--
-- Struktura tabele `groupsuser`
--

CREATE TABLE `groupsuser` (
  `id` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `groupid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Odloži podatke za tabelo `groupsuser`
--

INSERT INTO `groupsuser` (`id`, `userid`, `groupid`) VALUES
(1, 1, 1),
(2, 2, 1);

-- --------------------------------------------------------

--
-- Struktura tabele `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `fuser` int(11) NOT NULL,
  `tuser` int(11) NOT NULL,
  `message` varchar(200) NOT NULL,
  `stime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `rtime` datetime DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `isgroup` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Odloži podatke za tabelo `messages`
--

INSERT INTO `messages` (`id`, `fuser`, `tuser`, `message`, `stime`, `rtime`, `status`, `isgroup`) VALUES
(1, 2, 1, 'Yo dude!', '2020-04-12 19:41:51', '2020-04-12 23:00:03', 1, 0),
(2, 1, 2, 'Hello Mister!', '2020-04-12 19:41:59', '2020-04-12 23:39:29', 1, 0),
(3, 1, 2, 'Hello Mister!', '2020-04-12 19:42:07', '2020-04-12 23:43:26', 1, 0),
(4, 2, 1, 'Heehe', '2020-04-12 19:42:13', '2020-04-12 23:57:30', 1, 0),
(5, 1, 2, 'Hohoo', '2020-04-12 19:42:20', '2020-04-12 23:57:30', 1, 0),
(6, 2, 1, 'Group chat working', '2020-04-12 20:47:41', '2020-04-13 00:02:36', 1, 1),
(7, 1, 2, 'Haha hey', '2020-04-12 22:01:51', '2020-04-13 00:02:00', 1, 0),
(8, 2, 1, 'Yo my dude', '2020-04-12 22:05:36', '2020-04-13 00:05:42', 1, 0),
(9, 2, 1, 'abc', '2020-04-12 22:06:09', '2020-04-13 00:06:13', 1, 0);

-- --------------------------------------------------------

--
-- Struktura tabele `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `passwd` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Odloži podatke za tabelo `user`
--

INSERT INTO `user` (`id`, `name`, `passwd`) VALUES
(1, 'Adrian', 'f8959ab7449b3d4e5cf7f824fbfde343256dadb90359cc84c93d713b8466810e'),
(2, 'Peter', '3e2e0aabcefdcb8971282c913a1ce1f71692f613012a7f18ab22911b92090b18');

--
-- Indeksi zavrženih tabel
--

--
-- Indeksi tabele `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`id`);

--
-- Indeksi tabele `groupsuser`
--
ALTER TABLE `groupsuser`
  ADD PRIMARY KEY (`id`);

--
-- Indeksi tabele `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Indeksi tabele `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT zavrženih tabel
--

--
-- AUTO_INCREMENT tabele `groups`
--
ALTER TABLE `groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT tabele `groupsuser`
--
ALTER TABLE `groupsuser`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT tabele `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT tabele `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
