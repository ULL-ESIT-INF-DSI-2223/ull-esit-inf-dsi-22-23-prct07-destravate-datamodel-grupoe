"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grupo = void 0;
var bd_1 = require("./bd");
/**
 * @class Grupo
 * @description Clase que representa un grupo de usuarios
 */
var Grupo = /** @class */ (function () {
    function Grupo(nombre, participantes, estadisticaEntrenamiento, historicoRutas, id) {
        this.nombre_ = nombre;
        this.participantes_ = participantes;
        this.estadisticasEntrenamiento_ = estadisticaEntrenamiento;
        this.rutas_favoritas_ = [];
        this.historicoRutas_ = historicoRutas;
        // this.ranking_ = this.calcularRanking();
        this.ranking_ = [];
        //* escribir en lowdb la ruta creada
        var id_global = bd_1.database.get("grupos").map("nombre").value();
        if (id_global.includes(this.nombre_)) {
            this.id_ = bd_1.database.get("grupos").find({ nombre: this.nombre_ }).value().id;
        }
        else {
            if (id !== undefined) {
                this.id_ = id;
            }
            else {
                // buscar el id más alto y sumarle 1
                var id_global_1 = bd_1.database.get("grupos").map("id").value();
                id_global_1.sort(function (a, b) { return a - b; });
                if (id_global_1.length === 0) {
                    this.id_ = 1;
                }
                else {
                    this.id_ = id_global_1[id_global_1.length - 1] + 1;
                }
            }
            bd_1.database.get("grupos").push({
                id: this.id_,
                nombre: this.nombre_,
                participantes: this.participantes_,
                estadisticasEntrenamiento: this.estadisticasEntrenamiento_,
                ranking: this.ranking_,
                rutas_favoritas: this.rutas_favoritas_,
                historicoRutas: this.historicoRutas_
            }).write();
        }
    }
    Object.defineProperty(Grupo.prototype, "getID", {
        // calcularRanking(): ID[] {
        //   const ranking: Usuario[] = [];
        //   const participantes = this.participantes_;
        //   participantes.forEach(participante => {
        //     // buscar el usuario en la base de datos
        //     const usuario = database.get("usuarios").find({ id: participante }).value();
        //     ranking.push(new Usuario(usuario.nombre, usuario.actividad, usuario.amigos, usuario.grupo_de_amigos, usuario.estadisticas, usuario.historicoRutas, usuario.retos, usuario.id));
        //   });
        //   // ordenar el ranking, en base a la suma de los km del histórico de rutas de cada usuario
        //   ranking.sort((a, b) => b.getKMTotales() - a.getKMTotales());
        //   const rankingFinal: ID[] = [];
        //   ranking.forEach(usuario => {
        //     rankingFinal.push(usuario.getID);
        //   });
        //   return rankingFinal;
        // }
        //* GETTER Y SETTER
        /**
         * Método que devuelve el id del grupo
         * @returns -- id del grupo
         */
        get: function () {
            return this.id_;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Grupo.prototype, "getNombre", {
        /**
         * Método que devuelve el nombre del grupo
         * @returns -- nombre del grupo
         */
        get: function () {
            return this.nombre_;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Grupo.prototype, "getParticipantes", {
        /**
         * Método que devuelve los participantes del grupo
         * @returns -- participantes del grupo
         */
        get: function () {
            return this.participantes_;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Grupo.prototype, "getEstadisticasEntrenamiento", {
        /**
         * Método que devuelve las estadisticas de entrenamiento del grupo
         * @returns -- estadisticas de entrenamiento del grupo
         */
        get: function () {
            return this.estadisticasEntrenamiento_;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Grupo.prototype, "getRutasFavoritas", {
        /**
         * Método que devuelve las rutas favoritas del grupo
         * @returns -- rutas favoritas del grupo
         */
        get: function () {
            return this.rutas_favoritas_;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Grupo.prototype, "getHistoricoRutas", {
        /**
         * Método que devuelve el historico de rutas del grupo
         * @returns -- historico de rutas del grupo
         */
        get: function () {
            return this.historicoRutas_;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Grupo.prototype, "setNombre", {
        /**
         * Método que modifica el nombre del grupo
         * @param nombre -- nuevo nombre del grupo
         */
        set: function (nombre) {
            this.nombre_ = nombre;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Grupo.prototype, "setParticipantes", {
        /**
         * Método que añade un participante al grupo
         * @param participante -- participante que se añade al grupo
         */
        set: function (participantes) {
            this.participantes_ = participantes;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Grupo.prototype, "setEstadisticasEntrenamiento", {
        /**
         * Método que añade un participante al grupo
         * @param participante -- participante que se añade al grupo
         */
        set: function (estadisticasEntrenamiento) {
            this.estadisticasEntrenamiento_ = estadisticasEntrenamiento;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Grupo.prototype, "setRutasFavoritas", {
        /**
         * Método que añade una ruta a las rutas favoritas del grupo
         * @param ruta -- ruta que se añade a las rutas favoritas
         */
        set: function (rutasFavoritas) {
            this.rutas_favoritas_ = rutasFavoritas;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Grupo.prototype, "setHistoricoRutas", {
        /**
         * Método que añade una ruta al historico de rutas del grupo
         * @param ruta -- ruta que se añade al historico
         */
        set: function (historicoRutas) {
            this.historicoRutas_ = historicoRutas;
        },
        enumerable: false,
        configurable: true
    });
    return Grupo;
}());
exports.Grupo = Grupo;
