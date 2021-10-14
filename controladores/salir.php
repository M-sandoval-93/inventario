<?php
    //Seccion para destruir la sesion activa y ridirigirnos al módulo principal
    include_once "sesiones.php";
    $mi_sesion = new sesionUsuario();
    $mi_sesion->cerrarSesion();
    
    header("location: ../index");
?>