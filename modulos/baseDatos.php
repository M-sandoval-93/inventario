<?php
    include_once "controladores/mantenimiento_bbdd.php";
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
        <?php include "layout/header.php"; ?>
        
        <h1 class="mt-2">Mantenimiento de la Base de datos</h1>

        <h5 class="mt-4">Generar respaldo de la base de datos del sistema</h5>
        <button class="btn btn-primary" id="btn_backup">Generar Respaldo</button>

        <h4 class="mt-5">Seleccionar archivo de restauración</h4>
        <div class="col-12 mb-3">
            <div class="col-md-3">
                <select id="file_restore" class="form-select">
                    <option disabled selected>Selecciona un punto de restauración</option>
<?php
                    $ruta = "backup/"; // Dirección de la carpeta de respaldos
                    if (is_dir($ruta)){
                        if ($aux=opendir($ruta)){
                            while(($archivo = readdir($aux)) !== false){
                                if ($archivo!="." && $archivo!=".."){
                                    $nombrearchivo=str_replace(".sql", "", $archivo);
                                    $nombrearchivo=str_replace("-", ":", $nombrearchivo);
                                    $ruta_completa=$ruta.$archivo;
                                    if (is_dir($ruta_completa)){
                                    } else{
                                        if ($nombrearchivo != ".DS_Store"){ // evitar que aparesca archivo de sistema mac
                                            echo '<option value="'.$ruta_completa.'">'.$nombrearchivo.'</option>';
                                        }
                                    }
                                }
                            }
                            closedir($aux);
                        }
                    } else{
                        echo $ruta." No es ruta válida";
                    }
?>
                </select>
            </div>
        </div>

        <button class="btn btn-primary" id="btn_restore">Restaurar Respaldo</button>

    </div>

    <script src="js/bootstrap_js/bootstrap.min.js"></script>
    <script src="js/jquery.min.js"></script>
    <script src="js/sweetalert2.all.min.js"></script>
    <script src="js/controladores/mantenimiento_bbdd.js"></script>
</body>
</html>

