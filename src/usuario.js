"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
var bd_1 = require("./bd");
// import { Ruta } from "./ruta";
/**
 * @class Usuario
 * @description Clase que representa un usuario
 */
var Usuario = /** @class */ (function () {
    /**
     * Constructor de la clase Usuario
     * @param nombre
     * @param actividad
     * @param amigos
     * @param grupo_amigos
     * @param estadisticas
     * @param historico_rutas
     * @param retos
     * @param id
     */
    function Usuario(nombre, actividad, amigos, grupo_amigos, estadisticas, historico_rutas, retos, id) {
        this.nombre_ = nombre;
        this.actividad_ = actividad;
        this.amigos_ = amigos;
        this.grupo_de_amigos_ = grupo_amigos;
        this.retos_ = retos;
        this.historicoRutas_ = historico_rutas;
        // sacar rutas favoritas
        this.obtenerRutasFavoritas();
        // sacar estadisticas
        this.estadisticas_ = estadisticas;
        //this.obtenerEstadisticas();
        var id_global = bd_1.database.get("usuarios").map("nombre").value();
        if (id_global.includes(this.nombre_)) {
            this.id_ = bd_1.database.get("usuarios").find({ nombre: this.nombre_ }).value().id;
        }
        else {
            if (id !== undefined) {
                this.id_ = id;
            }
            else {
                // buscar el id más alto y sumarle 1
                var id_global_1 = bd_1.database.get("usuarios").map("id").value();
                id_global_1.sort(function (a, b) { return a - b; });
                if (id_global_1.length === 0) {
                    this.id_ = 1;
                }
                else {
                    this.id_ = id_global_1[id_global_1.length - 1] + 1;
                }
                // escribir en la base de datos
            }
            bd_1.database.get("usuarios").push({
                id: this.id_,
                nombre: this.nombre_,
                actividad: this.actividad_,
                amigos: this.amigos_,
                grupo_de_amigos: this.grupo_de_amigos_,
                estadisticas: this.estadisticas_,
                rutasFavoritas: this.rutasFavoritas_,
                retos: this.retos_,
                historicoRutas: this.historicoRutas_
            }).write();
        }
    }
    Object.defineProperty(Usuario.prototype, "getID", {
        //* GETTER Y SETTER 
        /**
         * Método que devuelve el id del usuario
         * @returns -- id del usuario
         */
        get: function () {
            return this.id_;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Usuario.prototype, "setID", {
        /**
         * Método que modifica el id del usuario
         * @param id -- nuevo id del usuario
         */
        set: function (id) {
            this.id_ = id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Usuario.prototype, "getNombre", {
        /**
         * Método que devuelve el nombre del usuario
         * @returns -- nombre del usuario
         */
        get: function () {
            return this.nombre_;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Usuario.prototype, "setNombre", {
        /**
         * Método que modifica el nombre del usuario
         * @param nombre -- nuevo nombre del usuario
         */
        set: function (nombre) {
            this.nombre_ = nombre;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Usuario.prototype, "getActividad", {
        /**
         * Método que devuelve la actividad del usuario
         * @returns -- actividad del usuario
         */
        get: function () {
            return this.actividad_;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Usuario.prototype, "setActividad", {
        /**
         * Método que modifica la actividad del usuario
         * @param actividad -- nueva actividad del usuario
         */
        set: function (actividad) {
            this.actividad_ = actividad;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Usuario.prototype, "getAmigos", {
        /**
         * Método que devuelve los amigos del usuario
         * @returns -- amigos del usuario
         */
        get: function () {
            return this.amigos_;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Usuario.prototype, "setAmigos", {
        /**
         * Método que modifica los amigos del usuario
         * @param amigos -- nuevos amigos del usuario
         */
        set: function (amigos) {
            this.amigos_ = amigos;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Usuario.prototype, "getGrupoAmigos", {
        /**
         * Método que devuelve el grupo de amigos del usuario
         * @returns -- grupo de amigos del usuario
         */
        get: function () {
            return this.grupo_de_amigos_;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Usuario.prototype, "setGrupoAmigos", {
        /**
         * Método que modifica el grupo de amigos del usuario
         * @param grupo -- nuevo grupo de amigos del usuario
         */
        set: function (grupo) {
            this.grupo_de_amigos_ = grupo;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Usuario.prototype, "getEstadisticas", {
        /**
         * Método que devuelve las estadísticas del usuario
         * @returns -- estadísticas del usuario
         */
        get: function () {
            return this.estadisticas_;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Usuario.prototype, "setEstadisticas", {
        /**
         * Método que modifica las estadísticas del usuario
         * @param estadisticas -- nuevas estadísticas del usuario
         */
        set: function (estadisticas) {
            this.estadisticas_ = estadisticas;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Usuario.prototype, "getRutasFavoritas", {
        /**
         * Método que devuelve las rutas favoritas del usuario
         * @|returns -- rutas favoritas del usuario
         */
        get: function () {
            return this.rutasFavoritas_;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Usuario.prototype, "setRutasFavoritas", {
        /**
         * Método que modifica las rutas favoritas del usuario
         * @param rutasFavoritas -- nuevas rutas favoritas del usuario
         */
        set: function (rutasFavoritas) {
            this.rutasFavoritas_ = rutasFavoritas;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Usuario.prototype, "getRetos", {
        /**
         * Método que devuelve los retos del usuario
         * @returns -- retos del usuario
         */
        get: function () {
            return this.retos_;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Usuario.prototype, "setRetos", {
        /**
         * Método que modifica los retos del usuario
         * @param retos -- nuevos retos del usuario
         */
        set: function (retos) {
            this.retos_ = retos;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Usuario.prototype, "getHistoricoRutas", {
        /**
         * Método que devuelve el historico de rutas del usuario
         * @returns -- historico de rutas del usuario
         */
        get: function () {
            return this.historicoRutas_;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Usuario.prototype, "setHistoricoRutas", {
        /**
         * Método que modifica el historico de rutas del usuario
         * @param historicoRutas -- nuevo historico de rutas del usuario
         */
        set: function (historicoRutas) {
            this.historicoRutas_ = historicoRutas;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Método que calcula las rutas favoritas del usuario
     */
    Usuario.prototype.obtenerRutasFavoritas = function () {
        // recorrer histórico, contar el número de veces que se repite cada id de ruta y si se repite mas de 2 veces lo metemos en rutas fav
        var historico = this.historicoRutas_;
        var rutasFav = [];
        var rutas = [];
        for (var i = 0; i < historico.length; i++) {
            rutas.push(historico[i].id);
        }
        // ordenamos por id    
        rutas.sort(function (a, b) { return a - b; });
        // recorremos el array de rutas y contamos cuantas veces se repite cada id
        var cont = 1;
        for (var i = 0; i < rutas.length; i++) {
            // si el id es igual al siguiente, incrementamos el contador
            // si ya no es igual, metemos en rutas fav si cumple
            if (rutas[i] == rutas[i + 1]) {
                cont++;
            }
            else {
                if (cont > 2) {
                    rutasFav.push(rutas[i]);
                }
                cont = 1;
            }
        }
        // guardamos las rutas favoritas en el usuario
        // console.log('RUTAS FAVORITAS: ' + rutasFav)
        this.setRutasFavoritas = rutasFav;
    };
    /**
     * Método que devuelve el número de km totales recorridos por el usuario
     * @returns número de km totales recorridos por el usuario
     */
    Usuario.prototype.getKMTotales = function () {
        // para cada ruta del histórico, sacar id y buscar esa ruta, obtener los km y sumarlos
        var historico = this.historicoRutas_;
        var kmTotales = 0;
        for (var i = 0; i < historico.length; i++) {
            var ruta = bd_1.database.get('rutas').find({ id: historico[i].id }).value();
            kmTotales += ruta.longitud;
        }
        return kmTotales;
    };
    return Usuario;
}());
exports.Usuario = Usuario;
