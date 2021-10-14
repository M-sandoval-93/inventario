$('#btn_backup').click(function (e) {
    e.preventDefault();

    Swal.fire({
        icon: 'question',
        title: 'Se generará un respaldo de la Base de Datos',
        showCancelButton: true,
        confirmButtonText: 'confirmar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#2691d9',
        cancelButtonColor: '#adadad',
    }).then(resultado => {
        if (resultado.isConfirmed) {
            accion = 'respaldar';

            $.ajax({
                url: 'controladores/mantenimiento_bbdd.php',
                type: 'post',
                dataType: 'json',
                data: { accion: accion },
                success: function(data) {
                    if (data == 'false'){
                        Swal.fire({
                            icon: 'error',
                            title: 'No se pudo realizar el respaldo !!',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    } else{
                        Swal.fire({
                            icon: 'success',
                            title: 'Respaldo realizado con exito !!',
                            showConfirmButton: false,
                            timer: 1500
                        }).then(resultado => {
                            location.reload();
                        });
                    }
                }
            });
        } 
    });
});


$('#btn_restore').click(function (e) {
    e.preventDefault();
    select = $('#file_restore').val();

    if (select == null) {
        Swal.fire({
            icon: 'error',
            title: 'Seleccione un archivo !!',
            showConfirmButton: false,
            timer: 1500
        });
    } else {

        Swal.fire({
            icon: 'question',
            title: 'Se restaurará la base de datos del sistema',
            showCancelButton: true,
            confirmButtonText: 'confirmar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#2691d9',
            cancelButtonColor: '#adadad',
        }).then (resultado => {
            if (resultado.isConfirmed){
                accion = 'restaurar';

                $.ajax({
                    url: 'controladores/mantenimiento_bbdd.php',
                    type: 'post',
                    datatype: 'json',
                    data: { accion: accion, select: select },
                    success: function(data) {
                        if (data == 'false') {
                            Swal.fire({
                                icon: 'error',
                                title: 'No se pudo realizar la restauración !!',
                                showConfirmButton: false,
                                timer: 1500
                            });
                        } else {
                            Swal.fire({
                                icon: 'success',
                                title: 'Restauración exitosa !!',
                                showConfirmButton: false,
                                timer: 1500
                            }).then(resultado => {
                                location.reload();
                            });
                        }
                    }      
                });
            }
        }); 
    }
});
