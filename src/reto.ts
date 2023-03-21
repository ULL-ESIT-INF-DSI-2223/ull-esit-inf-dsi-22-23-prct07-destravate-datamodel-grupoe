import { actividad, ID } from "./types";
import { Usuario } from "./usuario";
import { Ruta } from "./ruta";


export class Reto {
  private static id_global_: ID;
  private id_: ID;
  private nombre_: string;
  private rutas_: Ruta[];
  private tipo_actividad_ : actividad;
  private km_totales_: number;
  private usuarios_: Usuario[];

  constructor(nombre: string, rutas: Ruta[], tipo_actividad: actividad) {
      this.nombre_ = nombre;
      this.rutas_ = rutas;
      this.tipo_actividad_ = tipo_actividad;
      this.km_totales_ = this.kmTotales();
      this.usuarios_ = [];

      this.id_ = Reto.comprobarEstatica();
  }

  /**
   * Método que genera un id único para el reto
   * @returns -- id del reto
   */
  public static comprobarEstatica(): ID{
    // en este método comprobamos si el id_global está inicializado
    // si no está inicializado, lo inicializamos a 0
    // si está inicializado, devolvemos el valor de id_global
    if (Reto.id_global_ == undefined) {
      Reto.id_global_ = 0;
    }
    Reto.id_global_ += 1; 
    const identificador: ID = Reto.id_global_;
    
    return identificador;
  }


  /**
   * Método que devuelve el número total de km de todas las rutas.
   * @returns KM totales de todas las rutas
   */
  public kmTotales(): number {
    // calcular los km totales de todas las rutas
    let km_totales = 0;
    for (let i = 0; i < this.rutas_.length; i++) {
      km_totales += this.rutas_[i].getLongitud;
    }
    return km_totales;
  }

  //* getter y setter

  /**
   * Método que devuelve el id del reto
   * @returns -- id del reto
   */
  get getId(): ID {
    return this.id_;
  }

  /**
   * Método que devuelve el nombre del reto
   * @returns -- nombre del reto
   */
  get getNombre(): string {
    return this.nombre_;
  }

  /**
   * Método que devuelve las rutas del reto
   * @returns -- rutas del reto
   */
  get getRutas(): Ruta[] {
    return this.rutas_;
  }

  /**
   * Método que devuelve el tipo de actividad del reto
   * @returns -- tipo de actividad del reto
   */
  get getTipoActividad(): actividad {
    return this.tipo_actividad_;
  }

  /**
   * Método que devuelve los km totales del reto
   * @returns -- km totales del reto
   */
  get getKmTotales(): number {
    return this.km_totales_;
  }

  /**
   * Método que devuelve los usuarios del reto
   * @returns -- usuarios del reto
   */
  get getUsuarios(): Usuario[] {
    return this.usuarios_;
  }

  /**
   * Método que modifica el nombre del reto
   * @param nombre -- nuevo nombre del reto
   */
  set setNombre(nombre: string) {
    this.nombre_ = nombre;
  }

  /**
   * Método que modifica las rutas del reto
   * @param rutas -- nuevas rutas del reto
   */
  set setRutas(rutas: Ruta[]) {
    this.rutas_ = rutas;
  }

  /**
   * Método que modifica el tipo de actividad del reto
   * @param tipo_actividad -- nuevo tipo de actividad del reto
   */
  set setTipoActividad(tipo_actividad: actividad) {
    this.tipo_actividad_ = tipo_actividad;
  }

  /**
   * Método que modifica los km totales del reto
   * @param km_totales -- nuevos km totales del reto
   */
  set setKmTotales(km_totales: number) {
    this.km_totales_ = km_totales;
  }

  /**
   * Método que añade un usuario al reto
   * @param usuario -- usuario a añadir
   */
  set setUsuarios(usuarios: Usuario[]) {
    this.usuarios_ = usuarios;
  }

}
