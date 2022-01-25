<?php
    /* include_once "controladores/sesiones.php";
    $mi_sesion = new sesionUsuario(); */
    if(!isset($_SESSION["usuario"])){
        header("location: index");
    }
?>

<!DOCTYPE html>
<html lang="es">
    <?php include_once "layout/head.html"; ?>
<body>
    <div class="container-fluid">
        <?php include "layout/header.php"; ?>
        
        <h1 class="mt-2">Bienvenidos al sistema de control de inventarios</h1>
        <h3 class="mt-2">Establecimiento Educacional: Liceo Valentín Letelier</h3>
        <p class="mt-5">Nombre de usuario: <?php echo $mi_sesion->obtenerUsuario(); ?></p>
        <p>Fecha: <?php echo date("d / M / Y"); ?></p>
        <p>Hora: <?php echo date("H : i"); ?></p>
        <p>Sistema de registro y control de inventario</p>
    </div>

    <script src="js/bootstrap_js/bootstrap.min.js"></script>
</body>
</html>
