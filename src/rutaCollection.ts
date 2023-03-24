import {Ruta} from "./ruta";
import {ID} from "./types";
import * as inquirer from "inquirer";
// import { coordenadas } from "./types";
// import { Usuario } from "./usuario";

import {database} from "./ruta";


/**
 * Clase rutaCollection
 */
class rutaCollection {
  private coleccion_rutas_: Ruta[];
  /**
   * Constructor por defecto
   * @param coleccion_rutas_ array de rutas
   */
  constructor() {
    // leer rutas de la base de datos y añadirlas al array de rutas
    this.leerBD();
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
   * Método que lee de la base de datos y actualiza el array de rutas
   */
  leerBD(): void {
    const rutas = database.get("rutas").value();
    const array_aux: Ruta[] = [];
    rutas.forEach((ruta) => {
      const ruta_aux: Ruta = new Ruta(ruta.nombre, ruta.geolocalizacion_inicio, ruta.geolocalizacion_fin, ruta.longitud, ruta.desnivel, ruta.usuarios, ruta.tipo_actividad, ruta.calificacion);
      array_aux.push(ruta_aux);
    });
    this.setRutas = array_aux;
  }


  /**
   * Método que añade una nueva ruta a la coleción de rutas
   * @param ruta ruta a añadir
   * @returns array de rutas modificado o undefined en caso de no haber podido añadir la ruta.
   */
  addRuta(ruta: Ruta): Ruta{  
    
    // let repetido = false;
    // this.coleccion_rutas_.forEach((ruta_aux) => {
    //   if (ruta.getId == ruta_aux.getId) { 
    //     repetido = true;
    //   }
    // });
    // if (repetido === false) {
    //   this.coleccion_rutas_.push(ruta);
    //   return this.coleccion_rutas_;
    // }
    // else {
    //   return undefined;
    // }
    // this.coleccion_rutas_.push(ruta);
    return ruta;
  }


  /**
   * Método que borra una ruta
   * @param identificador identificador de la ruta a borrar
   * @returns retorna la ruta eliminada o undefined en caso de que no existiera.
   */
  borrarRuta(identificador: ID): Ruta | undefined {
    let control_bool = false;
    let ruta_aux: Ruta | undefined;
    // console.log(`identificador: ${identificador}`)
    // console.log('TAMAÑO ARRAY:' + this.coleccion_rutas_.length)
    this.coleccion_rutas_.forEach((ruta, indice) => {
      // console.log(ruta);
      if (ruta.getId == identificador) {
        ruta_aux = ruta;
        this.coleccion_rutas_.splice(indice, 1);
        control_bool = true;
        // borrar de la base de datos la ruta por el id pasado por parametro
        // const element = identificador -1;
        database.get("rutas").splice(indice,1).write();
      }
    });
    // imprmimir todos los nombres de las rutas restantes
    // this.coleccion_rutas_.forEach((ruta) => {
      // console.log(ruta.getNombre);
    // });
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
        console.log('Ruta borrada: ' + ruta_aux.getId);
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
            this.coleccion_rutas_[indice].setGeolocalizacionInicio = [answers.x, answers.y, answers.z];
            console.log(`Nuevas coordenadas: ${this.coleccion_rutas_[indice].getGeolocalizacionInicio}`);
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
            this.coleccion_rutas_[indice].setGeolocalizacionFin = [answers.x, answers.y, answers.z];
            console.log(`Nuevas coordenadas: ${this.coleccion_rutas_[indice].getGeolocalizacionFin}`);
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

        // case 'usuario':
        //   // añadir usuario o eliminar usuario?
        //   prompt([
        //     {
        //       type: 'list',
        //       name: 'opcion2',
        //       message: '¿Qué desea hacer?', 
        //       choices: [
        //         {name:'Añadir usuario', value: 'añadir'},
        //         {name:'Eliminar usuario', value: 'eliminar'},
        //         {name: 'Modificar usuario', value: 'modificar'}
        //       ]
        //     }
        //   ]).then((answers) => {
        //     if (answers.opcion2 == 'añadir') {
        //       // ! Hay que pedir todo sobre el nuevo usuario a añadir
        //   });
        // break;

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

  promptAddRuta() {
    // pedir datos de la nueva ruta
    const prompt = inquirer.createPromptModule();
    let coordenadas_inicio = [];
    let coordenadas_fin = [];
    prompt([
      {
        type: 'input',
        name: 'nombre',
        message: 'Introduce el nombre de la nueva ruta',
      },
      {
        // pedir las 3 coordenadas
        type: 'input',
        name: 'geolocalizacion_inicioX',
        message: 'Introduce la geolocalización de inicio, X: ',
      },
      {
        type: 'input',
        name: 'geolocalizacion_inicioY',
        message: 'Introduce la geolocalización de inicio, Y: ',
      },
      {
        type: 'input',
        name: 'geolocalizacion_inicioZ',
        message: 'Introduce la geolocalización de inicio, Z: ',
      },
      {
        // pedir las 3 coordenadas
        type: 'input',
        name: 'geolocalizacion_finX',
        message: 'Introduce la geolocalización de fin, X: ',
      },
      {
        type: 'input',
        name: 'geolocalizacion_finY',
        message: 'Introduce la geolocalización de fin, Y: ',
      },
      {
        type: 'input',
        name: 'geolocalizacion_finZ',
        message: 'Introduce la geolocalización de fin, Z: ',
      },
      { 
        type: 'input',
        name: 'longitud',
        message: 'Introduce la longitud de la nueva ruta',
      },
      {
        type: 'input',
        name: 'desnivel',
        message: 'Introduce el desnivel de la nueva ruta',
      },
      //? de momento mejor no
      // {
      //   type: 'input',
      //   name: 'usuario',
      //   message: 'Introduce el usuario de la nueva ruta',
      // },
      {
        type: 'list',
        name: 'tipo_actividad',
        message: 'Introduce el tipo de actividad de la nueva ruta',
        choices: [
          {name:'Correr', value: 'correr'},
          {name:'Bicicleta', value: 'bicicleta'}
        ]
      },
      {
        type: 'input',
        name: 'calificacion',
        message: 'Introduce la calificacion de la nueva ruta',
      }
    ]).then((answers) => {
      // crear nueva ruta
      coordenadas_inicio = [answers.geolocalizacion_inicioX, answers.geolocalizacion_inicioY, answers.geolocalizacion_inicioZ];
      coordenadas_fin = [answers.geolocalizacion_finX, answers.geolocalizacion_finY, answers.geolocalizacion_finZ];
      const nueva_ruta = new Ruta(answers.nombre, coordenadas_inicio, coordenadas_fin, answers.longitud, answers.desnivel, answers.usuario, answers.tipo_actividad, answers.calificacion);
      this.addRuta(nueva_ruta);
      // escribir en la base
      this.manageRutas();
    });
  }

  manageRutas(): void {
    // console.log(this.coleccion_rutas_)
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
        this.promptAddRuta();
      }
      else if (answers.opcion === 'remove') {
        this.promptBorrarRuta();
      }
      else if (answers.opcion === 'modify') {
        this.promptModificarRuta();
      }
      else if (answers.opcion === 'Salir') {
        // cerrar prompt
        process.exit(0);
      }
    });
  }













  //! NO TOCAR

  infoRutas(): void {
    // Alfabéticamente por nombre de la ruta, ascendente y descendente.
    // Cantidad de usuarios que realizan las rutas, ascendente y descendente.
    // Por longitud de la ruta, ascendente y descendente.
    // Por la calificación media de la ruta, ascendente y descendente.
    // Ordenar por actividad: correr o ciclismo.
    const prompt = inquirer.createPromptModule();
    prompt([
      {
        type: 'list',
        name: 'opcion',
        message: '¿Qué deseas ver?',
        choices: [
          {name:'Mostrar por orden alfabético las rutas', value: 'alfabetico'},
          {name:'Mostrar por cantidad de usuarios que realizan las rutas', value: 'cantidad_usuarios'},
          {name:'Mostrar por longitud de la ruta', value: 'longitud'},
          {name:'Mostrar por la calificación media de la ruta', value: 'calificacion'},
          {name:'Mostrar por actividad (Correr o Ciclismo)', value: 'actividad'},
          {name:'Salir', value: 'Salir'},
        ]
      }
    ]).then((answers) => {
      switch (answers.opcion) {
        case 'alfabetico':
          this.ordenarRutasPorNombre();
          break;
        case 'cantidad_usuarios':
          this.ordenarRutasPorCantidadUsuarios();
          break;
        case 'longitud':
          this.ordenarRutasPorLongitud();
          break;
        case 'calificacion':
          this.ordenarRutasPorCalificacion();
          break;
        case 'actividad':
          this.ordenarRutasPorActividad();
          break;
        case 'Salir':
          // cerrar prompt
          break;
      }
    });
  }

  ordenarRutasPorNombre() {
    // preguntar ascendente o descendente
    // ordenar
    // mostrar
    let ascendente = true; // por defecto ascendente
    const prompt = inquirer.createPromptModule();
    prompt([
      {
        type: 'list',
        name: 'opcion',
        message: '¿Cómo deseas ordenar?',
        choices: [
          {name:'Ascendente', value: 'ascendente'},
          {name:'Descendente', value: 'descendente'},
        ]
      }
    ]).then((answers) => {
      if (answers.opcion === 'descendente') {
        ascendente = false;
      }
      // ordenar
      const copia_rutas = this.coleccion_rutas_;
      // ordenar de forma ascendete o descendente según el valor de la variable ascendente
      copia_rutas.sort((a, b) => {
        if (ascendente) {
          return a.getNombre.localeCompare(b.getNombre);
        }
        else {
          return b.getNombre.localeCompare(a.getNombre);
        }
      });
      // mostrar
      copia_rutas.forEach((ruta) => {
        console.log(`Nombre: ${ruta.getNombre}, Longitud: ${ruta.getLongitud}`);
      });
      this.infoRutas();
    });
  }

  ordenarRutasPorCantidadUsuarios(){
    let ascendente = true; // por defecto ascendente
    const prompt = inquirer.createPromptModule();
    prompt([
      {
        type: 'list',
        name: 'opcion',
        message: '¿Cómo deseas ordenar?',
        choices: [
          {name:'Ascendente', value: 'ascendente'},
          {name:'Descendente', value: 'descendente'},
        ]
      }
    ]).then((answers) => {
      if (answers.opcion === 'descendente') {
        ascendente = false;
      }
      // ordenar
      const copia_rutas = this.coleccion_rutas_;
      // ordenar de forma ascendete o descendente según el valor de la variable ascendente
      copia_rutas.sort((a, b) => {
        if (ascendente) {
          return a.getUsuarios.length - b.getUsuarios.length;
        }
        else {
          return b.getUsuarios.length - a.getUsuarios.length;
        }
      }
      );
      // mostrar
      copia_rutas.forEach((ruta) => {
        console.log(`Nombre: ${ruta.getNombre}, Cantidad de usuarios: ${ruta.getUsuarios.length}`);
      }
      );
      this.infoRutas();
    });
  }


  ordenarRutasPorLongitud(){
    let ascendente = true; // por defecto ascendente
    const prompt = inquirer.createPromptModule();
    prompt([
      {
        type: 'list',
        name: 'opcion',
        message: '¿Cómo deseas ordenar?',
        choices: [
          {name:'Ascendente', value: 'ascendente'},
          {name:'Descendente', value: 'descendente'},
        ]
      }
    ]).then((answers) => {
      if (answers.opcion === 'descendente') {
        ascendente = false;
      }
      // ordenar
      const copia_rutas = this.coleccion_rutas_;
      // ordenar de forma ascendete o descendente según el valor de la variable ascendente
      copia_rutas.sort((a, b) => {
        if (ascendente) {
          return a.getLongitud - b.getLongitud;
        }
        else {
          return b.getLongitud - a.getLongitud;
        }
      });
      // mostrar
      copia_rutas.forEach((ruta) => {
        console.log(`Nombre: ${ruta.getNombre}, Longitud: ${ruta.getLongitud}`);
      });
      this.infoRutas();
    });
  }

  ordenarRutasPorCalificacion(){
    let ascendente = true; // por defecto ascendente
    const prompt = inquirer.createPromptModule();
    prompt([
      {
        type: 'list',
        name: 'opcion',
        message: '¿Cómo deseas ordenar?',
        choices: [
          {name:'Ascendente', value: 'ascendente'},
          {name:'Descendente', value: 'descendente'},
        ]
      }
    ]).then((answers) => {
      if (answers.opcion === 'descendente') {
        ascendente = false;
      }
      // ordenar
      const copia_rutas = this.coleccion_rutas_;
      // ordenar de forma ascendete o descendente según el valor de la variable ascendente
      copia_rutas.sort((a, b) => {
        if (ascendente) {
          return a.getCalificacion - b.getCalificacion;
        }
        else {
          return b.getCalificacion - a.getCalificacion;
        }
      });
      // mostrar
      copia_rutas.forEach((ruta) => {
        console.log(`Nombre: ${ruta.getNombre}, Calificación: ${ruta.getCalificacion}`);
      });
      this.infoRutas();
    });
  }

  ordenarRutasPorActividad(){ //! PENDIENTE --> Es filtrar por actividad, o mostrar primero todas las rutas de una actividad y luego las de otra?
    let ascendente = true; // por defecto ascendente
    const prompt = inquirer.createPromptModule();
    prompt([
      {
        type: 'list',
        name: 'opcion',
        message: '¿Cómo deseas ordenar?',

        choices: [
          {name:'Ascendente', value: 'ascendente'},
          {name:'Descendente', value: 'descendente'},
        ]
      }

    ]).then((answers) => {
      if (answers.opcion === 'descendente') {
        ascendente = false;
      }
      // ordenar
      const copia_rutas = this.coleccion_rutas_;
      // ordenar de forma ascendete o descendente según el valor de la variable ascendente
      copia_rutas.sort((a, b) => {
        if (ascendente) {
          return a.getTipoActividad.localeCompare(b.getTipoActividad);
        }
        else {
          return b.getTipoActividad.localeCompare(a.getTipoActividad);
        }
      });
      // mostrar
      copia_rutas.forEach((ruta) => {
        console.log(`Nombre: ${ruta.getNombre}, Actividad: ${ruta.getTipoActividad}`);
      });
      this.infoRutas();
    });

  }



}

//? PRUEBAS
const coleccion_rutas = new rutaCollection();

coleccion_rutas.manageRutas();
// coleccion_rutas.infoRutas();