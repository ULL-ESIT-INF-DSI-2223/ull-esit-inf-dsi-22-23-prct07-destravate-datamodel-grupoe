import {Ruta} from "./ruta";
import {ID, coordenadas} from "./types";
import * as inquirer from "inquirer";

import { database } from "./bd";

/**
 * Clase rutaCollection
 * @description Clase que representa una colección de rutas
 */
export class rutaCollection {
  private coleccion_rutas_: Ruta[];
  /**
   * Constructor por defecto
   * @param coleccion_rutas_ Array de rutas
   */
  constructor() {
    this.leerBD();
  }

  /**
   * Método que devuelve la colección de rutas
   * @returns Colección de rutas
   */
  get getRutas(): Ruta[] {
    return this.coleccion_rutas_;
  } 

  /**
   * Método que asigna la colección de rutas
   * @param coleccion_rutas Colección de rutas
   */
  set setRutas(coleccion_rutas: Ruta[]) {
    this.coleccion_rutas_ = coleccion_rutas;
  }

  /**
   * Método que lee de la base de datos y actualiza el array de rutas
   * @returns Array de ids de las rutas para las pruebas
   */
  leerBD(): ID[] {
    const rutas = database.get("rutas").value();
    const array_aux: Ruta[] = [];
    rutas.forEach((ruta) => {
      const ruta_aux: Ruta = new Ruta(ruta.nombre, ruta.geolocalizacion_inicio, ruta.geolocalizacion_fin, ruta.longitud, ruta.desnivel, ruta.usuarios , ruta.tipo_actividad, ruta.calificacion);
      array_aux.push(ruta_aux);
    });
    this.setRutas = array_aux;
    const array_aux2: ID[] = [];
    array_aux.forEach((ruta) => {
      array_aux2.push(ruta.getId);
    });
    return array_aux2;
  }

  /**
   * Metodo para borrar un elemento de la base de datos
   * @param identificador Identificador del elemento a borrar
   */
  borrarElementoBD(identificador: ID): boolean{
    this.coleccion_rutas_.forEach((ruta, indice) => {
      if (ruta.getId == identificador) {
        database.get("rutas").splice(indice,1).write();
        return true;
      }
    });
    return false;
  }

