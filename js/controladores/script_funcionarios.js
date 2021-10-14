$(document).ready(function () {
    funcion = "mostrar_funcionarios";
    let tabla_funcionarios = $('#mis_funcionarios').DataTable({
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
            {
                "defaultContent":`<button class="btn btn-primary editar" type="button" data-bs-toggle="modal" data-bs-target="#modal_funcionarios"><i class="fas fa-pencil-alt"></i></button>
                                 <button class="btn btn-danger eliminar" type="button"><i class="fas fa-trash-alt"></i></button>
                                 <button class="btn btn-success convertir" type="button" data-bs-toggle="modal" data-bs-target="#modal_usuarios"><i class="fas fa-user-plus"></i></button>`}
        ],
        "language": spanish
    });

    // Preparar modal para editar registro de funcionario
    $('#mis_funcionarios tbody').on('click', '.editar', function () {
        let data = tabla_funcionarios.row($(this).parents()).data();
        $('#datos_funcionarios').trigger("reset");
        $('#mf_usuario').val(data.nombre_usuario);
        $('#mf_correo').val(data.correo_usuario);
        $('#mf_departamento option:contains(' + data.nombre_departamento + ')').attr('selected', true);
        $('#mf_id').val(data.id_usuario);
        $('#mf_accion').val('editar');
        $('.titulo').text("Editar funcionario");
    });

    // Preparar modal para registrar funcionario
    $("#btn_crear_funcionario").click(function () {
        $('#datos_funcionarios').trigger("reset");
        $('#mf_accion').val('nuevo');
        $('.titulo').text("Crear funcionario");
    });

    // Acción a realizar al presionar el btn del modal de funcionarios
    $('#btn_registrar_funcionario').click(function (e) {
        e.preventDefault();
        if ($('#mf_accion').val() == 'editar'){
            // Condición que permite editar un funcionario
            id = $('#mf_id').val();
            usuario = $('#mf_usuario').val();
            correo = $('#mf_correo').val();
            departamento = $('#mf_departamento').val();
            funcion = "editar_funcionario";

            $.ajax({
                url: "controladores/info_tablas.php",
                method: "post",
                dataType: "json",
                data: {id: id, usuario: usuario, correo: correo, departamento: departamento, funcion: funcion},
                success: function (data) {
                    if (data == 'false') {
                        Swal.fire({
                            icon: 'error',
                            title: 'No se pudo actualizar el funcionario !!',
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
        } else{
            // Condición que permite crear un funcionario
            usuario = $("#mf_usuario").val();
            correo = $("#mf_correo").val();
            departamento = $("#mf_departamento").val();
            
            funcion = "crear_funcionario";
            $.ajax({
                url: 'controladores/info_tablas.php',
                type: 'post',
                dataType: 'json',
                data: { usuario: usuario, correo: correo, departamento: departamento, funcion: funcion },
                success: function(data) {
                    if (data == 'existe'){
                        Swal.fire({
                            icon: 'error',
                            title: 'El funcionario ya existe !!',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    } else {
                        if (data == 'false'){
                            Swal.fire({
                                icon: 'error',
                                title: 'No se pudo registrar el funcionario !!',
                                showConfirmButton: false,
                                timer: 1500
                            });
                        } else{
                            Swal.fire({
                                icon: 'success',
                                title: 'Funcionario registrado !!',
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    }
                }
            });
        }
        tabla_funcionarios.ajax.reload(null, false);
        $("#modal_funcionarios").modal("hide"); 
    });

    // Evento que permite eliminar un funcionario
    $('#mis_funcionarios tbody').on('click', '.eliminar', function () {
        let data = tabla_funcionarios.row($(this).parents()).data();
        id = data.id_usuario;
        nombre = data.nombre_usuario;
        Swal.fire({
            icon: 'question',
            title: 'Se eliminara el registro del funcionario "' + nombre +'"',
            showCancelButton: true,
            confirmButtonText: 'confirmar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#2691d9',
            cancelButtonColor: '#adadad',
        }).then(resultado => {
            if (resultado.isConfirmed) {
                funcion = "eliminar_funcionario";

                $.ajax({
                    url: 'controladores/info_tablas.php',
                    type: 'post',
                    dataType: 'json',
                    data: { id: id, funcion: funcion },
                    success: function(data) {
                        if (data == 'false'){
                            Swal.fire({
                                icon: 'error',
                                title: 'Error al eliminar registro del funcionario !!',
                                showConfirmButton: false,
                                timer: 1500
                            });
                        } else if(data == 'uso'){ 
                            Swal.fire({
                                icon: 'error',
                                title: 'Los registros del funcionario estan siendo utilizados !!',
                                showConfirmButton: false,
                                timer: 1500
                            });
                        } else{
                            Swal.fire({
                                icon: 'success',
                                title: 'Registro de funcionario eliminado !!',
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                        tabla_funcionarios.ajax.reload(null, false);
                    }
                });
            }
        });
       
    });

    // Preparar modal para crear nuevo usuario
    $('#mis_funcionarios tbody').on('click', '.convertir', function () {
        let data = tabla_funcionarios.row($(this).parents()).data();
        $('#datos_funcionarios').trigger("reset");
        $('#m_usuario').val(data.nombre_usuario);
        $('#m_correo').val(data.correo_usuario);
        $('#m_departamento option:contains(' + data.nombre_departamento + ')').attr('selected', true);
        $('#m_id').val(data.id_usuario);
        $('.titulo').text("Convertir en cuenta de usuario");
    });

    $('#btn_registrar').click(function (e) {
        e.preventDefault();
        id = $('#m_id').val();
        usuario = $('#m_usuario').val();
        rol = $('#m_rol').val();
        correo = $('#m_correo').val();
        departamento = $('#m_departamento').val();
        clave = $('#m_clave').val();
        clave2 = $('#m_clave2').val();
        funcion = "convertir";
        if (clave != clave2){
            Swal.fire({
                icon: 'warning',
                title: 'Las contraseñas deben ser idénticas !!',
                showConfirmButton: false,
                timer: 1500
            });
            // Agregar validadores y condición que exige la contraseña
        } else{
            $.ajax({
                url: "controladores/info_tablas.php",
                method: "post",
                dataType: "json",
                data: {id: id, usuario: usuario, rol: rol, correo: correo, departamento: departamento, clave: clave, funcion: funcion},
                success: function (data) {
                    if (data == 'existe'){
                        Swal.fire({
                            icon: 'warning',
                            title: 'Ya existe una cuenta con los datos ingresados !!',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    } else if (data == 'false') {
                        Swal.fire({
                            icon: 'error',
                            title: 'No se pudo crear la cuenta !!',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    } else {
                        Swal.fire({
                            icon: 'success',
                            title: 'Se generó una cuenta con los datos del funcionario !!',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                }
            });
            tabla_funcionarios.ajax.reload(null, false);
            $("#modal_usuarios").modal("hide"); 
        }
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
