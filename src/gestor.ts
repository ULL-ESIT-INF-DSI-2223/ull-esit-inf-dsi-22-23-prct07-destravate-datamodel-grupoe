import * as inquirer from "inquirer";
import { Usuario } from "./usuario";
import { usuarioCollection } from "./usuarioCollection";
import { rutaCollection } from "./rutaCollection";
import { GruposCollection } from "./gruposCollection";
import { Grupo } from "./grupo";
import { RetoCollection } from "./retoCollection";
import { ID, estadistica, estadisticaEntrenamiento, logueado} from "./types";

//////
import { Ruta } from "./ruta";
import { Reto } from "./reto";
import { coordenadas, fecha, historicoRutas } from "./types";

/////

/**
 * Variable global de tipo logueado, sirve para guardar los datos principales del usuario logueado.
 */
let loggedUser: logueado = {
  nombre: "",
  id: 0,
  logued: false
}

/**
 * @class gestor
 * @description Clase que gestiona el tratamiento de la información del sistema
 */
export class gestor {
  /**
   * Método que registra un usuario en el sistema
   */
  registrarUsuario(): void {
    const prompt = inquirer.createPromptModule();
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
          {name:'Ciclismo', value: 'Ciclismo'},
          {name:'Running', value: 'Running'},
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
    ]).then((answers) => {
      // obtener todos los nombres
      const coleccion_usuarios = new usuarioCollection();
      const nombres = coleccion_usuarios.getUsuarios.map((usuario) => {
        return usuario.getNombre;
      });
      // comprobar que el nombre no existe
      if (nombres.includes(answers.nombre)) {
        console.log("Ya existe un usuario con este nombre!");
        this.programaPrincipal();
        return;
      }

      const amigos_aux = answers.amigos.split(",");
      const historicoRutas_aux = answers.historicoRutas.split(",");
      const retos_aux = answers.retos.split(",");
      // sacar grupos de amigos
      const grupos_aux = answers.grupo_de_amigos.split(";");
      // sacar estadisticas
      const estadisticas_aux = [];
      estadisticas_aux.push(answers.estadisticas1.split(","));
      estadisticas_aux.push(answers.estadisticas2.split(","));
      estadisticas_aux.push(answers.estadisticas3.split(","));

      const est1: estadistica = {km: parseInt(estadisticas_aux[0][0]), desnivel: parseInt(estadisticas_aux[0][1])};
      const est2: estadistica = {km: parseInt(estadisticas_aux[1][0]), desnivel: parseInt(estadisticas_aux[1][1])};
      const est3: estadistica = {km: parseInt(estadisticas_aux[2][0]), desnivel: parseInt(estadisticas_aux[2][1])};

      const estadisticas: estadisticaEntrenamiento = {
        semana: est1,
        mes: est2,
        año: est3
      }
      // insertar el usuario en la base de datos (dentro del constructor tenemos un filtro el cual si el nombre recibido ya existe no genera un nuevo usuario)
      const user_aux = new Usuario(answers.nombre, answers.actividad, amigos_aux, grupos_aux, estadisticas, historicoRutas_aux, retos_aux);
      this.programaPrincipal();
    });
  }

  /**
   * Método para iniciar sesión en el sistema
   */
  iniciarSesion(): void {
    const prompt = inquirer.createPromptModule();
    // obtener usuarios
    const coleccion_usuarios = new usuarioCollection();

    prompt([
      {
        type: 'list',
        name: 'nombre',
        message: 'Escoge un usuario:',
        choices: coleccion_usuarios.getUsuarios.map((usuario) => {
          return {name: usuario.getNombre , value: usuario.getNombre};
        })
      }
    ]).then((answers) => {
      // crear usuario actual
      const usuario_actual = coleccion_usuarios.getUsuarios.find((usuario) => {
        return usuario.getNombre === answers.nombre;
      }
      );
      if (typeof usuario_actual !== 'undefined') {
        console.log("Bienvenido " + usuario_actual.getNombre);
        loggedUser = {
          nombre: usuario_actual.getNombre,
          id: usuario_actual.getID,
          logued: true
        }
        this.userManage();
      }
      else {
        console.log("Error!, el usuario no existe en la base de datos");
        process.exit(0);
      }
    });

  }

  /**
   *  Método para el manejo del programa principal
   */
  programaPrincipal() {
    const prompt = inquirer.createPromptModule();
    prompt([
      {
        type: "list",
        name: "opcion",
        message: "¿Qué desea hacer?",
        choices: [
          "Registrarse en el sistema",
          "Iniciar sesión",
          "Funcionamiento del sistema",
          "Salir"
        ]
      }
    ]).then((respuesta) => {
      switch (respuesta.opcion) {
        case "Registrarse en el sistema":
          this.registrarUsuario();
          break;
        case "Iniciar sesión":
          this.iniciarSesion();
          break;
        case "Funcionamiento del sistema":
          this.funcionamientoSistema();
          break;
        case "salir":
          console.log("Hasta pronto");
          process.exit(0);
          break;
      }
    });
  }

  /**
   * Método para el manejo de usuarios
   */
  userManage() {
    // 1. ver listado de usuario dentro del sistema
    // 2. Añadir y borrar amigo
    const prompt = inquirer.createPromptModule();
    prompt([
      {
        type: "list",
        name: "opcion",
        message: "¿Qué desea hacer?",
        choices: [
          "Ver listado de usuarios",
          "Modificar mis amigos",
          "Visualizar rutas",
          "Unirse a un grupo",
          "Gestionar grupos",
          "Salir"
        ]
      }]).then((respuesta) => {
        switch (respuesta.opcion) {
          case "Ver listado de usuarios":
            // mostrar todos los usuarios del sistema
            this.listarUsuarios();
            break;
          case "Modificar mis amigos":
            // añadir y borrar amigos
            this.modificarAmigos();
            break;
          case "Visualizar rutas":
            this.verRutas();
            break;
          case "Unirse a un grupo":
            this.unirseGrupo();
            break;
          case "Gestionar grupos":
            this.gestionarGrupos();
            break;
          case "Salir":
            console.log("Hasta pronto");
            process.exit(0);
            break;
        }
      });
  }

  /**
   * Método que permite al usuario ver los usuarios de la base de datos
   */
  listarUsuarios() {
    console.log("Usuarios: ");
    const coleccion_usuarios = new usuarioCollection();
    coleccion_usuarios.getUsuarios.forEach((usuario) => {
      console.log(usuario.getNombre);
    });
    console.log();
    this.userManage();
  }
  
  /**
   * Método que permite al usuario añadir o eliminar amigos
   */
  modificarAmigos() {
    // cogemos del usuario que ha iniciado sesión su grupo de amigos de la base de datos
    const coleccion_usuarios = new usuarioCollection();
    const prompt = inquirer.createPromptModule();
    // preguntar si quiere añadir o eliminar amigo
    prompt([
      {
        type: "list",
        name: "opcion",
        message: "¿Qué desea hacer?",
        choices: [
          "Añadir amigo",
          "Eliminar amigo",
          "Salir"
        ]
      }]).then((respuesta) => {

        const usuario_actual = coleccion_usuarios.getUsuarios.find((usuario) => {
          return usuario.getNombre === loggedUser.nombre;
        });
        switch (respuesta.opcion) {
          case "Añadir amigo":
            prompt([
              {
                type: "input",
                name: "nombre",
                message: "Introduce el ID del amigo que quieres añadir"
              }
            ]).then((respuesta) => {
              if (typeof usuario_actual !== 'undefined') {
                usuario_actual.setAmigos = usuario_actual.getAmigos.concat(respuesta.nombre); // añadir amigo
                // actualizar la base de datos
                coleccion_usuarios.borrarElementoBD(usuario_actual.getID);
                const nuevo_usuario = new Usuario(usuario_actual.getNombre, usuario_actual.getActividad, usuario_actual.getAmigos, usuario_actual.getGrupoAmigos, usuario_actual.getEstadisticas, usuario_actual.getHistoricoRutas, usuario_actual.getRetos, usuario_actual.getID);
                coleccion_usuarios.getUsuarios.push(nuevo_usuario);
                console.log("Amigo añadido correctamente");
                this.userManage();
              }
            });
            break;
          case "Eliminar amigo":
            
            if (typeof usuario_actual === 'undefined') {
              console.log("Error!, el usuario no existe en la base de datos");
              process.exit(0);
            }
            if(usuario_actual.getAmigos.length === 0) {
              console.log("No tienes amigos");
              this.userManage();
            }
            
            prompt([
              {
                type: "list",
                name: "nombre",
                message: "Elige el ID del amigo que quieres eliminar",
                choices: usuario_actual.getAmigos.map((amigo) => {
                  return {name: amigo, value: amigo};
                }
                )
                

              }
            ]).then((respuesta) => {
              // eliminar amigo de la lista de amigos
              const amigos_aux: number[] = usuario_actual.getAmigos;
              amigos_aux.forEach((amigo, index) => {
                if (amigo === respuesta.nombre) {
                  amigos_aux.splice(index, 1);
                }
              });
              usuario_actual.setAmigos = amigos_aux;
              coleccion_usuarios.borrarElementoBD(usuario_actual.getID);
              const nuevo_usuario = new Usuario(usuario_actual.getNombre, usuario_actual.getActividad, usuario_actual.getAmigos, usuario_actual.getGrupoAmigos, usuario_actual.getEstadisticas, usuario_actual.getHistoricoRutas, usuario_actual.getRetos, usuario_actual.getID);
              coleccion_usuarios.getUsuarios.push(nuevo_usuario);
              console.log("Amigo eliminado correctamente");
              this.userManage();
            });
            break;
        }
      });
  }
  
  /**
   * Muestra las rutas disponibles en la base de datos
   */
  verRutas() {
    const prompt = inquirer.createPromptModule();
    const rutas_coleccion = new rutaCollection();
    prompt([
      {
        type: "list",
        name: "opcion",
        message: "¿Qué ruta desea seleccionar?",
        choices: rutas_coleccion.getRutas.map((ruta) => {
          return {name: ruta.getNombre, value: ruta.getNombre};
        }
        )
      }]).then((respuesta) => {
        const ruta_seleccionada = rutas_coleccion.getRutas.find((ruta) => {
          return ruta.getNombre === respuesta.opcion;
        });

        if(typeof ruta_seleccionada !== 'undefined') {
          console.log("Ruta seleccionada: " + ruta_seleccionada.getNombre);
          console.log('Geolocalizacion inicial:  ' + ruta_seleccionada.getGeolocalizacionInicio[0].letra + ": " + ruta_seleccionada.getGeolocalizacionInicio[0].coordenada + ', ' + ruta_seleccionada.getGeolocalizacionInicio[1].letra + ": " +  ruta_seleccionada.getGeolocalizacionInicio[1].coordenada + ', ' + ruta_seleccionada.getGeolocalizacionInicio[2].letra + ": " +  ruta_seleccionada.getGeolocalizacionInicio[2].coordenada);
          console.log('Geolocalizacion final:  ' + ruta_seleccionada.getGeolocalizacionFin[0].letra + ':' + ruta_seleccionada.getGeolocalizacionFin[0].coordenada + ', ' + ruta_seleccionada.getGeolocalizacionFin[1].letra + ':' + ruta_seleccionada.getGeolocalizacionFin[1].coordenada + ', ' + ruta_seleccionada.getGeolocalizacionFin[2].letra + ": " +  ruta_seleccionada.getGeolocalizacionFin[2].coordenada);
          console.log("Longitud: " + ruta_seleccionada.getLongitud);
          console.log("Desnivel: " + ruta_seleccionada.getDesnivel);
          console.log("Participantes: " + ruta_seleccionada.getUsuarios);
          console.log("Actividad: " + ruta_seleccionada.getTipoActividad);
          console.log('Calificación ruta:' + ruta_seleccionada.getCalificacion);
          console.log();
        }
        this.userManage();
      });
  }

  /**
   * Método que permite al usuario unirse a un grupo
   */
  unirseGrupo() {
    const prompt = inquirer.createPromptModule();
    const grupos_coleccion = new GruposCollection();
    prompt([
      {
        type: "list",
        name: "opcion",
        message: "¿A qué grupo desea unirse?",
        choices: grupos_coleccion.getGrupos.map((grupo) => {
          return {name: grupo.getNombre, value: grupo.getNombre};
        }
        )
      }]).then((respuesta) => {
        const grupo_seleccionado = grupos_coleccion.getGrupos.find((grupo) => {
          return grupo.getNombre === respuesta.opcion;
        });

        if(typeof grupo_seleccionado !== 'undefined') {
          let bandera = false;
          grupo_seleccionado.getParticipantes.forEach((id) => {
            if (id === loggedUser.id) {
              bandera = true;
            }
          });
          if (bandera === false) {
            grupo_seleccionado.setParticipantes = grupo_seleccionado.getParticipantes.concat(loggedUser.id);
            grupos_coleccion.borrarElementoBD(grupo_seleccionado.getID);
            const nuevo_grupo = new Grupo(grupo_seleccionado.getNombre, grupo_seleccionado.getParticipantes, grupo_seleccionado.getEstadisticasEntrenamiento, grupo_seleccionado.getHistoricoRutas, grupo_seleccionado.getID);
            grupos_coleccion.getGrupos.push(nuevo_grupo);
            console.log();

            console.log("Te has unido al grupo correctamente");
            console.log("Tu ID: " + loggedUser.id);
            console.log("Grupo seleccionado: " + grupo_seleccionado.getNombre);
            console.log("Miembros: " + grupo_seleccionado.getParticipantes);
            this.userManage();
          }
          else {
            console.log("Ya estás en este grupo");
            this.userManage();
          }
        }
      }
    );
  }

  /**
   * Método que permite gestionar los grupos
   */
  gestionarGrupos() {
    const coleccion_grupos = new GruposCollection();
    const prompt = inquirer.createPromptModule();
    // * ACLARACIÓN: Por defecto, consideramos que el dueño del grupo es el primer usuario que se encuentra en el grupo.
    // * De esta forma, si el propietario se va del grupo, el dueño del grupo será el siguiente usuario que se encuentre en el grupo.

    prompt([
      {
        type: "list",
        name: "opcion",
        message: "¿Qué desea hacer?",
        choices: ["Crear grupo", "Eliminar grupo", "Ver grupos", "Salir"]
      }]).then((respuesta) => {
        switch (respuesta.opcion) {
          case "Crear grupo":
            this.crearGrupo();
            break;
          case "Eliminar grupo":
            this.eliminarGrupo();
            break;
          case "Ver grupos":
            coleccion_grupos.getGrupos.forEach((grupo) => {
              console.log("Nombre del grupo: " + grupo.getNombre);
            });
            this.userManage();
            break;
          case "Salir":
            process.exit(0);
            break;
        }
      });
  }

  /**
   * Método que permite eliminar un grupo
   */
  eliminarGrupo () {
    const prompt = inquirer.createPromptModule();
    const coleccion_grupos = new GruposCollection();
    prompt([
      {
        type: "list",
        name: "opcion",
        message: "¿Qué grupo desea eliminar?",
        choices: coleccion_grupos.getGrupos.map((grupo) => {
          return {name: grupo.getNombre, value: grupo.getNombre};
        })
      }
    ]).then((respuesta) => {
      // comprobamos si el usuario es el propietario del grupo
      const grupo_seleccionado = coleccion_grupos.getGrupos.find((grupo) => {
        return grupo.getNombre === respuesta.opcion;
      }
      );
      if (typeof grupo_seleccionado === 'undefined') {
        console.log("No existe el grupo");
        this.userManage();
      }
      else {
        if (grupo_seleccionado.getParticipantes[0] === loggedUser.id) {
          coleccion_grupos.borrarElementoBD(grupo_seleccionado.getID);
          console.log("Grupo eliminado correctamente");
          this.userManage();
        }
        else {
          console.log("No es propietario del grupo, no puedo realizar esta acción");
          this.userManage();
        }
      }
    });
  
  }
  
  /**
   * Método que permite crear un grupo
   */
  crearGrupo() {
    const prompt = inquirer.createPromptModule();
    prompt([
      {
        type: 'input',
        name: 'nombre',
        message: 'Introduce el nombre del grupo',
      },
      {
        type: 'input',
        name: 'participantes',
        message: 'Introduce los participantes del grupo "id1,id2,...". NOTA: Recuerde poner su id primero para ser el admin del grupo',
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
        name: 'historico',
        message: 'Introduce el histórico de rutas del grupo: "id1,id2,..."',
      },
    ]).then((answers) => {
      const participantes: ID[] = answers.participantes.split(',');      
        
      const estadisticas_aux = [];
      const historico2 = answers.historico.split(',');
      estadisticas_aux.push(answers.estadisticas1.split(","));
      estadisticas_aux.push(answers.estadisticas2.split(","));
      estadisticas_aux.push(answers.estadisticas3.split(","));
      
      const est1: estadistica = {km: parseInt(estadisticas_aux[0][0]), desnivel: parseInt(estadisticas_aux[0][1])};
      const est2: estadistica = {km: parseInt(estadisticas_aux[1][0]), desnivel: parseInt(estadisticas_aux[1][1])};
      const est3: estadistica = {km: parseInt(estadisticas_aux[2][0]), desnivel: parseInt(estadisticas_aux[2][1])};

      const estadisticas: estadisticaEntrenamiento = {
        semana: est1,
        mes: est2,
        año: est3
      }

      // Comprobamos que el grupo no exista en la base de datos.
      const coleccion_grupos = new GruposCollection();
      const grupo = coleccion_grupos.getGrupos.find((grupo) => {
        return grupo.getNombre === answers.nombre;
      }
      );
      if (typeof grupo === 'undefined') {
        // crear el grupo
        const nuevo_grupo = new Grupo(answers.nombre, participantes, estadisticas, historico2);
        this.userManage();
      } else {
        console.log("El grupo ya existe");
        this.userManage();
      }
    });
  }

  /**
   * Método que permite gestionar el funcionamiento del programa 
   */
  funcionamientoSistema() {
    const prompt = inquirer.createPromptModule();
    prompt([
      {
        type: "list",
        name: "opcion",
        message: "¿Qué desea hacer?",
        choices: ["Gestionar rutas", "Gestionar usuarios", "Gestionar grupos", "Gestionar Retos", "Salir"]
      }]).then((respuesta) => {
        const mis_rutas = new rutaCollection();
        const mis_grupos = new GruposCollection();
        const mis_usuarios = new usuarioCollection();
        const mis_retos = new RetoCollection();
        switch(respuesta.opcion) {
          case "Gestionar rutas":
            prompt([
              {
                type: "list",
                name: "opcion",
                message: "¿Qué desea hacer?",
                choices: ["Ver información de las rutas", "Modificar Rutas","Salir"]
              }]).then((respuesta) => {
                switch(respuesta.opcion) {
                  case "Ver información de las rutas":
                    mis_rutas.infoRutas();
                    break;
                  case "Modificar Rutas":
                    mis_rutas.manageRutas();
                    break;
                  case "Salir":
                    process.exit(0);
                    break;
                }});
          break;

          case "Gestionar usuarios":
            prompt([
              {
                type: "list",
                name: "opcion",
                message: "¿Qué desea hacer?",
                choices: ["Ver información de los usuarios", "Modificar Usuarios","Salir"]
              }]).then((respuesta) => {
                switch(respuesta.opcion) {
                  case "Ver información de los usuarios":
                    mis_usuarios.infoUsuario();
                    break;
                  case "Modificar Usuarios":
                    mis_usuarios.manageUsuarios();
                    break;
                  case "Salir":
                    process.exit(0);
                    break;
                }});

          break;

          case "Gestionar grupos":
            prompt([
              {
                type: "list",
                name: "opcion",
                message: "¿Qué desea hacer?",
                choices: ["Ver información de los grupos", "Modificar Grupos","Salir"]
              }]).then((respuesta) => {
                switch(respuesta.opcion) {
                  case "Ver información de los grupos":
                    mis_grupos.infoGrupo();
                    break;
                  case "Modificar Grupos":
                    mis_grupos.manageGrupos();
                    break;
                  case "Salir":
                    process.exit(0);
                    break;
                }});

          break;

          case "Gestionar Retos":
            prompt([
              {
                type: "list",
                name: "opcion",
                message: "¿Qué desea hacer?",
                choices: ["Ver información de los retos", "Modificar Retos","Salir"]
              }]).then((respuesta) => {
                switch(respuesta.opcion) {
                  case "Ver información de los retos":
                    mis_retos.infoReto();
                    break;
                  case "Modificar Retos":
                    mis_retos.manageRetos();
                    break;
                  case "Salir":
                    process.exit(0);
                    break;
                }});
          break;
        }
      });
  }
}