  /**
   * Método que borra una ruta de la colección de rutas y de la base de datos
   * @param identificador Identificador de la ruta a borrar
   * @returns Ruta eliminada o undefined en caso de que no existiera
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
   * Metodo para ejecutar el menú de rutas para borrar rutas de la base de datos
   */
  promptBorrarRuta(): void {
    const prompt = inquirer.createPromptModule();
    prompt([
      {
        type: 'list',
        name: 'id',
        message: 'Elige la ruta a borrar',
        choices: this.getRutas.map((ruta) => {
          return {name: ruta.getNombre, value: ruta.getId};
        }
        )
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
   * Metodo para ejecutar el menú de rutas para modificar rutas de la base de datos
   */
  promptModificarRuta():void {
    const prompt = inquirer.createPromptModule();
    prompt([
      {
        type: 'list',
        name: 'id',
        message: 'Elige la ruta a modificar',
        choices: this.getRutas.map((ruta) => {
          return {name: ruta.getNombre, value: ruta.getId};
        })
      }
    ]).then((answers) => {
      this.modificarRuta(answers.id);
    });
  }

  /**
   * Metodo para modificar una ruta
   * @param identificador Id de la ruta a modificar
   */
  modificarRuta(identificador: ID): void {
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
            const ruta_aux = new Ruta(this.coleccion_rutas_[indice].getNombre, this.coleccion_rutas_[indice].getGeolocalizacionInicio, this.coleccion_rutas_[indice].getGeolocalizacionFin, this.coleccion_rutas_[indice].getLongitud, this.coleccion_rutas_[indice].getDesnivel, this.coleccion_rutas_[indice].getUsuarios, this.coleccion_rutas_[indice].getTipoActividad, this.coleccion_rutas_[indice].getCalificacion, this.coleccion_rutas_[indice].getId);
            this.coleccion_rutas_.push(ruta_aux);
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
   * Método que maneja el menú para añadir una nueva ruta
   */
  promptAddRuta() {
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
      coordenadas_inicio = [answers.geolocalizacion_inicioX, answers.geolocalizacion_inicioY, answers.geolocalizacion_inicioZ];
      coordenadas_fin = [answers.geolocalizacion_finX, answers.geolocalizacion_finY, answers.geolocalizacion_finZ];
      const array_usuarios: ID[] = answers.usuario.split(',');
      const nueva_ruta = new Ruta(answers.nombre, coordenadas_inicio, coordenadas_fin, answers.longitud, answers.desnivel, array_usuarios, answers.tipo_actividad, answers.calificacion);
      this.coleccion_rutas_.push(nueva_ruta);
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
          process.exit(0);
          break;
      }
    });
  }

  /**
   * Método que ordena las rutas por nombre
   */
  ordenarRutasPorNombre() {
    let ascendente = true;
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
      const copia_rutas = this.coleccion_rutas_;
      copia_rutas.sort((a, b) => {
        if (ascendente) {
          return a.getNombre.localeCompare(b.getNombre);
        }
        else {
          return b.getNombre.localeCompare(a.getNombre);
        }
      });
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
    let ascendente = true;
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
      const copia_rutas = this.coleccion_rutas_;
      copia_rutas.sort((a, b) => {
        if (ascendente) {
          return a.getUsuarios.length - b.getUsuarios.length;
        }
        else {
          return b.getUsuarios.length - a.getUsuarios.length;
        }
      }
      );
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
    let ascendente = true;
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
      const copia_rutas = this.coleccion_rutas_;
      copia_rutas.sort((a, b) => {
        if (ascendente) {
          return a.getLongitud - b.getLongitud;
        }
        else {
          return b.getLongitud - a.getLongitud;
        }
      });
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
    let ascendente = true;
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
      const copia_rutas = this.coleccion_rutas_;
      copia_rutas.sort((a, b) => {
        if (ascendente) {
          return a.getCalificacion - b.getCalificacion;
        }
        else {
          return b.getCalificacion - a.getCalificacion;
        }
      });
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
    let ascendente = true;
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
      const copia_rutas = this.coleccion_rutas_;
      copia_rutas.sort((a, b) => {
        if (ascendente) {
          return a.getTipoActividad.localeCompare(b.getTipoActividad);
        }
        else {
          return b.getTipoActividad.localeCompare(a.getTipoActividad);
        }
      });
      copia_rutas.forEach((ruta) => {
        console.log(`Nombre: ${ruta.getNombre}, Actividad: ${ruta.getTipoActividad}`);
      });
      this.infoRutas();
    });
  }
}

// const eje_x0:coordenadas = {
//   letra : "X",
//   coordenada : 10
// }
// const eje_y0: coordenadas = {
//   letra : "Y",
//   coordenada : 20
// }
// const eje_z0: coordenadas = {
//   letra : "Z",
//   coordenada : 30
// }


// const eje_x1:coordenadas = {
//   letra : "X",
//   coordenada : 12435
// }
// const eje_y1: coordenadas = {
//   letra : "Y",
//   coordenada : 1234325436
// }
// const eje_z1: coordenadas = {
//   letra : "Z",
//   coordenada : 1232
// }


// const eje_x2:coordenadas = {
//   letra : "X",
//   coordenada : 214
// }
// const eje_y2: coordenadas = {
//   letra : "Y",
//   coordenada : 20213
// }
// const eje_z2: coordenadas = {
//   letra : "Z",
//   coordenada : 3023
// }

// const eje_x3:coordenadas = {
//   letra : "X",
//   coordenada : 10
// }
// const eje_y3: coordenadas = {
//   letra : "Y",
//   coordenada : 20
// }
// const eje_z3: coordenadas = {
//   letra : "Z",
//   coordenada : 30
// }


