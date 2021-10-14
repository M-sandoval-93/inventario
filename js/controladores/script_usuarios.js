$(document).ready(function () {
    funcion = "mostrar_usuarios";
    let tabla_usuarios = $('#mis_usuarios').DataTable({
        "ajax": {
            "url": "controladores/info_tablas.php",
            "method": "post",
            "data": { funcion: funcion }
        },
        "columns": [
            { "data": "id_usuario" },
            { "data": "nombre_usuario" },
            { "data": "correo_usuario" },
            { "data": "nombre_departamento" },
            { "data": "rol" },
            { "data": "estado_usuario" },
            {
                "defaultContent":`<button class="desactivar-activar btn btn-warning" type="button"><i class="fas fa-unlock-alt"></i></button>
                                 <button class="editar btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#modal_usuarios"><i class="fas fa-pencil-alt"></i></button>
                                 <button class="eliminar btn btn-danger" type="button"><i class="fas fa-trash-alt"></i></button>`}
        ],
        "language": spanish
    });

    // Preparar modal para editar cuenta de usuario
    $('#mis_usuarios tbody').on('click', '.editar', function () {
        let data = tabla_usuarios.row($(this).parents()).data();
        $('#datos').trigger("reset");
        $('#m_usuario').val(data.nombre_usuario);
        $('#m_rol').val(data.rol);
        $('#m_correo').val(data.correo_usuario);
        $('#m_departamento option:contains(' + data.nombre_departamento + ')').attr('selected', true);
        $('#m_id').val(data.id_usuario);
        $('#m_accion').val('editar');
        $('.titulo').text("Editar cuenta de usuario");
    });

    // Preparar modal para crear cuenta de usuario
    $("#btn_crear").click(function () {
        $('#datos').trigger("reset");
        $('#m_accion').val('nuevo');
        $('.titulo').text("Nueva cuenta de usuario");
    });

    // Acción a realizar al presionar el btn del modal de usuarios
    $('#btn_registrar').click(function (e) {
        e.preventDefault();
        if ($('#m_accion').val() == 'editar'){
            // Condición que permite editar una cuenta de usuario
            id = $('#m_id').val();
            usuario = $('#m_usuario').val();
            rol = $('#m_rol').val();
            correo = $('#m_correo').val();
            departamento = $('#m_departamento').val();
            clave = $('#m_clave').val();
            clave2 = $('#m_clave2').val();
            funcion = "editar";
            if (clave != clave2){
                Swal.fire({
                    icon: 'warning',
                    title: 'Las contraseñas deben ser idénticas !!',
                    showConfirmButton: false,
                    timer: 1500
                });
            } else{
                $.ajax({
                    url: "controladores/info_tablas.php",
                    method: "post",
                    dataType: "json",
                    data: {id: id, usuario: usuario, rol: rol, correo: correo, departamento: departamento, clave: clave, funcion: funcion},
                    success: function (data) {
                        if (data == 'false') {
                            Swal.fire({
                                icon: 'error',
                                title: 'No se pudo actualizar la cuenta !!',
                                showConfirmButton: false,
                                timer: 1500
                            });
                        } else {
                            Swal.fire({
                                icon: 'success',
                                title: 'Actualización exitosa !!',
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    }
                });
            }
        } else{
            // Condición que permite crear una cuenta de usuario
            usuario = $("#m_usuario").val();
            rol = $("#m_rol").val();
            correo = $("#m_correo").val();
            departamento = $("#m_departamento").val();
            clave = $("#m_clave").val();
            clave2 = $("#m_clave2").val();
            
            if (clave.length == '' && clave2.length == ''){
                Swal.fire({
                    icon: 'error',
                    title: 'Se requiere una clave !!',
                    showConfirmButton: false,
                    timer: 1500
                });
            } else if (clave != clave2){
                Swal.fire({
                    icon: 'error',
                    title: 'Las claves deben coincidir !!',
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                funcion = "crear";
                $.ajax({
                    url: 'controladores/info_tablas.php',
                    type: 'post',
                    datatype: 'json',
                    data: { usuario: usuario, rol: rol, correo: correo, departamento: departamento, clave: clave, funcion: funcion },
                    success: function(data) {
                        if (data == 'existe'){
                            Swal.fire({
                                icon: 'error',
                                title: 'El usuario y/o contraseña ya existen !!',
                                showConfirmButton: false,
                                timer: 1500
                            });
                        } else {
                            if (data == 'false'){
                                Swal.fire({
                                    icon: 'error',
                                    title: 'No se pudo crear la cuenta !!',
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                            } else{
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Cuenta creada !!',
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                            }
                        }
                    }
                });
                tabla_usuarios.ajax.reload(null, false);
                $("#modal_usuarios").modal("hide"); 
            }
        }
    });


    // Evento que permite eliminar una cuenta
    $('#mis_usuarios tbody').on('click', '.eliminar', function () {
        let data = tabla_usuarios.row($(this).parents()).data();
        id = data.id_usuario;
        nombre = data.nombre_usuario;
        Swal.fire({
            icon: 'question',
            title: 'Se eliminara la cuenta de usuario "' + nombre +'"',
            showCancelButton: true,
            confirmButtonText: 'confirmar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#2691d9',
            cancelButtonColor: '#adadad',
        }).then(resultado => {
            if (resultado.isConfirmed) {
                funcion = "eliminar";

                $.ajax({
                    url: 'controladores/info_tablas.php',
                    type: 'post',
                    dataType: 'json',
                    data: { id: id, funcion: funcion },
                    success: function(data) {

                        // if (JSON.parse(data) == 'false'){
                        if (data == 'false'){
                            Swal.fire({
                                icon: 'error',
                                title: 'Error al eliminar la cuenta de usuario !!',
                                showConfirmButton: false,
                                timer: 1500
                            });
                        // } else if(JSON.parse(data) == 'uso'){ // prueba en caso de que no sirva la comparación sola
                        } else if(data == 'uso'){ 
                            Swal.fire({
                                icon: 'error',
                                title: 'Los registros del usuario estan siendo utilizados !!',
                                showConfirmButton: false,
                                timer: 1500
                            });
                        } else{
                            Swal.fire({
                                icon: 'success',
                                title: 'Cuenta de usuario eliminada !!',
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                        tabla_usuarios.ajax.reload(null, false);
                    }
                });
            }
        });
       
    });

    // Activar o desactivar usuario
    $('#mis_usuarios tbody').on('click', '.desactivar-activar', function () {
        let data = tabla_usuarios.row($(this).parents()).data();
        id = data.id_usuario;
        estado = data.estado_usuario;
        funcion = "alterar";

        $.ajax({
            url: "controladores/info_tablas.php",
            method: "post",
            dataType: 'json',
            data: { id: id, estado: estado, funcion: funcion },
            success: function (data) {
                if (data.resultado == 'false'){
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'El estado no se pudo actualizar !!',
                        toast: true,
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                    });
                } else{ 
                    if (estado == 'Activo'){
                        Swal.fire({
                            position: 'top-end',
                            icon: 'warning',
                            title: 'Cuenta desactivada !!',
                            toast: true,
                            showConfirmButton: false,
                            timer: 2000,
                            timerProgressBar: true,
                        });
                    } else{
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Cuenta activada !!',
                            toast: true,
                            showConfirmButton: false,
                            timer: 2000,
                            timerProgressBar: true,
                        });
                    }
                }
            }
        });
        tabla_usuarios.ajax.reload(null, false);
    });

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
