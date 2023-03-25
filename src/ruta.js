"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ruta = exports.database = void 0;
// lowdb
var lowdb = require("lowdb");
var FileSync = require("lowdb/adapters/FileSync");
// eslint-disable-next-line prefer-const
exports.database = lowdb(new FileSync("database.json"));
exports.database.defaults({ rutas: [] }).write();
/**
 * @class Ruta
 * @description Clase que representa una ruta
 */
var Ruta = /** @class */ (function () {
    // private database: lowdb.LowdbSync<schemaType>;
    function Ruta(nombre, geolocalizacion_inicio, geolocalizacion_fin, longitud, desnivel, usuario, tipo_actividad, calificacion, id) {
        this.nombre_ = nombre;
        this.geolocalizacion_inicio_ = geolocalizacion_inicio;
        this.geolocalizacion_fin_ = geolocalizacion_fin;
        this.longitud_ = longitud;
        this.desnivel_ = desnivel;
        this.usuarios_ = usuario;
        this.tipo_actividad_ = tipo_actividad;
        this.calificacion_ = calificacion;
        // imprmir usuarios
        // usuario.forEach(element => {
        //   console.log("usuarios param:"+element.getNombre);
        // });
        // this.usuarios_.forEach(element => {
        //   console.log("usuarios this:"+element.getNombre);
        // });
        //* escribir en lowdb la ruta creada
        // obtenemos todos los id de la base de datos
        // si this.id_ está en la base de datos, no se meterá
        // si this.id_ no está en la base de datos, se meterá
        var id_global = exports.database.get("rutas").map("nombre").value();
        // imprimir los nombres
        console.log(id_global);
        console.log("Nombre actual: " + this.nombre_);
        if (id_global.includes(this.nombre_)) {
            // buscar este nombre en el array de rutas y devolver el id
            console.log("PARTE 1");
            this.id_ = exports.database.get("rutas").find({ nombre: this.nombre_ }).value().id;
        }
        else {
            // si id tiene algo
            console.log("PARTE 2");
            console.log("id: " + id);
            if (id !== undefined) { //? ¿FUNCIONA?
                this.id_ = id; //?
            }
            else {
                // buscar el id más alto y sumarle 1
                var id_global_1 = exports.database.get("rutas").map("id").value();
                id_global_1.sort(function (a, b) { return a - b; });
                console.log("id_global: " + id_global_1);
                this.id_ = id_global_1[id_global_1.length - 1] + 1;
                console.log("nuevo id: " + this.id_);
                // this.id_ = database.get("rutas").size().value() + 1;
            }
            exports.database.get("rutas").push({
                id: this.id_,
                nombre: this.nombre_,
                geolocalizacion_inicio: this.geolocalizacion_inicio_,
                geolocalizacion_fin: this.geolocalizacion_fin_,
                longitud: this.longitud_,
                desnivel: this.desnivel_,
                usuarios: this.usuarios_,
                tipo_actividad: this.tipo_actividad_,
                calificacion: this.calificacion_
            }).write();
        }
    }
    Object.defineProperty(Ruta.prototype, "getId", {
        //* GETTERS Y SETTERS
        get: function () {
            return this.id_;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Ruta.prototype, "setId", {
        set: function (id) {
            this.id_ = id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Ruta.prototype, "getNombre", {
        /**
         * Método que devuelve el nombre de la ruta
         * @returns
         */
        get: function () {
            return this.nombre_;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Ruta.prototype, "setNombre", {
        /**
         * Método que asigna el nombre de la ruta
         * @param nombre
         */
        set: function (nombre) {
            this.nombre_ = nombre;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Ruta.prototype, "getGeolocalizacionInicio", {
        /**
         * Método que devuelve la geolocalizacion de inicio de la ruta
         * @returns
         */
        get: function () {
            return this.geolocalizacion_inicio_;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Ruta.prototype, "setGeolocalizacionInicio", {
        /**
         * Método que asigna la geolocalizacion de inicio de la ruta
         * @param geolocalizacion_inicio
         */
        set: function (geolocalizacion_inicio) {
            this.geolocalizacion_inicio_ = geolocalizacion_inicio;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Ruta.prototype, "getGeolocalizacionFin", {
        /**
         * Método que devuelve la geolocalizacion de fin de la ruta
         * @returns
         */
        get: function () {
            return this.geolocalizacion_fin_;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Ruta.prototype, "setGeolocalizacionFin", {
        /**
         * Méotodo que asigna la geolocalizacion de fin de la ruta
         * @param geolocalizacion_fin
         */
        set: function (geolocalizacion_fin) {
            this.geolocalizacion_fin_ = geolocalizacion_fin;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Ruta.prototype, "getLongitud", {
        /**
         * Método que devuelve la longitud de la ruta
         * @returns
         */
        get: function () {
            return this.longitud_;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Ruta.prototype, "setLongitud", {
        /**
         * Método que asigna la longitud de la ruta
         * @param longitud
         */
        set: function (longitud) {
            this.longitud_ = longitud;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Ruta.prototype, "getDesnivel", {
        /**
         * Método que devuelve el desnivel de la ruta
         * @returns
         */
        get: function () {
            return this.desnivel_;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Ruta.prototype, "setDesnivel", {
        /**
         * Método que asigna el desnivel de la ruta
         * @param desnivel
         */
        set: function (desnivel) {
            this.desnivel_ = desnivel;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Ruta.prototype, "getUsuarios", {
        /**
         * Método que devuelve los usuarios de la ruta
         * @returns
         */
        get: function () {
            return this.usuarios_;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Ruta.prototype, "setUsuarios", {
        /**
         * Método que asigna los usuarios de la ruta
         * @param usuarios
         */
        set: function (usuarios) {
            this.usuarios_ = usuarios;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Ruta.prototype, "getTipoActividad", {
        /**
         * Método que devuelve el tipo de actividad de la ruta
         * @returns
         */
        get: function () {
            return this.tipo_actividad_;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Ruta.prototype, "setTipoActividad", {
        /**
         * Método que asigna el tipo de actividad de la ruta
         * @param tipo_actividad
         */
        set: function (tipo_actividad) {
            this.tipo_actividad_ = tipo_actividad;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Ruta.prototype, "getCalificacion", {
        /**
         * Método que devuelve la calificacion de la ruta
         * @returns
         */
        get: function () {
            return this.calificacion_;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Ruta.prototype, "setCalificacion", {
        /**
         * Método que asigna la calificacion de la ruta
         * @param calificacion
         */
        set: function (calificacion) {
            this.calificacion_ = calificacion;
        },
        enumerable: false,
        configurable: true
    });
    return Ruta;
}());
exports.Ruta = Ruta;