// const mi_gestor = new gestor();
// mi_gestor.programaPrincipal();








//? BORRAR




const semana: estadistica = {
  km: 10,
  desnivel: 1000
}

const semana2: estadistica = {
  km: 20,
  desnivel: 200
}

const semana3: estadistica = {
  km: 30,
  desnivel: 300
}

const mes: estadistica = {
  km: 20,
  desnivel: 2000
}

const mes2: estadistica = {
  km: 30,
  desnivel: 3000
}

const mes3: estadistica = {
  km: 40,
  desnivel: 4000
}

const año: estadistica = {
  km: 30,
  desnivel: 3000
}

const año2: estadistica = {
  km: 40,
  desnivel: 4000
}

const año3: estadistica = {
  km: 50,
  desnivel: 5000
}

const estadisticas: estadisticaEntrenamiento = {
  semana: semana,
  mes: mes,
  año: año
}

const estadisticas2: estadisticaEntrenamiento = {
  semana: semana2,
  mes: mes2,
  año: año2
}

const estadisticas3: estadisticaEntrenamiento = {
  semana: semana3,
  mes: mes3,
  año: año3
}

const fecha1: fecha = {
  dia: 1,
  mes: 1,
  año: 2021
}

const fecha2: fecha = {
  dia: 2,
  mes: 2,
  año: 2021
}

