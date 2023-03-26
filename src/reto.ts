import { actividad, ID } from "./types";
import { Usuario } from "./usuario";
import { Ruta } from "./ruta";

import { database } from "./bd";

/**
 * Clase que representa un reto.
 * @class
 */
export class Reto {
  private id_: ID;
  private nombre_: string;
  private rutas_: ID[];
  private tipo_actividad_ : actividad;
  private km_totales_: number;
  private usuarios_: ID[];

  /**
   * Constructor de la clase Reto.
   * @param nombre 
   * @param rutas 
   * @param tipo_actividad 
   * @param id 
   */
  constructor(nombre: string, rutas: ID[], tipo_actividad: actividad, km_totales: number, usuarios: ID[], id?: ID) {
    this.nombre_ = nombre;
    this.rutas_ = rutas;
    this.tipo_actividad_ = tipo_actividad;
    this.km_totales_ = km_totales;
    this.usuarios_ = usuarios;


    //* escribir en lowdb el reto creado
    const id_global = database.get("retos").map("nombre").value();
    if (id_global.includes(this.nombre_)) {
      this.id_ = database.get("retos").find({ nombre: this.nombre_ }).value().id;
    } else {
      if (id !== undefined) {
        this.id_ = id;
      }
      else {
        // buscar el id más alto y sumarle 1
        const id_global = database.get("retos").map("id").value();
        id_global.sort((a, b) => a - b);
        if (id_global.length === 0) {
          this.id_ = 1;
        }
        else {
          this.id_ = id_global[id_global.length - 1] + 1;
        }
      }
      database.get("retos").push({
        id: this.id_,
        nombre: this.nombre_,
        rutas: this.rutas_,
        tipo_actividad: this.tipo_actividad_,
        km_totales: this.km_totales_,
        usuarios: this.usuarios_
      }).write();
    }
  }


  /**
   * Método que devuelve el número total de km de todas las rutas.
   * @returns KM totales de todas las rutas
   */
  // public kmTotales(): number {
  //   // calcular los km totales de todas las rutas
  //   let km_totales = 0;
  //   for (let i = 0; i < this.rutas_.length; i++) {
  //     // obtener ruta con este identificador
  //     const ruta = database.get("rutas").find({ id: this.rutas_[i] }).value();
  //     km_totales += ruta.longitud;
  //     // km_totales += this.rutas_[i].getLongitud;
  //   }
  //   return km_totales;
  // }

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
  get getRutas(): ID[] {
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
  get getUsuarios(): ID[] {
    return this.usuarios_;
  }

  /**
   * Método que modifica el nombre del reto
   * @param nombre -- nuevo nombre del reto
   */
  set setId(identificador: ID) {
    this.id_ = identificador;
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
  set setRutas(rutas: ID[]) {
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
  set setUsuarios(usuarios: ID[]) {
    this.usuarios_ = usuarios;
  }

}
