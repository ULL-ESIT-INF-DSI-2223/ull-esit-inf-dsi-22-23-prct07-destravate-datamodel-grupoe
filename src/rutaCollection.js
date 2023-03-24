"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ruta_1 = require("./ruta");
var inquirer = require("inquirer");
// import { coordenadas } from "./types";
// import { Usuario } from "./usuario";
var ruta_2 = require("./ruta");
/**
 * Clase rutaCollection
 */
var rutaCollection = /** @class */ (function () {
    /**
     * Constructor por defecto
     * @param coleccion_rutas_ array de rutas
     */
    function rutaCollection() {
        // leer rutas de la base de datos y añadirlas al array de rutas
        this.leerBD();
    }
    Object.defineProperty(rutaCollection.prototype, "getRutas", {
        /**
         * getter coleccion_rutas_
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
         */
        set: function (coleccion_rutas) {
            this.coleccion_rutas_ = coleccion_rutas;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Método que lee de la base de datos y actualiza el array de rutas
     */
    rutaCollection.prototype.leerBD = function () {
        var rutas = ruta_2.database.get("rutas").value();
        var array_aux = [];
        rutas.forEach(function (ruta) {
            var ruta_aux = new ruta_1.Ruta(ruta.nombre, ruta.geolocalizacion_inicio, ruta.geolocalizacion_fin, ruta.longitud, ruta.desnivel, [], ruta.tipo_actividad, ruta.calificacion);
            array_aux.push(ruta_aux);
        });
        this.setRutas = array_aux;
    };
    /**
     * Método que añade una nueva ruta a la coleción de rutas
     * @param ruta ruta a añadir
     * @returns array de rutas modificado o undefined en caso de no haber podido añadir la ruta.
     */
    rutaCollection.prototype.addRuta = function (ruta) {
        // let repetido = false;
        // this.coleccion_rutas_.forEach((ruta_aux) => {
        //   if (ruta.getId == ruta_aux.getId) { 
        //     repetido = true;
        //   }
        // });
        // if (repetido === false) {
        //   this.coleccion_rutas_.push(ruta);
        //   return this.coleccion_rutas_;
        // }
        // else {
        //   return undefined;
        // }
        //! si se rompe es aqui
        this.coleccion_rutas_.push(ruta);
        return ruta;
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
        // console.log(`identificador: ${identificador}`)
        // console.log('TAMAÑO ARRAY:' + this.coleccion_rutas_.length)
        this.coleccion_rutas_.forEach(function (ruta, indice) {
            // console.log(ruta);
            if (ruta.getId == identificador) {
                ruta_aux = ruta;
                _this.coleccion_rutas_.splice(indice, 1);
                control_bool = true;
                // borrar de la base de datos la ruta por el id pasado por parametro
                // const element = identificador -1;
                ruta_2.database.get("rutas").splice(indice, 1).write();
            }
        });
        // imprmimir todos los nombres de las rutas restantes
        // this.coleccion_rutas_.forEach((ruta) => {
        // console.log(ruta.getNombre);
        // });
        if (control_bool) {
            return ruta_aux;
        }
        else {
            return undefined;
        }
    };
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
                        console.log("Nuevo nombre: ".concat(_this.coleccion_rutas_[indice].getNombre));
                        // eliminar la ruta de la base de datos y añadir la nueva
                        var ruta_aux = _this.coleccion_rutas_[indice];
                        _this.borrarRuta(identificador);
                        _this.addRuta(ruta_aux);
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
                        _this.coleccion_rutas_[indice].setGeolocalizacionInicio = [answers.x, answers.y, answers.z];
                        console.log("Nuevas coordenadas: ".concat(_this.coleccion_rutas_[indice].getGeolocalizacionInicio));
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
                        _this.coleccion_rutas_[indice].setGeolocalizacionFin = [answers.x, answers.y, answers.z];
                        console.log("Nuevas coordenadas: ".concat(_this.coleccion_rutas_[indice].getGeolocalizacionFin));
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
                        console.log("Nueva longitud: ".concat(_this.coleccion_rutas_[indice].getLongitud));
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
                        console.log("Nuevo desnivel: ".concat(_this.coleccion_rutas_[indice].getDesnivel));
                        _this.manageRutas();
                    });
                    break;
                //TODO
                // case 'usuario':
                //   // añadir usuario o eliminar usuario?
                //   prompt([
                //     {
                //       type: 'list',
                //       name: 'opcion2',
                //       message: '¿Qué desea hacer?', 
                //       choices: [
                //         {name:'Añadir usuario', value: 'añadir'},
                //         {name:'Eliminar usuario', value: 'eliminar'},
                //         {name: 'Modificar usuario', value: 'modificar'}
                //       ]
                //     }
                //   ]).then((answers) => {
                //     if (answers.opcion2 == 'añadir') {
                //       // ! Hay que pedir todo sobre el nuevo usuario a añadir
                //   });
                // break;
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
                        console.log("Nuevo tipo de actividad: ".concat(_this.coleccion_rutas_[indice].getTipoActividad));
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
                        console.log("Nueva calificacion: ".concat(_this.coleccion_rutas_[indice].getCalificacion));
                        _this.manageRutas();
                    });
                    break;
            }
            // this.manageRutas();
        });
    };
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
            //? de momento mejor no
            // {
            //   type: 'input',
            //   name: 'usuario',
            //   message: 'Introduce el usuario de la nueva ruta',
            // },
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
            var nueva_ruta = new ruta_1.Ruta(answers.nombre, coordenadas_inicio, coordenadas_fin, answers.longitud, answers.desnivel, answers.usuario, answers.tipo_actividad, answers.calificacion);
            _this.addRuta(nueva_ruta);
            // escribir en la base
            _this.manageRutas();
        });
    };
    rutaCollection.prototype.manageRutas = function () {
        var _this = this;
        // console.log(this.coleccion_rutas_)
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
                _this.promptModificarRuta();
            }
            else if (answers.opcion === 'Salir') {
                // cerrar prompt
                process.exit(0);
            }
        });
    };
    //! NO TOCAR
    rutaCollection.prototype.infoRutas = function () {
        var _this = this;
        // Alfabéticamente por nombre de la ruta, ascendente y descendente.
        // Cantidad de usuarios que realizan las rutas, ascendente y descendente.
        // Por longitud de la ruta, ascendente y descendente.
        // Por la calificación media de la ruta, ascendente y descendente.
        // Ordenar por actividad: correr o ciclismo.
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
                console.log("Nombre: ".concat(ruta.getNombre, ", Longitud: ").concat(ruta.getLongitud));
            });
            _this.infoRutas();
        });
    };
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
//? PRUEBAS
var coleccion_rutas = new rutaCollection();
// coleccion_rutas.infoRutas();
coleccion_rutas.manageRutas();
