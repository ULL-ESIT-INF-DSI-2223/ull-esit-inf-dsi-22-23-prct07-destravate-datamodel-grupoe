import * as inquirer from "inquirer";
import { database } from "./bd";
import { Reto } from "./reto";
import { ID } from "./types";

/**
 * Clase que representa una colección de retos.
 * @class
 */
export class RetoCollection {
  private retos_: Reto[];

  /**
   * Constructor de la clase RetoCollection.
   * @constructor
   */
  constructor() {
    this.leerBD();
  }

  /**
   * Método que lee los elementos de la base de datos y los guarda en el array de retos.
   */
  leerBD() {
    const retos_aux = database.get("retos").value();
    const array_aux: Reto[] = [];
    retos_aux.forEach((reto) => {
      const group_aux: Reto = new Reto(reto.nombre, reto.rutas, reto.tipo_actividad, reto.km_totales, reto.usuarios);
      array_aux.push(group_aux);
    });
    this.setRetos = array_aux;  
  }

  //* MANAGE

  /**
   * Método que gestiona los retos.
   */
  manageRetos() {
    const prompt = inquirer.createPromptModule();
    prompt([
      {
        type: 'list',
        name: 'opcion',
        message: '¿Qué deseas hacer?',
        choices: [
          {name:'Añadir reto', value: 'añadir'},
          {name:'Eliminar retos', value: 'eliminar'},
          {name: 'Modificar', value: 'modificar'},
          {name:'Salir', value: 'Salir'},
        ]
      }
    ]).then((answers) => {
      switch (answers.opcion) {
        case 'añadir':
          this.promptAñadirReto();
          break;
        case 'eliminar':
          this.promptEliminarReto();
          break;
        case 'modificar':
          this.promptModificarReto();
          break;
        case 'Salir':
          // cerrar prompt
          process.exit(0);
          break;
      }
    });
  }  

  /**
   * Método que muestra un prompt para añadir un reto.
   */
  promptAñadirReto(){
    const prompt = inquirer.createPromptModule();
    prompt([
      {
        type: 'input',
        name: 'nombre',
        message: '¿Cuál es el nombre del reto?'
      },
      {
        type: 'input',
        name: 'rutas',
        message: '¿Cuáles son las rutas que lo componen?, introducir id1,id2,id3...'
      },
      {
        type: 'list',
        name: 'actividad',
        message: '¿Qué actividad realiza?',
        choices: [
          {name:'Ciclismo', value: 'Ciclismo'},
          {name:'Running', value: 'Running'},
        ]
      },
      {
        type: 'input',
        name: 'kms_totales',
        message: '¿Cuántos kms totales tiene el reto?'
      },
      {
        type: 'input',
        name: 'usuarios',
        message: '¿Cuáles son los usuarios que participan?, introduzca los ids separados por comas'
      }
    ]).then((answers) => {
      const rutas: ID[] = answers.rutas.split(","); 
      const usuarios: ID[] = answers.usuarios.split(",");
      const reto_aux = new Reto(answers.nombre, rutas, answers.actividad,answers.kms_totales, usuarios)
      this.retos_.push(reto_aux);
      this.manageRetos();
    });
  }

  /**
   * Método que muestra un prompt para eliminar un reto.
   */
  promptEliminarReto(){
    const prompt = inquirer.createPromptModule();
    prompt([
      {
        type: 'list',
        name: 'opcion',
        message: 'Elige un reto a eliminar',
        choices: this.retos_.map((reto) => {
          return {name: reto.getNombre, value: reto.getId};
        }
        )
      }
    ]).then((answers) => {
      this.eliminarReto(answers.opcion);
      this.manageRetos();
    });
  }

  eliminarReto(identificador: ID): Reto | undefined{
    let control_bool = false;
    let grupo_aux: Reto | undefined;

    this.retos_.forEach((reto, indice) => {
      if (reto.getId == identificador) {
        grupo_aux = reto;
        this.retos_.splice(indice, 1);
        control_bool = true;
        database.get("retos").splice(indice,1).write();
      }
    });
    if (control_bool) {
      return grupo_aux;
    }
    else {
      return undefined;
    }
  }

  /**
   * Método que muestra un prompt para modificar un reto.
   */
  promptModificarReto(){
    const prompt = inquirer.createPromptModule();
    prompt([
      {
        type: 'list',
        name: 'opcion',
        message: '¿Qué reto deseas modificar?',
        choices: this.retos_.map((reto) => {
          return {name: reto.getNombre, value: reto.getId};
        }
        )
      }
    ]).then((answers) => {
      this.modificarReto(answers.opcion);
    });

  }

