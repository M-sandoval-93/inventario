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
        
        

        <div class="row">
            <div class="col-md-6">
                <h1 class="mt-2">Datos del sistema</h1>
                <div class="row mt-5">
                    
                    <label><h5>Nuevo departamento</h5></label>
                    <div class="col-md-9">
                        <input type="text" class="form-control" id="nuevo_departamento">
                    </div>
                    <div class="col-md-3">
                        <button class="btn btn-primary mb-3 btn-ingreso" id="btn_nuevo_departamento"><i class="fas fa-file-export"></i></button>
                        <button class="btn btn-primary mb-3 btn-buscar" id="btn_buscar_departamentos"><i class="fas fa-search"></i></button>
                    </div>
                </div>
                
                <div class="row mt-3">
                    <label><h5>Nuevo estado para los recursos</h5></label>
                    <div class="col-md-9">
                        <input type="text" class="form-control" id="estado_recurso">
                    </div>
                    <div class="col-md-3">
                        <button class="btn btn-primary mb-3 btn-ingreso" id="btn_estado_recurso"><i class="fas fa-file-export"></i></button>
                        <button class="btn btn-primary mb-3 btn-buscar" id="btn_buscar_estado_recursos"><i class="fas fa-search"></i></button>
                    </div>
                </div>

                <div class="row mt-3">
                    <label><h5>Nueva familia para los recursos</h5></label>
                    <div class="col-md-9">
                        <input type="text" class="form-control" id="familia_recurso">
                    </div>
                    <div class="col-md-3">
                        <button class="btn btn-primary mb-3 btn-ingreso" id="btn_familia_recurso"><i class="fas fa-file-export"></i></button>
                        <button class="btn btn-primary mb-3 btn-buscar" id="btn_buscar_familia_recursos"><i class="fas fa-search"></i></button>
                    </div>
                </div>

                <div class="row mt-3">
                    <label><h5>Nueva tipo de movimiento</h5></label>
                    <div class="col-md-9">
                        <input type="text" class="form-control" id="tipo_movimiento">
                    </div>
                    <div class="col-md-3">
                        <button class="btn btn-primary mb-3 btn-ingreso" id="btn_tipo_movimiento"><i class="fas fa-file-export"></i></button>
                        <button class="btn btn-primary mb-3 btn-buscar" id="btn_buscar_tipo_movimientos"><i class="fas fa-search"></i></button>
                    </div>
                </div>
            </div>

            <div class="col-md-6 mt-2">
                <table id="mis_datosSistema" class="display table table-hover text-nowrap" style="width:100%">
                    <thead class="text-center">
                        <tr>
                            <th>Id</th>
                            <th>Descripción</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody class="text-center">
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <script src="js/bootstrap_js/bootstrap.min.js"></script>
    <script src="js/jquery.min.js"></script>
    <script src="js/datatables.min.js"></script>
    <script src="js/sweetalert2.all.min.js"></script>
    <script src="js/controladores/datos_sistema.js"></script>
</body>
</html>