const fecha3: fecha = {
  dia: 3,
  mes: 3,
  año: 2021
}

const fecha4: fecha = {
  dia: 4,
  mes: 4,
  año: 2021
}

const historic1: historicoRutas = {
  fecha: fecha1,
  id: 1
}

const historic2: historicoRutas = {
  fecha: fecha2,
  id: 2
}

const historic3: historicoRutas = {
  fecha: fecha3,
  id: 3
}

const historic4: historicoRutas = {
  fecha: fecha4,
  id: 1
}

const historic5: historicoRutas = {
  fecha: fecha1,
  id: 2
}

const historic6: historicoRutas = {
  fecha: fecha2,
  id: 3
}

const eje_x0:coordenadas = {
  letra : "X",
  coordenada : 10
}
const eje_y0: coordenadas = {
  letra : "Y",
  coordenada : 20
}
const eje_z0: coordenadas = {
  letra : "Z",
  coordenada : 30
}


const eje_x1:coordenadas = {
  letra : "X",
  coordenada : 40 
}
const eje_y1: coordenadas = {
  letra : "Y",
  coordenada : 50
}
const eje_z1: coordenadas = {
  letra : "Z",
  coordenada : 60
}


const eje_x2:coordenadas = {
  letra : "X",
  coordenada : 214
}
const eje_y2: coordenadas = {
  letra : "Y",
  coordenada : 70
}
const eje_z2: coordenadas = {
  letra : "Z",
  coordenada : 80
}

