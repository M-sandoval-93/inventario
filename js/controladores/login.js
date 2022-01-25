// función que permite gestionar el ingreso al sistema
$('#form-login').submit(function (e) {
    e.preventDefault();
    var usuario = $.trim($('#block-usuario').val());
    var clave = $.trim($('#block-clave').val());

    if (usuario.length == "" && clave.length == "") {
        Swal.fire({
            icon: 'warning',
            title: 'El nombre de usuario y constraseña son requeridos'
        });
        //return false;

    } else if(usuario.length == "" && clave.length != "") {
        Swal.fire({
            icon: 'warning',
            title: 'El nombre de usuario es requerido'
        });
        //return false;

    } else if (usuario.length != "" && clave.length == "") {
        Swal.fire({
            icon: 'warning',
            title: 'La contraseña es requerida'
        });
        //return false;

    } else {
        $.ajax({
            url: 'index.php',
            type: 'post',
            datatype: 'json',
            data: { usuario: usuario, clave: clave },
            success: function (data) {
                if (data == 'null') {
                    Swal.fire({
                        icon: 'error',
                        title: 'Usuario inválido !!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    $('#form-login').trigger('reset');
                } else {
                    Swal.fire({
                        icon: 'success',
                        title: 'Conexión exitosa ..',
                        showConfirmButton: false,
                        timer: 1500
                    }).then(resultado => {
                        window.location.href = 'home';
                    });
                }
            }
        });
    }
});


// Función que permite realizar el cambio de cable del usuario
$('#btn-link').click(function (e) {
    e.preventDefault();
    $('#form-login').trigger('reset');

    Swal.fire({
        title: 'Cambio de clave',
        html: `
        <div class="content sweet">
            <form method="post" id="form-cambio-clave">
                <div class="input-grupo modal">
                    <input type="text" id="modal-usuario" name="usuario" class="input-control" autocomplete="off">
                    <span></span>
                    <label>Nombre de usuario</label>
                </div>
                <div class="input-grupo modal">
                    <input type="password" id="modal-clave1" name="clave1" class="input-control" autocomplete="off">
                    <span></span>
                    <label>Contraseña actual</label>
                </div>
                <div class="input-grupo modal">
                    <input type="password" id="modal-clave2" name="clave1" class="input-control" autocomplete="off">
                    <span></span>
                    <label>Nueva contraseña</label>
                </div>
            </form>
        </div>
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'confirmar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#2691d9',
        cancelButtonColor: '#adadad',
        preConfirm: () => {
            if (!$.trim($('#modal-usuario').val())) {
                Swal.showValidationMessage('El nombre de usuario es obigatorio');
            } else if (!$.trim($('#modal-clave1').val())) {
                Swal.showValidationMessage('La clave actual es obligatoria');
            } else if (!$.trim($('#modal-clave2').val())) {
                Swal.showValidationMessage('La nueva clave es obligatoria');
            } else {
                a_usuario = $.trim($('#modal-usuario').val());
                a_clave = $.trim($('#modal-clave1').val());
                n_clave = $.trim($('#modal-clave2').val());

                if (a_clave == n_clave) {
                    Swal.showValidationMessage('La nueva clave no debe ser igual a la actual !!');
                } else {
                    $.ajax({
                        url: 'controladores/cambio_clave.php',
                        type: 'post',
                        datatype: 'json',
                        data: { a_usuario: a_usuario, a_clave: a_clave, n_clave: n_clave },
                        success: function (data) {
                            if (data == 'null') {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Usuario inválido !!',
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                            } else {
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'Cambio de contraseña exitoso !!',
                                    toast: true,
                                    showConfirmButton: false,
                                    timer: 2000,
                                    timerProgressBar: true,
                                });
                            }
                        }
                    }
                    )
                }
            }
        }
    });
});
