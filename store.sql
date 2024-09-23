-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 23, 2024 at 11:02 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `store`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `admin_id` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `admin_id`, `email`, `password`) VALUES
(1, 'admin66f127bf4dae95.10026649', 'admin@ksa.com', '$2y$10$HjUfg0dcKA76lvrUUrqD2.wMjS0xbfFHia4ATqdd0z7r1KRHTN93C');

-- --------------------------------------------------------

--
-- Table structure for table `complaints`
--

CREATE TABLE `complaints` (
  `id` int(11) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `complaint` text NOT NULL,
  `submitted_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `seller_id` varchar(255) NOT NULL,
  `product_id` varchar(255) NOT NULL,
  `product_name` varchar(50) NOT NULL,
  `total_price` float NOT NULL,
  `username` varchar(255) NOT NULL,
  `phone_number` int(20) NOT NULL,
  `quantity` int(2) NOT NULL,
  `ordered_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `product_id` varchar(255) NOT NULL,
  `category` varchar(50) NOT NULL,
  `product_name` varchar(50) NOT NULL,
  `product_description` text NOT NULL,
  `price` varchar(15) NOT NULL,
  `image_path` varchar(255) NOT NULL,
  `seller_id` varchar(255) NOT NULL,
  `seller_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `product_id`, `category`, `product_name`, `product_description`, `price`, `image_path`, `seller_id`, `seller_name`) VALUES
(4, 'product_66f12b05188839.03593103', 'meal', 'المنسف', 'لذيذ ', '10', 'uploads/img_66f12b05187ba.jpg', 'seller66f089f4d9cff2.27285535', 'Youssef Mustafa Fawzy'),
(5, 'product_66f12cbf57f973.80406411', 'meal', 'المكبوس', 'لذيذ', '20', 'uploads/img_66f12cbf57f13.jpg', 'seller66f089f4d9cff2.27285535', 'Youssef Mustafa Fawzy'),
(6, 'product_66f12cd5b2ec64.33521249', 'meal', 'المفطح', 'لذيذ جدا', '15', 'uploads/img_66f12cd5b2deb.jpg', 'seller66f089f4d9cff2.27285535', 'Youssef Mustafa Fawzy'),
(7, 'product_66f12ced633816.95807035', 'meal', 'المطازيز', 'جدا شهية', '20', 'uploads/img_66f12ced632ef.jpg', 'seller66f089f4d9cff2.27285535', 'Youssef Mustafa Fawzy'),
(8, 'product_66f12d018acd14.36120960', 'meal', 'الكبسة', 'في جلبك', '30', 'uploads/img_66f12d018ac2a.jpg', 'seller66f089f4d9cff2.27285535', 'Youssef Mustafa Fawzy'),
(9, 'product_66f12d1901c265.27944649', 'meal', 'القوزي', 'طعم جبار', '50', 'uploads/img_66f12d1901b88.jpg', 'seller66f089f4d9cff2.27285535', 'Youssef Mustafa Fawzy'),
(10, 'product_66f12d37396cd9.90494899', 'meal', 'الأرز الحساوي', 'يكتسح أنواع الأرز جميعهم', '40', 'uploads/img_66f12d373962d.jpg', 'seller66f089f4d9cff2.27285535', 'Youssef Mustafa Fawzy'),
(11, 'product_66f12e96e7cc88.27371500', 'dessert', 'الكليجة', 'أحلى من العسل', '9', 'uploads/img_66f12e96e7bee.jpg', 'seller66f089f4d9cff2.27285535', 'Youssef Mustafa Fawzy'),
(12, 'product_66f12ebb4698d0.61921618', 'dessert', 'اللقيمات', 'لذيذة جدا', '12', 'uploads/img_66f12ebb468ca.jpg', 'seller66f089f4d9cff2.27285535', 'Youssef Mustafa Fawzy'),
(13, 'product_66f12ee42a5436.21927999', 'dessert', 'العصيدة', 'حلوى من التراث الأصيل', '24', 'uploads/img_66f12ee42a4b0.jpg', 'seller66f089f4d9cff2.27285535', 'Youssef Mustafa Fawzy'),
(14, 'product_66f12f1a3a6f76.13417031', 'dessert', 'الحنيني', 'من اشهى الاطباق السعودية تتميز بمذاقها الرائع ، و سهولة تحضيرها . و هي مشهورة من الاكلات السعودية في رمضان ', '60', 'uploads/img_66f12f1a3a634.jpg', 'seller66f089f4d9cff2.27285535', 'Youssef Mustafa Fawzy'),
(15, 'product_66f12fb3b80456.50883074', 'drink', 'القهوة العربية', 'أفضل مذاق وأجود أنواع البن. إنها القهوة العربية السعودية', '7', 'uploads/img_66f12fb3b7fc3.jpg', 'seller66f089f4d9cff2.27285535', 'Youssef Mustafa Fawzy');

-- --------------------------------------------------------

--
-- Table structure for table `sellers`
--

CREATE TABLE `sellers` (
  `id` int(11) NOT NULL,
  `sellers_id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` enum('active','inactive') NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `reference_number` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sellers`
--

INSERT INTO `sellers` (`id`, `sellers_id`, `name`, `email`, `password`, `status`, `phone_number`, `reference_number`) VALUES
(3, 'seller66f089f4d9cff2.27285535', 'Youssef Mustafa Fawzy', 'admin@ksa.com', '$2y$10$HjUfg0dcKA76lvrUUrqD2.wMjS0xbfFHia4ATqdd0z7r1KRHTN93C', 'active', '1061953831', '356sd5f465fd6sd65f4s6f54s6f54');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `users_id` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` enum('active','inactive') NOT NULL,
  `phone_number` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `users_id`, `email`, `password`, `name`, `status`, `phone_number`) VALUES
(2, 'user66f08694ef82c0.92199902', 'admin@ksa.com', '$2y$10$HjUfg0dcKA76lvrUUrqD2.wMjS0xbfFHia4ATqdd0z7r1KRHTN93C', 'Youssef Mustafa Fawzy', 'active', '1061953831');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `complaints`
--
ALTER TABLE `complaints`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `seller_id` (`seller_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `seller_id` (`seller_id`);

--
-- Indexes for table `sellers`
--
ALTER TABLE `sellers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sellers_id` (`sellers_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `users_id` (`users_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `complaints`
--
ALTER TABLE `complaints`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `sellers`
--
ALTER TABLE `sellers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `complaints`
--
ALTER TABLE `complaints`
  ADD CONSTRAINT `complaints_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`users_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`users_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`seller_id`) REFERENCES `sellers` (`sellers_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`seller_id`) REFERENCES `sellers` (`sellers_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