// const eje_x4:coordenadas = {
//   letra : "X",
//   coordenada : 1010
// }
// const eje_y4: coordenadas = {
//   letra : "Y",
//   coordenada : 2020
// }
// const eje_z4: coordenadas = {
//   letra : "Z",
//   coordenada : 3030
// }


// const eje_x5:coordenadas = {
//   letra : "X",
//   coordenada : 1001
// }
// const eje_y5: coordenadas = {
//   letra : "Y",
//   coordenada : 2002
// }
// const eje_z5: coordenadas = {
//   letra : "Z",
//   coordenada : 3003
// }

// const eje_x6:coordenadas = {
//   letra : "X",
//   coordenada : 101010
// }
// const eje_y6: coordenadas = {
//   letra : "Y",
//   coordenada : 202020
// }
// const eje_z6: coordenadas = {
//   letra : "Z",
//   coordenada : 3030330
// }


// const eje_x7:coordenadas = {
//   letra : "X",
//   coordenada : 1001010110
// }
// const eje_y7: coordenadas = {
//   letra : "Y",
//   coordenada : 2020202020
// }
// const eje_z7: coordenadas = {
//   letra : "Z",
//   coordenada : 303403030
// }


// const eje_x8:coordenadas = {
//   letra : "X",
//   coordenada : 101231
// }
// const eje_y8: coordenadas = {
//   letra : "Y",
//   coordenada : 2021314
// }
// const eje_z8: coordenadas = {
//   letra : "Z",
//   coordenada : 301324
// }


// const eje_x9:coordenadas = {
//   letra : "X",
//   coordenada : 10000001
// }
// const eje_y9: coordenadas = {
//   letra : "Y",
//   coordenada : 202020202
// }
// const eje_z9: coordenadas = {
//   letra : "Z",
//   coordenada : 30000003
// }

// const ruta0 = new Ruta('San Vicente', [eje_x0, eje_y0, eje_z0], [eje_x1, eje_y1, eje_z1], 1000, 200, [1,2,3], "correr", 9);
// const ruta1 = new Ruta('Plaza el charco', [eje_x2, eje_y2, eje_z2], [eje_x3, eje_y3, eje_z3], 2000, 200, [2,3 ,4 ], "bicicleta", 8);
// const ruta2 = new Ruta('Adventour', [eje_x4, eje_y4, eje_z4], [eje_x5, eje_y5, eje_z5], 300, 200, [6,7,8], "correr", 8);
// const ruta3 = new Ruta('Hop-On Hop-off', [eje_x6, eje_y6, eje_z6], [eje_x7, eje_y7, eje_z7], 400, 200, [9,10,11], "bicicleta", 5);
// const ruta4 = new Ruta('Mind the Gap', [eje_x8, eje_y8, eje_z8], [eje_x9, eje_y9, eje_z9], 5000, 200, [12,13,14], "correr", 6);
// const ruta5 = new Ruta('City Sightseeing', [eje_x0, eje_y0, eje_z0], [eje_x9, eje_y9, eje_z9], 6100, 200, [15,16,17], "bicicleta", 7);
// const ruta6 = new Ruta('La ruta real', [eje_x2, eje_y2, eje_z2], [eje_x7, eje_y7, eje_z7], 1200, 200, [18,19], "correr", 5);
// const ruta7 = new Ruta('Keep Calm and travel On', [eje_x4, eje_y4, eje_z4], [eje_x1, eje_y1, eje_z1], 3100, 200, [1,2,3], "bicicleta", 1);
// const ruta8 = new Ruta('Wander Rush', [eje_x6, eje_y6, eje_z6], [eje_x3, eje_y3, eje_z3], 1040, 200, [5,6,7], "correr", 9);
// const ruta9 = new Ruta('My BigFat City Tour', [eje_x8, eje_y8, eje_z8], [eje_x5, eje_y5, eje_z5], 1000, 200, [8,7,6], "bicicleta", 10);