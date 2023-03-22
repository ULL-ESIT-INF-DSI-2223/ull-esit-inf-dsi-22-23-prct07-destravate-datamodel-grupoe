import {Ruta} from "./ruta";
import {ID} from "./types";
import * as inquirer from "inquirer";
import { coordenadas } from "./types";
import { Usuario } from "./usuario";
import * as Prompt from 'prompt-sync';


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
  borrarRuta(identificador: ID): Ruta | undefined {
    let control_bool = false;
    let ruta_aux: Ruta | undefined;
    this.coleccion_rutas_.forEach((ruta, indice) => {
      if (ruta.getId == identificador) {
        ruta_aux = ruta;
        this.coleccion_rutas_.splice(indice, 1);
        control_bool = true;
      }
    });
    if (control_bool) {
      return ruta_aux;
    }
    else {
      return undefined;
    }
  }

  promptBorrarRuta(): void {
    // solicitar id, pasarselo al metodo que borra
    const prompt = inquirer.createPromptModule();
    prompt([
      {
        type: 'input',
        name: 'id',
        message: 'Introduce el id de la ruta a borrar',
      }
    ]).then((answers) => {
      const ruta_aux: Ruta | undefined = this.borrarRuta(answers.id);
      if (typeof ruta_aux != 'undefined') {
        console.log('Ruta borrada: ' + ruta_aux.getNombre);
      }
      else {
        console.log('La ruta no existe');
      }
      this.manageRutas();
    });
  }

  
  promptModificarRuta():void {
    const prompt = inquirer.createPromptModule();
    prompt([
      {
        type: 'input',
        name: 'id',
        message: 'Introduce el id de la ruta a modificar',
      }
    ]).then((answers) => {
      this.modificarRuta(answers.id);
      // this.manageRutas();
    });
  }

  modificarRuta(identificador: ID): void {
    // 1. comprobar que el id de la ruta existe
    // 2. preguntar que se quiere modificar
    // 3. modificarlo
    // 4. devolver true si se ha modificado o false si no se ha modificado
    let id_existe_en_coleccion = false;
    let indice = -1;
    this.coleccion_rutas_.forEach((ruta, index) => {
      if (ruta.getId == identificador) {
        id_existe_en_coleccion = true;
        indice = index;
      }
    }
    );
    if (!id_existe_en_coleccion) {
      console.log('No existe la ruta que se intenta modificar');
      return;
    }


    const prompt = inquirer.createPromptModule();
    prompt([
      {
        type: 'list',
        name: 'opcion',
        message: '¿Qué quieres modificar?',
        choices: [
          {name:'Nombre', value: 'nombre'},
          {name:'Geolocalización inicio', value: 'geolocalizacion_inicio'},
          {name:'Geolocalización fin', value: 'geolocalizacion_fin'},
          {name:'Longitud', value: 'longitud'},
          {name:'Desnivel', value: 'desnivel'},
          {name:'Usuario', value: 'usuario'},
          {name:'Tipo de actividad', value: 'tipo_actividad'},
          {name:'Calificacion', value: 'calificacion'}
        ]
      } 
    ]).then((answers) => {
      const prompt = inquirer.createPromptModule();
      switch (answers.opcion) {
        case 'nombre':
          prompt([
            {
              type: 'input',
              name: 'nombre2',
              message: 'Introduce el nuevo nombre de la ruta',
            }
          ]).then((answers) => {
            this.coleccion_rutas_[indice].setNombre = answers.nombre2;
            console.log(`Nuevo nombre: ${this.coleccion_rutas_[indice].getNombre}`);
            this.manageRutas();
          }
          );
          break;
        case 'geolocalizacion_inicio':
          // introducir las 3 coordenadas x,y,z
          prompt([
            {
              type: 'input',
              name: 'x',
              message: 'Introduce la coordenada x de la geolocalización de inicio',
            },
            {
              type: 'input',
              name: 'y',
              message: 'Introduce la coordenada y de la geolocalización de inicio',
            },
            {
              type: 'input',
              name: 'z',
              message: 'Introduce la coordenada z de la geolocalización de inicio',
            }
          ]).then((answers) => {
            this.coleccion_rutas_[indice].setGeolocalizaciónInicio = [answers.x, answers.y, answers.z];
            console.log(`Nuevas coordenadas: ${this.coleccion_rutas_[indice].getGeolocalizaciónInicio}`);
            this.manageRutas();
          }
          );
          break;
        case 'geolocalizacion_fin':
          // introducir las 3 coordenadas x,y,z
          prompt([
            {
              type: 'input',
              name: 'x',
              message: 'Introduce la coordenada x de la geolocalización de fin',
            },
            {
              type: 'input',
              name: 'y',
              message: 'Introduce la coordenada y de la geolocalización de fin',
            },
            {
              type: 'input',
              name: 'z',
              message: 'Introduce la coordenada z de la geolocalización de fin',
            }
          ]).then((answers) => {
            this.coleccion_rutas_[indice].setGeolocalizaciónFin = [answers.x, answers.y, answers.z];
            console.log(`Nuevas coordenadas: ${this.coleccion_rutas_[indice].getGeolocalizaciónFin}`);
            this.manageRutas();
          }
          );
          break;
        case 'longitud':
          prompt([  
            {
              type: 'input',
              name: 'longitud2',
              message: 'Introduce la nueva longitud de la ruta',
            }
          ]).then((answers) => {
            this.coleccion_rutas_[indice].setLongitud = answers.longitud2;
            console.log(`Nueva longitud: ${this.coleccion_rutas_[indice].getLongitud}`);
            this.manageRutas();
          }
          );
          break;
        case 'desnivel':
          prompt([
            {
              type: 'input',
              name: 'desnivel2',
              message: 'Introduce el nuevo desnivel de la ruta',
            }
          ]).then((answers) => {
            this.coleccion_rutas_[indice].setDesnivel = answers.desnivel2;
            console.log(`Nuevo desnivel: ${this.coleccion_rutas_[indice].getDesnivel}`);
            this.manageRutas();
          }
          );
          break;


          //TODO

        case 'usuario':
          // añadir usuario o eliminar usuario?
          prompt([
            {
              type: 'list',
              name: 'opcion2',
              message: '¿Qué desea hacer?', 
              choices: [
                {name:'Añadir usuario', value: 'añadir'},
                {name:'Eliminar usuario', value: 'eliminar'},
                {name: 'Modificar usuario', value: 'modificar'}
              ]
            }
          ]).then((answers) => {
            if (answers.opcion2 == 'añadir') {
              // ! Hay que pedir todo sobre el nuevo usuario a añadir
              // prompt([
              //   {
              //     type: 'input',
              //     name: 'usuario2',
              //     message: 'Introduce el nombre del usuario que quieres añadir a la ruta',
              //   }
              // ]).then((answers) => {
              //   this.coleccion_rutas_[indice].setUsuario = answers.usuario2;
              //   console.log(`Nuevo usuario: ${this.coleccion_rutas_[indice].getUsuario}`);
              //   this.manageRutas();
              // }
              // );
            }
            else if (answers.opcion2 == 'eliminar') {
              
            }
            else if (answers.opcion2 == 'modificar') {
            }

          });
        break;

        case 'tipo_actividad':
          prompt([
            {
              type: 'list',
              name: 'tipo_actividad2',
              message: 'Introduce el nuevo tipo de actividad de la ruta',
              choices: [
                {name:'Correr', value: 'correr'},
                {name:'Bicicleta', value: 'bicicleta'}
              ]
            }
          ]).then((answers) => {
            this.coleccion_rutas_[indice].setTipoActividad = answers.tipo_actividad2;
            console.log(`Nuevo tipo de actividad: ${this.coleccion_rutas_[indice].getTipoActividad}`);
            this.manageRutas();
          });
          break;
        case 'calificacion':
          prompt([
            {
              type: 'input',
              name: 'calificacion2',
              message: 'Introduce la nueva calificacion de la ruta',
            }
          ]).then((answers) => {
            this.coleccion_rutas_[indice].setCalificacion = answers.calificacion2;
            console.log(`Nueva calificacion: ${this.coleccion_rutas_[indice].getCalificacion}`);
            this.manageRutas();
          }
          );
          break;
      }
      // this.manageRutas();
    });
  }


  manageRutas(): void {
    const prompt = inquirer.createPromptModule();
    prompt([
      {
        type: 'list',
        name: 'opcion',
        message: 'Manejo de Rutas, ¿qué quieres hacer?',
        choices: [
          {name:'Añadir ruta', value: 'add'},
          {name:'Borrar ruta', value: 'remove'},
          {name:'Modificar ruta', value: 'modify'},
          {name:'Salir', value: 'Salir'},
        ]
      }
    ]).then((answers) => {
      if (answers.opcion === 'add') {
        console.log('Añadir ruta');
      }
      else if (answers.opcion === 'remove') {
        this.promptBorrarRuta();
      }
      else if (answers.opcion === 'modify') {
        this.promptModificarRuta();
      }
      else if (answers.opcion === 'Salir') {
        console.log('Salir');
      }
    });
  }

}






