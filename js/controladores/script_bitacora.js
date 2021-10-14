$(document).ready(function () {
    var funcion = "mostrar_bitacora";
    let tabla_bitacora = $('#bitacora').DataTable({
        "ajax": {
            "url": "controladores/info_tablas.php",
            "method": "post",
            "data": { funcion: funcion }
        },
        "columns": [
            { "data": "id_registro" },
            { "data": "nombre_usuario" },
            { "data": "fecha_entrada" },
            { "data": "fecha_salida" },
            { "data": "estado_sesion" }
            // {
            //     "defaultContent":`<button class="desactivar btn btn-danger" type="button"><i class="fas fa-window-close"></i></button>`}
        ],
        "language": spanish
    });

    // //  Evente que permite obtener los datos de la fila en donde se presiona el boton editar
    // $('#mis_usuarios tbody').on('click', '.editar', function () {
    //     let data = tabla_usuarios.row($(this).parents()).data();
    //     $("#form_editar").trigger("reset");
    //     $('#e_usuario').val(data.nombre_usuario);
    //     $("#e_rol option:contains(" + data.rol + ")").attr('selected', true);
    //     $('#e_correo').val(data.correo_usuario);
    //     $('#e_departamento option:contains(' + data.nombre_departamento + ')').attr('selected', true);
    //     $('#e_id').val(data.id_usuario);
    // });

    // // Evento que permite editar usuarios mediante el modal
    // $('#form_editar').submit(e => {
    //     let id = $('#e_id').val();
    //     let usuario = $('#e_usuario').val();
    //     let rol = $('#e_rol').val();
    //     let correo = $('#e_correo').val();
    //     let departamento = $('#e_departamento').val();
    //     let clave = $('#e_clave').val();
    //     // let clave2 = $('#e_clave2').vl();
    //     funcion = "editar";
    //     $.post('controladores/info_tablas.php', { id, usuario, rol, correo, departamento, clave, funcion }, (response) => { });
    // });

    // // Evento que permite eliminar obtener el id del usuario en donde se presiona eliminar
    // $('#mis_usuarios tbody').on('click', '.eliminar', function () {
    //     let data = tabla_usuarios.row($(this).parents()).data();
    //     $('#d_id').val(data.id_usuario);
    //     $('#d_nombre').val(data.nombre_usuario);
    // });

    // // Evento que permite eliminar el usuario seleccionado
    // $('#form_eliminar').submit(e => {
    //     let id = $('#d_id').val();
    //     funcion = "eliminar";
    //     $.post('controladores/info_tablas.php', { id, funcion }, (response) => { });
    // });

    // // Resetear formulario al aparecer
    // $("#btn_crear").click(function () {
    //     $("#form_crear").trigger("reset");
    //     // opcion = "crear";
    // });

    // // Activar o desactivar usuario
    // $('#mis_usuarios tbody').on('click', '.desactivar-activar', function () {
    //     let data = tabla_usuarios.row($(this).parents()).data();
    //     let id = data.id_usuario;
    //     let estado = data.estado_usuario;
    //     // console.log(id);
    //     funcion = "alterar";
    //     opcion = "alterar";
    //     $.ajax({
    //         url: "controladores/info_tablas.php",
    //         method: "post",
    //         data: { id: id, estado: estado, funcion: funcion },
    //         success: function (data) {
    //             if (opcion == "alterar") {
    //                 $(".text-center").text(data);
    //                 $("#aviso").modal("show");
    //             }
    //         }
    //     });
    // });


    // // Evento para crear nuevo usuario
    // $("#form_crear").submit(function (e) {
    //     e.preventDefault();
    //     usuario = $("#c_usuario").val();
    //     rol = $("#c_rol").val();
    //     correo = $("#c_correo").val();
    //     departamento = $("#c_departamento").val();
    //     clave = $("#c_clave").val();
    //     clave2 = $("#c_clave2").val();
    //     funcion = "crear";
    //     opcion = "crear";
    //     $.ajax({
    //         url: "controladores/info_tablas.php",
    //         method: "post",
    //         data: {usuario: usuario, rol: rol, correo: correo, departamento: departamento, clave: clave, clave2: clave2, funcion: funcion},
    //         success: function (data) {
    //             if (opcion == "crear") {
    //                 // $(".modal-title").text(data);
    //                 $(".text-center").text(data);
    //                 $("#aviso").modal("show");
    //             }
    //         }
    //     });
    //     $("#crear_usuario").modal("hide");
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



// Trabajar en como mostrar los datos sin refrescar la página, mediante las consultas ajax
