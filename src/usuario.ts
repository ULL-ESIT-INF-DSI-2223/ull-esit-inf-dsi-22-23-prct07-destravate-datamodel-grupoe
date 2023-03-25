import { actividad,ID,estadisticaEntrenamiento, historicoRutas } from "./types";
import { database } from "./bd";
// import { Ruta } from "./ruta";

/**
 * @class Usuario
 * @description Clase que representa un usuario
 */
export class Usuario {
  private id_: ID;
  private nombre_: string;
  private actividad_: actividad;
  private amigos_: ID[];
  private grupo_de_amigos_: ID[][];
  private estadisticas_: estadisticaEntrenamiento;
  private rutasFavoritas_: ID[];
  private retos_: ID[];
  private historicoRutas_: historicoRutas[];

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
  constructor(nombre: string, actividad: actividad, amigos: ID[], grupo_amigos: ID[][], estadisticas: estadisticaEntrenamiento ,historico_rutas: historicoRutas[], retos: ID[], id?: ID) {
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

    const id_global = database.get("usuarios").map("nombre").value();
    if (id_global.includes(this.nombre_)) {
      this.id_ = database.get("usuarios").find({ nombre: this.nombre_ }).value().id;
    }
    else {
      if (id !== undefined) {
        this.id_ = id;
      }
      else {
        // buscar el id más alto y sumarle 1
        const id_global = database.get("usuarios").map("id").value();
        id_global.sort((a, b) => a - b);
        if (id_global.length === 0) {
          this.id_ = 1;
        }
        else {
          this.id_ = id_global[id_global.length - 1] + 1;
        }
        // escribir en la base de datos
      }
      database.get("usuarios").push(
        {
          id: this.id_,
          nombre: this.nombre_,
          actividad: this.actividad_,
          amigos: this.amigos_,
          grupo_de_amigos: this.grupo_de_amigos_,
          estadisticas: this.estadisticas_,
          rutasFavoritas: this.rutasFavoritas_,
          retos: this.retos_,
          historicoRutas: this.historicoRutas_
        }
      ).write();
    }
  }

  //* GETTER Y SETTER 
  /**
   * Método que devuelve el id del usuario
   * @returns -- id del usuario
   */
  get getID(): ID {
    return this.id_;
  }
  
  /**
   * Método que modifica el id del usuario
   * @param id -- nuevo id del usuario
   */
  set setID(id: ID) {
    this.id_ = id;
  }

  /**
   * Método que devuelve el nombre del usuario
   * @returns -- nombre del usuario
   */
  get getNombre(): string {
    return this.nombre_;
  }
  
  /**
   * Método que modifica el nombre del usuario
   * @param nombre -- nuevo nombre del usuario
   */
  set setNombre(nombre: string) {
    this.nombre_ = nombre;
  }

  /**
   * Método que devuelve la actividad del usuario
   * @returns -- actividad del usuario
   */
  get getActividad(): actividad {
    return this.actividad_;
  }

  /**
   * Método que modifica la actividad del usuario
   * @param actividad -- nueva actividad del usuario
   */
  set setActividad(actividad: actividad) {
    this.actividad_ = actividad;
  }

  /**
   * Método que devuelve los amigos del usuario
   * @returns -- amigos del usuario
   */
  get getAmigos(): ID[] {
    return this.amigos_;
  }

  /**
   * Método que modifica los amigos del usuario
   * @param amigos -- nuevos amigos del usuario
   */
  set setAmigos(amigos: ID[]) {
    this.amigos_ = amigos;
  }

  /**
   * Método que devuelve el grupo de amigos del usuario
   * @returns -- grupo de amigos del usuario
   */
  get getGrupoAmigos(): ID[][] {
    return this.grupo_de_amigos_;
  }

  /**
   * Método que modifica el grupo de amigos del usuario
   * @param grupo -- nuevo grupo de amigos del usuario
   */
  set setGrupoAmigos(grupo: ID[][]) {
    this.grupo_de_amigos_ = grupo;
  }

  /**
   * Método que devuelve las estadísticas del usuario
   * @returns -- estadísticas del usuario
   */
  get getEstadisticas(): estadisticaEntrenamiento {
    return this.estadisticas_;
  }

  /**
   * Método que modifica las estadísticas del usuario
   * @param estadisticas -- nuevas estadísticas del usuario
   */
  set setEstadisticas(estadisticas: estadisticaEntrenamiento) {
    this.estadisticas_ = estadisticas;
  }

  /**
   * Método que devuelve las rutas favoritas del usuario
   * @|returns -- rutas favoritas del usuario
   */
  get getRutasFavoritas(): ID[] {
    return this.rutasFavoritas_;
  }

  /**
   * Método que modifica las rutas favoritas del usuario
   * @param rutasFavoritas -- nuevas rutas favoritas del usuario
   */
  set setRutasFavoritas(rutasFavoritas: ID[]) {
    this.rutasFavoritas_ = rutasFavoritas;
  }

  /**
   * Método que devuelve los retos del usuario
   * @returns -- retos del usuario
   */
  get getRetos(): ID[] {
    return this.retos_;
  }

  /**
   * Método que modifica los retos del usuario
   * @param retos -- nuevos retos del usuario
   */
  set setRetos(retos: ID[]) {
    this.retos_ = retos;
  }

  /**
   * Método que devuelve el historico de rutas del usuario
   * @returns -- historico de rutas del usuario
   */
  get getHistoricoRutas(): historicoRutas[] {
    return this.historicoRutas_;
  }

  /**
   * Método que modifica el historico de rutas del usuario
   * @param historicoRutas -- nuevo historico de rutas del usuario
   */
  set setHistoricoRutas(historicoRutas: historicoRutas[]) {
    this.historicoRutas_ = historicoRutas;
  }

  /**
   * Método que calcula las rutas favoritas del usuario
   */
  obtenerRutasFavoritas(): void {
    // recorrer histórico, contar el número de veces que se repite cada id de ruta y si se repite mas de 2 veces lo metemos en rutas fav
    const historico = this.historicoRutas_;
    const rutasFav = [];
    const rutas = [];
    for (let i = 0; i < historico.length; i++) {
      rutas.push(historico[i].id);
    }
    // ordenamos por id    
    rutas.sort((a, b) => a - b);
    // recorremos el array de rutas y contamos cuantas veces se repite cada id
    let cont = 1;
    for (let i = 0; i < rutas.length; i++) {
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
  }

  /**
   * Método que devuelve el número de km totales recorridos por el usuario
   * @returns número de km totales recorridos por el usuario
   */
  getKMTotales(): number {
    // para cada ruta del histórico, sacar id y buscar esa ruta, obtener los km y sumarlos
    const historico = this.historicoRutas_;
    let kmTotales = 0;
    for (let i = 0; i < historico.length; i++) {
      const ruta = database.get('rutas').find({ id: historico[i].id }).value();
      kmTotales += ruta.longitud;
    }
    return kmTotales;
  }
}