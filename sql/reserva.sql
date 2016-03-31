-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 31-03-2016 a las 02:54:00
-- Versión del servidor: 5.6.21
-- Versión de PHP: 5.6.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `reserva`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reserva`
--

CREATE TABLE IF NOT EXISTS `reserva` (
  `fechaInicio` date NOT NULL,
  `hora` varchar(20) COLLATE utf8_bin NOT NULL,
  `motivo` varchar(45) COLLATE utf8_bin NOT NULL,
  `estado` int(11) NOT NULL,
  `servicio_codigo` int(11) NOT NULL,
  `usuario_codigo` int(11) NOT NULL,
`codigo` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `reserva`
--

INSERT INTO `reserva` (`fechaInicio`, `hora`, `motivo`, `estado`, `servicio_codigo`, `usuario_codigo`, `codigo`) VALUES
('2016-03-22', '10:00 - 11:00', 'Practicas de volleyball', 0, 3, 1, 1),
('2016-03-06', '8:00 - 9:00', 'desmotacion', 0, 2, 1, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicio`
--

CREATE TABLE IF NOT EXISTS `servicio` (
`codigo` int(11) NOT NULL,
  `nombre` varchar(45) COLLATE utf8_bin NOT NULL,
  `descripcion` text COLLATE utf8_bin NOT NULL,
  `estado` int(11) NOT NULL,
  `fechaCreacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `fechaModificacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `servicio`
--

INSERT INTO `servicio` (`codigo`, `nombre`, `descripcion`, `estado`, `fechaCreacion`, `fechaModificacion`) VALUES
(1, 'CANCHA DE TENNIS', 'Cancha TENNIS', 1, '2016-03-23 00:54:50', '2016-03-30 21:09:28'),
(2, 'CANCHA RAQUET', 'Cancha Raquet', 0, '2016-03-23 00:56:14', '2016-03-23 00:56:14'),
(3, 'CANCHA FUTBOL', 'Cancha Futbol', 1, '2016-03-23 00:56:46', '2016-03-30 21:09:28'),
(4, 'CANCHA FRONTON', 'Cancha Fronton', 0, '2016-03-23 00:57:50', '2016-03-23 00:57:50'),
(5, 'CLASE NATACION', 'Clase natacion', 1, '2016-03-23 01:01:41', '2016-03-30 21:09:28'),
(6, 'CLASE BOXEO', 'Clase Boxeo', 0, '2016-03-23 01:02:03', '2016-03-23 01:02:03'),
(7, 'CLASE TAEKWONDO', 'Arte marcial', 1, '2016-03-23 01:02:39', '2016-03-30 21:09:28'),
(8, 'MASAJE - SPA', 'SPA', 1, '2016-03-23 01:03:26', '2016-03-30 21:09:28');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipousuario`
--

CREATE TABLE IF NOT EXISTS `tipousuario` (
`id` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `descripcion` tinytext NOT NULL,
  `fechaCreacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `fechaModificacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tipousuario`
--

INSERT INTO `tipousuario` (`id`, `nombre`, `descripcion`, `fechaCreacion`, `fechaModificacion`) VALUES
(1, 'administrador', 'Usuario con privilegios de permisos sobre el sistema y la administracion de acceso, cuentas, reservas, etc.', '2016-03-30 20:17:28', '2016-03-30 20:17:28'),
(2, 'empleado', 'Usuario con privilegios de reservas, registro de clientes, administracion de servicios.', '2016-03-30 20:17:28', '2016-03-30 20:17:28'),
(3, 'cliente', 'Usuario con privilegios de reservas sobre servicios, administracion de la informacion de su perfil.', '2016-03-30 20:17:28', '2016-03-30 20:17:28');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE IF NOT EXISTS `usuario` (
`codigo` int(11) NOT NULL,
  `ci` varchar(45) COLLATE utf8_bin NOT NULL,
  `nombre` varchar(45) COLLATE utf8_bin NOT NULL,
  `apellido` varchar(45) COLLATE utf8_bin NOT NULL,
  `correo` varchar(45) COLLATE utf8_bin NOT NULL,
  `telefono` varchar(20) COLLATE utf8_bin NOT NULL,
  `estado` int(11) NOT NULL,
  `nick` varchar(45) COLLATE utf8_bin NOT NULL,
  `contrasenia` varchar(700) COLLATE utf8_bin NOT NULL,
  `tipousuario_id` int(11) NOT NULL,
  `fechaCreacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `fechaModificacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`codigo`, `ci`, `nombre`, `apellido`, `correo`, `telefono`, `estado`, `nick`, `contrasenia`, `tipousuario_id`, `fechaCreacion`, `fechaModificacion`) VALUES
(1, '7734247', 'gildder', 'guerrero ramirez', 'gildder@gmail.com', '70991648', 1, 'Gildder', 'gildder', 1, '2016-03-23 11:43:22', '2016-03-30 21:49:19');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `reserva`
--
ALTER TABLE `reserva`
 ADD PRIMARY KEY (`codigo`), ADD KEY `fk_reserva_servicio1_idx` (`servicio_codigo`), ADD KEY `fk_reserva_usuario1_idx` (`usuario_codigo`);

--
-- Indices de la tabla `servicio`
--
ALTER TABLE `servicio`
 ADD PRIMARY KEY (`codigo`);

--
-- Indices de la tabla `tipousuario`
--
ALTER TABLE `tipousuario`
 ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
 ADD PRIMARY KEY (`codigo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `reserva`
--
ALTER TABLE `reserva`
MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `servicio`
--
ALTER TABLE `servicio`
MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT de la tabla `tipousuario`
--
ALTER TABLE `tipousuario`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `reserva`
--
ALTER TABLE `reserva`
ADD CONSTRAINT `fk_reserva_servicio1` FOREIGN KEY (`servicio_codigo`) REFERENCES `servicio` (`codigo`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_reserva_usuario1` FOREIGN KEY (`usuario_codigo`) REFERENCES `usuario` (`codigo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
