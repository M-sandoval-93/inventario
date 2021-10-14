<?php
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
        
        <h1 class="mt-2">Gestión de recursos del Establecimiento</h1>
        
        
        <h2 class="mt-2 alert-secondary text-center">Módulo en mantenimiento</h2>
        
    </div>

    <script src="js/bootstrap_js/bootstrap.min.js"></script>
</body>
</html>