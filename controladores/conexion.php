<?php
    // Variables de conexión
    $host = "localhost";
    $usser = "root";
    $pass = "";
    $bbdd = "inventario";

    // Conexión con la base de datos
    $conexion = new mysqli($host, $usser, $pass, $bbdd);

    if (mysqli_connect_error()){
        print_r("Fallo la conexión: ".mysqli_connect_error());
    } else{
        if (!$conexion->set_charset("utf8")){
            print_r("Error: ".$conexion->error);
        }
    }

    const BACKUP_PATH = "../backup/";
?>