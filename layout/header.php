
<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
        <a href="home" class="navbar-brand">Home</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item"><a class="nav-link" href="recursos">Recursos</a></li>
                <li class="nav-item"><a class="nav-link" href="reportes">Reportes</a></li>
<?php 
    if($_SESSION['usuario']['rol'] == "Soporte" || $_SESSION['usuario']['rol'] == "Administrador" || $_SESSION['usuario']['rol'] == "Jefe"){
?>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown">Administración</a>
                    <ul class="dropdown-menu">
<?php 
        if($_SESSION['usuario']['rol'] == "Soporte" || $_SESSION['usuario']['rol'] == "Administrador"){
?>
                        <li><a href="usuarios" class="dropdown-item">Cuentas usuario</a></li>
<?php
        }
?>
                        <li><a href="funcionarios" class="dropdown-item">Funcionarios</a></li>
                        <li><a href="datosSistema" class="dropdown-item">Datos del sistema</a></li>
                    </ul>
                </li>
<?php
        if($_SESSION['usuario']['rol'] == "Soporte"){
?>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown">Mantenimiento</a>
                    <ul class="dropdown-menu">
                        <li><a href="baseDatos" class="dropdown-item">Base de datos del sistema</a></li>
                        <li><a href="bitacora" class="dropdown-item">Bitácora sistema</a></li>
                    </ul>
                </li>
<?php 
        }
    } 
?>
            </ul>
            <form class="d-flex">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a href="controladores/salir.php" class="nav-link">Cerrar Sesión</a>
                    </li>
                </ul>
            </form>
        </div>
    </div>
</nav>