//? PRUEBAS

const eje_x0: coordenadas = {
  letra : "X",
  coordenada : 10
}
const eje_y0: coordenadas = {
  letra : "Y",
  coordenada : 20
}
const eje_z0: coordenadas = {
  letra : "Z",
  coordenada : 30
}


const eje_x1: coordenadas = {
  letra : "X",
  coordenada : 12435
}
const eje_y1: coordenadas = {
  letra : "Y",
  coordenada : 1234325436
}
const eje_z1: coordenadas = {
  letra : "Z",
  coordenada : 1232
}


const eje_x2: coordenadas = {
  letra : "X",
  coordenada : 214
}
const eje_y2: coordenadas = {
  letra : "Y",
  coordenada : 20213
}
const eje_z2: coordenadas = {
  letra : "Z",
  coordenada : 3023
}

const eje_x3: coordenadas = {
  letra : "X",
  coordenada : 10
}
const eje_y3: coordenadas = {
  letra : "Y",
  coordenada : 20
}
const eje_z3: coordenadas = {
  letra : "Z",
  coordenada : 30
}
const eje_x4: coordenadas = {
  letra : "X",
  coordenada : 1010
}
const eje_y4: coordenadas = {
  letra : "Y",
  coordenada : 2020
}
const eje_z4: coordenadas = {
  letra : "Z",
  coordenada : 3030
}
const eje_x5: coordenadas = {
  letra : "X",
  coordenada : 1001
}
const eje_y5: coordenadas = {
  letra : "Y",
  coordenada : 2002
}
const eje_z5: coordenadas = {
  letra : "Z",
  coordenada : 3003
}

