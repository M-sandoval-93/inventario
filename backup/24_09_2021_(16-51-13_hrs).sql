SET FOREIGN_KEY_CHECKS=0;

CREATE DATABASE IF NOT EXISTS inventario;

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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

INSERT INTO bitacora VALUES("1","2021-09-22 22:35:59","2021-09-23 03:36:10","1","0");
INSERT INTO bitacora VALUES("2","2021-09-22 22:48:11","2021-09-23 03:49:38","1","0");
INSERT INTO bitacora VALUES("3","2021-09-22 22:49:48","2021-09-23 03:50:06","2","0");
INSERT INTO bitacora VALUES("4","2021-09-22 22:50:11","2021-09-23 04:03:46","1","0");
INSERT INTO bitacora VALUES("5","2021-09-22 23:04:03","2021-09-23 04:08:01","1","0");
INSERT INTO bitacora VALUES("6","2021-09-22 23:10:10","2021-09-23 05:57:11","1","0");
INSERT INTO bitacora VALUES("7","2021-09-23 00:57:30","2021-09-23 05:57:46","1","0");
INSERT INTO bitacora VALUES("8","2021-09-23 00:57:56","2021-09-23 05:59:29","1","0");
INSERT INTO bitacora VALUES("9","2021-09-23 00:59:32","2021-09-23 06:03:14","4","0");
INSERT INTO bitacora VALUES("10","2021-09-23 01:06:36","2021-09-23 06:41:04","1","0");
INSERT INTO bitacora VALUES("11","2021-09-23 10:42:32","2021-09-23 19:24:34","1","0");
INSERT INTO bitacora VALUES("12","2021-09-23 22:11:33","2021-09-24 06:41:44","1","0");
INSERT INTO bitacora VALUES("13","2021-09-24 01:42:03","2021-09-24 07:52:43","1","0");
INSERT INTO bitacora VALUES("14","2021-09-24 02:52:55","2021-09-24 07:55:35","1","0");
INSERT INTO bitacora VALUES("15","2021-09-24 03:02:02","2021-09-24 08:02:15","1","0");
INSERT INTO bitacora VALUES("16","2021-09-24 15:31:35","0000-00-00 00:00:00","1","1");



DROP TABLE IF EXISTS departamentos;

CREATE TABLE `departamentos` (
  `id_departamento` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_departamento` varchar(50) COLLATE utf8mb4_spanish_ci NOT NULL,
  PRIMARY KEY (`id_departamento`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

INSERT INTO departamentos VALUES("1","Soporte Informático");
INSERT INTO departamentos VALUES("2","Informática");



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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

INSERT INTO estado_recursos VALUES("1","Operativo");
INSERT INTO estado_recursos VALUES("2","Perdido");
INSERT INTO estado_recursos VALUES("3","Robado");



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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

INSERT INTO usuarios VALUES("1","root","63a9f0ea7bb98050796b649e85481845","soporte@gmail.com","Soporte","1","1","1");
INSERT INTO usuarios VALUES("2","prueba","b2ca678b4c936f905fb82f2733f5297f","prueba@gmail.com","Soporte","1","1","1");
INSERT INTO usuarios VALUES("4","mario-sandoval","f3abb86bd34cf4d52698f14c0da1dc60","prueba@gmail.com","Administrador","1","1","1");
INSERT INTO usuarios VALUES("6","usuario a eliminar","9f6e6800cfae7749eb6c486619254b9c","prueba@gmail.com","Soporte","1","1","2");



SET FOREIGN_KEY_CHECKS=1;