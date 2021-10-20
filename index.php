<?php
    //Se incluye el módulo de sesiones, para almacenar el nombre de usuario de la sesión
    date_default_timezone_set('America/Santiago');

    include_once "controladores/sesiones.php";
    $mi_sesion = new sesionUsuario();

    //Condicional para verificar el inicio de sesión y el redireccionamiento
    if (isset($_SESSION['usuario'])){
        //Comienza la condición para incluir el controlador de las vistas
        if (isset($_GET['ruta'])){
            //Se incluye el controlador de las vitas
            include_once "controladores/control_vistas.php";
        } else{
            //Se redirecciona hacia la página principal
            header("location: index");
        }

    } elseif (isset($_POST['usuario']) && isset($_POST['clave'])){
        // //Se reciben las variables de inicio de sesión para verificar si existen en la base de datos
        $usuario = $_POST['usuario'];
        $clave = $_POST['clave'];

        // se genera una variable que recibe el true o false, en la verificación de usuario
        $data = $mi_sesion->comprobarUsuario($usuario, $clave);
        print json_encode($data);

        
    } else{
        //Si no hay sesión activa, se redirecciona al login
        include_once "modulos/login.php";
    }

?>