const user0 = new Usuario('Pepe', "correr" , [1,2,3]);
const user1 = new Usuario('Adrian', "correr" , [3,4,5]);
const user2 = new Usuario('Eduardo', "correr" , [6,7,8,9,10,11]);
const user3 = new Usuario('Eva', "correr" , [1,2,3,4,5,6]);
const user4 = new Usuario('Marco', "correr" , [1,2,3]);
const user5 = new Usuario('Ismael', "bicicleta" , [1,2,3,5,6,7]);
const user6 = new Usuario('Daniel_Felipe', "bicicleta" , [1,2,3,20,19,18]);
const user7 = new Usuario('Alberto', "bicicleta" , [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]);
const user8 = new Usuario('Facundo', "bicicleta" , [1,2,3,4,5,6]);

const ruta0 = new Ruta('San Vicente', [eje_x0, eje_y0, eje_z0], [eje_x1, eje_y1, eje_z1], 1000, 200, [user0, user1, user2], "correr", 9);
const ruta1 = new Ruta('Plaza el charco', [eje_x2, eje_y2, eje_z2], [eje_x3, eje_y3, eje_z3], 2000, 200, [user3, user4, user5], "bicicleta", 8);
const ruta2 = new Ruta('Adventour', [eje_x4, eje_y4, eje_z4], [eje_x5, eje_y5, eje_z5], 300, 200, [user6, user7, user8], "correr", 8);


const coleccion_rutas = new rutaCollection([ruta0, ruta1, ruta2]);

coleccion_rutas.manageRutas();