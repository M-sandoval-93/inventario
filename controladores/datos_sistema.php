<?php

    include_once 'conexion.php';

    $accion = $_POST['accion'];
    $dato = $_POST['datoSistema'];

    switch ($accion){
      case 'nuevo_departamento':
            $consulta = "SELECT nombre_departamento FROM departamentos WHERE nombre_departamento='$dato'";
            $ingreso = "INSERT INTO departamentos VALUES (NULL, '$dato')";
            $resultado = $conexion->query($consulta);

            if ($resultado->num_rows > 0){
                $data = 'existe';
            } else{ 
                if ($conexion->query($ingreso)){
                    $data = true;
                } else{
                    $data = false;
                }
            }

            $conexion->close();
            print json_encode($data);
            break;

        case 'estado_recurso':
            $consulta = "SELECT descripcion_estado_recursos FROM estado_recursos WHERE descripcion_estado_recursos='$dato'";
            $ingreso = "INSERT INTO estado_recursos VALUES (NULL, '$dato')";
            $resultado = $conexion->query($consulta);

            if ($resultado->num_rows > 0){
                $data = 'existe';
            } else{
                if ($conexion->query($ingreso)){
                    $data = true;
                } else{
                    $data = false;
                }
            }
                
            $conexion->close();
            print json_encode($data);
            break;
    
        case 'familia_recurso':
    
            break;
    
        case 'tipo_movimiento':
    
            break;
    }

?>