const eje_x3:coordenadas = {
  letra : "X",
  coordenada : 10
}
const eje_y3: coordenadas = {
  letra : "Y",
  coordenada : 20
}
const eje_z3: coordenadas = {
  letra : "Z",
  coordenada : 30
}


const eje_x4:coordenadas = {
  letra : "X",
  coordenada : 1010
}
const eje_y4: coordenadas = {
  letra : "Y",
  coordenada : 2020
}
const eje_z4: coordenadas = {
  letra : "Z",
  coordenada : 3030
}


const eje_x5:coordenadas = {
  letra : "X",
  coordenada : 1001
}
const eje_y5: coordenadas = {
  letra : "Y",
  coordenada : 2002
}
const eje_z5: coordenadas = {
  letra : "Z",
  coordenada : 3003
}

const eje_x6:coordenadas = {
  letra : "X",
  coordenada : 1010
}
const eje_y6: coordenadas = {
  letra : "Y",
  coordenada : 202
}
const eje_z6: coordenadas = {
  letra : "Z",
  coordenada : 303
}


const eje_x7:coordenadas = {
  letra : "X",
  coordenada : 1107
}
const eje_y7: coordenadas = {
  letra : "Y",
  coordenada : 90
}
const eje_z7: coordenadas = {
  letra : "Z",
  coordenada : 3034
}


