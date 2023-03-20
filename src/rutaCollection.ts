import {Ruta} from "./ruta"
import {ID} from "./types";
import inquirer from "inquirer"
// import * as Prompt from 'prompt-sync';

/**
 * Clase rutaCollection
 */
class rutaCollection {
  /**
   * Constructor por defecto
   * @param coleccion_rutas_ array de rutas
   */
  constructor(private coleccion_rutas_: Ruta[]) {
  }

  /**
   * getter coleccion_rutas_
   */
  get getRutas(): Ruta[] {
    return this.coleccion_rutas_;
  } 

  /**
   * setter coleccion_rutas_
   */
  set setRutas(coleccion_rutas: Ruta[]) {
    this.coleccion_rutas_ = coleccion_rutas;
  }

  /**
   * Método que añade una nueva ruta a la coleción de rutas
   * @param ruta ruta a añadir
   * @returns array de rutas modificado o undefined en caso de no haber podido añadir la ruta.
   */
  addRuta(ruta: Ruta): Ruta[] | undefined{
    let repetido = false;
    this.coleccion_rutas_.forEach((ruta_aux) => {
      if (ruta.getId === ruta_aux.getId) { // comprobamos que no este repetido 
        repetido = true;
      }
    });
    if (repetido === false) {
      this.coleccion_rutas_.push(ruta);
      return this.coleccion_rutas_;
    }
    else {
      return undefined;
      
    }
  }

  /**
   * Método que borra una ruta
   * @param identificador identificador de la ruta a borrar
   * @returns retorna la ruta eliminada o undefined en caso de que no existiera.
   */
  borrarRuta(identificador: ID): Ruta | undefined{
    let ruta_aux: Ruta; 
    this.coleccion_rutas_.forEach((ruta, indice) => {
      if (ruta.getId === identificador) {
        ruta_aux = ruta;
        this.coleccion_rutas_.splice(indice, 1);
        return ruta_aux;
      }
    });
    return undefined;
  }


  // modificarRuta(): Ruta | undefined{
  //   let ruta_aux: Ruta; 
  //   this.coleccion_rutas_.forEach((ruta, indice) => {
  //     if (ruta.getId === identificador) {
  //       ruta_aux = ruta;
  //       this.coleccion_rutas_.splice(indice, 1);
  //       return ruta_aux;
  //     }
  //   });
  //   return undefined;
  // }
  
}

function promptUser(): void {
  // nombre: string, geolocalización_inicio: coordenadas[], geolocalización_fin: coordenadas[], longitud: number, desnivel: number, usuario: Usuario[], tipo_actividad: actividad, calificacion: number
  // const prompt = inquirer.createPromptModule();
  console.clear();

  inquirer.prompt([
    {
      type: 'input',
      name: 'nombre',
      message: 'Introduce el nombre de la ruta',
    },
    {
      type: 'input',
      name: 'geolocalizacion_inicio',
      message: 'Introduce la geolocalización de inicio',
    },
    {
      type: 'input',
      name: 'geolocalizacion_fin',
      message: 'Introduce la geolocalización de fin',
    },
    {
      type: 'input',
      name: 'longitud',
      message: 'Introduce la longitud de la ruta',
    },
    {
      type: 'input',
      name: 'desnivel',
      message: 'Introduce el desnivel de la ruta',
    },
    {
      type: 'input',
      name: 'usuario',
      message: 'Introduce el usuario',
    },
    {
      type: 'input',
      name: 'tipo_actividad',
      message: 'Introduce el tipo de actividad',
    },
    {
      type: 'input',
      name: 'calificacion',
      message: 'Introduce la calificación',
    },
  ]).then((answers) => {
    const ruta1 = new Ruta(answers.nombre, answers.geolocalizacion_inicio, answers.geolocalizacion_fin, answers.longitud, answers.desnivel, answers.usuario, answers.tipo_actividad, answers.calificacion);
    const coleccion_rutas = new rutaCollection([ruta1]);
    }
  );


}

promptUser();