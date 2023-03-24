"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
/**
 * @class Usuario
 * @description Clase que representa un usuario
 */
var Usuario = /** @class */ (function () {
    function Usuario(nombre, actividad, amigos) {
        this.nombre_ = nombre;
        this.actividad_ = actividad;
        this.amigos_ = amigos;
        this.grupo_de_amigos_ = [];
        this.rutasFavoritas_ = [];
        this.historicoRutas_ = [];
        this.id_ = Usuario.comprobarEstatica();
    }
    /**
   * Método que genera un id único del usuario
   * @returns -- id del usuario
   */
    Usuario.comprobarEstatica = function () {
        // en este método comprobamos si el id_global_ está inicializado
        // si no está inicializado, lo inicializamos a 0
        // si está inicializado, devolvemos el valor de id_global_
        if (Usuario.id_global_ == undefined) {
            Usuario.id_global_ = 0;
        }
        Usuario.id_global_ += 1;
        var identificador = Usuario.id_global_;
        return identificador;
    };
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
            return this.retos;
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
            this.retos = retos;
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
    return Usuario;
}());
exports.Usuario = Usuario;