  modificarReto(identificador: ID) {
    const prompt = inquirer.createPromptModule();

    let id_existe_en_coleccion = false;
    let indice = -1;
    this.retos_.forEach((reto, index) => {
      if (reto.getId == identificador) {
        id_existe_en_coleccion = true;
        indice = index;
      }
    }
    );
    if (!id_existe_en_coleccion) {
      console.log('No existe el grupo que se intenta modificar');
      return;
    }

    prompt([
      {
        type: 'list',
        name: 'opcion',
        message: '¿Qué deseas modificar?',
        choices: [
          {name:'Nombre', value: 'nombre'},
          {name:'Rutas', value: 'rutas'},
          {name:'Tipo de Actividad', value: 'actividad'},
          {name:'Usuarios', value: 'usuarios'},
        ]
      }
    ]).then((answers) => {
      switch (answers.opcion) {
        case 'nombre':
          prompt([
            {
              type: 'input',
              name: 'nombre',
              message: '¿Cuál es el nuevo nombre del reto?'
            }
          ]).then((answers) => {
            this.retos_[indice].setNombre = answers.nombre2;
            this.borrarElementoBD(identificador);
            const grupo_aux = new Reto(answers.nombre, this.retos_[indice].getRutas, this.retos_[indice].getTipoActividad,this.retos_[indice].getKmTotales, this.retos_[indice].getUsuarios, this.retos_[indice].getId);
            this.retos_.push(grupo_aux);
            this.retos_.splice(indice, 1);
            this.manageRetos();
          });
          break;
        case 'rutas':
          prompt([
            {
              type: 'list',
              name: 'rutas',
              message: '¿Insertar o Borrar?',
              choices: [
                {name:'Insertar', value: 'insertar'},
                {name:'Borrar', value: 'borrar'},
              ]
            },
          ]).then((answers) => {
            switch(answers.rutas){
              case 'insertar':
                prompt([
                  {
                    type: 'input',
                    name: 'rutas',
                    message: 'Introduce un nuevo ID de ruta'
                  }
                ]).then((answers) => {
                  this.retos_[indice].getRutas.push(answers.rutas);
                  this.borrarElementoBD(identificador);
                  const grupo_aux = new Reto(this.retos_[indice].getNombre, this.retos_[indice].getRutas, this.retos_[indice].getTipoActividad,this.retos_[indice].getKmTotales, this.retos_[indice].getUsuarios, this.retos_[indice].getId);
                  this.retos_.push(grupo_aux);
                  this.retos_.splice(indice, 1);
                  this.manageRetos();
                });
              break;

              case 'borrar':
                prompt([  
                  {
                    type: 'list',
                    name: 'rutas',
                    message: '¿Qué ruta deseas borrar?',
                    choices: this.retos_[indice].getRutas.map((ruta) => {
                      return {name: ruta, value: ruta};
                    })
                  }
                ]).then((answers) => {
                  this.retos_[indice].getRutas.forEach((ruta, index) => {
                    if (ruta == answers.rutas) {
                      this.retos_[indice].getRutas.splice(index, 1);
                    }
                  });
                  this.borrarElementoBD(identificador);
                  const grupo_aux = new Reto(this.retos_[indice].getNombre, this.retos_[indice].getRutas, this.retos_[indice].getTipoActividad,this.retos_[indice].getKmTotales, this.retos_[indice].getUsuarios, this.retos_[indice].getId);
                  this.retos_.push(grupo_aux);
                  this.retos_.splice(indice, 1);
                  this.manageRetos();
                });
              break;
            }
          });
          break;
        case 'actividad':
          prompt([
            {
              type: 'list',
              name: 'actividad',
              message: '¿Cuál es el nuevo tipo de actividad?',
              choices: [
                {name:'Bicicleta', value: 'bicicleta'},
                {name:'Correr', value: 'correr'},
              ]
            },
          ]).then((answers) => {
            this.retos_[indice].setTipoActividad = answers.actividad;
            this.borrarElementoBD(identificador);
            const grupo_aux = new Reto(this.retos_[indice].getNombre, this.retos_[indice].getRutas, this.retos_[indice].getTipoActividad,this.retos_[indice].getKmTotales, this.retos_[indice].getUsuarios, this.retos_[indice].getId);
            this.retos_.push(grupo_aux);
            this.retos_.splice(indice, 1);
            this.manageRetos();
          });
          break;
        case 'usuarios':
          prompt([
            {
              type: 'list',
              name: 'usuarios',
              message: '¿Insertar o Borrar?',
              choices: [
                {name:'Insertar', value: 'insertar'},
                {name:'Borrar', value: 'borrar'},
              ]
            },
          ]).then((answers) => {
            switch(answers.usuarios){
              case 'insertar':
                prompt([
                  {
                    type: 'input',
                    name: 'usuarios',
                    message: 'Introduce un nuevo ID de usuario'
                  }
                ]).then((answers) => {
                  this.retos_[indice].getUsuarios.push(answers.usuarios);
                  this.borrarElementoBD(identificador);
                  const grupo_aux = new Reto(this.retos_[indice].getNombre, this.retos_[indice].getRutas, this.retos_[indice].getTipoActividad,this.retos_[indice].getKmTotales, this.retos_[indice].getUsuarios, this.retos_[indice].getId);
                  this.retos_.push(grupo_aux);
                  this.retos_.splice(indice, 1);
                  this.manageRetos();
                });
                break;
              case 'borrar':
                prompt([
                  {
                    type: 'list',
                    name: 'usuarios',
                    message: '¿Qué usuario deseas borrar?',
                    choices: this.retos_[indice].getUsuarios.map((usuario) => {
                      return {name: usuario, value: usuario};
                    })
                  }
                ]).then((answers) => {
                  this.retos_[indice].getUsuarios.forEach((usuario, index) => {
                    if (usuario == answers.usuarios) {
                      this.retos_[indice].getUsuarios.splice(index, 1);
                    }
                  });
                  this.borrarElementoBD(identificador);
                  const grupo_aux = new Reto(this.retos_[indice].getNombre, this.retos_[indice].getRutas, this.retos_[indice].getTipoActividad,this.retos_[indice].getKmTotales, this.retos_[indice].getUsuarios, this.retos_[indice].getId);  
                  this.retos_.push(grupo_aux);
                  this.retos_.splice(indice, 1);
                  this.manageRetos();
                });
              break;
            }
          });
        break;
      }
    });
  }

