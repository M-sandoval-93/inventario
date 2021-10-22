<?php

    include_once 'conexion.php';

    $accion = $_POST['accion'];
    $dato = $_POST['datoSistema'];

    switch ($accion){
    case 'nuevo_departamento':
            $funcion = 1;
            $consulta = "SELECT nombre_departamento FROM departamentos WHERE nombre_departamento='$dato'";
            $ingreso = "INSERT INTO departamentos VALUES (NULL, '$dato')";
            break;

        case 'estado_recurso':
            $funcion = 1;
            $consulta = "SELECT descripcion_estado_recursos FROM estado_recursos WHERE descripcion_estado_recursos='$dato'";
            $ingreso = "INSERT INTO estado_recursos VALUES (NULL, '$dato')";

        case 'familia_recurso':
            $funcion = 1;
            $consulta = "SELECT nombre_familia_recursos FROM familia_recursos WHERE nombre_familia_recursos='$dato'";
            $ingreso = "INSERT INTO familia_recursos VALUES (NULL, '$dato')";
            break;
    
        case 'tipo_movimiento':
            $funcion = 1;
            $consulta = "SELECT descripcion_tipo_movimiento FROM tipo_movimiento WHERE descripcion_tipo_movimiento='$dato'";
            $ingreso = "INSERT INTO tipo_movimiento VALUES (NULL, '$dato')";
            break;

        case 'mostrar_datoSistema':
            $funcion = 2;
            $consulta = "SELECT * FROM $dato";
            break;
    }

    $resultado = $conexion->query($consulta);

    if ($funcion == 1){
        if ($resultado->num_rows > 0){
            $data = 'existe';
        } else{
            if ($conexion->query($ingreso)){
                $data = true; 
            } else{
                $data = false;
            }
        }
    } else{
        // obtener datos para la tabla
        $info = $resultado->fetch_all(MYSQLI_ASSOC);
        $data = array();

        foreach ($info as $i){
            $data["data"][] = $i;
        }
    }
                
    $conexion->close();
    print json_encode($data);

?>