const eje_x8:coordenadas = {
  letra : "X",
  coordenada : 10
}
const eje_y8: coordenadas = {
  letra : "Y",
  coordenada : 450
}
const eje_z8: coordenadas = {
  letra : "Z",
  coordenada : 150
}


const eje_x9:coordenadas = {
  letra : "X",
  coordenada : 7
}
const eje_y9: coordenadas = {
  letra : "Y",
  coordenada : 2013
}
const eje_z9: coordenadas = {
  letra : "Z",
  coordenada : 3043
}

const user0 = new Usuario("Pepe", "bicicleta", [1,2,3], [[1,2],[3,4]], estadisticas, [historic1,historic2,historic3], [1,3]);
const user1 = new Usuario("Lola", "correr", [2,3], [[0,2],[3,4],[5,6]], estadisticas2, [historic4,historic5,historic6], [3]);
const user2 = new Usuario("Juan", "correr", [1,3,4], [[0,1],[3,4],[5,6]], estadisticas3, [historic1,historic2,historic3], [1,3]);
const user3 = new Usuario("Maria", "bicicleta", [1,2,4], [[0,1],[2,4],[5,6]], estadisticas, [historic4,historic5,historic6], [1,2,3]);
const user4 = new Usuario("Josefa", "correr", [1,2,3], [[0,1]], estadisticas2, [historic1,historic2,historic3], [2,3]);
const user5 = new Usuario("Roberta", "correr", [1,2,3], [[0,1],[2,3],[4,6]], estadisticas3, [historic4,historic5,historic6], [1,3]);
const user6 = new Usuario("Juliana", "correr", [1,3], [[0,1],[2,3],[4,5]], estadisticas, [historic1,historic2,historic3], [1,2,3]);
const user7 = new Usuario("Dolores", "bicicleta", [1,2,3], [[0,1],[2,3],[4,5]], estadisticas2, [historic4,historic5,historic6], [4,5]);
const user8 = new Usuario("Ricardo", "correr", [2,3], [[0,1],[2,3],[4,5]], estadisticas3, [historic1,historic2,historic3], [1,2,4]);
const user9 = new Usuario("Rodrigo", "correr", [1,2,3], [[0,1],[2,3],[4,5]], estadisticas, [historic4,historic5,historic6], [3,4]);
const user10 = new Usuario("Antonio", "correr", [1,2,3], [[0,1],[2,3],[4,5]], estadisticas2, [historic1,historic2,historic3], [1,2,3,5]);
const user11 = new Usuario("Puchapa", "bicicleta", [1,2], [[0,1],[2,3],[4,5],[3,6]], estadisticas3, [historic4,historic5,historic6], [2,3,4,5]);
const user12 = new Usuario("Ignacio", "bicicleta", [1,4,3], [[0,1],[2,3],[4,5]], estadisticas, [historic1,historic2,historic3], [1,2]);
const user13 = new Usuario("Michael", "bicicleta", [1,3], [[0,1],[3,2],[4,5]], estadisticas2, [historic4,historic5,historic6], [3,4]);
const user14 = new Usuario("Josue", "bicicleta", [1,2,3], [[1,4],[4,5]], estadisticas3, [historic1,historic2,historic3], [4]);
const user15 = new Usuario("Silvia", "correr", [1,2,3], [[0,1],[2,3],[4,5]], estadisticas, [historic4,historic5,historic6], [2,4]);
const user16 = new Usuario("Alba", "bicicleta", [2,3], [[0,1],[3,6],[4,5]], estadisticas2, [historic1,historic2,historic3], [1,2,5]);
const user17 = new Usuario("Julián", "correr", [1,2,5], [[0,1],[2,3],[4,5]], estadisticas3, [historic4,historic5,historic6], [4,5]);
const user18 = new Usuario("Antonio", "bicicleta", [1,2,3], [[0,6],[2,3],[4,5]], estadisticas, [historic1,historic2,historic3], [2,3]);
const user19 = new Usuario("Mario", "correr", [1,2,3], [[0,1],[2,3],[2,5]], estadisticas2, [historic4,historic5,historic6], [1,2,3,4,5]);

