<?php
    include_once "sesiones.php";
    $mi_sesion = new sesionUsuario();
    include_once "conexion.php";

    
    $sesion = $mi_sesion->obtenerUsuario();
    $tipo = $_POST['funcion'];

    // trabajar en la recepción de variables desde post

    switch ($tipo){
        case "mostrar_usuarios": // mostrar lista de usuarios
            $consulta = "SELECT u.id_usuario, u.nombre_usuario, u.correo_usuario, d.nombre_departamento, u.rol, u.estado_usuario 
                    FROM usuarios AS u
                    INNER JOIN departamentos AS d ON d.id_departamento=u.id_departamento
                    WHERE u.tipo_usuario=1 AND u.nombre_usuario!='$sesion'
                    ORDER BY u.id_usuario ASC";

            $resultado = $conexion->query($consulta);


            $info = $resultado->fetch_all(MYSQLI_ASSOC);
            $json = array();
        
            foreach ($info as $data){
                if($data["estado_usuario"] == 1){
                    $data["estado_usuario"] = "Activo";
                } else{
                    $data["estado_usuario"] = "Inactivo";
                }
                $json["data"][] = $data;
            }
            print json_encode($json);
            $conexion->close();
            break;

        case "mostrar_funcionarios": // mostrar lista de usuarios
            $consulta = "SELECT u.id_usuario, u.nombre_usuario, u.correo_usuario, d.nombre_departamento
                        FROM usuarios AS u
                        INNER JOIN departamentos AS d ON d.id_departamento=u.id_departamento
                        WHERE u.tipo_usuario=2
                        ORDER BY u.id_usuario ASC";

            $resultado = $conexion->query($consulta);


            $info = $resultado->fetch_all(MYSQLI_ASSOC);
            $json = array();
        
            foreach ($info as $data){
                $json["data"][] = $data;
            }
            print json_encode($json);
            $conexion->close();
            break;

        case "mostrar_bitacora": // mostrar registro de bitácora, excepto del usuario que tiene sesion habierta
            $consulta = "SELECT b.id_registro, u.nombre_usuario, b.fecha_entrada, b.fecha_salida, b.estado_sesion
                        FROM bitacora AS b
                        INNER JOIN usuarios AS u ON u.id_usuario=b.id_usuario
                        WHERE b.estado_sesion!=1 OR u.nombre_usuario!='$sesion'
                        ORDER BY b.id_registro ASC";
            $resultado = $conexion->query($consulta);
            $info = $resultado->fetch_all(MYSQLI_ASSOC);
            $json = array();
        
            foreach ($info as $data){
                if($data["estado_sesion"] == 1){
                    $data["estado_sesion"] = "Activa";
                } else{
                    $data["estado_sesion"] = "Inactiva";
                }
                $json["data"][] = $data;
            }
            $jsonString = json_encode($json);
            echo $jsonString;
            $conexion->close();
            break;
        
        case "editar":
            // recuperación de variables
            $id = intval($_POST['id']);
            $usuario = $_POST['usuario'];
            $rol = $_POST['rol'];
            $correo = $_POST['correo'];
            $departamento = intval($_POST['departamento']);
            if ((isset($_POST['clave'])) && ($_POST['clave'] != "")){
                $clave = md5($_POST['clave']);
                $consulta = "UPDATE usuarios 
                            SET nombre_usuario='$usuario', clave_usuario='$clave', correo_usuario='$correo', rol='$rol', id_departamento='$departamento'
                            WHERE id_usuario='$id'";
            } else{
                $consulta = "UPDATE usuarios 
                            SET nombre_usuario='$usuario', correo_usuario='$correo', rol='$rol', id_departamento='$departamento'
                            WHERE id_usuario='$id'";
            }

            // Condición para saber si se efectuó la actualización
            if ($conexion->query($consulta)){
                $data = true;
            } else{
                $data = false;
            }
            $conexion->close();
            print json_encode($data);
            break;

        case "editar_funcionario":
            // recuperación de variables
            $id = intval($_POST['id']);
            $usuario = $_POST['usuario'];
            $correo = $_POST['correo'];
            $departamento = intval($_POST['departamento']);

            $consulta = "UPDATE usuarios 
                        SET nombre_usuario='$usuario', correo_usuario='$correo', id_departamento='$departamento'
                        WHERE id_usuario='$id'";

            // Condición para saber si se efectuó la actualización
            if ($conexion->query($consulta)){
                $data = true;
            } else{
                $data = false;
            }

            $conexion->close();
            print json_encode($data);
            break;

        case "eliminar":
            $id = intval($_POST['id']);
            $preConsulta = "SELECT * FROM bitacora WHERE id_usuario='$id'";
            $consulta = "DELETE FROM usuarios WHERE id_usuario='$id'";
            $resultado = $conexion->query($preConsulta);

            if ($resultado->num_rows > 0){
                $data = 'uso';
            } else{
                if ($conexion->query($consulta)){
                    $data = true;
                } else{
                    $data = false;
                }
            }
            $conexion->close();
            print json_encode($data);
            break;

        case "eliminar_funcionario":
            $id = intval($_POST['id']);
            // $preConsulta = "SELECT * FROM bitacora WHERE id_usuario='$id'";
            $consulta = "DELETE FROM usuarios WHERE id_usuario='$id'";

            if ($conexion->query($consulta)){
                $data = true;
            } else{
                $data = false;
            }

            $conexion->close();
            print json_encode($data);
            break;

        case "crear":
            // recuperación de variables
            $usuario = $_POST['usuario'];
            $rol = $_POST['rol'];
            $correo = $_POST['correo'];
            $departamento = intval($_POST['departamento']);
            $clave = md5($_POST['clave']);
            $estado = 1;
            $tipo = 1;
                
            $consulta = "SELECT * FROM usuarios WHERE nombre_usuario='$usuario' AND clave_usuario='$clave'";
            $insertar = "INSERT INTO usuarios VALUES (NULL, '$usuario', '$clave', '$correo', '$rol', '$tipo', '$estado', '$departamento')";
            $resultado = $conexion->query($consulta);
            if ($resultado->num_rows > 0){
                $data = 'existe';
            } else{
                if ($conexion->query($insertar)){
                    $data = true;
                } else{
                    $data = false;
                }
            }
            $conexion->close();
            print json_encode($data);
            break;
        
        case "crear_funcionario":
            // recuperación de variables
            $usuario = $_POST['usuario'];
            $correo = $_POST['correo'];
            $departamento = intval($_POST['departamento']);
            $clave = md5('funcionario');
            $rol = 'Funcionario';
            $estado = 1;
            $tipo = 2;
                
            $consulta = "SELECT * FROM usuarios WHERE nombre_usuario='$usuario'";
            $insertar = "INSERT INTO usuarios VALUES (NULL, '$usuario', '$clave', '$correo', '$rol', '$tipo', '$estado', '$departamento')";
            $resultado = $conexion->query($consulta);
            if ($resultado->num_rows > 0){
                $data = 'existe';
            } else{
                if ($conexion->query($insertar)){
                    $data = true;
                } else{
                    $data = false;
                }
            }
            $conexion->close();
            print json_encode($data);
            break;

        case "alterar":
            $id = $_POST['id'];
            if ($_POST['estado'] == "Activo"){
                $estado = 2;
            } else{
                $estado = 1;
            }

            $consulta = "UPDATE usuarios SET estado_usuario='$estado' WHERE id_usuario='$id'";
            if ($conexion->query($consulta)){
                $data = true;
            } else{
                $data = false;
            }

            $conexion->close();
            print json_encode($data);
            break;

        case "convertir":
            // recuperación de variables
            $id = intval($_POST['id']);
            $usuario = $_POST['usuario'];
            $rol = $_POST['rol'];
            $correo = $_POST['correo'];
            $departamento = intval($_POST['departamento']);
            $clave = md5($_POST['clave']);
            $tipo = 1;

            $consulta = "SELECT * FROM usuarios WHERE nombre_usuario='$usuario' AND clave_usuario='$clave'";
            $resultado = $conexion->query($consulta);
            
            if ($resultado->num_rows > 0){
                $data = 'existe';
            } else{
                $editar = "UPDATE usuarios 
                        SET nombre_usuario='$usuario', clave_usuario='$clave', correo_usuario='$correo', rol='$rol', id_departamento='$departamento', tipo_usuario='$tipo'
                        WHERE id_usuario='$id'";
                if ($conexion->query($editar)){
                    $data = true;
                } else{
                    $data = false;
                }
            }
            $conexion->close();
            print json_encode($data);
            break;
    }

?>