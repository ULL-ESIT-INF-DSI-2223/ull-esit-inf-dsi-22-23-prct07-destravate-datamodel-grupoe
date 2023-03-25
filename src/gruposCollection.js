"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GruposCollection = void 0;
var inquirer = require("inquirer");
var bd_1 = require("./bd");
var grupo_1 = require("./grupo");
var GruposCollection = /** @class */ (function () {
    function GruposCollection() {
        this.leerBD();
    }
    GruposCollection.prototype.leerBD = function () {
        var grupos_aux = bd_1.database.get("grupos").value();
        var array_aux = [];
        grupos_aux.forEach(function (group) {
            var group_aux = new grupo_1.Grupo(group.nombre, group.participantes, group.estadisticasEntrenamiento, group.historicoRutas, group.id);
            array_aux.push(group_aux);
        });
        this.setGrupos = array_aux;
    };
    //* INFO
    GruposCollection.prototype.infoUsuario = function () {
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
                    { name: 'Por nº de usuarios', value: 'num_usuarios' },
                    { name: 'Salir', value: 'Salir' },
                ]
            }
        ]).then(function (answers) {
            switch (answers.opcion) {
                case 'alfabetico':
                    _this.ordenarGruposPorNombre();
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
                case 'num_usuarios':
                    _this.ordenarPorNumUsuarios();
                    break;
                case 'Salir':
                    // cerrar prompt
                    process.exit(0);
                    break;
            }
        });
    };
    GruposCollection.prototype.ordenarGruposPorNombre = function () {
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
            var copia_grupos = _this.grupos_;
            // ordenar de forma ascendete o descendente según el valor de la variable ascendente
            copia_grupos.sort(function (a, b) {
                if (ascendente) {
                    return a.getNombre.localeCompare(b.getNombre);
                }
                else {
                    return b.getNombre.localeCompare(a.getNombre);
                }
            });
            // mostrar
            copia_grupos.forEach(function (ruta) {
                console.log("Nombre: ".concat(ruta.getNombre));
            });
            _this.infoUsuario();
        });
    };
    GruposCollection.prototype.ordenarPorKmsSemanales = function () {
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
            var copia_grupos = _this.grupos_;
            // ordenar de forma ascendete o descendente según el valor de la variable ascendente
            copia_grupos.sort(function (a, b) {
                if (ascendente) {
                    return a.getEstadisticasEntrenamiento.semana.km - b.getEstadisticasEntrenamiento.semana.km;
                }
                else {
                    return b.getEstadisticasEntrenamiento.semana.km - a.getEstadisticasEntrenamiento.semana.km;
                }
            });
            // mostrar
            copia_grupos.forEach(function (ruta) {
                console.log("Kms semanales: ".concat(ruta.getEstadisticasEntrenamiento.semana.km));
            });
            _this.infoUsuario();
        });
    };
    GruposCollection.prototype.ordenarPorKmsMensuales = function () {
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
            var copia_grupos = _this.grupos_;
            // ordenar de forma ascendete o descendente según el valor de la variable ascendente
            copia_grupos.sort(function (a, b) {
                if (ascendente) {
                    return a.getEstadisticasEntrenamiento.mes.km - b.getEstadisticasEntrenamiento.mes.km;
                }
                else {
                    return b.getEstadisticasEntrenamiento.mes.km - a.getEstadisticasEntrenamiento.mes.km;
                }
            });
            // mostrar
            copia_grupos.forEach(function (ruta) {
                console.log("Kms mensuales: ".concat(ruta.getEstadisticasEntrenamiento.mes.km));
            });
            _this.infoUsuario();
        });
    };
    GruposCollection.prototype.ordenarPorKmsAnuales = function () {
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
            var copia_grupos = _this.grupos_;
            // ordenar de forma ascendete o descendente según el valor de la variable ascendente
            copia_grupos.sort(function (a, b) {
                if (ascendente) {
                    return a.getEstadisticasEntrenamiento.año.km - b.getEstadisticasEntrenamiento.año.km;
                }
                else {
                    return b.getEstadisticasEntrenamiento.año.km - a.getEstadisticasEntrenamiento.año.km;
                }
            });
            // mostrar
            copia_grupos.forEach(function (ruta) {
                console.log("Kms anuales: ".concat(ruta.getEstadisticasEntrenamiento.año.km));
            });
            _this.infoUsuario();
        });
    };
    GruposCollection.prototype.ordenarPorNumUsuarios = function () {
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
            var copia_grupos = _this.grupos_;
            // ordenar de forma ascendete o descendente según el valor de la variable ascendente
            copia_grupos.sort(function (a, b) {
                if (ascendente) {
                    return a.getParticipantes.length - b.getParticipantes.length;
                }
                else {
                    return b.getParticipantes.length - a.getParticipantes.length;
                }
            });
            // mostrar
            copia_grupos.forEach(function (ruta) {
                console.log("N\u00FAmero de usuarios: ".concat(ruta.getParticipantes.length));
            });
            _this.infoUsuario();
        });
    };
    //* MANAGE
    GruposCollection.prototype.manageGrupos = function () {
        var _this = this;
        var prompt = inquirer.createPromptModule();
        prompt([
            {
                type: 'list',
                name: 'opcion',
                message: '¿Qué deseas hacer?',
                choices: [
                    { name: 'Crear grupo', value: 'crear' },
                    { name: 'Eliminar grupo', value: 'eliminar' },
                    { name: 'Modificar', value: 'modificar' },
                    { name: 'Salir', value: 'Salir' },
                ]
            }
        ]).then(function (answers) {
            switch (answers.opcion) {
                case 'crear':
                    // this.crearGrupo();
                    break;
                case 'eliminar':
                    _this.promptEliminarGrupo();
                    break;
                case 'Salir':
                    // cerrar prompt
                    process.exit(0);
                    break;
            }
        });
    };
    GruposCollection.prototype.promptEliminarGrupo = function () {
        var _this = this;
        var prompt = inquirer.createPromptModule();
        prompt([
            {
                type: 'list',
                name: 'opcion',
                message: '¿Qué grupo deseas eliminar?',
                choices: this.getGrupos.map(function (group) {
                    return { name: group.getNombre, value: group.getID };
                })
            }
        ]).then(function (answers) {
            _this.eliminarGrupo(answers.opcion);
            _this.manageGrupos();
        });
    };
    GruposCollection.prototype.eliminarGrupo = function (identificador) {
        var _this = this;
        var control_bool = false;
        var grupo_aux;
        this.grupos_.forEach(function (grupo, indice) {
            if (grupo.getID == identificador) {
                grupo_aux = grupo;
                _this.grupos_.splice(indice, 1);
                control_bool = true;
                bd_1.database.get("grupos").splice(indice, 1).write();
            }
        });
        if (control_bool) {
            return grupo_aux;
        }
        else {
            return undefined;
        }
    };
    Object.defineProperty(GruposCollection.prototype, "getGrupos", {
        //* SETTERs Y GETTERs
        /**
         * Método que devuelve los grupos
         */
        get: function () {
            return this.grupos_;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GruposCollection.prototype, "setGrupos", {
        /**
         * Método que modifica los grupos
         */
        set: function (grupos) {
            this.grupos_ = grupos;
        },
        enumerable: false,
        configurable: true
    });
    return GruposCollection;
}());
exports.GruposCollection = GruposCollection;
//? PRUEBAS
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
// const grupo0 = new Grupo('Grupo 0', [0,1,2,3,4,5,6,7,8,9,10], estadisticas, [historic1,historic2]);
// const grupo1 = new Grupo('Grupo 1', [0,1,2,3,4,5], estadisticas2, [historic3,historic4]);
// const grupo2 = new Grupo('Grupo 2', [0,6,7,8,9,10], estadisticas3, [historic5,historic6]);
// const grupo3 = new Grupo('Grupo 3', [0,4,5,6,7,8,9,10], estadisticas, [historic1,historic2]);
// const grupo4 = new Grupo('Grupo 4', [0,1,2,3,4,5,6,7,8,9,10], estadisticas2, [historic3,historic4]);
// const grupo5 = new Grupo('Grupo 5', [0,6,7,8,9,10], estadisticas3, [historic5,historic6]);
var gruposCollection = new GruposCollection();
// gruposCollection.infoUsuario();
gruposCollection.manageGrupos();
