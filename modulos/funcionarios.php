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
    <!-- Modal para crear usuario -->
    <?php include_once "layout/modal_usuarios.php"; ?>

    <div class="container-fluid">
        <?php include "layout/header.php"; ?>
        
        <h1 class="mt-2">Administración de funcionarios</h1>
        <button type="button" id="btn_crear_funcionario" class="btn btn-primary mt-4 mb-4" data-bs-toggle="modal" data-bs-target="#modal_funcionarios"><i class="fas fa-plus-square"></i></button>
        <table id="mis_funcionarios" class="display table table-hover text-nowrap" style="width:100%">
            <thead class="text-center">
                <tr>
                    <th>Id</th>
                    <th>Usuario</th>
                    <th>Correo</th>
                    <th>Departamento</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody class="text-center">
            </tbody>
        </table>
    </div>

    <script src="js/bootstrap_js/bootstrap.min.js"></script>
    <script src="js/jquery.min.js"></script>
    <script src="js/datatables.min.js"></script>
    <script src="js/sweetalert2.all.min.js"></script>
    <script src="js/controladores/script_funcionarios.js"></script>
</body>
</html>