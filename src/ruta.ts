import { coordenadas, actividad, ID, schemaType } from "./types";
import { Usuario } from "./usuario";

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
  private static id_global_: ID;
  private id_: ID;
  private nombre_: string;
  private geolocalizacion_inicio_: coordenadas[];
  private geolocalizacion_fin_: coordenadas[];
  private longitud_: number;
  private desnivel_: number;
  private usuarios_: Usuario[];
  private tipo_actividad_: actividad;
  private calificacion_: number;

  // private database: lowdb.LowdbSync<schemaType>;



  constructor(nombre: string, geolocalizacion_inicio: coordenadas[], geolocalizacion_fin: coordenadas[], longitud: number, desnivel: number, usuario: Usuario[], tipo_actividad: actividad, calificacion: number) {
    this.nombre_ = nombre;
    this.geolocalizacion_inicio_ = geolocalizacion_inicio;
    this.geolocalizacion_fin_ = geolocalizacion_fin;
    this.longitud_ = longitud;
    this.desnivel_ = desnivel;
    this.usuarios_ = usuario;
    this.tipo_actividad_ = tipo_actividad;
    this.calificacion_ = calificacion;

    // el id_global hace de contador de la clase, para asignar identificadores únicos a cada ruta
    // el id_ es el identificador de la ruta
    // el id_global se incrementa en 1 cada vez que se crea una ruta
    
    
    //* escribir en lowdb la ruta creada
    // obtenemos todos los id de la base de datos
    // si this.id_ está en la base de datos, no se meterá
    // si this.id_ no está en la base de datos, se meterá
    const id_global = database.get("rutas").map("nombre").value();
    if (id_global.includes(this.nombre_)) {
      //console.log("El nombre ya existe");
      // buscar este nombre en el array de rutas y devolver el id
      this.id_ = database.get("rutas").find({ nombre: this.nombre_ }).value().id;

    } else {
      this.id_ = Ruta.comprobarEstatica();
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

  

    // meter ruta en la base de datos
    // database.get("rutas").push({
    //   id: this.id_,
    //   nombre: this.nombre_,
    //   geolocalizacion_inicio: this.geolocalizacion_inicio_,
    //   geolocalizacion_fin: this.geolocalizacion_fin_,
    //   longitud: this.longitud_,
    //   desnivel: this.desnivel_,
    //   usuarios: this.usuarios_,
    //   tipo_actividad: this.tipo_actividad_,
    //   calificacion: this.calificacion_
    // }).write();

  } 

  /**
   * Método que genera una id única para cada ruta
   * @returns -- id de la ruta
   */
  public static comprobarEstatica(): ID{
    // en este método comprobamos si el id_global está inicializado
    // si no está inicializado, lo inicializamos a 0
    // si está inicializado, devolvemos el valor de id_global

    // buscar el id más alto de la base de datos
    // si no hay ninguna ruta, el id_global será 0
    // si hay rutas, el id_global será el id de la última ruta + 1

    if (Ruta.id_global_ == undefined) {
      Ruta.id_global_ = 0;
      
    }
    // obtener numero de rutas
    Ruta.id_global_ = database.get("rutas").size().value() + 1;
    console.log(Ruta.id_global_-1);


    return Ruta.id_global_;
  }


  //* GETTERS Y SETTERS

  get getId(): ID {
    return this.id_;
  }

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
  get getUsuarios(): Usuario[] {
    return this.usuarios_;
  }

  /**
   * Método que asigna los usuarios de la ruta
   * @param usuarios
   */
  set setUsuarios(usuarios: Usuario[]) {
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