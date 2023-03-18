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
        this.km_totales_ = 0;
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
      Reto.id_global_ = {
        id: 0
      }
    }
    Reto.id_global_.id += 1; 
    const identificador: ID = {
      id: Reto.id_global_.id
    }
    return identificador;
  }
}
