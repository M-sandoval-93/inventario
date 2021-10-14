const validador =  /^[a-zA-ZÁ-ÿ\s]+$/;

 $('#btn_estado_recurso').click(function (e) {
    e.preventDefault();
    accion = 'estado_recurso';
    estado = $('#estado_recurso').val();

    if (estado.length <= 0){
        Swal.fire({
            icon: 'error',
            title: 'El campo debe contener datos !!',
            showConfirmButton: false,
            timer: 1500
        });
    } else if(!validador.test(estado)){
        Swal.fire({
            icon: 'error',
            title: 'El campo no debe tener números o caractéres especiales !!',
            showConfirmButton: false,
            timer: 1500
        });
    } else {
        $.ajax({
            url: 'controladores/datos_sistema.php',
            type: 'post',
            dataType: 'json',
            data: { accion: accion, estado: estado },
            success: function(data) {
                if (data == true){
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Registro almacenado de manera exitosa !!',
                        toast: true,
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true,
                    });
                } else if(data == 'existe') {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'warning',
                        title: 'El registro que intenta crear, ya existe en la base de datos !!',
                        toast: true,
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true,
                    });
                } else {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'El registro no se pudo almacenar !!',
                        toast: true,
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true,
                    });
                }
            }
    
        });
    }

});