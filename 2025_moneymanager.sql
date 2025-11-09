-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Nov 02. 21:18
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12
 
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";
 
 
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
 
--
-- Adatbázis: `2025_moneymanager`
--
 
-- --------------------------------------------------------
 
--
-- Tábla szerkezet ehhez a táblához `categories`
--
 
CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;
 
--
-- A tábla adatainak kiíratása `categories`
--
 
INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'Fizetés'),
(2, 'Bevásárlás'),
(3, 'Szórakozás'),
(4, 'Lakbér'),
(5, 'Közlekedés'),
(6, 'Egyéb');
 
-- --------------------------------------------------------
 
--
-- Tábla szerkezet ehhez a táblához `transactions`
--
 
CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `wallet_id` int(11) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `amount` decimal(12,2) NOT NULL,
  `note` varchar(255) DEFAULT NULL,
  `date` date NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;
 
--
-- A tábla adatainak kiíratása `transactions`
--
 
INSERT INTO `transactions` (`id`, `user_id`, `wallet_id`, `category_id`, `amount`, `note`, `date`, `created_at`) VALUES
(1, 1, 1, 1, 300000.00, 'Októberi fizetés', '2025-10-28', '2025-11-02 20:17:34'),
(2, 1, 1, 2, -20000.00, 'Bevásárlás a boltban', '2025-10-30', '2025-11-02 20:17:34'),
(3, 1, 2, 6, 10000.00, 'Kamat jóváírás', '2025-11-01', '2025-11-02 20:17:34'),
(4, 2, 3, 4, -80000.00, 'Lakbér befizetés', '2025-10-25', '2025-11-02 20:17:34'),
(5, 3, 4, 3, -5000.00, 'Mozi jegy', '2025-10-26', '2025-11-02 20:17:34'),
(6, 3, 4, 5, -2000.00, 'Buszjegy', '2025-10-27', '2025-11-02 20:17:34');
 
-- --------------------------------------------------------
 
--
-- Tábla szerkezet ehhez a táblához `users`
--
 
CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;
 
--
-- A tábla adatainak kiíratása `users`
--
 
INSERT INTO `users` (`id`, `name`, `email`, `password`, `created_at`) VALUES
(1, 'Teszt Elek', 'teszt@pelda.hu', '$2b$10$abcdefghijklmnopqrstuv', '2025-11-02 20:17:03'),
(2, 'Kovács Anna', 'anna@pelda.hu', '$2b$10$qwertzuiopasdfghjklxcv', '2025-11-02 20:17:03'),
(3, 'Nagy Béla', 'bela@pelda.hu', '$2b$10$1234567890qwertyuiopas', '2025-11-02 20:17:03');
 
-- --------------------------------------------------------
 
--
-- Tábla szerkezet ehhez a táblához `wallets`
--
 
CREATE TABLE `wallets` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `balance` decimal(12,2) DEFAULT 0.00,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;
 
--
-- A tábla adatainak kiíratása `wallets`
--
 
INSERT INTO `wallets` (`id`, `user_id`, `name`, `balance`, `created_at`) VALUES
(1, 1, 'Fő pénztárca', 150000.00, '2025-11-02 20:17:17'),
(2, 1, 'Megtakarítás', 500000.00, '2025-11-02 20:17:17'),
(3, 2, 'Fizetéses számla', 230000.00, '2025-11-02 20:17:17'),
(4, 3, 'Készpénz', 20000.00, '2025-11-02 20:17:17');
 
--
-- Indexek a kiírt táblákhoz
--
 
--
-- A tábla indexei `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);
 
--
-- A tábla indexei `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `wallet_id` (`wallet_id`),
  ADD KEY `category_id` (`category_id`);
 
--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);
 
--
-- A tábla indexei `wallets`
--
ALTER TABLE `wallets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);
 
--
-- A kiírt táblák AUTO_INCREMENT értéke
--
 
--
-- AUTO_INCREMENT a táblához `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
 
--
-- AUTO_INCREMENT a táblához `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
 
--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
 
--
-- AUTO_INCREMENT a táblához `wallets`
--
ALTER TABLE `wallets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
 
--
-- Megkötések a kiírt táblákhoz
--
 
--
-- Megkötések a táblához `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `transactions_ibfk_2` FOREIGN KEY (`wallet_id`) REFERENCES `wallets` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `transactions_ibfk_3` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL;
 
--
-- Megkötések a táblához `wallets`
--
ALTER TABLE `wallets`
  ADD CONSTRAINT `wallets_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;
 
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
