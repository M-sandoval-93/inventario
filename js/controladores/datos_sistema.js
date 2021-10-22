const validador =  /^[a-zA-ZÁ-ÿ\s. ]+$/;


// $(document).ready(function () {
//     let tabla_datos_sistema = $('#mis_datosSistema').DataTable({
//         "ajax": {
//             "url": "controladores/datos_sistema.php",
//             "method": "post",
//             "data": { accion: accion, datoSistema: datoSistema}
//         },
//         "columns": [
//             { "data": dato1},
//             { "data": dato2},
//             { "defaultContent": `<button class="btn btn-primary" type="button"><i class="fas fa-pencil-alt"></i></button>
//                 <button class="editar btn btn-danger" type="button" data-bs-toggle="modal" data-bs-target="#modal_usuarios"><i class="fas fa-trash-alt"></i></button>`}
//         ],
//         "lenguage": spanish
//     });

// });


$('.btn-ingreso').click(function (e) {
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
            accion = 'tipo_movimiento';
            datoSistema = $('#tipo_movimiento').val();
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
        // línea que permite limpiar el input
        $('input[type="text"]').val('');
    }
});

$('.btn-buscar').click(function (e) {
    e.preventDefault();
    let type = $(this).attr("id");
    let accion = 'mostrar_datoSistema';
    let datoSistema;
    let dato1;
    let dato2;

    switch (type){
        case 'btn_buscar_departamentos':
            datoSistema = 'departamentos';
            dato1 = 'id_departamento';
            dato2 = 'nombre_departamento'
            break;
        case 'btn_buscar_estado_recursos':
            datoSistema = 'estado_recursos';
            dato1 = 'id_estado';
            dato2 = 'descripcion_estado_recursos';
            // tabla_datos_sistema.ajax.reload(null, false);
            break;
        case 'btn_buscar_familia_recursos':
            datoSistema = 'familia_recursos';
            dato1 = 'id_familia';
            dato2 = 'nombre_familia_recursos';
            break;
        case 'btn_buscar_tipo_movimientos':
            datoSistema = 'tipo_movimiento';
            dato1 = 'id_tipo_movimiento';
            dato2 = 'descripcion_tipo_movimiento';
            break;
    }

    // revisar como mostrar la información

    // let tabla_datos_sistema = $('#mis_datosSistema').DataTable({
    //     "ajax": {
    //         "url": "controladores/datos_sistema.php",
    //         "method": "post",
    //         "data": { accion: accion, datoSistema: datoSistema}
    //     },
    //     "columns": [
    //         { "data": dato1},
    //         { "data": dato2},
    //         { "defaultContent": `<button class="btn btn-primary" type="button"><i class="fas fa-pencil-alt"></i></button>
    //             <button class="editar btn btn-danger" type="button" data-bs-toggle="modal" data-bs-target="#modal_usuarios"><i class="fas fa-trash-alt"></i></button>`}
    //     ],
    //     "lenguage": spanish
    // });
});


