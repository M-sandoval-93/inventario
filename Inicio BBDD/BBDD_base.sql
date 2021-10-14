/*!40101 SET NAMES utf8 */;
/*!40014 SET FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/ inventario /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE inventario;

DROP TABLE IF EXISTS bitacora;
CREATE TABLE `bitacora` (
  `id_registro` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_entrada` datetime NOT NULL,
  `fecha_salida` datetime NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `estado_sesion` int(11) NOT NULL,
  PRIMARY KEY (`id_registro`),
  KEY `bitacora_id_usuario_fk` (`id_usuario`),
  CONSTRAINT `bitacora_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

DROP TABLE IF EXISTS departamentos;
CREATE TABLE `departamentos` (
  `id_departamento` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_departamento` varchar(50) COLLATE utf8mb4_spanish_ci NOT NULL,
  PRIMARY KEY (`id_departamento`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

DROP TABLE IF EXISTS detalle_movimientos;
CREATE TABLE `detalle_movimientos` (
  `id_registro` int(11) NOT NULL AUTO_INCREMENT,
  `id_registro_movimiento` int(11) NOT NULL,
  `id_recurso` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  PRIMARY KEY (`id_registro`),
  KEY `dm_id_registro_movimiento_fk` (`id_registro_movimiento`),
  KEY `dm_id_recursos_fk` (`id_recurso`),
  CONSTRAINT `detalle_movimientos_ibfk_1` FOREIGN KEY (`id_registro_movimiento`) REFERENCES `movimientos` (`id_registro`),
  CONSTRAINT `detalle_movimientos_ibfk_2` FOREIGN KEY (`id_recurso`) REFERENCES `recursos` (`id_recurso`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

DROP TABLE IF EXISTS estado_recursos;
CREATE TABLE `estado_recursos` (
  `id_estado` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion_estado_recursos` varchar(50) COLLATE utf8mb4_spanish_ci NOT NULL,
  PRIMARY KEY (`id_estado`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

DROP TABLE IF EXISTS familia_recursos;
CREATE TABLE `familia_recursos` (
  `id_familia` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_familia_recursos` varchar(80) COLLATE utf8mb4_spanish_ci NOT NULL,
  PRIMARY KEY (`id_familia`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

DROP TABLE IF EXISTS movimientos;
CREATE TABLE `movimientos` (
  `id_registro` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_movimiento` datetime NOT NULL,
  `id_tipo_movimiento` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  PRIMARY KEY (`id_registro`),
  KEY `movimientos_id_tipo_movimiento_fk` (`id_tipo_movimiento`),
  KEY `movimientos_id_usuario_fk` (`id_usuario`),
  CONSTRAINT `movimientos_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON UPDATE CASCADE,
  CONSTRAINT `movimientos_ibfk_2` FOREIGN KEY (`id_tipo_movimiento`) REFERENCES `tipo_movimiento` (`id_tipo_movimiento`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

DROP TABLE IF EXISTS recursos;
CREATE TABLE `recursos` (
  `id_recurso` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion_recurso` varchar(80) COLLATE utf8mb4_spanish_ci NOT NULL,
  `id_familia` int(11) NOT NULL,
  `id_estado` int(11) NOT NULL,
  `fungible` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  PRIMARY KEY (`id_recurso`),
  KEY `recursos_id_familia_fk` (`id_familia`),
  KEY `recursos_id_estado_fk` (`id_estado`),
  KEY `recursos_id_usuario_fk` (`id_usuario`),
  CONSTRAINT `recursos_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON UPDATE CASCADE,
  CONSTRAINT `recursos_ibfk_2` FOREIGN KEY (`id_estado`) REFERENCES `estado_recursos` (`id_estado`) ON UPDATE CASCADE,
  CONSTRAINT `recursos_ibfk_3` FOREIGN KEY (`id_familia`) REFERENCES `familia_recursos` (`id_familia`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

DROP TABLE IF EXISTS tipo_movimiento;
CREATE TABLE `tipo_movimiento` (
  `id_tipo_movimiento` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion_tipo_movimiento` varchar(50) COLLATE utf8mb4_spanish_ci NOT NULL,
  PRIMARY KEY (`id_tipo_movimiento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

DROP TABLE IF EXISTS usuarios;
CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_usuario` varchar(45) COLLATE utf8mb4_spanish_ci NOT NULL,
  `clave_usuario` varchar(40) COLLATE utf8mb4_spanish_ci NOT NULL,
  `correo_usuario` varchar(80) COLLATE utf8mb4_spanish_ci NOT NULL,
  `rol` varchar(30) COLLATE utf8mb4_spanish_ci NOT NULL,
  `tipo_usuario` int(11) NOT NULL,
  `estado_usuario` int(11) NOT NULL,
  `id_departamento` int(11) NOT NULL,
  PRIMARY KEY (`id_usuario`),
  KEY `usuario_id_departamento_fk` (`id_departamento`),
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`id_departamento`) REFERENCES `departamentos` (`id_departamento`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

INSERT INTO bitacora(id_registro,fecha_entrada,fecha_salida,id_usuario,estado_sesion) VALUES(1,'2021-09-22 22:35:59','2021-09-23 03:36:10',1,0);

INSERT INTO departamentos(id_departamento,nombre_departamento) VALUES(1,'Soporte'),(2,'Informática');






INSERT INTO usuarios(id_usuario,nombre_usuario,clave_usuario,correo_usuario,rol,tipo_usuario,estado_usuario,id_departamento) VALUES(1,'root','63a9f0ea7bb98050796b649e85481845','soporte@gmail.com','Soporte',1,1,1);