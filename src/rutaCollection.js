"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rutaCollection = void 0;
var ruta_1 = require("./ruta");
var inquirer = require("inquirer");
// import { Usuario } from "./usuario";
var bd_1 = require("./bd");
/**
 * Clase rutaCollection
 * @description Clase que representa una colección de rutas
 */
var rutaCollection = /** @class */ (function () {
    /**
     * Constructor por defecto
     * @param coleccion_rutas_ array de rutas
     */
    function rutaCollection() {
        this.leerBD();
    }
    Object.defineProperty(rutaCollection.prototype, "getRutas", {
        /**
         * getter coleccion_rutas_
         * @returns array de rutas
         */
        get: function () {
            return this.coleccion_rutas_;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(rutaCollection.prototype, "setRutas", {
        /**
         * setter coleccion_rutas_
         * @param coleccion_rutas array de rutas
         */
        set: function (coleccion_rutas) {
            this.coleccion_rutas_ = coleccion_rutas;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Método que lee de la base de datos y actualiza el array de rutas
     * @returns array de ids de las rutas, para las pruebas.
     */
    rutaCollection.prototype.leerBD = function () {
        var rutas = bd_1.database.get("rutas").value();
        var array_aux = [];
        rutas.forEach(function (ruta) {
            var ruta_aux = new ruta_1.Ruta(ruta.nombre, ruta.geolocalizacion_inicio, ruta.geolocalizacion_fin, ruta.longitud, ruta.desnivel, ruta.usuarios, ruta.tipo_actividad, ruta.calificacion);
            array_aux.push(ruta_aux);
        });
        this.setRutas = array_aux;
        var array_aux2 = [];
        array_aux.forEach(function (ruta) {
            array_aux2.push(ruta.getId);
        });
        // console.log(array_aux2);
        return array_aux2;
    };
    /**
     * Metodo para borrar un elemento de la base de datos
     * @param identificador
     */
    rutaCollection.prototype.borrarElementoBD = function (identificador) {
        console.log("parte 1");
        this.coleccion_rutas_.forEach(function (ruta, indice) {
            console.log("getid: " + ruta.getId + " identificador: " + identificador);
            if (ruta.getId == identificador) {
                bd_1.database.get("rutas").splice(indice, 1).write();
                return true;
            }
        });
        return false;
    };
    /**
     * Método que borra una ruta
     * @param identificador identificador de la ruta a borrar
     * @returns retorna la ruta eliminada o undefined en caso de que no existiera.
     */
    rutaCollection.prototype.borrarRuta = function (identificador) {
        var _this = this;
        var control_bool = false;
        var ruta_aux;
        this.coleccion_rutas_.forEach(function (ruta, indice) {
            if (ruta.getId == identificador) {
                ruta_aux = ruta;
                _this.coleccion_rutas_.splice(indice, 1);
                control_bool = true;
                bd_1.database.get("rutas").splice(indice, 1).write();
            }
        });
        if (control_bool) {
            return ruta_aux;
        }
        else {
            return undefined;
        }
    };
    /**
     * Metodo para ejecutar el menu de rutas para borrar elementos de la bd
     */
    rutaCollection.prototype.promptBorrarRuta = function () {
        var _this = this;
        // solicitar id, pasarselo al metodo que borra
        var prompt = inquirer.createPromptModule();
        prompt([
            {
                type: 'input',
                name: 'id',
                message: 'Introduce el id de la ruta a borrar',
            }
        ]).then(function (answers) {
            var ruta_aux = _this.borrarRuta(answers.id);
            if (typeof ruta_aux != 'undefined') {
                console.log('Ruta borrada: ' + ruta_aux.getId);
            }
            else {
                console.log('La ruta no existe');
            }
            _this.manageRutas();
        });
    };
    /**
     * Metodo para ejecutar el menu de rutas para modificar elementos de la bd
     */
    rutaCollection.prototype.promptModificarRuta = function () {
        var _this = this;
        var prompt = inquirer.createPromptModule();
        prompt([
            {
                type: 'input',
                name: 'id',
                message: 'Introduce el id de la ruta a modificar',
            }
        ]).then(function (answers) {
            _this.modificarRuta(answers.id);
            // this.manageRutas();
        });
    };
    /**
     * Metodo para modificar una ruta
     * @param identificador -- id de la ruta a modificar
     */
    rutaCollection.prototype.modificarRuta = function (identificador) {
        var _this = this;
        // 1. comprobar que el id de la ruta existe
        // 2. preguntar que se quiere modificar
        // 3. modificarlo
        // 4. devolver true si se ha modificado o false si no se ha modificado
        var id_existe_en_coleccion = false;
        var indice = -1;
        this.coleccion_rutas_.forEach(function (ruta, index) {
            if (ruta.getId == identificador) {
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
                    { name: 'Geolocalización inicio', value: 'geolocalizacion_inicio' },
                    { name: 'Geolocalización fin', value: 'geolocalizacion_fin' },
                    { name: 'Longitud', value: 'longitud' },
                    { name: 'Desnivel', value: 'desnivel' },
                    { name: 'Usuario', value: 'usuario' },
                    { name: 'Tipo de actividad', value: 'tipo_actividad' },
                    { name: 'Calificacion', value: 'calificacion' }
                ]
            }
        ]).then(function (answers) {
            var prompt = inquirer.createPromptModule();
            var coordenadaX = {
                letra: 'X',
                coordenada: 0
            };
            var coordenadaY = {
                letra: 'Y',
                coordenada: 0
            };
            var coordenadaZ = {
                letra: 'Z',
                coordenada: 0
            };
            switch (answers.opcion) {
                case 'nombre':
                    prompt([
                        {
                            type: 'input',
                            name: 'nombre2',
                            message: 'Introduce el nuevo nombre de la ruta',
                        }
                    ]).then(function (answers) {
                        _this.coleccion_rutas_[indice].setNombre = answers.nombre2;
                        _this.borrarElementoBD(identificador);
                        var ruta_aux = new ruta_1.Ruta(_this.coleccion_rutas_[indice].getNombre, _this.coleccion_rutas_[indice].getGeolocalizacionInicio, _this.coleccion_rutas_[indice].getGeolocalizacionFin, _this.coleccion_rutas_[indice].getLongitud, _this.coleccion_rutas_[indice].getDesnivel, _this.coleccion_rutas_[indice].getUsuarios, _this.coleccion_rutas_[indice].getTipoActividad, _this.coleccion_rutas_[indice].getCalificacion, _this.coleccion_rutas_[indice].getId);
                        _this.coleccion_rutas_.push(ruta_aux);
                        _this.coleccion_rutas_.splice(indice, 1);
                        _this.manageRutas();
                    });
                    break;
                case 'geolocalizacion_inicio':
                    // introducir las 3 coordenadas x,y,z
                    prompt([
                        {
                            type: 'input',
                            name: 'x',
                            message: 'Introduce la coordenada x de la geolocalización de inicio',
                        },
                        {
                            type: 'input',
                            name: 'y',
                            message: 'Introduce la coordenada y de la geolocalización de inicio',
                        },
                        {
                            type: 'input',
                            name: 'z',
                            message: 'Introduce la coordenada z de la geolocalización de inicio',
                        }
                    ]).then(function (answers) {
                        coordenadaX.coordenada = parseFloat(answers.x);
                        coordenadaY.coordenada = parseFloat(answers.y);
                        coordenadaZ.coordenada = parseFloat(answers.z);
                        _this.coleccion_rutas_[indice].setGeolocalizacionInicio = [coordenadaX, coordenadaY, coordenadaZ];
                        _this.borrarElementoBD(identificador);
                        var ruta_aux = new ruta_1.Ruta(_this.coleccion_rutas_[indice].getNombre, _this.coleccion_rutas_[indice].getGeolocalizacionInicio, _this.coleccion_rutas_[indice].getGeolocalizacionFin, _this.coleccion_rutas_[indice].getLongitud, _this.coleccion_rutas_[indice].getDesnivel, _this.coleccion_rutas_[indice].getUsuarios, _this.coleccion_rutas_[indice].getTipoActividad, _this.coleccion_rutas_[indice].getCalificacion, _this.coleccion_rutas_[indice].getId);
                        _this.coleccion_rutas_.push(ruta_aux);
                        _this.coleccion_rutas_.splice(indice, 1);
                        _this.manageRutas();
                    });
                    break;
                case 'geolocalizacion_fin':
                    // introducir las 3 coordenadas x,y,z
                    prompt([
                        {
                            type: 'input',
                            name: 'x',
                            message: 'Introduce la coordenada x de la geolocalización de fin',
                        },
                        {
                            type: 'input',
                            name: 'y',
                            message: 'Introduce la coordenada y de la geolocalización de fin',
                        },
                        {
                            type: 'input',
                            name: 'z',
                            message: 'Introduce la coordenada z de la geolocalización de fin',
                        }
                    ]).then(function (answers) {
                        coordenadaX.coordenada = parseFloat(answers.x);
                        coordenadaY.coordenada = parseFloat(answers.y);
                        coordenadaZ.coordenada = parseFloat(answers.z);
                        _this.coleccion_rutas_[indice].setGeolocalizacionFin = [coordenadaX, coordenadaY, coordenadaZ];
                        _this.borrarElementoBD(identificador);
                        var ruta_aux = new ruta_1.Ruta(_this.coleccion_rutas_[indice].getNombre, _this.coleccion_rutas_[indice].getGeolocalizacionInicio, _this.coleccion_rutas_[indice].getGeolocalizacionFin, _this.coleccion_rutas_[indice].getLongitud, _this.coleccion_rutas_[indice].getDesnivel, _this.coleccion_rutas_[indice].getUsuarios, _this.coleccion_rutas_[indice].getTipoActividad, _this.coleccion_rutas_[indice].getCalificacion, _this.coleccion_rutas_[indice].getId);
                        _this.coleccion_rutas_.push(ruta_aux);
                        _this.coleccion_rutas_.splice(indice, 1);
                        _this.manageRutas();
                    });
                    break;
                case 'longitud':
                    prompt([
                        {
                            type: 'input',
                            name: 'longitud2',
                            message: 'Introduce la nueva longitud de la ruta',
                        }
                    ]).then(function (answers) {
                        _this.coleccion_rutas_[indice].setLongitud = answers.longitud2;
                        _this.borrarElementoBD(identificador);
                        // creamos nuevo elemento y a su vez lo escribimos en la base de datos
                        var ruta_aux = new ruta_1.Ruta(_this.coleccion_rutas_[indice].getNombre, _this.coleccion_rutas_[indice].getGeolocalizacionInicio, _this.coleccion_rutas_[indice].getGeolocalizacionFin, _this.coleccion_rutas_[indice].getLongitud, _this.coleccion_rutas_[indice].getDesnivel, _this.coleccion_rutas_[indice].getUsuarios, _this.coleccion_rutas_[indice].getTipoActividad, _this.coleccion_rutas_[indice].getCalificacion, _this.coleccion_rutas_[indice].getId);
                        // lo introducimos en la coleccion
                        _this.coleccion_rutas_.push(ruta_aux);
                        // borramos la ruta
                        // this.borrarRuta(identificador);
                        _this.coleccion_rutas_.splice(indice, 1);
                        _this.manageRutas();
                    });
                    break;
                case 'desnivel':
                    prompt([
                        {
                            type: 'input',
                            name: 'desnivel2',
                            message: 'Introduce el nuevo desnivel de la ruta',
                        }
                    ]).then(function (answers) {
                        _this.coleccion_rutas_[indice].setDesnivel = answers.desnivel2;
                        _this.borrarElementoBD(identificador);
                        var ruta_aux = new ruta_1.Ruta(_this.coleccion_rutas_[indice].getNombre, _this.coleccion_rutas_[indice].getGeolocalizacionInicio, _this.coleccion_rutas_[indice].getGeolocalizacionFin, _this.coleccion_rutas_[indice].getLongitud, _this.coleccion_rutas_[indice].getDesnivel, _this.coleccion_rutas_[indice].getUsuarios, _this.coleccion_rutas_[indice].getTipoActividad, _this.coleccion_rutas_[indice].getCalificacion, _this.coleccion_rutas_[indice].getId);
                        _this.coleccion_rutas_.push(ruta_aux);
                        _this.coleccion_rutas_.splice(indice, 1);
                        _this.manageRutas();
                    });
                    break;
                case 'usuario':
                    // las opciones son añadir una nueva lista de usuarios, eliminar un usuario o añadir un nuevo usuario
                    prompt([
                        {
                            type: 'list',
                            name: 'usuarios',
                            message: '¿Qué quieres hacer con los usuarios?',
                            choices: [
                                'Añadir una nueva lista de usuarios',
                                'Eliminar un usuario',
                                'Añadir un nuevo usuario'
                            ]
                        }
                    ]).then(function (answers) {
                        switch (answers.usuarios) {
                            case 'Añadir una nueva lista de usuarios':
                                prompt([
                                    {
                                        type: 'input',
                                        name: 'usuario',
                                        message: 'Introduce los usuarios de la ruta separados por comas',
                                    }
                                ]).then(function (answers) {
                                    _this.coleccion_rutas_[indice].setUsuarios = answers.usuario.split(',');
                                    _this.borrarElementoBD(identificador);
                                    var ruta_aux = new ruta_1.Ruta(_this.coleccion_rutas_[indice].getNombre, _this.coleccion_rutas_[indice].getGeolocalizacionInicio, _this.coleccion_rutas_[indice].getGeolocalizacionFin, _this.coleccion_rutas_[indice].getLongitud, _this.coleccion_rutas_[indice].getDesnivel, _this.coleccion_rutas_[indice].getUsuarios, _this.coleccion_rutas_[indice].getTipoActividad, _this.coleccion_rutas_[indice].getCalificacion, _this.coleccion_rutas_[indice].getId);
                                    _this.coleccion_rutas_.push(ruta_aux);
                                    _this.coleccion_rutas_.splice(indice, 1);
                                    _this.manageRutas();
                                });
                                break;
                            case 'Eliminar un usuario':
                                // imprimir usuarios de la ruta
                                console.log("Usuarios de la ruta: " + _this.coleccion_rutas_[indice].getUsuarios);
                                prompt([
                                    {
                                        type: 'input',
                                        name: 'usuario',
                                        message: 'Introduce el usuario que quieres eliminar',
                                    }
                                ]).then(function (answers) {
                                    var usuarios = _this.coleccion_rutas_[indice].getUsuarios;
                                    var indice_usuario = usuarios.indexOf(answers.usuario);
                                    usuarios.splice(indice_usuario, 1);
                                    _this.coleccion_rutas_[indice].setUsuarios = usuarios;
                                    _this.borrarElementoBD(identificador);
                                    var ruta_aux = new ruta_1.Ruta(_this.coleccion_rutas_[indice].getNombre, _this.coleccion_rutas_[indice].getGeolocalizacionInicio, _this.coleccion_rutas_[indice].getGeolocalizacionFin, _this.coleccion_rutas_[indice].getLongitud, _this.coleccion_rutas_[indice].getDesnivel, _this.coleccion_rutas_[indice].getUsuarios, _this.coleccion_rutas_[indice].getTipoActividad, _this.coleccion_rutas_[indice].getCalificacion, _this.coleccion_rutas_[indice].getId);
                                    _this.coleccion_rutas_.push(ruta_aux);
                                    _this.coleccion_rutas_.splice(indice, 1);
                                    _this.manageRutas();
                                });
                                break;
                            case 'Añadir un nuevo usuario':
                                console.log("Usuarios de la ruta: " + _this.coleccion_rutas_[indice].getUsuarios);
                                prompt([
                                    {
                                        type: 'input',
                                        name: 'usuario',
                                        message: 'Introduce el usuario que quieres añadir',
                                    }
                                ]).then(function (answers) {
                                    var usuarios = _this.coleccion_rutas_[indice].getUsuarios;
                                    // comprobar que no está repetido
                                    if (usuarios.indexOf(answers.usuario) != -1) {
                                        console.log("El usuario ya está en la lista");
                                        _this.manageRutas();
                                    }
                                    else {
                                        usuarios.push(answers.usuario);
                                        _this.coleccion_rutas_[indice].setUsuarios = usuarios;
                                        _this.borrarElementoBD(identificador);
                                        var ruta_aux = new ruta_1.Ruta(_this.coleccion_rutas_[indice].getNombre, _this.coleccion_rutas_[indice].getGeolocalizacionInicio, _this.coleccion_rutas_[indice].getGeolocalizacionFin, _this.coleccion_rutas_[indice].getLongitud, _this.coleccion_rutas_[indice].getDesnivel, _this.coleccion_rutas_[indice].getUsuarios, _this.coleccion_rutas_[indice].getTipoActividad, _this.coleccion_rutas_[indice].getCalificacion, _this.coleccion_rutas_[indice].getId);
                                        _this.coleccion_rutas_.push(ruta_aux);
                                        _this.coleccion_rutas_.splice(indice, 1);
                                        _this.manageRutas();
                                    }
                                });
                                break;
                        }
                    });
                    break;
                case 'tipo_actividad':
                    prompt([
                        {
                            type: 'list',
                            name: 'tipo_actividad2',
                            message: 'Introduce el nuevo tipo de actividad de la ruta',
                            choices: [
                                { name: 'Correr', value: 'correr' },
                                { name: 'Bicicleta', value: 'bicicleta' }
                            ]
                        }
                    ]).then(function (answers) {
                        _this.coleccion_rutas_[indice].setTipoActividad = answers.tipo_actividad2;
                        _this.borrarElementoBD(identificador);
                        var ruta_aux = new ruta_1.Ruta(_this.coleccion_rutas_[indice].getNombre, _this.coleccion_rutas_[indice].getGeolocalizacionInicio, _this.coleccion_rutas_[indice].getGeolocalizacionFin, _this.coleccion_rutas_[indice].getLongitud, _this.coleccion_rutas_[indice].getDesnivel, _this.coleccion_rutas_[indice].getUsuarios, _this.coleccion_rutas_[indice].getTipoActividad, _this.coleccion_rutas_[indice].getCalificacion, _this.coleccion_rutas_[indice].getId);
                        _this.coleccion_rutas_.push(ruta_aux);
                        _this.coleccion_rutas_.splice(indice, 1);
                        _this.manageRutas();
                    });
                    break;
                case 'calificacion':
                    prompt([
                        {
                            type: 'input',
                            name: 'calificacion2',
                            message: 'Introduce la nueva calificacion de la ruta',
                        }
                    ]).then(function (answers) {
                        _this.coleccion_rutas_[indice].setCalificacion = answers.calificacion2;
                        _this.borrarElementoBD(identificador);
                        var ruta_aux = new ruta_1.Ruta(_this.coleccion_rutas_[indice].getNombre, _this.coleccion_rutas_[indice].getGeolocalizacionInicio, _this.coleccion_rutas_[indice].getGeolocalizacionFin, _this.coleccion_rutas_[indice].getLongitud, _this.coleccion_rutas_[indice].getDesnivel, _this.coleccion_rutas_[indice].getUsuarios, _this.coleccion_rutas_[indice].getTipoActividad, _this.coleccion_rutas_[indice].getCalificacion, _this.coleccion_rutas_[indice].getId);
                        _this.coleccion_rutas_.push(ruta_aux);
                        _this.coleccion_rutas_.splice(indice, 1);
                        _this.manageRutas();
                    });
                    break;
            }
        });
    };
    /**
     * Método que maneja el menu para añadir una nueva ruta
     */
    rutaCollection.prototype.promptAddRuta = function () {
        var _this = this;
        // pedir datos de la nueva ruta
        var prompt = inquirer.createPromptModule();
        var coordenadas_inicio = [];
        var coordenadas_fin = [];
        prompt([
            {
                type: 'input',
                name: 'nombre',
                message: 'Introduce el nombre de la nueva ruta',
            },
            {
                // pedir las 3 coordenadas
                type: 'input',
                name: 'geolocalizacion_inicioX',
                message: 'Introduce la geolocalización de inicio, X: ',
            },
            {
                type: 'input',
                name: 'geolocalizacion_inicioY',
                message: 'Introduce la geolocalización de inicio, Y: ',
            },
            {
                type: 'input',
                name: 'geolocalizacion_inicioZ',
                message: 'Introduce la geolocalización de inicio, Z: ',
            },
            {
                // pedir las 3 coordenadas
                type: 'input',
                name: 'geolocalizacion_finX',
                message: 'Introduce la geolocalización de fin, X: ',
            },
            {
                type: 'input',
                name: 'geolocalizacion_finY',
                message: 'Introduce la geolocalización de fin, Y: ',
            },
            {
                type: 'input',
                name: 'geolocalizacion_finZ',
                message: 'Introduce la geolocalización de fin, Z: ',
            },
            {
                type: 'input',
                name: 'longitud',
                message: 'Introduce la longitud de la nueva ruta',
            },
            {
                type: 'input',
                name: 'desnivel',
                message: 'Introduce el desnivel de la nueva ruta',
            },
            {
                type: 'input',
                name: 'usuario',
                message: 'Introduce el usuario de la nueva ruta (de la forma "id1,id2,..."  las comas)',
            },
            {
                type: 'list',
                name: 'tipo_actividad',
                message: 'Introduce el tipo de actividad de la nueva ruta',
                choices: [
                    { name: 'Correr', value: 'correr' },
                    { name: 'Bicicleta', value: 'bicicleta' }
                ]
            },
            {
                type: 'input',
                name: 'calificacion',
                message: 'Introduce la calificacion de la nueva ruta',
            }
        ]).then(function (answers) {
            // crear nueva ruta
            coordenadas_inicio = [answers.geolocalizacion_inicioX, answers.geolocalizacion_inicioY, answers.geolocalizacion_inicioZ];
            coordenadas_fin = [answers.geolocalizacion_finX, answers.geolocalizacion_finY, answers.geolocalizacion_finZ];
            var array_usuarios = answers.usuario.split(',');
            var nueva_ruta = new ruta_1.Ruta(answers.nombre, coordenadas_inicio, coordenadas_fin, answers.longitud, answers.desnivel, array_usuarios, answers.tipo_actividad, answers.calificacion);
            _this.coleccion_rutas_.push(nueva_ruta);
            // escribir en la base
            _this.manageRutas();
        });
    };
    /**
     * Metodo que gestiona el prompt de la clase Ruta
     */
    rutaCollection.prototype.manageRutas = function () {
        var _this = this;
        var prompt = inquirer.createPromptModule();
        prompt([
            {
                type: 'list',
                name: 'opcion',
                message: 'Manejo de Rutas, ¿qué quieres hacer?',
                choices: [
                    { name: 'Añadir ruta', value: 'add' },
                    { name: 'Borrar ruta', value: 'remove' },
                    { name: 'Modificar ruta', value: 'modify' },
                    { name: 'Salir', value: 'Salir' },
                ]
            }
        ]).then(function (answers) {
            if (answers.opcion === 'add') {
                _this.promptAddRuta();
            }
            else if (answers.opcion === 'remove') {
                _this.promptBorrarRuta();
            }
            else if (answers.opcion === 'modify') {
                _this.promptModificarRuta(); // espera un seg
            } // la estoy usando yo, estamos comprobando que funciona un metodo tocho
            else if (answers.opcion === 'Salir') {
                // cerrar prompt
                process.exit(0);
            }
        });
    };
    /**
     * Método que muestra las rutas ordenadas por el criterio que se le pase
     */
    rutaCollection.prototype.infoRutas = function () {
        var _this = this;
        var prompt = inquirer.createPromptModule();
        prompt([
            {
                type: 'list',
                name: 'opcion',
                message: '¿Qué deseas ver?',
                choices: [
                    { name: 'Mostrar por orden alfabético las rutas', value: 'alfabetico' },
                    { name: 'Mostrar por cantidad de usuarios que realizan las rutas', value: 'cantidad_usuarios' },
                    { name: 'Mostrar por longitud de la ruta', value: 'longitud' },
                    { name: 'Mostrar por la calificación media de la ruta', value: 'calificacion' },
                    { name: 'Mostrar por actividad (Correr o Bicicleta)', value: 'actividad' },
                    { name: 'Salir', value: 'Salir' },
                ]
            }
        ]).then(function (answers) {
            switch (answers.opcion) {
                case 'alfabetico':
                    _this.ordenarRutasPorNombre();
                    break;
                case 'cantidad_usuarios':
                    _this.ordenarRutasPorCantidadUsuarios();
                    break;
                case 'longitud':
                    _this.ordenarRutasPorLongitud();
                    break;
                case 'calificacion':
                    _this.ordenarRutasPorCalificacion();
                    break;
                case 'actividad':
                    _this.ordenarRutasPorActividad();
                    break;
                case 'Salir':
                    // cerrar prompt
                    process.exit(0);
                    break;
            }
        });
    };
    /**
     * Método que ordena las rutas por nombre
     */
    rutaCollection.prototype.ordenarRutasPorNombre = function () {
        var _this = this;
        // preguntar ascendente o descendente
        // ordenar
        // mostrar
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
            var copia_rutas = _this.coleccion_rutas_;
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
            _this.infoRutas();
        });
    };
    /**
     * Método que ordena las rutas por cantidad de usuarios
     */
    rutaCollection.prototype.ordenarRutasPorCantidadUsuarios = function () {
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
            var copia_rutas = _this.coleccion_rutas_;
            // ordenar de forma ascendete o descendente según el valor de la variable ascendente
            copia_rutas.sort(function (a, b) {
                if (ascendente) {
                    return a.getUsuarios.length - b.getUsuarios.length;
                }
                else {
                    return b.getUsuarios.length - a.getUsuarios.length;
                }
            });
            // mostrar
            copia_rutas.forEach(function (ruta) {
                console.log("Nombre: ".concat(ruta.getNombre, ", Cantidad de usuarios: ").concat(ruta.getUsuarios.length));
            });
            _this.infoRutas();
        });
    };
    /**
     * Método que ordena las rutas por longitud
     */
    rutaCollection.prototype.ordenarRutasPorLongitud = function () {
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
            var copia_rutas = _this.coleccion_rutas_;
            // ordenar de forma ascendete o descendente según el valor de la variable ascendente
            copia_rutas.sort(function (a, b) {
                if (ascendente) {
                    return a.getLongitud - b.getLongitud;
                }
                else {
                    return b.getLongitud - a.getLongitud;
                }
            });
            // mostrar
            copia_rutas.forEach(function (ruta) {
                console.log("Nombre: ".concat(ruta.getNombre, ", Longitud: ").concat(ruta.getLongitud));
            });
            _this.infoRutas();
        });
    };
    /**
     * Método que ordena las rutas por calificación
     */
    rutaCollection.prototype.ordenarRutasPorCalificacion = function () {
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
            var copia_rutas = _this.coleccion_rutas_;
            // ordenar de forma ascendete o descendente según el valor de la variable ascendente
            copia_rutas.sort(function (a, b) {
                if (ascendente) {
                    return a.getCalificacion - b.getCalificacion;
                }
                else {
                    return b.getCalificacion - a.getCalificacion;
                }
            });
            // mostrar
            copia_rutas.forEach(function (ruta) {
                console.log("Nombre: ".concat(ruta.getNombre, ", Calificaci\u00F3n: ").concat(ruta.getCalificacion));
            });
            _this.infoRutas();
        });
    };
    /**
     * Método que ordena las rutas por actividad
     */
    rutaCollection.prototype.ordenarRutasPorActividad = function () {
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
            var copia_rutas = _this.coleccion_rutas_;
            // ordenar de forma ascendete o descendente según el valor de la variable ascendente
            copia_rutas.sort(function (a, b) {
                if (ascendente) {
                    return a.getTipoActividad.localeCompare(b.getTipoActividad);
                }
                else {
                    return b.getTipoActividad.localeCompare(a.getTipoActividad);
                }
            });
            // mostrar
            copia_rutas.forEach(function (ruta) {
                console.log("Nombre: ".concat(ruta.getNombre, ", Actividad: ").concat(ruta.getTipoActividad));
            });
            _this.infoRutas();
        });
    };
    return rutaCollection;
}());
exports.rutaCollection = rutaCollection;
// ! Borrar después
// const coleccion_rutas = new rutaCollection();
//coleccion_rutas.infoRutas();
// coleccion_rutas.manageRutas();
