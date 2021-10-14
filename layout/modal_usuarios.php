
<?php
    require_once 'controladores/conexion.php';
    $consulta = 'SELECT * FROM departamentos ORDER BY nombre_departamento ASC';
    $resultado_para_usuarios = $conexion->query($consulta);
    $resultado_para_funcionarios = $conexion->query($consulta);
?>
<!-- Modal para cuenta de usuarios -->
<div class="modal fade" id="modal_usuarios" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h2 class="modal-title titulo" id="staticBackdropLabel"></h2>
            </div>
            <div class="modal-body">
                <!-- contenido del modal -->
                <form id="datos">
                    <!-- Campo para el nombre de usuario -->
                    <div class="form-group">
                        <label class="form-label">Nombre de usuario <span class="red">*</span></label>
                        <input type="text" id="m_usuario" class="form-control" autocomplete="off"
                            required>
                        <!-- <p class="p_inv">El nombre debe ser de 6 a 45 dígitos y sin carácteres especiales</p> -->
                    </div>

                    <!-- campo de seleccion del rol -->
                    <div class="form-group mt-3">
                        <label class="form-label">Rol de usuario <span class="red">*</span></label>
                        <select id="m_rol" class="form-select">
                            <option disabled selected>Asignar roles</option>
                            <option value="Soporte">Soporte</option>
                            <option value="Administrador">Administrador</option>
                            <option value="Jefe">Jefe</option>
                            <option value="Funcionario">Funcionario</option>
                        </select>
                        <!-- <p class="p_inv">El campo contienen valores inválidos</p> -->
                    </div>

                    <!-- Campo para el correo institucional -->
                    <div class="form-group mt-3">
                        <label class="form-label">Correo Institucional</label>
                        <input type="email" id="m_correo" class="form-control">
                        <!-- <p class="p_inv">Debe ingresar un correo válido</p> -->
                    </div>

                    <!-- Campo de seleccion de departamento -->
                    <div class="form-group mt-3">
                        <label class="form-label">Departamento <span class="ob">*</span></label>
                        <select id="m_departamento" class="form-select">
                            <option disabled selected>Asignar departamento</option>
                        <?php while ($row = $resultado_para_usuarios->fetch_assoc()){ ?>
                            <option value="<?php echo $row['id_departamento']; ?>"><?php echo $row['nombre_departamento']; ?></option>

                        <?php } ?>
                        </select>
                        <!-- <p class="p_inv">El campo contienen valores inválidos</p> -->
                    </div>

                    <!-- Campos de contraseña -->
                    <div class="row mt-3 mb-3">
                        <!-- Campo de contraseña 1 -->
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label">Contraseña</label>
                                <input type="password" id="m_clave" class="form-control">
                                <!-- <p class="p_inv">Las contraseñas deben conicidir</p> -->
                            </div>
                        </div>

                        <!-- Campo de contraseña 2 -->
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label">Repetir contraseña</label>
                                <input type="password" id="m_clave2" class="form-control">
                                <!-- <p class="p_inv">Las contraseñas deben conicidir</p> -->
                            </div>
                        </div>
                    </div>

                    <!-- Botones para cerrar modal y registrar usuario -->
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button id="btn_registrar" class="btn btn-primary">Guardar cambios</button>
                    </div>
                    <input type="hidden" id="m_id">
                    <input type="hidden" id="m_accion">
                </form>
            </div>
        </div>
    </div>
</div>

<!-- Modal para funcionarios -->
<div class="modal fade" id="modal_funcionarios" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h2 class="modal-title titulo" id="staticBackdropLabel"></h2>
            </div>
            <div class="modal-body">
                <!-- contenido del modal -->
                <form id="datos_funcionarios">
                    <!-- Campo para el nombre de usuario -->
                    <div class="form-group">
                        <label class="form-label">Nombre de usuario <span class="red">*</span></label>
                        <input type="text" id="mf_usuario" class="form-control" autocomplete="off"
                            required>
                        <!-- <p class="p_inv">El nombre debe ser de 6 a 45 dígitos y sin carácteres especiales</p> -->
                    </div>

                    <!-- Campo para el correo institucional -->
                    <div class="form-group mt-3">
                        <label class="form-label">Correo Institucional</label>
                        <input type="email" id="mf_correo" class="form-control">
                        <!-- <p class="p_inv">Debe ingresar un correo válido</p> -->
                    </div>

                    <!-- Campo de seleccion de departamento -->
                    <div class="form-group mt-3">
                        <label class="form-label">Departamento <span class="ob">*</span></label>
                        <select id="mf_departamento" class="form-select">
                            <option disabled selected>Asignar departamento</option>
                        <?php while ($row = $resultado_para_funcionarios->fetch_assoc()){ ?>
                            <option value="<?php echo $row['id_departamento']; ?>"><?php echo $row['nombre_departamento']; ?></option>

                        <?php } ?>
                        </select>
                        <!-- <p class="p_inv">El campo contienen valores inválidos</p> -->
                    </div>

                    <!-- Botones para cerrar modal y registrar usuario -->
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button id="btn_registrar_funcionario" class="btn btn-primary">Guardar cambios</button>
                    </div>
                    <input type="hidden" id="mf_id">
                    <input type="hidden" id="mf_accion">
                </form>
            </div>
        </div>
    </div>
</div>


