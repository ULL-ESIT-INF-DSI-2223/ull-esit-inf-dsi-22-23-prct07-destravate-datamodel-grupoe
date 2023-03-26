import { actividad, ID, estadisticaEntrenamiento, historicoRutas } from "./types";

import { database } from "./bd";

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
   * @constructor
   * @param nombre Nombre del usuario 
   * @param actividad Actividad del usuario
   * @param amigos Amigos del usuario
   * @param grupo_amigos Grupo de amigos del usuario
   * @param estadisticas Estadisticas del usuario
   * @param historico_rutas Histórico de rutas del usuario
   * @param retos Retos del usuario
   * @param id Id del usuario
   * @description Constructor de la clase Usuario
   */
  constructor(nombre: string, actividad: actividad, amigos: ID[], grupo_amigos: ID[][], estadisticas: estadisticaEntrenamiento ,historico_rutas: historicoRutas[], retos: ID[], id?: ID) {
    this.nombre_ = nombre;
    this.actividad_ = actividad;
    this.amigos_ = amigos;
    this.grupo_de_amigos_ = grupo_amigos;
    this.retos_ = retos;
    this.historicoRutas_ = historico_rutas;
    this.obtenerRutasFavoritas();
    this.estadisticas_ = estadisticas;

    const id_global = database.get("usuarios").map("nombre").value();
    if (id_global.includes(this.nombre_)) {
      this.id_ = database.get("usuarios").find({ nombre: this.nombre_ }).value().id;
    }
    else {
      if (id !== undefined) {
        this.id_ = id;
      }
      else {
        const id_global = database.get("usuarios").map("id").value();
        id_global.sort((a, b) => a - b);
        if (id_global.length === 0) {
          this.id_ = 1;
        }
        else {
          this.id_ = id_global[id_global.length - 1] + 1;
        }
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

  // Getters

  /**
   * Método que devuelve el id del usuario
   * @returns Id del usuario
   */
  get getID(): ID {
    return this.id_;
  }

  /**
   * Método que devuelve el nombre del usuario
   * @returns Nombre del usuario
   */
  get getNombre(): string {
    return this.nombre_;
  }

  /**
   * Método que devuelve la actividad del usuario
   * @returns Actividad del usuario
   */
  get getActividad(): actividad {
    return this.actividad_;
  }

  /**
   * Método que devuelve los amigos del usuario
   * @returns Amigos del usuario
   */
  get getAmigos(): ID[] {
    return this.amigos_;
  }

  /**
   * Método que devuelve el grupo de amigos del usuario
   * @returns Grupo de amigos del usuario
   */
  get getGrupoAmigos(): ID[][] {
    return this.grupo_de_amigos_;
  }

  /**
   * Método que devuelve las estadísticas del usuario
   * @returns Estadísticas del usuario
   */
  get getEstadisticas(): estadisticaEntrenamiento {
    return this.estadisticas_;
  }

  /**
   * Método que devuelve las rutas favoritas del usuario
   * @returns Rutas favoritas del usuario
   */
  get getRutasFavoritas(): ID[] {
    return this.rutasFavoritas_;
  }

  /**
   * Método que devuelve los retos del usuario
   * @returns Retos del usuario
   */
  get getRetos(): ID[] {
    return this.retos_;
  }

  /**
   * Método que devuelve el historico de rutas del usuario
   * @returns -- historico de rutas del usuario
   */
  get getHistoricoRutas(): historicoRutas[] {
    return this.historicoRutas_;
  }

  // Setters

  /**
   * Método que modifica el id del usuario
   * @param id -- nuevo id del usuario
   */
    set setID(id: ID) {
      this.id_ = id;
    }

  /**
   * Método que modifica el nombre del usuario
   * @param nombre -- nuevo nombre del usuario
   */
  set setNombre(nombre: string) {
    this.nombre_ = nombre;
  }

  /**
   * Método que modifica la actividad del usuario
   * @param actividad -- nueva actividad del usuario
   */
  set setActividad(actividad: actividad) {
    this.actividad_ = actividad;
  }

  /**
   * Método que modifica los amigos del usuario
   * @param amigos -- nuevos amigos del usuario
   */
  set setAmigos(amigos: ID[]) {
    this.amigos_ = amigos;
  }

  /**
   * Método que modifica el grupo de amigos del usuario
   * @param grupo -- nuevo grupo de amigos del usuario
   */
  set setGrupoAmigos(grupo: ID[][]) {
    this.grupo_de_amigos_ = grupo;
  }

  /**
   * Método que modifica las estadísticas del usuario
   * @param estadisticas -- nuevas estadísticas del usuario
   */
  set setEstadisticas(estadisticas: estadisticaEntrenamiento) {
    this.estadisticas_ = estadisticas;
  }

  /**
   * Método que modifica las rutas favoritas del usuario
   * @param rutasFavoritas -- nuevas rutas favoritas del usuario
   */
  set setRutasFavoritas(rutasFavoritas: ID[]) {
    this.rutasFavoritas_ = rutasFavoritas;
  }

  /**
   * Método que modifica los retos del usuario
   * @param retos -- nuevos retos del usuario
   */
  set setRetos(retos: ID[]) {
    this.retos_ = retos;
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
    const historico = this.historicoRutas_;
    const rutasFav = [];
    const rutas = [];
    for (let i = 0; i < historico.length; i++) {
      rutas.push(historico[i].id);
    } 
    rutas.sort((a, b) => a - b);
    let cont = 1;
    for (let i = 0; i < rutas.length; i++) {
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
    this.setRutasFavoritas = rutasFav;
  }

  /**
   * Método que devuelve el número de km totales recorridos por el usuario
   * @returns número de km totales recorridos por el usuario
   */
  getKMTotales(): number {
    const historico = this.historicoRutas_;
    let kmTotales = 0;
    for (let i = 0; i < historico.length; i++) {
      const ruta = database.get('rutas').find({ id: historico[i].id }).value();
      kmTotales += ruta.longitud;
    }
    return kmTotales;
  }
}