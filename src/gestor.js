"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gestor = void 0;
var inquirer = require("inquirer");
var usuario_1 = require("./usuario");
var usuarioCollection_1 = require("./usuarioCollection");
var loggedUser = {
    nombre: "",
    id: 0,
    logued: false
};
var gestor = /** @class */ (function () {
    function gestor() {
    }
    //1.Registrarse en el sistema. Un usuario que se conecte por primera vez al sistema deberá poder incluir 
    // su información para ser almacenada en el sistema. Asimismo, un usuario podrá visualizar el listado 
    // de usuarios existentes dentro del sistema y añadir/borrar amigos.
    //2.Visualizar todas las rutas existentes dentro del sistema. En este apartado se deben poder consultar 
    //el listado de rutas así como acceder a la información completa de cada una de ellas.
    //3.Unirse a un grupo existente. Este apartado considera la opción de un usuario que desea incluirse dentro de un 
    //grupo ya existente en el sistema.
    //4.Visualizar, crear y borrar grupos. Un usuario podrá borrar un grupo, pero solo si esta ha sido creado por él, 
    // es decir, no se podrá borrar un grupo pre-cargado en el sistema. Por otro lado, los grupos se podrán guardar usando 
    // el mismo sistema empleado para guardar la información cargada en el sistema. Por último, considere que en 
    // posteriores conexiones al sistema, el usuario podrá desear borrar un grupo que haya creado anteriormente. Debido 
    // a esto, se deberá distinguir entre los grupos creados por el usuario y los creados por el sistema con el 
    // objetivo de evitar borrar información sin permiso.
    gestor.prototype.registrarUsuario = function () {
        var _this = this;
        var prompt = inquirer.createPromptModule();
        prompt([
            {
                type: 'input',
                name: 'nombre',
                message: 'Introduce tu nombre: '
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
            // obtener todos los nombres
            var coleccion_usuarios = new usuarioCollection_1.usuarioCollection();
            var nombres = coleccion_usuarios.getUsuarios.map(function (usuario) {
                return usuario.getNombre;
            });
            // comprobar que el nombre no existe
            if (nombres.includes(answers.nombre)) {
                console.log("Ya existe un usuario con este nombre!");
                _this.programaPrincipal();
                return;
            }
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
            // insertar el usuario en la base de datos (dentro del constructor tenemos un filtro el cual si el nombre recibido ya existe no genera un nuevo usuario)
            var user_aux = new usuario_1.Usuario(answers.nombre, answers.actividad, amigos_aux, grupos_aux, estadisticas, historicoRutas_aux, retos_aux);
            _this.programaPrincipal();
        });
    };
    gestor.prototype.iniciarSesion = function () {
        var _this = this;
        var prompt = inquirer.createPromptModule();
        // obtener usuarios
        var coleccion_usuarios = new usuarioCollection_1.usuarioCollection();
        prompt([
            {
                type: 'list',
                name: 'nombre',
                message: 'Escoge un usuario:',
                choices: coleccion_usuarios.getUsuarios.map(function (usuario) {
                    return { name: usuario.getNombre, value: usuario.getNombre };
                })
            }
        ]).then(function (answers) {
            // crear usuario actual
            var usuario_actual = coleccion_usuarios.getUsuarios.find(function (usuario) {
                return usuario.getNombre === answers.nombre;
            });
            if (typeof usuario_actual !== 'undefined') {
                console.log("Bienvenido " + usuario_actual.getNombre);
                loggedUser = {
                    nombre: usuario_actual.getNombre,
                    id: usuario_actual.getID,
                    logued: true
                };
                _this.programaPrincipal();
            }
            else {
                console.log("Error!, el usuario no existe en la base de datos");
                process.exit(0);
            }
        });
    };
    /**
     *
     */
    gestor.prototype.programaPrincipal = function () {
        var _this = this;
        var prompt = inquirer.createPromptModule();
        prompt([
            {
                type: "list",
                name: "opcion",
                message: "¿Qué desea hacer?",
                choices: [
                    "Registrarse en el sistema",
                    "Iniciar sesión",
                    "salir"
                ]
            }
        ]).then(function (respuesta) {
            switch (respuesta.opcion) {
                case "Registrarse en el sistema":
                    _this.registrarUsuario();
                    break;
                case "Iniciar sesión":
                    _this.iniciarSesion();
                    break;
                case "salir":
                    console.log("Hasta pronto");
                    process.exit(0);
                    break;
            }
        });
    };
    return gestor;
}());
exports.gestor = gestor;
var mi_gestor = new gestor();
mi_gestor.programaPrincipal();
