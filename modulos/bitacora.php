<?php
    if(!isset($_SESSION["usuario"])){
        header("location: index");
    } elseif($_SESSION["usuario"]["rol"] == "Funcionario" || $_SESSION["usuario"]["rol"] == "Jefe" || $_SESSION["usuario"]["rol"] == "Administrador"){
        header("location: home");
    }
?>

<!DOCTYPE html>
<html lang="es">
<?php include_once "layout/head.html"; ?>
<body>

    <div class="container-fluid">
        <?php include_once "layout/header.php"; ?>
        <h1 class="mt-3 mb-4">Bitácora de ingeso al sistema</h1>
            <table id="bitacora" class="display table table-hover text-nowrap" style="width:100%">
                <thead class="text-center">
                    <tr>
                        <th>Id registro</th>
                        <th>Usuario</th>
                        <th>Fecha entrada</th>
                        <th>Fecha salida</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody class="text-center">
                </tbody>
            </table>
    </div>
    
    <script src="js/jquery.min.js"></script>
    <script src="js/bootstrap_js/bootstrap.min.js"></script>
    <script src="js/datatables.min.js"></script>
    <script src="js/controladores/script_bitacora.js"></script>
</body>
</html>