"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarioCollection = void 0;
var usuario_1 = require("./usuario");
var inquirer = require("inquirer");
// base de datos
var bd_1 = require("./bd");
/**
 * @class usuarioCollection
 * @description Clase que representa una colección de usuarios
 */
var usuarioCollection = /** @class */ (function () {
    function usuarioCollection() {
        this.usuarios = [];
        this.leerBD();
        // this.usuarios = usuario_array;
        // usuario_array.forEach((usuario1) => {
        //   const user_aux = new Usuario(usuario1.getNombre, usuario1.getActividad, usuario1.getAmigos, usuario1.getGrupoAmigos, usuario1.getEstadisticas, usuario1.getHistoricoRutas, usuario1.getRetos, usuario1.getID);
        //   this.usuarios.push(user_aux);
        // });
        // this.usuarios = usuario_array;
    }
    usuarioCollection.prototype.leerBD = function () {
        var usuarios_aux = bd_1.database.get("usuarios").value();
        var array_aux = [];
        usuarios_aux.forEach(function (user) {
            var user_aux = new usuario_1.Usuario(user.nombre, user.actividad, user.amigos, user.grupo_de_amigos, user.estadisticas, user.historicoRutas, user.retos, user.id);
            array_aux.push(user_aux);
        });
        this.setUsuarios = array_aux;
    };
    usuarioCollection.prototype.manageUsuarios = function () {
        var _this = this;
        var prompt = inquirer.createPromptModule();
        prompt([
            {
                type: 'list',
                name: 'opcion',
                message: 'Manejo de Usuarios, ¿qué quieres hacer?',
                choices: [
                    { name: 'Añadir Usuario', value: 'add' },
                    { name: 'Borrar Usuario', value: 'remove' },
                    { name: 'Modificar Usuario', value: 'modify' },
                    { name: 'Salir', value: 'Salir' },
                ]
            }
        ]).then(function (answers) {
            if (answers.opcion === 'add') {
                _this.promptAddUser();
            }
            else if (answers.opcion === 'remove') {
                _this.promptBorrarUser();
            }
            else if (answers.opcion === 'modify') {
                _this.promptModificarUser();
            }
            else if (answers.opcion === 'Salir') {
                // cerrar prompt
                process.exit(0);
            }
        });
    };
    usuarioCollection.prototype.promptBorrarUser = function () {
        var _this = this;
        var prompt = inquirer.createPromptModule();
        prompt([
            {
                type: 'list',
                name: 'opcion',
                message: '¿Qué usuario quieres borrar? Introduce su ID: ',
                choices: this.usuarios.map(function (user) {
                    return { name: user.getNombre, value: user.getID };
                })
            }
        ]).then(function (answers) {
            _this.borrarUsuario(answers.opcion);
            _this.manageUsuarios();
        });
    };
    usuarioCollection.prototype.borrarUsuario = function (id) {
        var _this = this;
        var control_bool = false;
        this.usuarios.forEach(function (user, indice) {
            if (user.getID == id) {
                _this.usuarios.splice(indice, 1);
                control_bool = true;
                bd_1.database.get("usuarios").splice(indice, 1).write();
            }
        });
        if (control_bool) {
            console.log("Usuario borrado");
        }
        else {
            console.log("No se ha encontrado el usuario");
        }
    };
    usuarioCollection.prototype.promptAddUser = function () {
        var _this = this;
        var prompt = inquirer.createPromptModule();
        prompt([
            {
                type: 'input',
                name: 'nombre',
                message: 'Introduce el nombre del usuario: '
            },
            {
                type: 'list',
                name: 'actividad',
                message: '¿Qué actividad realiza?',
                choices: [
                    { name: 'Ciclismo', value: 'Ciclismo' },
                    { name: 'Running', value: 'Running' },
                ]
            },
            {
                type: 'input',
                name: 'amigos',
                message: 'Introduce los IDs de los amigos del usuario "id1,id2,...": '
            },
            {
                type: 'input',
                name: 'grupo_de_amigos',
                message: 'Inserta los grupos de amigos de la forma "id1,id2,...;id3,id4,...": ',
            },
            {
                type: 'input',
                name: 'estadisticas1',
                message: 'Introduce las estadísticas de la semana: "km,desnivel"',
            },
            {
                type: 'input',
                name: 'estadisticas2',
                message: 'Introduce las estadísticas del mes: "km,desnivel"',
            },
            {
                type: 'input',
                name: 'estadisticas3',
                message: 'Introduce las estadísticas del año: "km,desnivel"',
            },
            {
                type: 'input',
                name: 'historicoRutas',
                message: '¿Qué rutas ha realizado? "id1,id2,..."',
            },
            {
                type: 'input',
                name: 'retos',
                message: '¿Qué retos ha realizado? "id1,id2,..."',
            },
        ]).then(function (answers) {
            var amigos_aux = answers.amigos.split(",");
            var historicoRutas_aux = answers.historicoRutas.split(",");
            var retos_aux = answers.retos.split(",");
            // sacar grupos de amigos
            var grupos_aux = answers.grupo_de_amigos.split(";");
            // sacar estadisticas
            var estadisticas_aux = [];
            estadisticas_aux.push(answers.estadisticas1.split(","));
            estadisticas_aux.push(answers.estadisticas2.split(","));
            estadisticas_aux.push(answers.estadisticas3.split(","));
            var est1 = { km: parseInt(estadisticas_aux[0][0]), desnivel: parseInt(estadisticas_aux[0][1]) };
            var est2 = { km: parseInt(estadisticas_aux[1][0]), desnivel: parseInt(estadisticas_aux[1][1]) };
            var est3 = { km: parseInt(estadisticas_aux[2][0]), desnivel: parseInt(estadisticas_aux[2][1]) };
            var estadisticas = {
                semana: est1,
                mes: est2,
                año: est3
            };
            // crear usuario
            var user_aux = new usuario_1.Usuario(answers.nombre, answers.actividad, amigos_aux, grupos_aux, estadisticas, historicoRutas_aux, retos_aux);
            // añadir usuario
            _this.usuarios.push(user_aux);
            _this.manageUsuarios();
        });
    };
    usuarioCollection.prototype.promptModificarUser = function () {
        var _this = this;
        var prompt = inquirer.createPromptModule();
        prompt([
            {
                type: 'list',
                name: 'opcion',
                message: '¿Qué usuario quieres modificar? Introduce su ID: ',
                choices: this.usuarios.map(function (user) {
                    return { name: user.getNombre, value: user.getID };
                })
            }
        ]).then(function (answers) {
            _this.modificarUsuario(answers.opcion);
        });
    };
    /**
   * Metodo para borrar un elemento de la base de datos
   * @param identificador
   */
    usuarioCollection.prototype.borrarElementoBD = function (identificador) {
        this.usuarios.forEach(function (user, indice) {
            if (user.getID == identificador) {
                bd_1.database.get("usuarios").splice(indice, 1).write();
                return true;
            }
        });
        return false;
    };
    usuarioCollection.prototype.modificarUsuario = function (identificador) {
        var _this = this;
        // 1. comprobar que el id de la ruta existe
        // 2. preguntar que se quiere modificar
        // 3. modificarlo
        // 4. devolver true si se ha modificado o false si no se ha modificado
        var id_existe_en_coleccion = false;
        var indice = -1;
        this.usuarios.forEach(function (user, index) {
            if (user.getID == identificador) {
                id_existe_en_coleccion = true;
                indice = index;
            }
        });
        if (!id_existe_en_coleccion) {
            console.log('No existe la ruta que se intenta modificar');
            return;
        }
        var prompt = inquirer.createPromptModule();
        prompt([
            {
                type: 'list',
                name: 'opcion',
                message: '¿Qué quieres modificar?',
                choices: [
                    { name: 'Nombre', value: 'nombre' },
                    { name: 'Actividad', value: 'actividad' },
                    { name: 'Amigos', value: 'amigos' },
                    { name: 'Grupos de amigos', value: 'grupos_de_amigos' },
                    { name: 'Estadísticas', value: 'estadisticas' },
                    { name: 'Historico de rutas', value: 'historico_rutas' },
                    { name: 'Retos', value: 'retos' },
                ]
            }
        ]).then(function (answers) {
            switch (answers.opcion) {
                case 'nombre':
                    prompt([
                        {
                            type: 'input',
                            name: 'nombre2',
                            message: 'Introduce el nuevo nombre del usuario',
                        }
                    ]).then(function (answers) {
                        _this.usuarios[indice].setNombre = answers.nombre2;
                        _this.borrarElementoBD(identificador);
                        var ruta_aux = new usuario_1.Usuario(_this.usuarios[indice].getNombre, _this.usuarios[indice].getActividad, _this.usuarios[indice].getAmigos, _this.usuarios[indice].getGrupoAmigos, _this.usuarios[indice].getEstadisticas, _this.usuarios[indice].getHistoricoRutas, _this.usuarios[indice].getRetos, _this.usuarios[indice].getID);
                        _this.usuarios.push(ruta_aux);
                        _this.usuarios.splice(indice, 1);
                        _this.manageUsuarios();
                    });
                    break;
                case 'actividad':
                    prompt([
                        {
                            type: 'list',
                            name: 'actividad',
                            message: '¿Qué actividad realiza?',
                            choices: [
                                { name: 'Bicicleta', value: 'Bicicleta' },
                                { name: 'Correr', value: 'Correr' },
                            ]
                        }
                    ]).then(function (answers) {
                        _this.usuarios[indice].setActividad = answers.actividad;
                        _this.borrarElementoBD(identificador);
                        var ruta_aux = new usuario_1.Usuario(_this.usuarios[indice].getNombre, _this.usuarios[indice].getActividad, _this.usuarios[indice].getAmigos, _this.usuarios[indice].getGrupoAmigos, _this.usuarios[indice].getEstadisticas, _this.usuarios[indice].getHistoricoRutas, _this.usuarios[indice].getRetos, _this.usuarios[indice].getID);
                        _this.usuarios.push(ruta_aux);
                        _this.usuarios.splice(indice, 1);
                        _this.manageUsuarios();
                    });
                    break;
                case 'amigos':
                    prompt([
                        {
                            type: 'list',
                            name: 'amigos',
                            message: '¿Qué deseas hacer?',
                            choices: [
                                { name: 'Añadir amigo', value: 'añadir' },
                                { name: 'Eliminar amigo', value: 'eliminar' },
                                { name: 'Nueva lista de amigos', value: 'nuevo' },
                            ]
                        }
                    ]).then(function (answers) {
                        switch (answers.amigos) {
                            case 'añadir':
                                prompt([
                                    {
                                        type: 'input',
                                        name: 'amigo',
                                        message: 'Introduce el id del amigo',
                                    }
                                ]).then(function (answers) {
                                    _this.usuarios[indice].setAmigos = _this.usuarios[indice].getAmigos.concat(answers.amigo);
                                    _this.borrarElementoBD(identificador);
                                    var ruta_aux = new usuario_1.Usuario(_this.usuarios[indice].getNombre, _this.usuarios[indice].getActividad, _this.usuarios[indice].getAmigos, _this.usuarios[indice].getGrupoAmigos, _this.usuarios[indice].getEstadisticas, _this.usuarios[indice].getHistoricoRutas, _this.usuarios[indice].getRetos, _this.usuarios[indice].getID);
                                    _this.usuarios.push(ruta_aux);
                                    _this.usuarios.splice(indice, 1);
                                    _this.manageUsuarios();
                                });
                                break;
                            case 'eliminar':
                                prompt([
                                    {
                                        type: 'list',
                                        name: 'id',
                                        message: '¿Qué amigo quieres eliminar?',
                                        choices: _this.usuarios[indice].getAmigos.map(function (amigo) {
                                            return { name: amigo, value: amigo };
                                        })
                                    }
                                ]).then(function (answers) {
                                    _this.usuarios[indice].setAmigos = _this.usuarios[indice].getAmigos.filter(function (amigo) {
                                        return amigo != answers.id;
                                    });
                                    _this.borrarElementoBD(identificador);
                                    var ruta_aux = new usuario_1.Usuario(_this.usuarios[indice].getNombre, _this.usuarios[indice].getActividad, _this.usuarios[indice].getAmigos, _this.usuarios[indice].getGrupoAmigos, _this.usuarios[indice].getEstadisticas, _this.usuarios[indice].getHistoricoRutas, _this.usuarios[indice].getRetos, _this.usuarios[indice].getID);
                                    _this.usuarios.push(ruta_aux);
                                    _this.usuarios.splice(indice, 1);
                                    _this.manageUsuarios();
                                });
                                break;
                            case 'nuevo':
                                prompt([
                                    {
                                        type: 'input',
                                        name: 'amigo',
                                        message: 'Introduce nueva lista de amigos "id1,id2,..."',
                                    }
                                ]).then(function (answers) {
                                    _this.usuarios[indice].setAmigos = answers.amigo.split(',');
                                    _this.borrarElementoBD(identificador);
                                    var ruta_aux = new usuario_1.Usuario(_this.usuarios[indice].getNombre, _this.usuarios[indice].getActividad, _this.usuarios[indice].getAmigos, _this.usuarios[indice].getGrupoAmigos, _this.usuarios[indice].getEstadisticas, _this.usuarios[indice].getHistoricoRutas, _this.usuarios[indice].getRetos, _this.usuarios[indice].getID);
                                    _this.usuarios.push(ruta_aux);
                                    _this.usuarios.splice(indice, 1);
                                    _this.manageUsuarios();
                                });
                                break;
                        }
                    });
                    break;
                case 'grupos_de_amigos':
                    prompt([
                        {
                            type: 'list',
                            name: 'grupos',
                            message: '¿Qué deseas hacer?',
                            choices: [
                                { name: 'Añadir grupo', value: 'añadir' },
                                { name: 'Eliminar grupo', value: 'eliminar' },
                            ]
                        }
                    ]).then(function (answers) {
                        switch (answers.grupos) {
                            case 'añadir':
                                prompt([
                                    {
                                        type: 'input',
                                        name: 'grupo',
                                        message: 'Introduce el id del grupo de amigos "id1,id2"',
                                    }
                                ]).then(function (answers) {
                                    _this.usuarios[indice].setGrupoAmigos = _this.usuarios[indice].getGrupoAmigos.concat(answers.grupo);
                                    _this.borrarElementoBD(identificador);
                                    var ruta_aux = new usuario_1.Usuario(_this.usuarios[indice].getNombre, _this.usuarios[indice].getActividad, _this.usuarios[indice].getAmigos, _this.usuarios[indice].getGrupoAmigos, _this.usuarios[indice].getEstadisticas, _this.usuarios[indice].getHistoricoRutas, _this.usuarios[indice].getRetos, _this.usuarios[indice].getID);
                                    _this.usuarios.push(ruta_aux);
                                    _this.usuarios.splice(indice, 1);
                                    _this.manageUsuarios();
                                });
                                break;
                            case 'eliminar':
                                prompt([
                                    {
                                        type: 'list',
                                        name: 'id',
                                        message: '¿Qué grupo de amigos quieres eliminar?',
                                        choices: _this.usuarios[indice].getGrupoAmigos.map(function (grupo) {
                                            return { name: grupo, value: grupo };
                                        })
                                    }
                                ]).then(function (answers) {
                                    _this.usuarios[indice].setGrupoAmigos = _this.usuarios[indice].getGrupoAmigos.filter(function (grupo) {
                                        return grupo != answers.id;
                                    });
                                    _this.borrarElementoBD(identificador);
                                    var ruta_aux = new usuario_1.Usuario(_this.usuarios[indice].getNombre, _this.usuarios[indice].getActividad, _this.usuarios[indice].getAmigos, _this.usuarios[indice].getGrupoAmigos, _this.usuarios[indice].getEstadisticas, _this.usuarios[indice].getHistoricoRutas, _this.usuarios[indice].getRetos, _this.usuarios[indice].getID);
                                    _this.usuarios.push(ruta_aux);
                                    _this.usuarios.splice(indice, 1);
                                    _this.manageUsuarios();
                                });
                                break;
                        }
                    });
                    break;
                case 'estadisticas':
                    // solicitar kms y desnivel para semana mes y año
                    prompt([
                        {
                            type: 'input',
                            name: 'kms_semana',
                            message: 'Introduce los kms de la semana',
                        },
                        {
                            type: 'input',
                            name: 'desnivel_semana',
                            message: 'Introduce el desnivel de la semana',
                        },
                        {
                            type: 'input',
                            name: 'kms_mes',
                            message: 'Introduce los kms del mes',
                        },
                        {
                            type: 'input',
                            name: 'desnivel_mes',
                            message: 'Introduce el desnivel del mes',
                        },
                        {
                            type: 'input',
                            name: 'kms_año',
                            message: 'Introduce los kms del año',
                        },
                        {
                            type: 'input',
                            name: 'desnivel_año',
                            message: 'Introduce el desnivel del año',
                        }
                    ]).then(function (answers5) {
                        // generar 3 estadisticas con los nuevos datos
                        var new_estadistica_semana = {
                            km: answers5.kms_semana,
                            desnivel: answers5.desnivel_semana,
                        };
                        var new_estadistica_mes = {
                            km: answers5.kms_mes,
                            desnivel: answers5.desnivel_mes,
                        };
                        var new_estadistica_año = {
                            km: answers5.kms_año,
                            desnivel: answers5.desnivel_año,
                        };
                        // crear un nuevo array de estadisticas e insertarlo en el array de estadisticas de la clase
                        var new_estadisticas = {
                            semana: new_estadistica_semana,
                            mes: new_estadistica_mes,
                            año: new_estadistica_año,
                        };
                        _this.usuarios[indice].setEstadisticas = new_estadisticas;
                        _this.borrarElementoBD(identificador);
                        var ruta_aux = new usuario_1.Usuario(_this.usuarios[indice].getNombre, _this.usuarios[indice].getActividad, _this.usuarios[indice].getAmigos, _this.usuarios[indice].getGrupoAmigos, _this.usuarios[indice].getEstadisticas, _this.usuarios[indice].getHistoricoRutas, _this.usuarios[indice].getRetos, _this.usuarios[indice].getID);
                        _this.usuarios.push(ruta_aux);
                        _this.usuarios.splice(indice, 1);
                        _this.manageUsuarios();
                    });
                    break;
                case 'historico_rutas':
                    prompt([
                        {
                            type: 'input',
                            name: 'dia',
                            message: 'Introduce el dia de la ruta',
                        },
                        {
                            type: 'input',
                            name: 'mes',
                            message: 'Introduce el mes de la ruta',
                        },
                        {
                            type: 'input',
                            name: 'año',
                            message: 'Introduce el año de la ruta',
                        },
                        {
                            type: 'input',
                            name: 'id',
                            message: 'Introduce el id de la ruta',
                        }
                    ]).then(function (answers) {
                        // generar una fecha nueva
                        var new_fecha = {
                            dia: answers.dia,
                            mes: answers.mes,
                            año: answers.año,
                        };
                        // crear un nuevo historico e insertarlo en el array de historicos de la clase
                        var new_historico = {
                            fecha: new_fecha,
                            id: answers.id,
                        };
                        // añadirlo y modificar la base de datos
                        _this.usuarios[indice].getHistoricoRutas.push(new_historico);
                        _this.borrarElementoBD(identificador);
                        var ruta_aux = new usuario_1.Usuario(_this.usuarios[indice].getNombre, _this.usuarios[indice].getActividad, _this.usuarios[indice].getAmigos, _this.usuarios[indice].getGrupoAmigos, _this.usuarios[indice].getEstadisticas, _this.usuarios[indice].getHistoricoRutas, _this.usuarios[indice].getRetos, _this.usuarios[indice].getID);
                        _this.usuarios.push(ruta_aux);
                        _this.usuarios.splice(indice, 1);
                        _this.manageUsuarios();
                    });
                    break;
                case 'retos':
                    prompt([
                        {
                            type: 'list',
                            name: 'retos',
                            message: '¿Qué deseas hacer?',
                            choices: [
                                { name: 'Añadir reto', value: 'añadir' },
                                { name: 'Eliminar reto', value: 'eliminar' },
                            ]
                        }
                    ]).then(function (answers) {
                        switch (answers.retos) {
                            case 'añadir':
                                prompt([
                                    {
                                        type: 'input',
                                        name: 'nombre',
                                        message: 'Introduce el id del reto que quiera añadir',
                                    }
                                ]).then(function (answers) {
                                    _this.usuarios[indice].setRetos = _this.usuarios[indice].getRetos.concat(answers.nombre);
                                    _this.borrarElementoBD(identificador);
                                    var ruta_aux = new usuario_1.Usuario(_this.usuarios[indice].getNombre, _this.usuarios[indice].getActividad, _this.usuarios[indice].getAmigos, _this.usuarios[indice].getGrupoAmigos, _this.usuarios[indice].getEstadisticas, _this.usuarios[indice].getHistoricoRutas, _this.usuarios[indice].getRetos, _this.usuarios[indice].getID);
                                    _this.usuarios.push(ruta_aux);
                                    _this.usuarios.splice(indice, 1);
                                    _this.manageUsuarios();
                                });
                                break;
                            case 'eliminar':
                                prompt([
                                    {
                                        type: 'input',
                                        name: 'nombre',
                                        message: 'Introduce el id del reto que desee eliminar',
                                    }
                                ]).then(function (answers) {
                                    var usuarios = _this.usuarios[indice].getRetos;
                                    var indice_reto = usuarios.indexOf(answers.nombre);
                                    if (indice_reto == -1) {
                                        console.log('El reto no existe');
                                        return;
                                    }
                                    _this.usuarios[indice].setRetos = answers.nombre;
                                    _this.borrarElementoBD(identificador);
                                    var ruta_aux = new usuario_1.Usuario(_this.usuarios[indice].getNombre, _this.usuarios[indice].getActividad, _this.usuarios[indice].getAmigos, _this.usuarios[indice].getGrupoAmigos, _this.usuarios[indice].getEstadisticas, _this.usuarios[indice].getHistoricoRutas, _this.usuarios[indice].getRetos, _this.usuarios[indice].getID);
                                    _this.usuarios.push(ruta_aux);
                                    _this.usuarios.splice(indice, 1);
                                    _this.manageUsuarios();
                                });
                                break;
                        }
                    });
                    break;
            }
        });
    };
    //* INFO USUARIO
    usuarioCollection.prototype.ordenarUsuarioPorNombre = function () {
        var _this = this;
        var ascendente = true; // por defecto ascendente
        var prompt = inquirer.createPromptModule();
        prompt([
            {
                type: 'list',
                name: 'opcion',
                message: '¿Cómo deseas ordenar?',
                choices: [
                    { name: 'Ascendente', value: 'ascendente' },
                    { name: 'Descendente', value: 'descendente' },
                ]
            }
        ]).then(function (answers) {
            if (answers.opcion === 'descendente') {
                ascendente = false;
            }
            // ordenar
            var copia_rutas = _this.usuarios;
            // ordenar de forma ascendete o descendente según el valor de la variable ascendente
            copia_rutas.sort(function (a, b) {
                if (ascendente) {
                    return a.getNombre.localeCompare(b.getNombre);
                }
                else {
                    return b.getNombre.localeCompare(a.getNombre);
                }
            });
            // mostrar
            copia_rutas.forEach(function (ruta) {
                console.log("Nombre: ".concat(ruta.getNombre));
            });
            _this.infoUsuario();
        });
    };
    usuarioCollection.prototype.ordenarPorKmsSemanales = function () {
        var _this = this;
        var ascendente = true; // por defecto ascendente
        var prompt = inquirer.createPromptModule();
        prompt([
            {
                type: 'list',
                name: 'opcion',
                message: '¿Cómo deseas ordenar?',
                choices: [
                    { name: 'Ascendente', value: 'ascendente' },
                    { name: 'Descendente', value: 'descendente' },
                ]
            }
        ]).then(function (answers) {
            if (answers.opcion === 'descendente') {
                ascendente = false;
            }
            // ordenar
            var copia_rutas = _this.usuarios;
            // ordenar de forma ascendete o descendente según el valor de la variable ascendente
            copia_rutas.sort(function (a, b) {
                if (ascendente) {
                    return a.getEstadisticas.semana.km - b.getEstadisticas.semana.km;
                }
                else {
                    return b.getEstadisticas.semana.km - a.getEstadisticas.semana.km;
                }
            });
            // mostrar
            copia_rutas.forEach(function (ruta) {
                console.log("Kms semanales: ".concat(ruta.getEstadisticas.semana.km));
            });
            _this.infoUsuario();
        });
    };
    usuarioCollection.prototype.ordenarPorKmsMensuales = function () {
        var _this = this;
        var ascendente = true; // por defecto ascendente
        var prompt = inquirer.createPromptModule();
        prompt([
            {
                type: 'list',
                name: 'opcion',
                message: '¿Cómo deseas ordenar?',
                choices: [
                    { name: 'Ascendente', value: 'ascendente' },
                    { name: 'Descendente', value: 'descendente' },
                ]
            }
        ]).then(function (answers) {
            if (answers.opcion === 'descendente') {
                ascendente = false;
            }
            // ordenar
            var copia_rutas = _this.usuarios;
            // ordenar de forma ascendete o descendente según el valor de la variable ascendente
            copia_rutas.sort(function (a, b) {
                if (ascendente) {
                    return a.getEstadisticas.mes.km - b.getEstadisticas.mes.km;
                }
                else {
                    return b.getEstadisticas.mes.km - a.getEstadisticas.mes.km;
                }
            });
            // mostrar
            copia_rutas.forEach(function (ruta) {
                console.log("Kms mensuales: ".concat(ruta.getEstadisticas.mes.km));
            });
            _this.infoUsuario();
        });
    };
    usuarioCollection.prototype.ordenarPorKmsAnuales = function () {
        var _this = this;
        var ascendente = true; // por defecto ascendente
        var prompt = inquirer.createPromptModule();
        prompt([
            {
                type: 'list',
                name: 'opcion',
                message: '¿Cómo deseas ordenar?',
                choices: [
                    { name: 'Ascendente', value: 'ascendente' },
                    { name: 'Descendente', value: 'descendente' },
                ]
            }
        ]).then(function (answers) {
            if (answers.opcion === 'descendente') {
                ascendente = false;
            }
            // ordenar
            var copia_rutas = _this.usuarios;
            // ordenar de forma ascendete o descendente según el valor de la variable ascendente
            copia_rutas.sort(function (a, b) {
                if (ascendente) {
                    return a.getEstadisticas.año.km - b.getEstadisticas.año.km;
                }
                else {
                    return b.getEstadisticas.año.km - a.getEstadisticas.año.km;
                }
            });
            // mostrar
            copia_rutas.forEach(function (ruta) {
                console.log("Kms anuales: ".concat(ruta.getEstadisticas.año.km));
            });
            _this.infoUsuario();
        });
    };
    usuarioCollection.prototype.infoUsuario = function () {
        var _this = this;
        var prompt = inquirer.createPromptModule();
        prompt([
            {
                type: 'list',
                name: 'opcion',
                message: '¿Qué deseas ver?',
                choices: [
                    { name: 'Mostrar por orden alfabético los usuarios', value: 'alfabetico' },
                    { name: 'Por kms semanales', value: 'kms_semanales' },
                    { name: 'Por kms mensuales', value: 'kms_mensuales' },
                    { name: 'Por kms anuales', value: 'kms_anuales' },
                    { name: 'Salir', value: 'Salir' },
                ]
            }
        ]).then(function (answers) {
            switch (answers.opcion) {
                case 'alfabetico':
                    _this.ordenarUsuarioPorNombre();
                    break;
                case 'kms_semanales':
                    _this.ordenarPorKmsSemanales();
                    break;
                case 'kms_mensuales':
                    _this.ordenarPorKmsMensuales();
                    break;
                case 'kms_anuales':
                    _this.ordenarPorKmsAnuales();
                    break;
                case 'Salir':
                    // cerrar prompt
                    process.exit(0);
                    break;
            }
        });
    };
    Object.defineProperty(usuarioCollection.prototype, "getUsuarios", {
        //* GETTERs Y SETTERs
        /**
         * Método que devuelve el array de usuarios
         * @returns {Usuario[]} Array de usuarios
         */
        get: function () {
            return this.usuarios;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(usuarioCollection.prototype, "setUsuarios", {
        /**
         * Método que modifica el array de usuarios
         * @param usuarios -- nuevo array de usuarios
         */
        set: function (usuarios) {
            this.usuarios = usuarios;
        },
        enumerable: false,
        configurable: true
    });
    return usuarioCollection;
}());
exports.usuarioCollection = usuarioCollection;
// ? PRUEBAS
// const semana: estadistica = {
//   km: 10,
//   desnivel: 1000
// }
// const semana2: estadistica = {
//   km: 20,
//   desnivel: 200
// }
// const semana3: estadistica = {
//   km: 30,
//   desnivel: 300
// }
// const mes: estadistica = {
//   km: 20,
//   desnivel: 2000
// }
// const mes2: estadistica = {
//   km: 30,
//   desnivel: 3000
// }
// const mes3: estadistica = {
//   km: 40,
//   desnivel: 4000
// }
// const año: estadistica = {
//   km: 30,
//   desnivel: 3000
// }
// const año2: estadistica = {
//   km: 40,
//   desnivel: 4000
// }
// const año3: estadistica = {
//   km: 50,
//   desnivel: 5000
// }
// const estadisticas: estadisticaEntrenamiento = {
//   semana: semana,
//   mes: mes,
//   año: año
// }
// const estadisticas2: estadisticaEntrenamiento = {
//   semana: semana2,
//   mes: mes2,
//   año: año2
// }
// const estadisticas3: estadisticaEntrenamiento = {
//   semana: semana3,
//   mes: mes3,
//   año: año3
// }
// const fecha1: fecha = {
//   dia: 1,
//   mes: 1,
//   año: 2021
// }
// const fecha2: fecha = {
//   dia: 2,
//   mes: 2,
//   año: 2021
// }
// const fecha3: fecha = {
//   dia: 3,
//   mes: 3,
//   año: 2021
// }
// const fecha4: fecha = {
//   dia: 4,
//   mes: 4,
//   año: 2021
// }
// const historic1: historicoRutas = {
//   fecha: fecha1,
//   id: 1
// }
// const historic2: historicoRutas = {
//   fecha: fecha2,
//   id: 2
// }
// const historic3: historicoRutas = {
//   fecha: fecha3,
//   id: 3
// }
// const historic4: historicoRutas = {
//   fecha: fecha4,
//   id: 1
// }
// const historic5: historicoRutas = {
//   fecha: fecha1,
//   id: 2
// }
// const historic6: historicoRutas = {
//   fecha: fecha2,
//   id: 3
// }
// // (nombre: string, actividad: actividad, amigos: ID[], grupo_amigos: ID[][], estadisticas: estadisticaEntrenamiento ,historico_rutas: historicoRutas[], retos: ID[], id?: ID)
// const user0 = new Usuario("user0", "correr", [1,2,3], [[1,2],[3,4],[5,6]], estadisticas, [historic1,historic2,historic3], [1,2,3]);
// const user1 = new Usuario("user1", "correr", [2,3], [[0,2],[3,4],[5,6]], estadisticas2, [historic4,historic5,historic6], [1,2,3]);
// const user2 = new Usuario("user2", "correr", [1,3,4], [[0,1],[3,4],[5,6]], estadisticas3, [historic1,historic2,historic3], [1,3]);
// const user3 = new Usuario("user3", "correr", [1,2,4], [[0,1],[2,4],[5,6]], estadisticas, [historic4,historic5,historic6], [1,2,3]);
// const user4 = new Usuario("user4", "correr", [1,2,3], [[0,1],[2,3],[5,6]], estadisticas2, [historic1,historic2,historic3], [1,2,3]);
// const user5 = new Usuario("user5", "correr", [1,2,3], [[0,1],[2,3],[4,6]], estadisticas3, [historic4,historic5,historic6], [1,2,3]);
// const user6 = new Usuario("user6", "correr", [1,2,3], [[0,1],[2,3],[4,5]], estadisticas, [historic1,historic2,historic3], [1,2,3]);
var coleccion_usuarios = new usuarioCollection();
coleccion_usuarios.manageUsuarios();
// console.log('MARCO SI VES ESTO ACUERDATE DE DESCOMENTAR EL METODO QUE QUIERAS COMPROBAR')
// Coleccion_usuarios.infoUsuario();
