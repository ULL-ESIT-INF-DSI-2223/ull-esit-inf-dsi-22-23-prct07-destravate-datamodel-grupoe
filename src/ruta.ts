import { coordenadas, actividad, ID } from "./types";
import { Usuario } from "./usuario";

/**
 * @class Ruta
 * @description Clase que representa una ruta
 */
export class Ruta {
  private static id_global_: ID;
  private id_: ID;
  private nombre_: string;
  private geolocalización_inicio_: coordenadas[];
  private geolocalización_fin_: coordenadas[];
  private longitud_: number;
  private desnivel_: number;
  private usuarios_: Usuario[];
  private tipo_actividad_: actividad;
  private calificacion_: number;


  constructor(nombre: string, geolocalización_inicio: coordenadas[], geolocalización_fin: coordenadas[], longitud: number, desnivel: number, usuario: Usuario[], tipo_actividad: actividad, calificacion: number) {
    this.nombre_ = nombre;
    this.geolocalización_inicio_ = geolocalización_inicio;
    this.geolocalización_fin_ = geolocalización_fin;
    this.longitud_ = longitud;
    this.desnivel_ = desnivel;
    this.usuarios_ = usuario;
    this.tipo_actividad_ = tipo_actividad;
    this.calificacion_ = calificacion;

    // el id_global hace de contador de la clase, para asignar identificadores únicos a cada ruta
    // el id_ es el identificador de la ruta
    // el id_global se incrementa en 1 cada vez que se crea una ruta
    this.id_ = Ruta.comprobarEstatica();
       
    
  } 

  /**
   * Método que genera una id única para cada ruta
   * @returns -- id de la ruta
   */
  public static comprobarEstatica(): ID{
    // en este método comprobamos si el id_global está inicializado
    // si no está inicializado, lo inicializamos a 0
    // si está inicializado, devolvemos el valor de id_global
    if (Ruta.id_global_ == undefined) {
      Ruta.id_global_ = 0;
    }
    Ruta.id_global_ += 1; 
    const identificador: ID = Ruta.id_global_;

    // identificador.id = Ruta.id_global;
    return identificador;
  }


  //* GETTERS Y SETTERS

  get getId(): ID {
    return this.id_;
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
   * Método que devuelve la geolocalización de inicio de la ruta
   * @returns 
   */
  get getGeolocalizaciónInicio(): coordenadas[] {
    return this.geolocalización_inicio_;
  }

  /**
   * Método que asigna la geolocalización de inicio de la ruta
   * @param geolocalización_inicio 
   */
  set setGeolocalizaciónInicio(geolocalización_inicio: coordenadas[]) {
    this.geolocalización_inicio_ = geolocalización_inicio;
  }

  /**
   * Método que devuelve la geolocalización de fin de la ruta
   * @returns 
   */
  get getGeolocalizaciónFin(): coordenadas[] {
    return this.geolocalización_fin_;
  }

  /**
   * Méotodo que asigna la geolocalización de fin de la ruta
   * @param geolocalización_fin 
   */
  set setGeolocalizaciónFin(geolocalización_fin: coordenadas[]) {
    this.geolocalización_fin_ = geolocalización_fin;
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
   * Método que devuelve la calificación de la ruta
   * @returns 
   */
  get getCalificacion(): number {
    return this.calificacion_;
  }

  /**
   * Método que asigna la calificación de la ruta
   * @param calificacion 
   */
  set setCalificacion(calificacion: number) {
    this.calificacion_ = calificacion;
  }
}