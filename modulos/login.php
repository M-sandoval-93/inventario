<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/normalize.css">
    <link rel="stylesheet" href="css/sweetalert2.min.css">
    <link rel="stylesheet" href="css/style.css">
    <title>Inventario Online</title>
</head>
<body>

    <!-- Formulario principal -->
    <div class="content">
        <h3 class="text-center">Inicio de Sesión</h3>
        <form method="post" id="form-login">
            <div class="input-grupo">
                <input type="text" id="block-usuario" name="usuario" class="input-control" autocomplete="off">
                <span></span>
                <label>Ussername</label>
            </div>
            <div class="input-grupo">
                <input type="password" id="block-clave" name="clave" class="input-control" autocomplete="off">
                <span></span>
                <label>Password</label>
            </div>

            <input type="submit" value="Ingresar" id="ingresar" name="ingresar" class="boton">

            <div class="link">
                <a href="" id="btn-link">Cambiar constraseña</a>
            </div>
        </form>
    </div>

    <script src="js/jquery.min.js"></script>
    <script src="js/sweetalert2.all.min.js"></script>
    <script src="js/controladores/login.js"></script>
</body>
</html>
