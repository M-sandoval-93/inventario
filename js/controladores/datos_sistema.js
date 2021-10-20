const validador =  /^[a-zA-ZÁ-ÿ\s]+$/;

// Función para crear un nuevo estado de un recurso
// $('#btn_estado_recurso').click(function (e) {
//     e.preventDefault();
//     accion = 'estado_recurso';
//     datoSistema = $('#estado_recurso').val();

//     if (datoSistema.length <= 0){
//         Swal.fire({
//             icon: 'error',
//             title: 'El campo debe contener datos !!',
//             showConfirmButton: false,
//             timer: 1500
//         });
//     } else if(!validador.test(datoSistema)){
//         Swal.fire({
//             icon: 'error',
//             title: 'El campo no debe tener números o caractéres especiales !!',
//             showConfirmButton: false,
//             timer: 1500
//         });
//     } else {
//         $.ajax({
//             url: 'controladores/datos_sistema.php',
//             type: 'post',
//             dataType: 'json',
//             data: { accion: accion, estado: estado },
//             success: function(data) {
//                 if (data == true){
//                     Swal.fire({
//                         position: 'top-end',
//                         icon: 'success',
//                         title: 'Registro almacenado de manera exitosa !!',
//                         toast: true,
//                         showConfirmButton: false,
//                         timer: 1500,
//                         timerProgressBar: true,
//                     });
//                 } else if(data == 'existe') {
//                     Swal.fire({
//                         position: 'top-end',
//                         icon: 'warning',
//                         title: 'El registro que intenta crear, ya existe en la base de datos !!',
//                         toast: true,
//                         showConfirmButton: false,
//                         timer: 1500,
//                         timerProgressBar: true,
//                     });
//                 } else {
//                     Swal.fire({
//                         position: 'top-end',
//                         icon: 'error',
//                         title: 'El registro no se pudo almacenar !!',
//                         toast: true,
//                         showConfirmButton: false,
//                         timer: 1500,
//                         timerProgressBar: true,
//                     });
//                 }
//             }
    
//         });
//     }

// });

// Función para crear un nuevo departamento
// $('#btn_nuevo_departamento').click(function (e) {
//     e.preventDefault();
//     accion = 'nuevo_departamento';
//     datoSistema = $('#nuevo_departamento').val();

//     if (datoSistema.length <= 0){
//         Swal.fire({
//             icon: 'error',
//             title: 'El campo debe contener datos !!',
//             showConfirmButton: false,
//             timer: 1500
//         });
//     } else if(!validador.test(datoSistema)){
//         Swal.fire({
//             icon: 'error',
//             title: 'El campo no debe tener números o caractéres especiales !!',
//             showConfirmButton: false,
//             timer: 1500
//         });
//     } else {
//         $.ajax({
//             url: 'controladores/datos_sistema.php',
//             type: 'post',
//             dataType: 'json',
//             data: { accion: accion, datoSistema: datoSistema},
//             success: function(data) {
//                 if (data == true){
//                     Swal.fire({
//                         position: 'top-end',
//                         icon: 'success',
//                         title: 'Registro almacenado de manera exitosa !!',
//                         toast: true,
//                         showConfirmButton: false,
//                         timer: 1500,
//                         timerProgressBar: true,
//                     });
//                 } else if(data == 'existe'){
//                      Swal.fire({
//                         position: 'top-end',
//                         icon: 'warning',
//                         title: 'El registro que intenta crear, ya existe en la base de datos !!',
//                         toast: true,
//                         showConfirmButton: false,
//                         timer: 1500,
//                         timerProgressBar: true,
//                     });
//                 } else {
//                     Swal.fire({
//                         position: 'top-end',
//                         icon: 'error',
//                         title: 'El registro no se pudo almacenar !!',
//                         toast: true,
//                         showConfirmButton: false,
//                         timer: 1500,
//                         timerProgressBar: true,
//                     });
//                 }
//             }
//         });
//     }
// });


$('.btn').click(function (e) {
    e.preventDefault();
    let type = $(this).attr("id");
    let accion;
    let datoSistema;

    switch (type){
        case 'btn_nuevo_departamento':
            accion = 'nuevo_departamento';
            datoSistema = $('#nuevo_departamento').val();
            break;
        case 'btn_estado_recurso':
            accion = 'estado_recurso';
            datoSistema = $('#estado_recurso').val();
            break;
        case 'btn_familia_recurso':
            accion = 'familia_recurso';
            datoSistema = $('#familia_recurso').val();
            break;
        case 'btn_tipo_movimiento':
            accion = 'estado_recurso';
            datoSistema = $('#estado_recurso').val();
            break;
    }

    if (datoSistema.length <= 0){
        Swal.fire({
            icon: 'error',
            title: 'El campo debe contener datos !!',
            showConfirmButton: false,
            timer: 1500
        });
    } else if(!validador.test(datoSistema)){
        Swal.fire({
            icon: 'error',
            title: 'El campo no debe tener números o carácteres especiales !!',
            showConfirmButton: false,
            timer: 1500
        });
    } else{
        $.ajax({
            url: 'controladores/datos_sistema.php',
            type: 'post',
            dataType: 'json',
            data: { accion: accion, datoSistema: datoSistema},
            success: function(data){
                if (data == true){
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Registro almacenado de manera exitosa !!',
                        toast: true,
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true
                    });
                } else if(data == 'existe'){
                    Swal.fire({
                        position: 'top-end',
                        icon: 'warning',
                        title: 'El registro que intenta crear, ya existe en la base de datos !!',
                        toast: true,
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true
                    });
                } else{
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'El registro no se pudo almacenar !!',
                        toast: true,
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true
                    });
                }
            }
        });
        $('input[type="text"]').val('');

        // revisar si se puede hacer lo mismo que con los formularios pero con los div
    }
});
