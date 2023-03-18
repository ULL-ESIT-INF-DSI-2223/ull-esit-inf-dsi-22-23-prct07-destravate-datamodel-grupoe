import { actividad,ID,estadisticaEntrenamiento, historicoRutas } from "./types";
/**
 * @class Usuario
 * @description Clase que representa un usuario
 */
export class Usuario {
  private static id_global_: ID;
  private id_: ID;
  private nombre_: string;
  private actividad_: actividad;
  private amigos_: ID[];
  private grupo_de_amigos_: ID[][]; //? REVISAR ESTO, ESTÁ RARO EN EL GUIÓN.
  private estadisticas_: estadisticaEntrenamiento;
  private rutasFavoritas_: ID[]; //TODO tenemos que hacer un metodo que recorra el historico de rutas cuente las rutas que mas veces se han hecho y las almacene
  private retos: ID[];
  private historicoRutas_: historicoRutas[];

  constructor(nombre: string, actividad: actividad, amigos: ID[]) {
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
  public static comprobarEstatica(): ID{
    // en este método comprobamos si el id_global_ está inicializado
    // si no está inicializado, lo inicializamos a 0
    // si está inicializado, devolvemos el valor de id_global_
    if (Usuario.id_global_ == undefined) {
      Usuario.id_global_ = {
        id: 0
      }
    }
    Usuario.id_global_.id += 1; 
    const identificador: ID = {
      id: Usuario.id_global_.id
    }
    return identificador;
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
    return this.retos;
  }

  /**
   * Método que modifica los retos del usuario
   * @param retos -- nuevos retos del usuario
   */
  set setRetos(retos: ID[]) {
    this.retos = retos;
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
}
