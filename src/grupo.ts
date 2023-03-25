import { ID,estadisticaEntrenamiento, historicoRutas } from "./types";
import { Usuario } from "./usuario";

import { database } from "./bd";


/**
 * @class Grupo
 * @description Clase que representa un grupo de usuarios
 */
export class Grupo {
  private id_: ID;
  private nombre_: string;
  private participantes_: ID[];
  private estadisticasEntrenamiento_: estadisticaEntrenamiento;
  private ranking_: ID[];
  private rutas_favoritas_ : ID[]; //? EXPLICAR EN EL INFORME QUE HEMOS DECIDIDO HACER UN ARRAY DE RUTAS PARA REALIZARLO DE LA MISMA MANERA QUE LA CLASE USUARIO
  private historicoRutas_: historicoRutas[];
  
  /**
   * Constructor de la clase Grupo.
   * @param nombre 
   * @param participantes 
   * @param estadisticaEntrenamiento 
   * @param historicoRutas 
   * @param id 
   */
  constructor(nombre: string, participantes: ID[], estadisticaEntrenamiento: estadisticaEntrenamiento, historicoRutas: historicoRutas[],id?: ID) {
    this.nombre_ = nombre;
    this.participantes_ = participantes;
    this.estadisticasEntrenamiento_ = estadisticaEntrenamiento;
    this.rutas_favoritas_ = [];
    this.historicoRutas_ = historicoRutas;
    
    // this.ranking_ = this.calcularRanking();
    this.ranking_ = [];
    
    //* escribir en lowdb la ruta creada
    const id_global = database.get("grupos").map("nombre").value();
    if (id_global.includes(this.nombre_)) {
      this.id_ = database.get("grupos").find({ nombre: this.nombre_ }).value().id;
    } else {
      if (id !== undefined) {
        this.id_ = id;
      }
      else {
        // buscar el id más alto y sumarle 1
        const id_global = database.get("grupos").map("id").value();
        id_global.sort((a, b) => a - b);
        if (id_global.length === 0) {
          this.id_ = 1;
        }
        else {
          this.id_ = id_global[id_global.length - 1] + 1;
        }
      }
      
      database.get("grupos").push({
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