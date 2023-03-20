import {Ruta} from "./ruta"
import {ID} from "./types";
// import * as inquirer from "inquirer"


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
      if (ruta.getId === ruta_aux.getId) {
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
   * @returns ruta eliminada o undefined en caso de que no existiera.
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


  // modificarRuta(): 







//   function promptUser(): void {
//     console.clear();
//     displayTodoList();
//     inquirer.prompt({
//             type: "list",
//             name: "command",
//             message: "Choose option",
//             choices: Object.values(Commands)
//     }).then(answers => {
//         if (answers["command"] !== Commands.Quit) {
//             promptUser();
//         }
//     })
// }


}