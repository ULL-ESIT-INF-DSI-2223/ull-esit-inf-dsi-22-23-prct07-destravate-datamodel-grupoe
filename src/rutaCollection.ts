import {Ruta} from "./ruta";
import {ID, coordenadas} from "./types";
import * as inquirer from "inquirer";
// import { Usuario } from "./usuario";

import {database} from "./ruta";


/**
 * Clase rutaCollection
 * @description Clase que representa una colección de rutas
 */
class rutaCollection {
  private coleccion_rutas_: Ruta[];
  /**
   * Constructor por defecto
   * @param coleccion_rutas_ array de rutas
   */
  constructor() {

    this.leerBD();
  }

  /**
   * getter coleccion_rutas_
   * @returns array de rutas
   */
  get getRutas(): Ruta[] {
    return this.coleccion_rutas_;
  } 

  /**
   * setter coleccion_rutas_
   * @param coleccion_rutas array de rutas
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
      const ruta_aux: Ruta = new Ruta(ruta.nombre, ruta.geolocalizacion_inicio, ruta.geolocalizacion_fin, ruta.longitud, ruta.desnivel, ruta.usuarios , ruta.tipo_actividad, ruta.calificacion);
      array_aux.push(ruta_aux);
    });
    this.setRutas = array_aux;
  }

  /**
   * Metodo para borrar un elemento de la base de datos
   * @param identificador 
   */
  borrarElementoBD(identificador: ID): void {
    this.coleccion_rutas_.forEach((ruta, indice) => {
      if (ruta.getId == identificador) {
        database.get("rutas").splice(indice,1).write();
      }
    });
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
        database.get("rutas").splice(indice,1).write();
      }
    });
    if (control_bool) {
      return ruta_aux;
    }
    else {
      return undefined;
    }
  }

  /**
   * Metodo para ejecutar el menu de rutas para borrar elementos de la bd
   */
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

  /**
   * Metodo para ejecutar el menu de rutas para modificar elementos de la bd
   */
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

  /**
   * Metodo para modificar una ruta
   * @param identificador -- id de la ruta a modificar
   */
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
      const coordenadaX: coordenadas = {
        letra: 'X',
        coordenada: 0
      }
      const coordenadaY: coordenadas = {
        letra: 'Y',
        coordenada: 0
      }
      const coordenadaZ: coordenadas = {
        letra: 'Z',
        coordenada: 0
      }
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
            this.borrarElementoBD(identificador);
            const ruta_aux = new Ruta(this.coleccion_rutas_[indice].getNombre, this.coleccion_rutas_[indice].getGeolocalizacionInicio, this.coleccion_rutas_[indice].getGeolocalizacionFin, this.coleccion_rutas_[indice].getLongitud, this.coleccion_rutas_[indice].getDesnivel, this.coleccion_rutas_[indice].getUsuarios, this.coleccion_rutas_[indice].getTipoActividad, this.coleccion_rutas_[indice].getCalificacion, this.coleccion_rutas_[indice].getId);
            this.coleccion_rutas_.push(ruta_aux);
            this.coleccion_rutas_.splice(indice, 1);
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
            coordenadaX.coordenada = parseFloat(answers.x);
            coordenadaY.coordenada = parseFloat(answers.y);
            coordenadaZ.coordenada = parseFloat(answers.z);

            this.coleccion_rutas_[indice].setGeolocalizacionInicio = [coordenadaX, coordenadaY, coordenadaZ];
            this.borrarElementoBD(identificador);
            const ruta_aux = new Ruta(this.coleccion_rutas_[indice].getNombre, this.coleccion_rutas_[indice].getGeolocalizacionInicio, this.coleccion_rutas_[indice].getGeolocalizacionFin, this.coleccion_rutas_[indice].getLongitud, this.coleccion_rutas_[indice].getDesnivel, this.coleccion_rutas_[indice].getUsuarios, this.coleccion_rutas_[indice].getTipoActividad, this.coleccion_rutas_[indice].getCalificacion, this.coleccion_rutas_[indice].getId);
            this.coleccion_rutas_.push(ruta_aux);
            this.coleccion_rutas_.splice(indice, 1);

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
            coordenadaX.coordenada = parseFloat(answers.x);
            coordenadaY.coordenada = parseFloat(answers.y);
            coordenadaZ.coordenada = parseFloat(answers.z);

            this.coleccion_rutas_[indice].setGeolocalizacionFin = [coordenadaX, coordenadaY, coordenadaZ];
            this.borrarElementoBD(identificador);
            const ruta_aux = new Ruta(this.coleccion_rutas_[indice].getNombre, this.coleccion_rutas_[indice].getGeolocalizacionInicio, this.coleccion_rutas_[indice].getGeolocalizacionFin, this.coleccion_rutas_[indice].getLongitud, this.coleccion_rutas_[indice].getDesnivel, this.coleccion_rutas_[indice].getUsuarios, this.coleccion_rutas_[indice].getTipoActividad, this.coleccion_rutas_[indice].getCalificacion, this.coleccion_rutas_[indice].getId);
            this.coleccion_rutas_.push(ruta_aux);
            this.coleccion_rutas_.splice(indice, 1);
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
            this.borrarElementoBD(identificador);
            // creamos nuevo elemento y a su vez lo escribimos en la base de datos
            const ruta_aux = new Ruta(this.coleccion_rutas_[indice].getNombre, this.coleccion_rutas_[indice].getGeolocalizacionInicio, this.coleccion_rutas_[indice].getGeolocalizacionFin, this.coleccion_rutas_[indice].getLongitud, this.coleccion_rutas_[indice].getDesnivel, this.coleccion_rutas_[indice].getUsuarios, this.coleccion_rutas_[indice].getTipoActividad, this.coleccion_rutas_[indice].getCalificacion, this.coleccion_rutas_[indice].getId);
            // lo introducimos en la coleccion
            this.coleccion_rutas_.push(ruta_aux);
            // borramos la ruta
            // this.borrarRuta(identificador);
            this.coleccion_rutas_.splice(indice, 1);
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
            this.borrarElementoBD(identificador);
            const ruta_aux = new Ruta(this.coleccion_rutas_[indice].getNombre, this.coleccion_rutas_[indice].getGeolocalizacionInicio, this.coleccion_rutas_[indice].getGeolocalizacionFin, this.coleccion_rutas_[indice].getLongitud, this.coleccion_rutas_[indice].getDesnivel, this.coleccion_rutas_[indice].getUsuarios, this.coleccion_rutas_[indice].getTipoActividad, this.coleccion_rutas_[indice].getCalificacion, this.coleccion_rutas_[indice].getId);
            this.coleccion_rutas_.push(ruta_aux);
            this.coleccion_rutas_.splice(indice, 1);
            this.manageRutas();
          }
          );
          break;

        case 'usuario':
          // las opciones son añadir una nueva lista de usuarios, eliminar un usuario o añadir un nuevo usuario
          prompt([
            {
              type: 'list',
              name: 'usuarios',
              message: '¿Qué quieres hacer con los usuarios?',
              choices: [
                'Añadir una nueva lista de usuarios',
                'Eliminar un usuario',
                'Añadir un nuevo usuario'
              ]
            }
          ]).then((answers) => {
            switch (answers.usuarios) {
              case 'Añadir una nueva lista de usuarios':
                prompt([
                  {
                    type: 'input',
                    name: 'usuario',
                    message: 'Introduce los usuarios de la ruta separados por comas',
                  }
                ]).then((answers) => {
                  this.coleccion_rutas_[indice].setUsuarios = answers.usuario.split(',');
                  this.borrarElementoBD(identificador);
                  const ruta_aux = new Ruta(this.coleccion_rutas_[indice].getNombre, this.coleccion_rutas_[indice].getGeolocalizacionInicio, this.coleccion_rutas_[indice].getGeolocalizacionFin, this.coleccion_rutas_[indice].getLongitud, this.coleccion_rutas_[indice].getDesnivel, this.coleccion_rutas_[indice].getUsuarios, this.coleccion_rutas_[indice].getTipoActividad, this.coleccion_rutas_[indice].getCalificacion, this.coleccion_rutas_[indice].getId);
                  this.coleccion_rutas_.push(ruta_aux);
                  this.coleccion_rutas_.splice(indice, 1);
                  this.manageRutas();
                });
              break;

              case 'Eliminar un usuario':
                // imprimir usuarios de la ruta
                console.log("Usuarios de la ruta: " + this.coleccion_rutas_[indice].getUsuarios);
                prompt([
                  {
                    type: 'input',
                    name: 'usuario',
                    message: 'Introduce el usuario que quieres eliminar',
                  }
                ]).then((answers) => {
                  const usuarios = this.coleccion_rutas_[indice].getUsuarios;
                  const indice_usuario = usuarios.indexOf(answers.usuario);
                  usuarios.splice(indice_usuario, 1);
                  this.coleccion_rutas_[indice].setUsuarios = usuarios;
                  this.borrarElementoBD(identificador);
                  const ruta_aux = new Ruta(this.coleccion_rutas_[indice].getNombre, this.coleccion_rutas_[indice].getGeolocalizacionInicio, this.coleccion_rutas_[indice].getGeolocalizacionFin, this.coleccion_rutas_[indice].getLongitud, this.coleccion_rutas_[indice].getDesnivel, this.coleccion_rutas_[indice].getUsuarios, this.coleccion_rutas_[indice].getTipoActividad, this.coleccion_rutas_[indice].getCalificacion, this.coleccion_rutas_[indice].getId);
                  this.coleccion_rutas_.push(ruta_aux);
                  this.coleccion_rutas_.splice(indice, 1);
                  this.manageRutas();
                });
              break;

              case 'Añadir un nuevo usuario':
                console.log("Usuarios de la ruta: " + this.coleccion_rutas_[indice].getUsuarios);
                prompt([
                  {
                    type: 'input',
                    name: 'usuario',
                    message: 'Introduce el usuario que quieres añadir',
                  }
                ]).then((answers) => {
                  const usuarios = this.coleccion_rutas_[indice].getUsuarios;
                  // comprobar que no está repetido
                  if (usuarios.indexOf(answers.usuario) != -1) {
                    console.log("El usuario ya está en la lista");
                    this.manageRutas();
                  }
                  else  {
                    usuarios.push(answers.usuario);
                    this.coleccion_rutas_[indice].setUsuarios = usuarios;
                    this.borrarElementoBD(identificador);
                    const ruta_aux = new Ruta(this.coleccion_rutas_[indice].getNombre, this.coleccion_rutas_[indice].getGeolocalizacionInicio, this.coleccion_rutas_[indice].getGeolocalizacionFin, this.coleccion_rutas_[indice].getLongitud, this.coleccion_rutas_[indice].getDesnivel, this.coleccion_rutas_[indice].getUsuarios, this.coleccion_rutas_[indice].getTipoActividad, this.coleccion_rutas_[indice].getCalificacion, this.coleccion_rutas_[indice].getId);
                    this.coleccion_rutas_.push(ruta_aux);
                    this.coleccion_rutas_.splice(indice, 1);
                    this.manageRutas();
                  }
                });
              break;
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
            this.borrarElementoBD(identificador);
            const ruta_aux = new Ruta(this.coleccion_rutas_[indice].getNombre, this.coleccion_rutas_[indice].getGeolocalizacionInicio, this.coleccion_rutas_[indice].getGeolocalizacionFin, this.coleccion_rutas_[indice].getLongitud, this.coleccion_rutas_[indice].getDesnivel, this.coleccion_rutas_[indice].getUsuarios, this.coleccion_rutas_[indice].getTipoActividad, this.coleccion_rutas_[indice].getCalificacion, this.coleccion_rutas_[indice].getId);
            this.coleccion_rutas_.push(ruta_aux);
            this.coleccion_rutas_.splice(indice, 1);
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
            this.borrarElementoBD(identificador);
            const ruta_aux = new Ruta(this.coleccion_rutas_[indice].getNombre, this.coleccion_rutas_[indice].getGeolocalizacionInicio, this.coleccion_rutas_[indice].getGeolocalizacionFin, this.coleccion_rutas_[indice].getLongitud, this.coleccion_rutas_[indice].getDesnivel, this.coleccion_rutas_[indice].getUsuarios, this.coleccion_rutas_[indice].getTipoActividad, this.coleccion_rutas_[indice].getCalificacion, this.coleccion_rutas_[indice].getId);
            this.coleccion_rutas_.push(ruta_aux);
            this.coleccion_rutas_.splice(indice, 1);
            this.manageRutas();
          }
          );
          break;
      }
    });
  }

  /**
   * Método que maneja el menu para añadir una nueva ruta
   */
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
      {
        type: 'input',
        name: 'usuario',
        message: 'Introduce el usuario de la nueva ruta (de la forma "id1,id2,..."  las comas)',
      },
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
      const array_usuarios: ID[] = answers.usuario.split(',');
      const nueva_ruta = new Ruta(answers.nombre, coordenadas_inicio, coordenadas_fin, answers.longitud, answers.desnivel, array_usuarios, answers.tipo_actividad, answers.calificacion);
      this.coleccion_rutas_.push(nueva_ruta);
      // escribir en la base
      this.manageRutas();
    });
  }

  /**
   * Metodo que gestiona el prompt de la clase Ruta
   */
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

  /**
   * Método que muestra las rutas ordenadas por el criterio que se le pase
   */
  infoRutas(): void {
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
          {name:'Mostrar por actividad (Correr o Bicicleta)', value: 'actividad'},
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
          process.exit(0);
          break;
      }
    });
  }

  /**
   * Método que ordena las rutas por nombre
   */
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
        console.log(`Nombre: ${ruta.getNombre}`);
      });
      this.infoRutas();
    });
  }

  /**
   * Método que ordena las rutas por cantidad de usuarios
   */
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

  /**
   * Método que ordena las rutas por longitud
   */
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

  /**
   * Método que ordena las rutas por calificación
   */
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

  /**
   * Método que ordena las rutas por actividad
   */
  ordenarRutasPorActividad(){
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





// ! Borrar después


// const coleccion_rutas = new rutaCollection();

//coleccion_rutas.infoRutas();
// coleccion_rutas.manageRutas();