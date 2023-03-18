import { ID,estadisticaEntrenamiento, historicoRutas } from "./types";
import { Usuario } from "./usuario";
/**
 * @class Grupo
 * @description Clase que representa un grupo de usuarios
 */
export class Grupo {
  private static id_global_: ID;
  private id_: ID;
  private nombre_: string;
  private participantes_: ID[];
  private estadisticasEntrenamiento_: estadisticaEntrenamiento;
  private ranking_: Usuario[];
  private rutas_favoritas_ : ID[]; //? EXPLICAR EN EL INFORME QUE HEMOS DECIDIDO HACER UN ARRAY DE RUTAS PARA REALIZARLO DE LA MISMA MANERA QUE LA CLASE USUARIO
  private historicoRutas_: historicoRutas[];
  
  constructor(nombre: string, participantes: ID[]) {
    this.nombre_ = nombre;
    this.participantes_ = participantes;
    this.rutas_favoritas_ = [];
    this.historicoRutas_ = [];
    this.ranking_ = [];
    this.id_ = Grupo.comprobarEstatica();
  }

  /**
   * Método que genera un id único para el grupo
   * @returns -- id del grupo
   */
  public static comprobarEstatica(): ID{
    // en este método comprobamos si el id_global está inicializado
    // si no está inicializado, lo inicializamos a 0
    // si está inicializado, devolvemos el valor de id_global
    if (Grupo.id_global_ == undefined) {
        Grupo.id_global_ = {
        id: 0
      }
    }
    Grupo.id_global_.id += 1; 
    const identificador: ID = {
      id: Grupo.id_global_.id
    }
    return identificador;
  }

  //* GETTER Y SETTER

  /**
   * Método que devuelve el id del grupo
   * @returns -- id del grupo
   */
  get getID(): ID {
    return this.id_;
  }

  /**
   * Método que devuelve el nombre del grupo
   * @returns -- nombre del grupo
   */
  get getNombre(): string {
    return this.nombre_;
  }

  /**
   * Método que devuelve los participantes del grupo
   * @returns -- participantes del grupo
   */
  get getParticipantes(): ID[] {
    return this.participantes_;
  }

  /**
   * Método que devuelve las estadisticas de entrenamiento del grupo
   * @returns -- estadisticas de entrenamiento del grupo
   */
  get getEstadisticasEntrenamiento(): estadisticaEntrenamiento {
    return this.estadisticasEntrenamiento_;
  }

  /**
   * Método que devuelve las rutas favoritas del grupo
   * @returns -- rutas favoritas del grupo
   */
  get getRutasFavoritas(): ID[] {
    return this.rutas_favoritas_;
  }

  /**
   * Método que devuelve el historico de rutas del grupo
   * @returns -- historico de rutas del grupo
   */
  get getHistoricoRutas(): historicoRutas[] {
    return this.historicoRutas_;
  }

  /**
   * Método que modifica el nombre del grupo
   * @param nombre -- nuevo nombre del grupo
   */
  set setNombre(nombre: string) {
    this.nombre_ = nombre;
  }

  /**
   * Método que añade un participante al grupo
   * @param participante -- participante que se añade al grupo
   */
  set setParticipantes(participantes: ID[]) {
    this.participantes_ = participantes;
  }

  /**
   * Método que añade un participante al grupo
   * @param participante -- participante que se añade al grupo
   */
  set setEstadisticasEntrenamiento(estadisticasEntrenamiento: estadisticaEntrenamiento) {
    this.estadisticasEntrenamiento_ = estadisticasEntrenamiento;
  }

  /**
   * Método que añade una ruta a las rutas favoritas del grupo
   * @param ruta -- ruta que se añade a las rutas favoritas
   */
  set setRutasFavoritas(rutasFavoritas: ID[]) {
    this.rutas_favoritas_ = rutasFavoritas;
  }

  /**
   * Método que añade una ruta al historico de rutas del grupo
   * @param ruta -- ruta que se añade al historico
   */
  set setHistoricoRutas(historicoRutas: historicoRutas[]) {
    this.historicoRutas_ = historicoRutas;
  }
}