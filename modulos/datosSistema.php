<?php
    if(!isset($_SESSION["usuario"])){
        header("location: index");
    } elseif($_SESSION["usuario"]["rol"] == "Funcionario"){
        header("location: home");
    }
?>

<!DOCTYPE html>
<html lang="es">
    <?php include_once "layout/head.html"; ?>
<body>
    <div class="container-fluid">
        <?php include "layout/header.php"; ?>
        
        <h1 class="mt-2">Datos del sistema</h1>
        <h2 class="mt-2 alert-secondary text-center">Módulo en mantenimiento</h2>

        <div class="row mt-3">
            <label><h5>Nuevo estado para los recursos</h5></label>
            <div class="col-md-4">
                <input type="text" class="form-control" name="estadoRecurso" id="estado_recurso">
            </div>
            <div class="col-md-2">
                <button class="btn btn-primary mb-3" id="btn_estado_recurso"><i class="fas fa-file-export"></i></button>
                <button class="btn btn-primary mb-3" id="btn_info_estado_recurso"><i class="fas fa-question-circle"></i></button>
            </div>
        </div>

        <form class="row mt-3">
            <label><h5>Nueva familia para los recursos</h5></label>
            <div class="col-md-4">
                <input type="text" class="form-control" name="familiaRecurso" id="familia_recurso">
            </div>
            <div class="col-md-2">
                <button type="submit" class="btn btn-primary mb-3"><i class="fas fa-file-export"></i></button>
                <button type="button" class="btn btn-primary mb-3"><i class="fas fa-question-circle"></i></button>
            </div>
        </form>

        <!-- ><form class="row mt-3">
            <label for="tipo_movimiento" class="form-label"><h5>Nueva tipo de movimiento</h5></label>
            <div class="col-md-4">
                <input type="text" class="form-control" name="tipoMovimiento" id="tipo_movimiento">
            </div>
            <div class="col-md-2">
                <button type="submit" class="btn btn-primary mb-3"><i class="fas fa-file-export"></i></button>
                <button type="button" class="btn btn-primary mb-3"><i class="fas fa-question-circle"></i></button>
            </div>
        </form> -->
        
    </div>
    <script src="js/bootstrap_js/bootstrap.min.js"></script>
    <script src="js/jquery.min.js"></script>
    <script src="js/sweetalert2.all.min.js"></script>
    <script src="js/controladores/datos_sistema.js"></script>
</body>
</html>
