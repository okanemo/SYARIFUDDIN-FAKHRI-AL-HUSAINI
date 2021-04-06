-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 06 Apr 2021 pada 09.43
-- Versi server: 10.4.14-MariaDB
-- Versi PHP: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nozomu`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `investment_history`
--

CREATE TABLE `investment_history` (
  `id` int(11) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `amount_unit` float NOT NULL,
  `current_unit` float NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `investment_history`
--

INSERT INTO `investment_history` (`id`, `user_id`, `type`, `amount_unit`, `current_unit`, `date`) VALUES
(1, 'c384cfec-69b5-4d53-84d5-5212345d274b', 'topup', 10000, 10000, '2021-04-06 12:23:10'),
(2, 'c384cfec-69b5-4d53-84d5-5212345d274b', 'withdraw', 5000, 5000, '2021-04-06 12:25:50'),
(3, '320f0192-a050-4ad8-9e95-d85de4ddcf7a', 'topup', 5000, 5000, '2021-04-06 14:16:01'),
(4, '320f0192-a050-4ad8-9e95-d85de4ddcf7a', 'withdraw', 1250, 3750, '2021-04-06 14:17:36');

-- --------------------------------------------------------

--
-- Struktur dari tabel `n_a_b_s`
--

CREATE TABLE `n_a_b_s` (
  `id` int(10) UNSIGNED NOT NULL,
  `nab` double(8,2) NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `n_a_b_s`
--

INSERT INTO `n_a_b_s` (`id`, `nab`, `date`) VALUES
(1, 1.00, '2021-04-06 12:16:05'),
(2, 4.00, '2021-04-06 14:12:56');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `user_id`, `username`, `name`, `email`, `password`) VALUES
(1, 'c384cfec-69b5-4d53-84d5-5212345d274b', 'contoh', 'CONTOH', 'contoh@email.com', 'contoh123'),
(2, '320f0192-a050-4ad8-9e95-d85de4ddcf7a', 'okanemo', 'OKANEMO', 'okanemo@email.com', 'okanemopass');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user_units`
--

CREATE TABLE `user_units` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `unit` double(8,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `user_units`
--

INSERT INTO `user_units` (`id`, `user_id`, `unit`) VALUES
(1, 'c384cfec-69b5-4d53-84d5-5212345d274b', 5000.00),
(2, '320f0192-a050-4ad8-9e95-d85de4ddcf7a', 3750.00);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `investment_history`
--
ALTER TABLE `investment_history`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `n_a_b_s`
--
ALTER TABLE `n_a_b_s`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_user_id_unique` (`user_id`),
  ADD UNIQUE KEY `users_username_unique` (`username`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indeks untuk tabel `user_units`
--
ALTER TABLE `user_units`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_units_user_id_foreign` (`user_id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `investment_history`
--
ALTER TABLE `investment_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `n_a_b_s`
--
ALTER TABLE `n_a_b_s`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `user_units`
--
ALTER TABLE `user_units`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `user_units`
--
ALTER TABLE `user_units`
  ADD CONSTRAINT `user_units_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