// Para pasar a español el formato de dataTable
let spanish = {
    "aria": {
        "sortAscending": ": orden ascendente",
        "sortDescending": ": orden descendente"
    },
    "autoFill": {
        "cancel": "Cancelar",
        "fill": "Llenar todas las celdas con <i>%d&lt;\\\/i&gt;<\/i>",
        "fillHorizontal": "Llenar celdas horizontalmente",
        "fillVertical": "Llenar celdas verticalmente"
    },
    "buttons": {
        "collection": "Colección <span class=\"ui-button-icon-primary ui-icon ui-icon-triangle-1-s\"><\/span>",
        "colvis": "Visibilidad de la columna",
        "colvisRestore": "Restaurar visibilidad",
        "copy": "Copiar",
        "copyKeys": "Presiona ctrl or u2318 + C para copiar los datos de la tabla al portapapeles.<br \/><br \/>Para cancelar, haz click en este mensaje o presiona esc.",
        "copySuccess": {
            "_": "Copió %ds registros al portapapeles",
            "1": "Copió un registro al portapapeles"
        },
        "copyTitle": "Copiado al portapapeles",
        "csv": "CSV",
        "excel": "Excel",
        "pageLength": {
            "_": "Mostrar %ds registros",
            "-1": "Mostrar todos los registros"
        },
        "pdf": "PDF",
        "print": "Imprimir"
    },
    "datetime": {
        "amPm": [
            "AM",
            "PM"
        ],
        "hours": "Horas",
        "minutes": "Minutos",
        "months": {
            "0": "Enero",
            "1": "Febrero",
            "10": "Noviembre",
            "11": "Diciembre",
            "2": "Marzo",
            "3": "Abril",
            "4": "Mayo",
            "5": "Junio",
            "6": "Julio",
            "7": "Agosto",
            "8": "Septiembre",
            "9": "Octubre"
        },
        "next": "Siguiente",
        "previous": "Anterior",
        "seconds": "Segundos",
        "weekdays": [
            "Dom",
            "Lun",
            "Mar",
            "Mie",
            "Jue",
            "Vie",
            "Sab"
        ]
    },
    "decimal": ",",
    "editor": {
        "close": "Cerrar",
        "create": {
            "button": "Nuevo",
            "submit": "Crear",
            "title": "Crear nuevo registro"
        },
        "edit": {
            "button": "Editar",
            "submit": "Actualizar",
            "title": "Editar registro"
        },
        "error": {
            "system": "Ocurrió un error de sistema (&lt;a target=\"\\\" rel=\"nofollow\" href=\"\\\"&gt;Más información)."
        },
        "multi": {
            "info": "Los elementos seleccionados contienen diferentes valores para esta entrada. Para editar y configurar todos los elementos de esta entrada con el mismo valor, haga clic o toque aquí, de lo contrario, conservarán sus valores individuales.",
            "noMulti": "Esta entrada se puede editar individualmente, pero no como parte de un grupo.",
            "restore": "Deshacer cambios",
            "title": "Múltiples valores"
        },
        "remove": {
            "button": "Eliminar",
            "confirm": {
                "_": "¿Está seguro de que desea eliminar %d registros?",
                "1": "¿Está seguro de que desea eliminar 1 registro?"
            },
            "submit": "Eliminar",
            "title": "Eliminar registro"
        }
    },
    "emptyTable": "Sin registros",
    "info": "Mostrando _START_ a _END_ de _TOTAL_ registros",
    "infoEmpty": "Mostrando 0 a 0 de 0 registros",
    "infoFiltered": "(filtrado de _MAX_ registros)",
    "infoThousands": ".",
    "lengthMenu": "Mostrar _MENU_ registros",
    "loadingRecords": "Cargando...",
    "paginate": {
        "first": "Primero",
        "last": "Último",
        "next": "Siguiente",
        "previous": "Anterior"
    },
    "processing": "Procesando...",
    "search": "Buscar:",
    "searchBuilder": {
        "add": "Agregar Condición",
        "button": {
            "_": "Filtros (%d)",
            "0": "Filtrar"
        },
        "clearAll": "Limpiar Todo",
        "condition": "Condición",
        "conditions": {
            "array": {
                "contains": "Contiene",
                "empty": "Vacío",
                "equals": "Igual",
                "not": "Distinto",
                "notEmpty": "No vacío",
                "without": "Sin"
            },
            "date": {
                "after": "Mayor",
                "before": "Menor",
                "between": "Entre",
                "empty": "Vacío",
                "equals": "Igual",
                "not": "Distinto",
                "notBetween": "No entre",
                "notEmpty": "No vacío"
            },
            "number": {
                "between": "Entre",
                "empty": "Vacío",
                "equals": "Igual",
                "gt": "Mayor",
                "gte": "Mayor o igual",
                "lt": "Menor",
                "lte": "Menor o igual",
                "not": "Distinto",
                "notBetween": "No entre",
                "notEmpty": "No vacío"
            },
            "string": {
                "contains": "Contiene",
                "empty": "Vacío",
                "endsWith": "Termina con",
                "equals": "Igual",
                "not": "Distinto",
                "notEmpty": "No vacío",
                "startsWith": "Comienza con"
            }
        },
        "data": "Datos",
        "deleteTitle": "Eliminar regla de filtrado",
        "leftTitle": "Filtros anulados",
        "logicAnd": "Y",
        "logicOr": "O",
        "rightTitle": "Filtro",
        "title": {
            "_": "Filtros (%d)",
            "0": "Filtrar"
        },
        "value": "Valor"
    },
    "searchPanes": {
        "clearMessage": "Limpiar todo",
        "collapse": {
            "_": "Paneles de búsqueda (%d)",
            "0": "Paneles de búsqueda"
        },
        "count": "{total}",
        "countFiltered": "{shown} ({total})",
        "emptyPanes": "Sin paneles de búsqueda",
        "loadMessage": "Cargando paneles de búsqueda...",
        "title": "Filtros activos - %d"
    },
    "select": {
        "cells": {
            "_": "%d celdas seleccionadas",
            "1": "Una celda seleccionada"
        },
        "columns": {
            "_": "%d columnas seleccionadas",
            "1": "Una columna seleccionada"
        }
    },
    "thousands": ".",
    "zeroRecords": "No se encontraron registros"
}