const reto0 = new Reto('Reto de Invierno', [1,2,3,4,5], "correr", [1,3,4,6,7,9,11,13,17,20]);
const reto1 = new Reto('Reto de Verano', [1,2,3,4,5], "bicicleta", [4,5,7,9,11,12,13,16,17,19,20]);
const reto2 = new Reto('Reto de Otoño', [1,2,3,4,5], "correr", [1,2,3,4,5,6,7,10,11,12,14,19]);
const reto3 = new Reto('Reto de Primavera', [1,2,3,4,5], "bicicleta", [8,9,10,12,14,15,16,18,20]);
const reto4 = new Reto('Reto de Año Nuevo', [1,2,3,4,5], "correr", [8,11,12,17,18,20]);

const ruta0 = new Ruta('San Vicente', [eje_x0, eje_y0, eje_z0], [eje_x1, eje_y1, eje_z1], 10127, 456, [1,2,3], "correr", 9);
const ruta1 = new Ruta('Plaza el charco', [eje_x2, eje_y2, eje_z2], [eje_x3, eje_y3, eje_z3], 2050, 250, [2,3,4], "bicicleta", 8);
const ruta2 = new Ruta('Adventour', [eje_x4, eje_y4, eje_z4], [eje_x5, eje_y5, eje_z5], 30021, 2034, [6,7,8], "correr", 8);
const ruta3 = new Ruta('Hop-On Hop-off', [eje_x6, eje_y6, eje_z6], [eje_x7, eje_y7, eje_z7], 4020, 150, [9,10,11], "bicicleta", 4);
const ruta4 = new Ruta('Mind the Gap', [eje_x8, eje_y8, eje_z8], [eje_x9, eje_y9, eje_z9], 5300, 200, [12,13,14], "correr", 6);
const ruta5 = new Ruta('City Sightseeing', [eje_x0, eje_y0, eje_z0], [eje_x9, eje_y9, eje_z9], 6150, 2300, [15,16,17], "bicicleta", 7);
const ruta6 = new Ruta('La ruta real', [eje_x2, eje_y2, eje_z2], [eje_x7, eje_y7, eje_z7], 1220, 1700, [18,19], "correr", 5);
const ruta7 = new Ruta('Keep Calm and travel On', [eje_x4, eje_y4, eje_z4], [eje_x1, eje_y1, eje_z1], 31020, 450, [1,2,3], "bicicleta", 1);
const ruta8 = new Ruta('Wander Rush', [eje_x6, eje_y6, eje_z6], [eje_x3, eje_y3, eje_z3], 1040, 2970, [5,6,7], "correr", 9);
const ruta9 = new Ruta('My BigFat City Tour', [eje_x8, eje_y8, eje_z8], [eje_x5, eje_y5, eje_z5], 10970, 130, [8,7,6], "bicicleta", 10);

const grupo0 = new Grupo('Pachanga', [1,2,3,6,9,10], estadisticas, [historic1,historic2]);
const grupo1 = new Grupo('Sandia', [7,10,12,14,13,15,17,19,20], estadisticas2, [historic3,historic4]);
const grupo2 = new Grupo('Remolacha', [1,2,3,15,19,20,6,8,10], estadisticas3, [historic5,historic6]);
const grupo3 = new Grupo('Kinder Bueno', [4,5,6,7,8,10], estadisticas, [historic1,historic2]);
const grupo4 = new Grupo('Judias Verdes', [2,3,10,13,17,20], estadisticas2, [historic3,historic4]);
const grupo5 = new Grupo('Napolitana de chocolate', [1,2,3,4,5,6,7,8,9,10,12,14,16,18], estadisticas3, [historic5,historic6]);