  /**
   * Metodo para borrar un elemento de la base de datos
   * @param identificador 
   */
    borrarElementoBD(identificador: ID): boolean{
      this.retos_.forEach((reto, indice) => {
        if (reto.getId == identificador) {
          database.get("retos").splice(indice,1).write();
          return true;
        }
      });
      return false;
    }

  //* INFO

  /**
  * Método que muestra la información de los retos.
  */
  infoUsuario() {
    const prompt = inquirer.createPromptModule();
    prompt([
      {
        type: 'list',
        name: 'opcion',
        message: '¿Qué deseas ver?',
        choices: [
          {name:'Mostrar por orden alfabético los usuarios', value: 'alfabetico'},
          {name:'Ordenar por kms', value: 'kms'},
          {name:'Ordenar por nº de usuarios', value: 'num_usuarios'},
          {name:'Salir', value: 'Salir'},
        ]
      }
    ]).then((answers) => {
      switch (answers.opcion) {
        case 'alfabetico':
          this.ordenarRetosPorNombre();
          break;
        case 'kms':
          this.ordenarPorKms();
          break;
        case 'num_usuarios':
          this.ordenarPorNumUsuarios();
          break;
        case 'Salir':
          // cerrar prompt
          process.exit(0);
          break;
      }
    });
  }

  /**
   * Metodo para ordenar los retos por orden alfabetico.
   */
  ordenarRetosPorNombre() {
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
      const retos_grupos = this.retos_;
      // ordenar de forma ascendete o descendente según el valor de la variable ascendente
      retos_grupos.sort((a, b) => {
        if (ascendente) {
          return a.getNombre.localeCompare(b.getNombre);
        }
        else {
          return b.getNombre.localeCompare(a.getNombre);
        }
      });
      // mostrar
      retos_grupos.forEach((ruta) => {
        console.log(`Nombre: ${ruta.getNombre}`);
      });
      this.infoUsuario();
    });
  }

  /**
   * Metodo para ordenar los retos por kms.
   */
  ordenarPorKms() {
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
      const retos_grupos = this.retos_;
      // ordenar de forma ascendete o descendente según el valor de la variable ascendente
      retos_grupos.sort((a, b) => {
        if (ascendente) {
          return a.getKmTotales - b.getKmTotales;
        }
        else {
          return b.getKmTotales - a.getKmTotales;
        }
      });
      // mostrar
      retos_grupos.forEach((retos) => {
        console.log(`Kms semanales: ${retos.getKmTotales}`);
      });
      this.infoUsuario();
    });
  } 

  /**
   * Metodo para ordenar los retos por numero de usuarios.
   */
  ordenarPorNumUsuarios() {
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
      const retos_grupos = this.retos_;
      // ordenar de forma ascendete o descendente según el valor de la variable ascendente
      retos_grupos.sort((a, b) => {
        if (ascendente) {
          return a.getUsuarios.length - b.getUsuarios.length;
        }
        else {
          return b.getUsuarios.length - a.getUsuarios.length;
        }
      });
      // mostrar
      retos_grupos.forEach((retos) => {
        console.log(`Número de usuarios: ${retos.getUsuarios.length}`);
      });
      this.infoUsuario();
    });
  }

  //* GETTER Y SETTER

  /**
   * Método que devuelve el array de retos.
   * @returns Array de retos
   */
  get getRetos(): Reto[] {
    return this.retos_;
  }

  /**
   * Método que modifica el array de retos.
   * @param retos Array de retos
   */
  set setRetos(retos: Reto[]) {
    this.retos_ = retos;
  }
}

// ! TENEMOS QUE PROBAR LOS RETOS
// nombre: string, rutas: ID[], tipo_actividad: actividad, km_totales: number, usuarios: ID[]
// const reto0 = new Reto('Maraton', [1,2,3,4,5], "correr",200, [1,2]);
// const reto1 = new Reto('Triatlon', [2,3,4,5,6], "bicicleta",300, [3,4,5,6,7,8,9,10,11,12,13]);
// const reto2 = new Reto('Iron man', [9,8,7], "correr",50, [14,15,16,17,18,19]);

const retos = new RetoCollection();

//retos.infoUsuario();
retos.manageRetos();