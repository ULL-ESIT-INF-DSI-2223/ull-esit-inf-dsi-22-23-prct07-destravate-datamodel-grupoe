import { coordenadas, actividad, ID, schemaType } from "./types";

// lowdb
import * as lowdb from "lowdb";
import * as FileSync from "lowdb/adapters/FileSync";

export let database: lowdb.LowdbSync<schemaType>;
// eslint-disable-next-line prefer-const
database = lowdb(new FileSync("database.json"));
database.defaults({ rutas: [] }).write();

/**
 * @class Ruta
 * @description Clase que representa una ruta
 */
export class Ruta {
  // private static id_global_: ID;
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
   * @param geolocalizacion_inicio Geolocalizacion de inicio de la ruta
   * @param geolocalizacion_fin Geolocalizacion de fin de la ruta
   * @param longitud Longitud de la ruta
   * @param desnivel Desnivel de la ruta
   * @param usuario Usuario que crea la ruta
   * @param tipo_actividad Tipo de actividad de la ruta
   * @param calificacion Calificacion de la ruta
   * @param id ID de la ruta (Parámetro opcional).
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
    
    //* escribir en lowdb la ruta creada
    const id_global = database.get("rutas").map("nombre").value();
    if (id_global.includes(this.nombre_)) {
      this.id_ = database.get("rutas").find({ nombre: this.nombre_ }).value().id;

    } else {
      if (id !== undefined) {
        this.id_ = id;
      }
      else {
        // buscar el id más alto y sumarle 1
        const id_global = database.get("rutas").map("id").value();
        id_global.sort((a, b) => a - b);
        this.id_ = id_global[id_global.length - 1] + 1;
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

  //* GETTERS Y SETTERS

  /**
   * getter id
   */
  get getId(): ID {
    return this.id_;
  }

  /**
   * setter id
   */
  set setId(id: ID) {
    this.id_ = id;
  }

  /**
   * Método que devuelve el nombre de la ruta
   * @returns 
   */
  get getNombre(): string {
    return this.nombre_;
  }
  
  /**
   * Método que asigna el nombre de la ruta
   * @param nombre 
   */
  set setNombre(nombre: string) {
    this.nombre_ = nombre;
  }

  /**
   * Método que devuelve la geolocalizacion de inicio de la ruta
   * @returns 
   */
  get getGeolocalizacionInicio(): coordenadas[] {
    return this.geolocalizacion_inicio_;
  }

  /**
   * Método que asigna la geolocalizacion de inicio de la ruta
   * @param geolocalizacion_inicio 
   */
  set setGeolocalizacionInicio(geolocalizacion_inicio: coordenadas[]) {
    this.geolocalizacion_inicio_ = geolocalizacion_inicio;
  }

  /**
   * Método que devuelve la geolocalizacion de fin de la ruta
   * @returns 
   */
  get getGeolocalizacionFin(): coordenadas[] {
    return this.geolocalizacion_fin_;
  }

  /**
   * Méotodo que asigna la geolocalizacion de fin de la ruta
   * @param geolocalizacion_fin 
   */
  set setGeolocalizacionFin(geolocalizacion_fin: coordenadas[]) {
    this.geolocalizacion_fin_ = geolocalizacion_fin;
  }
  
  /**
   * Método que devuelve la longitud de la ruta
   * @returns 
   */
  get getLongitud(): number {
    return this.longitud_;
  }

  /**
   * Método que asigna la longitud de la ruta
   * @param longitud 
   */
  set setLongitud(longitud: number) {
    this.longitud_ = longitud;
  }

  /**
   * Método que devuelve el desnivel de la ruta
   * @returns 
   */
  get getDesnivel(): number {
    return this.desnivel_;
  }

  /**
   * Método que asigna el desnivel de la ruta
   * @param desnivel 
   */
  set setDesnivel(desnivel: number) {
    this.desnivel_ = desnivel;
  }

  /**
   * Método que devuelve los usuarios de la ruta
   * @returns 
   */
  get getUsuarios(): ID[] {
    return this.usuarios_;
  }

  /**
   * Método que asigna los usuarios de la ruta
   * @param usuarios
   */
  set setUsuarios(usuarios: ID[]) {
    this.usuarios_ = usuarios;
  }
  

  /**
   * Método que devuelve el tipo de actividad de la ruta
   * @returns 
   */
  get getTipoActividad(): actividad {
    return this.tipo_actividad_;
  }

  /**
   * Método que asigna el tipo de actividad de la ruta
   * @param tipo_actividad 
   */
  set setTipoActividad(tipo_actividad: actividad) {
    this.tipo_actividad_ = tipo_actividad;
  }

  /**
   * Método que devuelve la calificacion de la ruta
   * @returns 
   */
  get getCalificacion(): number {
    return this.calificacion_;
  }

  /**
   * Método que asigna la calificacion de la ruta
   * @param calificacion 
   */
  set setCalificacion(calificacion: number) {
    this.calificacion_ = calificacion;
  }
}