<?php
    include_once 'conexion.php';

    
    $a_usuario = $_POST['a_usuario'];
    $a_clave = md5($_POST['a_clave']);
    $n_clave = md5($_POST['n_clave']);

    if ($a_usuario != "" && $a_clave != "" && $n_clave != ""){
        $consulta = "SELECT * FROM usuarios 
                    WHERE nombre_usuario='$a_usuario' AND clave_usuario='$a_clave'";
        $resultado = $conexion->query($consulta);
        $row = $resultado->fetch_assoc();

        if ($row > 0){
            $id = $row['id_usuario'];
            $actualizacion = "UPDATE usuarios 
                            SET clave_usuario='$n_clave'
                            WHERE id_usuario='$id'";
            $resultado = $conexion->query($actualizacion);
            $data = true;
        } else{
            $data = null;
        }
    }
    $conexion->close();

    print json_encode($data);


?>