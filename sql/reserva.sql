-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-04-2016 a las 01:00:20
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `reserva`
--

INSERT INTO `reserva` (`fechaInicio`, `hora`, `motivo`, `estado`, `servicio_codigo`, `usuario_codigo`, `codigo`) VALUES
('2016-03-22', '10:00 - 11:00', 'Practicas de volleyball', 1, 3, 1, 1),
('2016-03-30', '8:00 - 9:00', 'desmotacion', 0, 2, 3, 2),
('2016-04-05', '8:00 - 9:00 ', 'desmostracion', 0, 4, 3, 3),
('2016-04-09', '9:00 - 10:00', 'demostracion', 0, 2, 3, 4),
('2016-03-30', '8:00 - 9:00', 'demostracion', 0, 5, 3, 5),
('2016-03-21', '10:00 - 11:00', 'demostracion', 1, 6, 3, 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicio`
--

CREATE TABLE IF NOT EXISTS `servicio` (
`codigo` int(11) NOT NULL,
  `nombre` varchar(45) COLLATE utf8_bin NOT NULL,
  `descripcion` text COLLATE utf8_bin NOT NULL,
  `estado` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `servicio`
--

INSERT INTO `servicio` (`codigo`, `nombre`, `descripcion`, `estado`) VALUES
(1, 'CANCHA DE TENNIS', 'Cancha TENNIS', 1),
(2, 'CANCHA RAQUET', 'Cancha Raquet', 0),
(3, 'CANCHA FUTBOL', 'Cancha Futbol', 1),
(4, 'CANCHA FRONTON', 'Cancha Fronton', 1),
(5, 'CLASE NATACION', 'Clase natacion', 1),
(6, 'CLASE BOXEO', 'Clase Boxeo', 0),
(7, 'CLASE TAEKWONDO', 'Arte marcial', 1),
(8, 'MASAJE - SPA', 'SPA', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipousuario`
--

CREATE TABLE IF NOT EXISTS `tipousuario` (
`id` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `descripcion` tinytext NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tipousuario`
--

INSERT INTO `tipousuario` (`id`, `nombre`, `descripcion`) VALUES
(1, 'administrador', 'Usuario con privilegios de permisos sobre el sistema y la administracion de acceso, cuentas, reservas, etc.'),
(2, 'empleado', 'Usuario con privilegios de reservas, registro de clientes, administracion de servicios.'),
(3, 'cliente', 'Usuario con privilegios de reservas sobre servicios, administracion de la informacion de su perfil.');

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
  `estado` int(11) NOT NULL DEFAULT '0',
  `nick` varchar(45) COLLATE utf8_bin NOT NULL,
  `contrasenia` varchar(700) COLLATE utf8_bin NOT NULL,
  `tipousuario_id` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`codigo`, `ci`, `nombre`, `apellido`, `correo`, `telefono`, `estado`, `nick`, `contrasenia`, `tipousuario_id`) VALUES
(1, '7734247', 'gildder', 'guerrero ramirez', 'gildder@gmail.com', '70991648', 1, 'Gildder', 'gildder', 1),
(2, '8977837', 'mario', 'vega martinez', 'mario@gmail.com', '79890987', 1, 'mario', 'gildder', 2),
(3, '5632738', 'diana', 'soto lopez', 'diana@gmail.com', '60991638', 1, 'diana', 'gildder', 3),
(5, '8394839', 'jose', 'vega', 'jose@gmail.com', '8493489', 0, 'jose', 'gildder', 3),
(6, '7348738', 'carlos', 'vega', 'carlos@gmail.com', '8349839', 0, 'carlos', 'gildder', 3),
(7, '7483743', 'maria', 'mercedez', 'maria@hotmail.com', '78237374', 1, 'mari2', 'gildder', 3),
(8, '848348', 'pedro', 'vega', 'pedro@hotmail.com', '389283', 0, 'pedro', 'gildder', 3),
(9, '894549989', 'pepe', 'mariano', 'pepe@gmail.com', '748374', 0, '', 'd41d8cd98f00b204e9800998ecf8427e', 2);

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
MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT de la tabla `servicio`
--
ALTER TABLE `servicio`
MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT de la tabla `tipousuario`
--
ALTER TABLE `tipousuario`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=10;
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
