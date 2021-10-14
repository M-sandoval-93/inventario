<?php
    //Controlador para redireccionar hacia los módulos del sistema
    if ($_GET['ruta'] == "home" ||
        $_GET['ruta'] == "recursos" ||
        $_GET['ruta'] == "reportes" ||
        $_GET['ruta'] == "usuarios" ||
        $_GET['ruta'] == "funcionarios" ||
        $_GET['ruta'] == "datosSistema" ||
        $_GET['ruta'] == "baseDatos" ||
        $_GET['ruta'] == "bitacora" ||
        $_GET['ruta'] == "index"){
        include_once "modulos/".$_GET['ruta'].".php";
    }
?>