import { Usuario } from "./usuario";
import * as inquirer from "inquirer";
// base de datos
import { database } from "./bd";
import { fecha, historicoRutas, estadisticaEntrenamiento, estadistica}  from './types';



/**
 * @class usuarioCollection
 * @description Clase que representa una colección de usuarios
 */
export class usuarioCollection {
  private usuarios: Usuario[] = [];
  constructor(usuario_array: Usuario[] ) {
    // this.leerBD();
    // this.usuarios = usuario_array;
    // usuario_array.forEach((usuario1) => {
    //   const user_aux = new Usuario(usuario1.getNombre, usuario1.getActividad, usuario1.getAmigos, usuario1.getGrupoAmigos, usuario1.getEstadisticas, usuario1.getHistoricoRutas, usuario1.getRetos, usuario1.getID);
    //   this.usuarios.push(user_aux);
    // });
    this.usuarios = usuario_array;
  }

  leerBD() {
    const rutas = database.get("usuarios").value();
    const array_aux: Usuario[] = [];
    rutas.forEach((ruta) => {
      const ruta_aux: Usuario = new Usuario(ruta.nombre, ruta.actividad, ruta.amigos, ruta.grupo_de_amigos, ruta.estadisticas, ruta.historicoRutas, ruta.retos, ruta.id);
      array_aux.push(ruta_aux);
    });
    this.setUsuarios = array_aux;  
  }
  

  manageUsuarios() {
    console.log("sin hacer");
  }


  infoUsuario() {
    console.log("sin hacer");
  }


  //* GETTER Y SETTER

  /**
   * Método que devuelve el array de usuarios
   * @returns {Usuario[]} Array de usuarios
   */
  get getUsuarios() {
    return this.usuarios;
  }

  /**
   * Método que modifica el array de usuarios
   * @param usuarios -- nuevo array de usuarios
   */
  set setUsuarios(usuarios: Usuario[]) {
    this.usuarios = usuarios;
  }
}



// ? PRUEBAS

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


// (nombre: string, actividad: actividad, amigos: ID[], grupo_amigos: ID[][], estadisticas: estadisticaEntrenamiento ,historico_rutas: historicoRutas[], retos: ID[], id?: ID)
const user0 = new Usuario("user0", "correr", [1,2,3], [[1,2],[3,4],[5,6]], estadisticas, [historic1,historic2,historic3], [1,2,3]);
const user1 = new Usuario("user1", "correr", [2,3], [[0,2],[3,4],[5,6]], estadisticas2, [historic4,historic5,historic6], [1,2,3]);
const user2 = new Usuario("user2", "correr", [1,3,4], [[0,1],[3,4],[5,6]], estadisticas3, [historic1,historic2,historic3], [1,3]);
const user3 = new Usuario("user3", "correr", [1,2,4], [[0,1],[2,4],[5,6]], estadisticas, [historic4,historic5,historic6], [1,2,3]);
const user4 = new Usuario("user4", "correr", [1,2,3], [[0,1],[2,3],[5,6]], estadisticas2, [historic1,historic2,historic3], [1,2,3]);
const user5 = new Usuario("user5", "correr", [1,2,3], [[0,1],[2,3],[4,6]], estadisticas3, [historic4,historic5,historic6], [1,2,3]);
const user6 = new Usuario("user6", "correr", [1,2,3], [[0,1],[2,3],[4,5]], estadisticas, [historic1,historic2,historic3], [1,2,3]);

const coleccion_usuarios = new usuarioCollection([user0,user1,user2,user3,user4,user5,user6]);

