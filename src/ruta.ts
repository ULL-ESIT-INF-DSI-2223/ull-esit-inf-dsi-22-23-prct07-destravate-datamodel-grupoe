import { coordenadas, actividad, ID } from "./types";

import { database } from "./bd";

/**
 * @class Ruta
 * @description Clase que representa una ruta
 */
export class Ruta {
  private id_: ID;
  private nombre_: string;
  private geolocalizacion_inicio_: coordenadas[];
  private geolocalizacion_fin_: coordenadas[];
  private longitud_: number;
  private desnivel_: number;
  private usuarios_: ID[];
  private tipo_actividad_: actividad;
  private calificacion_: number;

  /** 
   * @constructor
   * @param nombre Nombre de la ruta
   * @param geolocalizacion_inicio Geolocalización de inicio de la ruta
   * @param geolocalizacion_fin Geolocalización de fin de la ruta
   * @param longitud Longitud de la ruta
   * @param desnivel Desnivel de la ruta
   * @param usuarios Usuarios que han realizado la ruta
   * @param tipo_actividad Tipo de actividad de la ruta
   * @param calificacion Calificacion de la ruta
   * @param id ID de la ruta (Parámetro opcional)
   * @description Constructor de la clase Ruta
  */
  constructor(nombre: string, geolocalizacion_inicio: coordenadas[], geolocalizacion_fin: coordenadas[], longitud: number, desnivel: number, usuario: ID[], tipo_actividad: actividad, calificacion: number, id?: ID) {
    this.nombre_ = nombre;
    this.geolocalizacion_inicio_ = geolocalizacion_inicio;
    this.geolocalizacion_fin_ = geolocalizacion_fin;
    this.longitud_ = longitud;
    this.desnivel_ = desnivel;
    this.usuarios_ = usuario;
    this.tipo_actividad_ = tipo_actividad;
    this.calificacion_ = calificacion;
    
    const id_global = database.get("rutas").map("nombre").value();
    if (id_global.includes(this.nombre_)) {
      this.id_ = database.get("rutas").find({ nombre: this.nombre_ }).value().id;

    } else {
      if (id !== undefined) {
        this.id_ = id;
      }
      else {
        /**
         * Buscar el id más alto y sumarle 1
         */
        const id_global = database.get("rutas").map("id").value();
        id_global.sort((a, b) => a - b);
        if (id_global.length === 0) {
          this.id_ = 1;
        }
        else {
          this.id_ = id_global[id_global.length - 1] + 1;
        }
      }
      database.get("rutas").push({
        id: this.id_,
        nombre: this.nombre_,
        geolocalizacion_inicio: this.geolocalizacion_inicio_,
        geolocalizacion_fin: this.geolocalizacion_fin_,
        longitud: this.longitud_,
        desnivel: this.desnivel_,
        usuarios: this.usuarios_,
        tipo_actividad: this.tipo_actividad_,
        calificacion: this.calificacion_
      }).write();
    }
  } 

  // Getters

  /**
   * Método que devuelve el id de la ruta
   * @returns Id de la ruta
   */
  get getId(): ID {
    return this.id_;
  }

  /**
   * Método que devuelve el nombre de la ruta
   * @returns Nombre de la ruta
   */
  get getNombre(): string {
    return this.nombre_;
  }

  /**
   * Método que devuelve la geolocalización de inicio de la ruta
   * @returns Geolocalización de inicio de la ruta
   */
  get getGeolocalizacionInicio(): coordenadas[] {
    return this.geolocalizacion_inicio_;
  }

  /**
   * Método que devuelve la geolocalización de fin de la ruta
   * @returns Geolocalización de fin de la ruta
   */
  get getGeolocalizacionFin(): coordenadas[] {
    return this.geolocalizacion_fin_;
  }
  
  /**
   * Método que devuelve la longitud de la ruta
   * @returns Longitud de la ruta
   */
  get getLongitud(): number {
    return this.longitud_;
  }

  /**
   * Método que devuelve el desnivel de la ruta
   * @returns Desnivel de la ruta
   */
  get getDesnivel(): number {
    return this.desnivel_;
  }

  /**
   * Método que devuelve los usuarios de la ruta
   * @returns Usuarios de la ruta
   */
  get getUsuarios(): ID[] {
    return this.usuarios_;
  }

  /**
   * Método que devuelve el tipo de actividad de la ruta
   * @returns Actividad de la ruta
   */
  get getTipoActividad(): actividad {
    return this.tipo_actividad_;
  }

  /**
   * Método que devuelve la calificación de la ruta
   * @returns Calificación de la ruta
   */
  get getCalificacion(): number {
    return this.calificacion_;
  }

  // Setters

  /**
   * Método que asigna el id de la ruta
   * @param id Id de la ruta
   */
  set setId(id: ID) {
    this.id_ = id;
  }

  /**
   * Método que asigna el nombre de la ruta
   * @param nombre Nombre de la ruta
   */
  set setNombre(nombre: string) {
    this.nombre_ = nombre;
  }

  /**
   * Método que asigna la geolocalización de inicio de la ruta
   * @param geolocalizacion_inicio Geolocalización de inicio de la ruta
   */
  set setGeolocalizacionInicio(geolocalizacion_inicio: coordenadas[]) {
    this.geolocalizacion_inicio_ = geolocalizacion_inicio;
  }

  /**
   * Méotodo que asigna la geolocalización de fin de la ruta
   * @param geolocalizacion_fin geolocalización de fin de la ruta
   */
  set setGeolocalizacionFin(geolocalizacion_fin: coordenadas[]) {
    this.geolocalizacion_fin_ = geolocalizacion_fin;
  }

  /**
   * Método que asigna la longitud de la ruta
   * @param longitud Longitud de la ruta
   */
  set setLongitud(longitud: number) {
    this.longitud_ = longitud;
  }

  /**
   * Método que asigna el desnivel de la ruta
   * @param desnivel Desnivel de la ruta
   */
  set setDesnivel(desnivel: number) {
    this.desnivel_ = desnivel;
  }

  /**
   * Método que asigna los usuarios de la ruta
   * @param usuarios Usuarios de la ruta
   */
  set setUsuarios(usuarios: ID[]) {
    this.usuarios_ = usuarios;
  }

  /**
   * Método que asigna el tipo de actividad de la ruta
   * @param tipo_actividad Tipo de actividad de la ruta
   */
  set setTipoActividad(tipo_actividad: actividad) {
    this.tipo_actividad_ = tipo_actividad;
  }

  /**
   * Método que asigna la calificación de la ruta
   * @param calificacion Calificación de la ruta
   */
  set setCalificacion(calificacion: number) {
    this.calificacion_ = calificacion;
  }
}