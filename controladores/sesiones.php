<?php

    class sesionUsuario{
        public function __construct(){
            session_start();
        }

        /* public function start(){
            session_start();
        } */

        public function obtenerUsuario(){
            return $_SESSION['usuario']['nombre'];
        }

        public function obtenerPrivilegio(){
            return $_SESSION['usuario']['rol'];
        }

        public function obtenerId(){
            return $_SESSION['usuario']['id'];
        }

        public function cerrarSesion(){
            include_once "conexion.php";

            $cierre = date("Y-m-d H:i:s");
            $idint = intval($this->obtenerId());
            $consulta = "UPDATE bitacora SET fecha_salida='$cierre', estado_sesion=0 WHERE id_usuario='$idint' AND estado_sesion=1";
            $conexion->query($consulta);
            $conexion->close();
            session_unset();
            session_destroy();
        }

        public function comprobarUsuario($usuario, $clave){
            include_once "controladores/conexion.php";
            
            // Vriables
            $md5clave = md5($clave);
            $inicio = date("Y-m-d H:i:s");
            $cierre = "0000-00-00 00:00:00";
            
            $consulta = "SELECT * FROM usuarios WHERE nombre_usuario='$usuario' AND clave_usuario='$md5clave'";
            $bitacora = "INSERT INTO bitacora VALUES (NULL, '$inicio', '$cierre', )";
            $resultado = $conexion->query($consulta);
            $fila = $resultado->fetch_assoc();

            if ($fila > 0 && $fila['nombre_usuario'] === $usuario){
                $_SESSION['usuario'] = array('nombre' => $fila['nombre_usuario'], 'rol' => $fila['rol'], 'id' => $fila['id_usuario']);
                $id = $fila['id_usuario'];
                $bitacora = "INSERT INTO bitacora VALUES (NULL, '$inicio', '$cierre', '$id', 1)";
                $conexion->query($bitacora);
                return true;
            } else{
                return null;
            }
            $conexion->close();
        }

    }

?>
