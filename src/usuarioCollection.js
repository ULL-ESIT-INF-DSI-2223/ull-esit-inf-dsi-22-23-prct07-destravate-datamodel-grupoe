"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarioCollection = void 0;
var usuario_1 = require("./usuario");
// base de datos
var bd_1 = require("./bd");
/**
 * @class usuarioCollection
 * @description Clase que representa una colección de usuarios
 */
var usuarioCollection = /** @class */ (function () {
    function usuarioCollection(usuario_array) {
        this.usuarios = [];
        // this.leerBD();
        // this.usuarios = usuario_array;
        // usuario_array.forEach((usuario1) => {
        //   const user_aux = new Usuario(usuario1.getNombre, usuario1.getActividad, usuario1.getAmigos, usuario1.getGrupoAmigos, usuario1.getEstadisticas, usuario1.getHistoricoRutas, usuario1.getRetos, usuario1.getID);
        //   this.usuarios.push(user_aux);
        // });
        this.usuarios = usuario_array;
    }
    usuarioCollection.prototype.leerBD = function () {
        var rutas = bd_1.database.get("usuarios").value();
        var array_aux = [];
        rutas.forEach(function (ruta) {
            var ruta_aux = new usuario_1.Usuario(ruta.nombre, ruta.actividad, ruta.amigos, ruta.grupo_de_amigos, ruta.estadisticas, ruta.historicoRutas, ruta.retos, ruta.id);
            array_aux.push(ruta_aux);
        });
        this.setUsuarios = array_aux;
    };
    usuarioCollection.prototype.manageUsuarios = function () {
        console.log("sin hacer");
    };
    usuarioCollection.prototype.infoUsuario = function () {
        console.log("sin hacer");
    };
    Object.defineProperty(usuarioCollection.prototype, "getUsuarios", {
        //* GETTER Y SETTER
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
var semana = {
    km: 10,
    desnivel: 1000
};
var semana2 = {
    km: 20,
    desnivel: 200
};
var semana3 = {
    km: 30,
    desnivel: 300
};
var mes = {
    km: 20,
    desnivel: 2000
};
var mes2 = {
    km: 30,
    desnivel: 3000
};
var mes3 = {
    km: 40,
    desnivel: 4000
};
var año = {
    km: 30,
    desnivel: 3000
};
var año2 = {
    km: 40,
    desnivel: 4000
};
var año3 = {
    km: 50,
    desnivel: 5000
};
var estadisticas = {
    semana: semana,
    mes: mes,
    año: año
};
var estadisticas2 = {
    semana: semana2,
    mes: mes2,
    año: año2
};
var estadisticas3 = {
    semana: semana3,
    mes: mes3,
    año: año3
};
var fecha1 = {
    dia: 1,
    mes: 1,
    año: 2021
};
var fecha2 = {
    dia: 2,
    mes: 2,
    año: 2021
};
var fecha3 = {
    dia: 3,
    mes: 3,
    año: 2021
};
var fecha4 = {
    dia: 4,
    mes: 4,
    año: 2021
};
var historic1 = {
    fecha: fecha1,
    id: 1
};
var historic2 = {
    fecha: fecha2,
    id: 2
};
var historic3 = {
    fecha: fecha3,
    id: 3
};
var historic4 = {
    fecha: fecha4,
    id: 1
};
var historic5 = {
    fecha: fecha1,
    id: 2
};
var historic6 = {
    fecha: fecha2,
    id: 3
};
// (nombre: string, actividad: actividad, amigos: ID[], grupo_amigos: ID[][], estadisticas: estadisticaEntrenamiento ,historico_rutas: historicoRutas[], retos: ID[], id?: ID)
var user0 = new usuario_1.Usuario("user0", "correr", [1, 2, 3], [[1, 2], [3, 4], [5, 6]], estadisticas, [historic1, historic2, historic3], [1, 2, 3]);
var user1 = new usuario_1.Usuario("user1", "correr", [2, 3], [[0, 2], [3, 4], [5, 6]], estadisticas2, [historic4, historic5, historic6], [1, 2, 3]);
var user2 = new usuario_1.Usuario("user2", "correr", [1, 3, 4], [[0, 1], [3, 4], [5, 6]], estadisticas3, [historic1, historic2, historic3], [1, 3]);
var user3 = new usuario_1.Usuario("user3", "correr", [1, 2, 4], [[0, 1], [2, 4], [5, 6]], estadisticas, [historic4, historic5, historic6], [1, 2, 3]);
var user4 = new usuario_1.Usuario("user4", "correr", [1, 2, 3], [[0, 1], [2, 3], [5, 6]], estadisticas2, [historic1, historic2, historic3], [1, 2, 3]);
var user5 = new usuario_1.Usuario("user5", "correr", [1, 2, 3], [[0, 1], [2, 3], [4, 6]], estadisticas3, [historic4, historic5, historic6], [1, 2, 3]);
var user6 = new usuario_1.Usuario("user6", "correr", [1, 2, 3], [[0, 1], [2, 3], [4, 5]], estadisticas, [historic1, historic2, historic3], [1, 2, 3]);
var coleccion_usuarios = new usuarioCollection([user0, user1, user2, user3, user4, user5, user6]);
