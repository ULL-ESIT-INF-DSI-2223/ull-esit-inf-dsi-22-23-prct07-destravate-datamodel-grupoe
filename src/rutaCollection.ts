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
  borrarRuta(identificador: ID): boolean{
    let control_bool = false;
    this.coleccion_rutas_.forEach((ruta, indice) => {
      if (ruta.getId == identificador) {
        this.coleccion_rutas_.splice(indice, 1);
        control_bool = true;
      }
    });
    return control_bool;
  }

  modificarRuta(identificador: ID): boolean {

    // CONTROLAMOS QUE EXISTE LA RUTA QUE SE INTENTA MODIFICAR... 
    let id_existe_en_coleccion = false;
    this.coleccion_rutas_.forEach((ruta) => {
      if (ruta.getId == identificador) {
        id_existe_en_coleccion = true;
      }
    });
    if (!id_existe_en_coleccion) {
      console.log('No existe la ruta que se intenta modificar');
      return false;
    }

    let modificado = false;

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
          // {name:'Usuario', value: 'usuario'},
          {name:'Tipo de actividad', value: 'tipo_actividad'},
          {name:'Calificación', value: 'calificacion'},
        ]
      }
    ]).then((answers) => {
      if (answers.opcion === 'nombre') {
        const input_prompt = Prompt();
        const nombre = input_prompt('Introduce el nuevo nombre: ');
        this.coleccion_rutas_.forEach((ruta) => {
          if (ruta.getId == identificador) {
            ruta.setNombre = nombre;
            console.log("hecho");
            // nueva_ruta = ruta;
            modificado = true;
          }
        });
        return modificado;  
      }
      else if (answers.opcion === 'geolocalizacion_inicio') {
        console.log('Modificar geolocalizacion inicio');
        // promptUser();
      }
      else if (answers.opcion === 'geolocalizacion_fin') {
        console.log('Modificar geolocalizacion fin');
        // promptUser();
      }
      else if (answers.opcion === 'longitud') {
        console.log('Modificar longitud');
        // promptUser();
      }
      else if (answers.opcion === 'desnivel') {
        console.log('Modificar desnivel');
        // promptUser();
      }
      // else if (answers.opcion === 'usuario') {
      //   console.log('Modificar usuario');
      //   // promptUser();
      // }
      else if (answers.opcion === 'tipo_actividad') {
        console.log('Modificar tipo de actividad');
        // promptUser();
      }
      else if (answers.opcion === 'calificacion') {
        console.log('Modificar calificacion');
        // promptUser();
      }
      else  {
        return modificado;
      }
    });
    // console.log("no plis")   // no puede ser así, hay que separarlo en un método a parte.
    // return modificado;
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
        ]
      }
    ]).then((answers) => {
      if (answers.opcion === 'add') {
        console.log('Añadir ruta');
        this.manageRutas();
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
      if(this.borrarRuta(answers.id)) {
        console.log('Ruta borrada');
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
      if(this.modificarRuta(answers.id)) {
        console.log('Ruta modificada');
        this.manageRutas();
      }
      else {
        console.log('La ruta no existe');
      }
      console.log("algopasa")
    });
  }
}




// rutas


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


// function promptUser(): void {

//   const prompt = inquirer.createPromptModule();
//   prompt([
//     {
//       type: 'list',
//       name: 'opcion',
//       message: '¿Qué quieres hacer?',
//       choices: [
//         {name:'Añadir ruta', value: 'add'},
//         {name:'Borrar ruta', value: 'remove'},
//       ]
//     }
//   ]).then((answers) => {
//     switch (answers.opcion) {
//       case 'add':
//         console.log('Añadir ruta ');
//         break;
//       case 'remove':
//         console.log('Borrar ruta 22');
//         break;
//       default:
//         console.log('Opción no válida');
//         break;
//     }
//   });
// }

// promptUser();