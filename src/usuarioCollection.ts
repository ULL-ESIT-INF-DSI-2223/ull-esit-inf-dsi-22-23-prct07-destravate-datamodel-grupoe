import { Usuario } from "./usuario";
import * as inquirer from "inquirer";
// base de datos
import { database } from "./bd";
import { estadisticaEntrenamiento, estadistica, ID}  from './types';



/**
 * @class usuarioCollection
 * @description Clase que representa una colección de usuarios
 */
export class usuarioCollection {
  private usuarios: Usuario[] = [];

  /**
   * Constructor de la clase 
   */
  constructor() {
    this.leerBD();
  }

  /**
   * Método que lee la base de datos y la carga en el array de usuarios
   */
  leerBD() {
    const usuarios_aux = database.get("usuarios").value();
    const array_aux: Usuario[] = [];
    usuarios_aux.forEach((user) => {
      const user_aux: Usuario = new Usuario(user.nombre, user.actividad, user.amigos, user.grupo_de_amigos, user.estadisticas, user.historicoRutas, user.retos, user.id);
      array_aux.push(user_aux);
    });
    this.setUsuarios = array_aux;  
  }
  
  /**
   * Método que controla el menú de usuarios
   */
  manageUsuarios() {
    const prompt = inquirer.createPromptModule();
    prompt([
      {
        type: 'list',
        name: 'opcion',
        message: 'Manejo de Usuarios, ¿qué quieres hacer?',
        choices: [
          {name:'Añadir Usuario', value: 'add'},
          {name:'Borrar Usuario', value: 'remove'},
          {name:'Modificar Usuario', value: 'modify'},
          {name:'Salir', value: 'Salir'},
        ]
      }
    ]).then((answers) => {
      if (answers.opcion === 'add') {
        this.promptAddUser();
      }
      else if (answers.opcion === 'remove') {
        this.promptBorrarUser();
      }
      else if (answers.opcion === 'modify') {
        this.promptModificarUser();
      }
      else if (answers.opcion === 'Salir') {
        // cerrar prompt
        process.exit(0);
      }
    });
  }
  
  /**
   * Método que controla el menú de borrar usuarios
   */
  promptBorrarUser() {
    const prompt = inquirer.createPromptModule();
    prompt([
      {
        type: 'list',
        name: 'opcion',
        message: '¿Qué usuario quieres borrar? Introduce su ID: ',
        choices: this.usuarios.map((user) => {
          return {name: user.getNombre, value: user.getID};
        })
      }
    ]).then((answers) => {
      this.borrarUsuario(answers.opcion);
      this.manageUsuarios();
    });
  }

  /**
   * Método que borra un usuario de la base de datos
   * @param id 
   */
  borrarUsuario(id: number) {
    let control_bool = false;
    this.usuarios.forEach((user, indice) => {
      if (user.getID == id) {
        this.usuarios.splice(indice, 1);
        control_bool = true;
        database.get("usuarios").splice(indice,1).write();
      }
    });
    if (control_bool) {
      console.log("Usuario borrado");
    }
    else {
      console.log("No se ha encontrado el usuario");
    }
  }

  /**
   * Método que controla el menú para añadir usuarios
   */
  promptAddUser() {
    const prompt = inquirer.createPromptModule();
    prompt([
      { 
        type: 'input',
        name: 'nombre',
        message: 'Introduce el nombre del usuario: '
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
        name: 'amigos',
        message: 'Introduce los IDs de los amigos del usuario "id1,id2,...": '
      },
      {
        type: 'input',
        name: 'grupo_de_amigos',
        message: 'Inserta los grupos de amigos de la forma "id1,id2,...;id3,id4,...": ',
      },
      {
        type: 'input',
        name: 'estadisticas1',
        message: 'Introduce las estadísticas de la semana: "km,desnivel"',
      },
      {
        type: 'input',
        name: 'estadisticas2',
        message: 'Introduce las estadísticas del mes: "km,desnivel"',
      },
      {
        type: 'input',
        name: 'estadisticas3',
        message: 'Introduce las estadísticas del año: "km,desnivel"',
      },
      {
        type: 'input',
        name: 'historicoRutas',
        message: '¿Qué rutas ha realizado? "id1,id2,..."',
      },
      {
        type: 'input',
        name: 'retos',
        message: '¿Qué retos ha realizado? "id1,id2,..."',
        
      },
    ]).then((answers) => {
      const amigos_aux = answers.amigos.split(",");
      const historicoRutas_aux = answers.historicoRutas.split(",");
      const retos_aux = answers.retos.split(",");
      const grupos_aux = answers.grupo_de_amigos.split(";");
      const estadisticas_aux = [];
      estadisticas_aux.push(answers.estadisticas1.split(","));
      estadisticas_aux.push(answers.estadisticas2.split(","));
      estadisticas_aux.push(answers.estadisticas3.split(","));

      const est1: estadistica = {km: parseInt(estadisticas_aux[0][0]), desnivel: parseInt(estadisticas_aux[0][1])};
      const est2: estadistica = {km: parseInt(estadisticas_aux[1][0]), desnivel: parseInt(estadisticas_aux[1][1])};
      const est3: estadistica = {km: parseInt(estadisticas_aux[2][0]), desnivel: parseInt(estadisticas_aux[2][1])};

      const estadisticas: estadisticaEntrenamiento = {
        semana: est1,
        mes: est2,
        año: est3
      }

      const user_aux = new Usuario(answers.nombre, answers.actividad, amigos_aux, grupos_aux, estadisticas, historicoRutas_aux, retos_aux);
      this.usuarios.push(user_aux);
      this.manageUsuarios();
    });
  }

  /**
   * Método que controla el menú para modificar usuarios
   */
  promptModificarUser() {
    const prompt = inquirer.createPromptModule();
    prompt([
      {
        type: 'list',
        name: 'opcion',
        message: '¿Qué usuario quieres modificar? ',
        choices: this.usuarios.map((user) => {
          return {name: user.getNombre, value: user.getID};
        })
      }
    ]).then((answers) => {
      this.modificarUsuario(answers.opcion);
    });
  }

    /**
   * Metodo para borrar un elemento de la base de datos
   * @param identificador 
   */
    borrarElementoBD(identificador: ID): boolean{
      this.usuarios.forEach((user, indice) => {
        if (user.getID == identificador) {
          database.get("usuarios").splice(indice,1).write();
          return true;
        }
      });
      return false;
    }
    
  /**
   * Método que modifica un usuario
   * @param identificador 
   * @returns 
   */
  modificarUsuario(identificador: ID) {
    let id_existe_en_coleccion = false;
    let indice = -1;
    this.usuarios.forEach((user, index) => {
      if (user.getID == identificador) {
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
          {name:'Actividad', value: 'actividad'},
          {name:'Amigos', value: 'amigos'},
          {name:'Grupos de amigos', value: 'grupos_de_amigos'},
          {name:'Estadísticas', value: 'estadisticas'},
          {name:'Historico de rutas', value: 'historico_rutas'},
          {name:'Retos', value: 'retos'},
        ]
      }
    ]).then((answers) => {
      switch (answers.opcion) {
        case 'nombre':
          prompt([
            {
              type: 'input',
              name: 'nombre2',
              message: 'Introduce el nuevo nombre del usuario',
            }
          ]).then((answers) => {
            this.usuarios[indice].setNombre = answers.nombre2;
            this.borrarElementoBD(identificador);
            const ruta_aux = new Usuario(this.usuarios[indice].getNombre, this.usuarios[indice].getActividad, this.usuarios[indice].getAmigos, this.usuarios[indice].getGrupoAmigos, this.usuarios[indice].getEstadisticas, this.usuarios[indice].getHistoricoRutas, this.usuarios[indice].getRetos, this.usuarios[indice].getID);
            this.usuarios.push(ruta_aux);
            this.usuarios.splice(indice, 1);

            this.manageUsuarios();
          }
          );
          break;
        case 'actividad':
          
          prompt([
            {
              type: 'list',
              name: 'actividad',
              message: '¿Qué actividad realiza?',
              choices: [
                {name:'Bicicleta', value: 'Bicicleta'},
                {name:'Correr', value: 'Correr'},
              ]
            }
          ]).then((answers) => {
            this.usuarios[indice].setActividad = answers.actividad;
            this.borrarElementoBD(identificador);
            const ruta_aux = new Usuario(this.usuarios[indice].getNombre, this.usuarios[indice].getActividad, this.usuarios[indice].getAmigos, this.usuarios[indice].getGrupoAmigos, this.usuarios[indice].getEstadisticas, this.usuarios[indice].getHistoricoRutas, this.usuarios[indice].getRetos, this.usuarios[indice].getID);
            this.usuarios.push(ruta_aux);
            this.usuarios.splice(indice, 1);
            this.manageUsuarios();          
          });

          break;
        case 'amigos':
          prompt
          ([
            {
              type: 'list',
              name: 'amigos',
              message: '¿Qué deseas hacer?',
              choices: [
                {name:'Añadir amigo', value: 'añadir'},
                {name:'Eliminar amigo', value: 'eliminar'},
                {name:'Nueva lista de amigos', value: 'nuevo'},
              ]
            }
          ]).then((answers) => {
            switch (answers.amigos) {
              case 'añadir':
                prompt([
                  {
                    type: 'input',
                    name: 'amigo',
                    message: 'Introduce el id del amigo',
                  }
                ]).then((answers) => {
                  this.usuarios[indice].setAmigos = this.usuarios[indice].getAmigos.concat(answers.amigo);  
                  this.borrarElementoBD(identificador);
                  const ruta_aux = new Usuario(this.usuarios[indice].getNombre, this.usuarios[indice].getActividad, this.usuarios[indice].getAmigos, this.usuarios[indice].getGrupoAmigos, this.usuarios[indice].getEstadisticas, this.usuarios[indice].getHistoricoRutas, this.usuarios[indice].getRetos, this.usuarios[indice].getID);
                  this.usuarios.push(ruta_aux);
                  this.usuarios.splice(indice, 1);
                  this.manageUsuarios();
                });
              break;
              case 'eliminar':
                prompt([
                  {
                    type: 'list',
                    name: 'id',
                    message: '¿Qué amigo quieres eliminar?',
                    choices: this.usuarios[indice].getAmigos.map((amigo) => {
                      return {name: amigo, value: amigo};
                    }
                    )
                  }
                ]).then((answers) => {
                  this.usuarios[indice].setAmigos = this.usuarios[indice].getAmigos.filter((amigo) => {
                    return amigo != answers.id;
                  }
                  );
                  this.borrarElementoBD(identificador);
                  const ruta_aux = new Usuario(this.usuarios[indice].getNombre, this.usuarios[indice].getActividad, this.usuarios[indice].getAmigos, this.usuarios[indice].getGrupoAmigos, this.usuarios[indice].getEstadisticas, this.usuarios[indice].getHistoricoRutas, this.usuarios[indice].getRetos, this.usuarios[indice].getID);
                  this.usuarios.push(ruta_aux);
                  this.usuarios.splice(indice, 1);
                  this.manageUsuarios();
                });
              break;

              case 'nuevo':
                prompt([
                  {
                    type: 'input',
                    name: 'amigo',
                    message: 'Introduce nueva lista de amigos "id1,id2,..."',
                  }
                ]).then((answers) => {
                  this.usuarios[indice].setAmigos = answers.amigo.split(',');
                  this.borrarElementoBD(identificador);
                  const ruta_aux = new Usuario(this.usuarios[indice].getNombre, this.usuarios[indice].getActividad, this.usuarios[indice].getAmigos, this.usuarios[indice].getGrupoAmigos, this.usuarios[indice].getEstadisticas, this.usuarios[indice].getHistoricoRutas, this.usuarios[indice].getRetos, this.usuarios[indice].getID);
                  this.usuarios.push(ruta_aux);
                  this.usuarios.splice(indice, 1);
                  this.manageUsuarios();
                });
              break;
            }
          });

                
          break;
        case 'grupos_de_amigos':
          prompt([
            {
              type: 'list',
              name: 'grupos',
              message: '¿Qué deseas hacer?',
              choices: [
                {name:'Añadir grupo', value: 'añadir'},
                {name:'Eliminar grupo', value: 'eliminar'},
              ]
            }
          ]).then((answers) => {
            switch (answers.grupos) {
              case 'añadir':
                prompt([
                  {
                    type: 'input',
                    name: 'grupo',
                    message: 'Introduce el id del grupo de amigos "id1,id2"',
                  }
                ]).then((answers) => {  
                  this.usuarios[indice].setGrupoAmigos = this.usuarios[indice].getGrupoAmigos.concat(answers.grupo);
                  this.borrarElementoBD(identificador);
                  const ruta_aux = new Usuario(this.usuarios[indice].getNombre, this.usuarios[indice].getActividad, this.usuarios[indice].getAmigos, this.usuarios[indice].getGrupoAmigos, this.usuarios[indice].getEstadisticas, this.usuarios[indice].getHistoricoRutas, this.usuarios[indice].getRetos, this.usuarios[indice].getID);
                  this.usuarios.push(ruta_aux);
                  this.usuarios.splice(indice, 1);
                  this.manageUsuarios();
                });
                break;
              case 'eliminar':
                prompt([
                  {
                    type: 'list',
                    name: 'id',
                    message: '¿Qué grupo de amigos quieres eliminar?',
                    choices: this.usuarios[indice].getGrupoAmigos.map((grupo) => {
                      return {name: grupo, value: grupo};
                    }
                    )
                  }
                ]).then((answers) => {
                  this.usuarios[indice].setGrupoAmigos = this.usuarios[indice].getGrupoAmigos.filter((grupo) => {
                    return grupo != answers.id;
                  }
                  );
                  this.borrarElementoBD(identificador);
                  const ruta_aux = new Usuario(this.usuarios[indice].getNombre, this.usuarios[indice].getActividad, this.usuarios[indice].getAmigos, this.usuarios[indice].getGrupoAmigos, this.usuarios[indice].getEstadisticas, this.usuarios[indice].getHistoricoRutas, this.usuarios[indice].getRetos, this.usuarios[indice].getID);
                  this.usuarios.push(ruta_aux);
                  this.usuarios.splice(indice, 1);
                  this.manageUsuarios();
                });
              break;
            }
          });
          break;
        case 'estadisticas':
          prompt([
            {
              type: 'input',
              name: 'kms_semana',
              message: 'Introduce los kms de la semana',
            },
            {
              type: 'input',
              name: 'desnivel_semana',
              message: 'Introduce el desnivel de la semana',
            },
            {
              type: 'input',
              name: 'kms_mes',
              message: 'Introduce los kms del mes',
            },
            {
              type: 'input',
              name: 'desnivel_mes',
              message: 'Introduce el desnivel del mes',
            },
            {
              type: 'input',
              name: 'kms_año',
              message: 'Introduce los kms del año',
            },
            {
              type: 'input',
              name: 'desnivel_año',
              message: 'Introduce el desnivel del año',
            }
          ]).then((answers5) => {
            // generar 3 estadisticas con los nuevos datos
            const new_estadistica_semana: estadistica = {
              km: answers5.kms_semana,
              desnivel: answers5.desnivel_semana,
            }
            const new_estadistica_mes: estadistica  = {
              km: answers5.kms_mes,
              desnivel: answers5.desnivel_mes,
            }
            const new_estadistica_año: estadistica  = {
              km: answers5.kms_año,
              desnivel: answers5.desnivel_año,
            }
            // crear un nuevo array de estadisticas e insertarlo en el array de estadisticas de la clase
            const new_estadisticas: estadisticaEntrenamiento = {
              semana: new_estadistica_semana,
              mes: new_estadistica_mes,
              año: new_estadistica_año,
            }
            this.usuarios[indice].setEstadisticas = new_estadisticas;
            this.borrarElementoBD(identificador);
            const ruta_aux = new Usuario(this.usuarios[indice].getNombre, this.usuarios[indice].getActividad, this.usuarios[indice].getAmigos, this.usuarios[indice].getGrupoAmigos, this.usuarios[indice].getEstadisticas, this.usuarios[indice].getHistoricoRutas, this.usuarios[indice].getRetos, this.usuarios[indice].getID);
            this.usuarios.push(ruta_aux);
            this.usuarios.splice(indice, 1);
            this.manageUsuarios();
          });
          
          break;
        case 'historico_rutas':
          prompt([
            {
              type: 'input',
              name: 'dia',
              message: 'Introduce el dia de la ruta',
            },
            {
              type: 'input',
              name: 'mes',
              message: 'Introduce el mes de la ruta',
            },
            {
              type: 'input',
              name: 'año',
              message: 'Introduce el año de la ruta',
            },
            {
              type: 'input',
              name: 'id',
              message: 'Introduce el id de la ruta',
            }
          ]).then((answers) => {
            const new_fecha = {
              dia: answers.dia,
              mes: answers.mes,
              año: answers.año,
            }
            const new_historico = {
              fecha: new_fecha,
              id: answers.id,
            }
            // añadirlo y modificar la base de datos
            this.usuarios[indice].getHistoricoRutas.push(new_historico);
            this.borrarElementoBD(identificador);
            const ruta_aux = new Usuario(this.usuarios[indice].getNombre, this.usuarios[indice].getActividad, this.usuarios[indice].getAmigos, this.usuarios[indice].getGrupoAmigos, this.usuarios[indice].getEstadisticas, this.usuarios[indice].getHistoricoRutas, this.usuarios[indice].getRetos, this.usuarios[indice].getID);
            this.usuarios.push(ruta_aux);
            this.usuarios.splice(indice, 1);
            this.manageUsuarios();
          });
          break;
        case 'retos':
          prompt([
            {
              type: 'list',
              name: 'retos',
              message: '¿Qué deseas hacer?',
              choices: [
                {name:'Añadir reto', value: 'añadir'},
                {name:'Eliminar reto', value: 'eliminar'},
              ]
            }
          ]).then((answers) => {
            switch (answers.retos) {
              case 'añadir':
                prompt([
                  {
                    type: 'input',
                    name: 'nombre',
                    message: 'Introduce el id del reto que quiera añadir',
                  }
                ]).then((answers) => {
                  this.usuarios[indice].setRetos = this.usuarios[indice].getRetos.concat(answers.nombre);  
                  this.borrarElementoBD(identificador);
                  const ruta_aux = new Usuario(this.usuarios[indice].getNombre, this.usuarios[indice].getActividad, this.usuarios[indice].getAmigos, this.usuarios[indice].getGrupoAmigos, this.usuarios[indice].getEstadisticas, this.usuarios[indice].getHistoricoRutas, this.usuarios[indice].getRetos, this.usuarios[indice].getID);
                  this.usuarios.push(ruta_aux);
                  this.usuarios.splice(indice, 1);
                  this.manageUsuarios();
                });
                break;
              case 'eliminar':
                prompt([
                  {
                    type: 'input',
                    name: 'nombre',
                    message: 'Introduce el id del reto que desee eliminar',
                  }
                ]).then((answers) => {
                  const usuarios = this.usuarios[indice].getRetos;
                  const indice_reto = usuarios.indexOf(answers.nombre);
                  if (indice_reto == -1) {
                    console.log('El reto no existe');
                    return;
                  }
                  this.usuarios[indice].setRetos = answers.nombre;
                  this.borrarElementoBD(identificador);
                  const ruta_aux = new Usuario(this.usuarios[indice].getNombre, this.usuarios[indice].getActividad, this.usuarios[indice].getAmigos, this.usuarios[indice].getGrupoAmigos, this.usuarios[indice].getEstadisticas, this.usuarios[indice].getHistoricoRutas, this.usuarios[indice].getRetos, this.usuarios[indice].getID);
                  this.usuarios.push(ruta_aux);
                  this.usuarios.splice(indice, 1);
                  this.manageUsuarios();
                });
                break;
            }
          });
          break;
      }
    });
  }

  //* INFO USUARIO

  /**
   * Metodo para ordenar los usuarios por nombre
   */
  ordenarUsuarioPorNombre() {
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
     const copia_rutas = this.usuarios;
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
     this.infoUsuario();
   });
  }

  /**
   * Metodo para ordenar los usuarios por kms semanales
   */
  ordenarPorKmsSemanales() {
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
     const copia_rutas = this.usuarios;
     copia_rutas.sort((a, b) => {
       if (ascendente) {
         return a.getEstadisticas.semana.km - b.getEstadisticas.semana.km;
       }
       else {
         return b.getEstadisticas.semana.km - a.getEstadisticas.semana.km;
       }
     });
     // mostrar
     copia_rutas.forEach((ruta) => {
       console.log(`Kms semanales: ${ruta.getEstadisticas.semana.km}`);
     });
     this.infoUsuario();
   });
  }
  
  /**
   * Metodo para ordenar los usuarios por kms mensuales
   */
  ordenarPorKmsMensuales() {
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
      const copia_rutas = this.usuarios;
      copia_rutas.sort((a, b) => {
        if (ascendente) {
          return a.getEstadisticas.mes.km - b.getEstadisticas.mes.km;
        }
        else {
          return b.getEstadisticas.mes.km - a.getEstadisticas.mes.km;
        }
      });
      // mostrar
      copia_rutas.forEach((ruta) => {
        console.log(`Kms mensuales: ${ruta.getEstadisticas.mes.km}`);
      });
      this.infoUsuario();
    });
  }

  /**
   * Metodo para ordenar los usuarios por kms anuales
   */
  ordenarPorKmsAnuales() {
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
      const copia_rutas = this.usuarios;
      copia_rutas.sort((a, b) => {
        if (ascendente) {
          return a.getEstadisticas.año.km - b.getEstadisticas.año.km;
        }
        else {
          return b.getEstadisticas.año.km - a.getEstadisticas.año.km;
        }
      });
      copia_rutas.forEach((ruta) => {
        console.log(`Kms anuales: ${ruta.getEstadisticas.año.km}`);
      });
      this.infoUsuario();
    });
  }

  /**
   * Método que controla el menú de información de los usuarios
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
          {name:'Por kms semanales', value: 'kms_semanales'},
          {name:'Por kms mensuales', value: 'kms_mensuales'},
          {name:'Por kms anuales', value:'kms_anuales'},
          {name:'Salir', value: 'Salir'},
        ]
      }
    ]).then((answers) => {
      switch (answers.opcion) {
        case 'alfabetico':
          this.ordenarUsuarioPorNombre();
          break;
        case 'kms_semanales':
          this.ordenarPorKmsSemanales();
          break;
        case 'kms_mensuales':
          this.ordenarPorKmsMensuales();
          break;
        case 'kms_anuales':
          this.ordenarPorKmsAnuales();
          break;
        case 'Salir':
          process.exit(0);
          break;
      }
    });
  }

  //* GETTERs Y SETTERs

  /**
   * Método que devuelve el array de usuarios
   * @returns {Usuario[]} Array de usuarios
   */
  get getUsuarios() {
    return this.usuarios;
  }

  /**
   * Método que modifica el array de usuarios
   * @param usuarios -- nuevo array de usuarios
   */
  set setUsuarios(usuarios: Usuario[]) {
    this.usuarios = usuarios;
  }
}

// const semana: estadistica = {
//   km: 10,
//   desnivel: 1000
// }

// const semana2: estadistica = {
//   km: 20,
//   desnivel: 200
// }

// const semana3: estadistica = {
//   km: 30,
//   desnivel: 300
// }

// const mes: estadistica = {
//   km: 20,
//   desnivel: 2000
// }

// const mes2: estadistica = {
//   km: 30,
//   desnivel: 3000
// }

// const mes3: estadistica = {
//   km: 40,
//   desnivel: 4000
// }

// const año: estadistica = {
//   km: 30,
//   desnivel: 3000
// }

// const año2: estadistica = {
//   km: 40,
//   desnivel: 4000
// }

// const año3: estadistica = {
//   km: 50,
//   desnivel: 5000
// }

// const estadisticas: estadisticaEntrenamiento = {
//   semana: semana,
//   mes: mes,
//   año: año
// }

// const estadisticas2: estadisticaEntrenamiento = {
//   semana: semana2,
//   mes: mes2,
//   año: año2
// }

// const estadisticas3: estadisticaEntrenamiento = {
//   semana: semana3,
//   mes: mes3,
//   año: año3
// }

// const fecha1: fecha = {
//   dia: 1,
//   mes: 1,
//   año: 2021
// }

// const fecha2: fecha = {
//   dia: 2,
//   mes: 2,
//   año: 2021
// }

// const fecha3: fecha = {
//   dia: 3,
//   mes: 3,
//   año: 2021
// }

// const fecha4: fecha = {
//   dia: 4,
//   mes: 4,
//   año: 2021
// }

// const historic1: historicoRutas = {
//   fecha: fecha1,
//   id: 1
// }

// const historic2: historicoRutas = {
//   fecha: fecha2,
//   id: 2
// }

// const historic3: historicoRutas = {
//   fecha: fecha3,
//   id: 3
// }

// const historic4: historicoRutas = {
//   fecha: fecha4,
//   id: 1
// }

// const historic5: historicoRutas = {
//   fecha: fecha1,
//   id: 2
// }

// const historic6: historicoRutas = {
//   fecha: fecha2,
//   id: 3
// }

// const user0 = new Usuario("user0", "correr", [1,2,3], [[1,2],[3,4],[5,6]], estadisticas, [historic1,historic2,historic3], [1,2,3]);
// const user1 = new Usuario("user1", "correr", [2,3], [[0,2],[3,4],[5,6]], estadisticas2, [historic4,historic5,historic6], [1,2,3]);
// const user2 = new Usuario("user2", "correr", [1,3,4], [[0,1],[3,4],[5,6]], estadisticas3, [historic1,historic2,historic3], [1,3]);
// const user3 = new Usuario("user3", "correr", [1,2,4], [[0,1],[2,4],[5,6]], estadisticas, [historic4,historic5,historic6], [1,2,3]);
// const user4 = new Usuario("user4", "correr", [1,2,3], [[0,1],[2,3],[5,6]], estadisticas2, [historic1,historic2,historic3], [1,2,3]);
// const user5 = new Usuario("user5", "correr", [1,2,3], [[0,1],[2,3],[4,6]], estadisticas3, [historic4,historic5,historic6], [1,2,3]);
// const user6 = new Usuario("user6", "correr", [1,2,3], [[0,1],[2,3],[4,5]], estadisticas, [historic1,historic2,historic3], [1,2,3]);
// const user7 = new Usuario("user7", "correr", [1,2,3], [[0,1],[2,3],[4,5]], estadisticas2, [historic4,historic5,historic6], [1,2,3]);
// const user8 = new Usuario("user8", "correr", [1,2,3], [[0,1],[2,3],[4,5]], estadisticas3, [historic1,historic2,historic3], [1,2,3]);
// const user9 = new Usuario("user9", "correr", [1,2,3], [[0,1],[2,3],[4,5]], estadisticas, [historic4,historic5,historic6], [1,2,3]);
// const user10 = new Usuario("user10", "correr", [1,2,3], [[0,1],[2,3],[4,5]], estadisticas2, [historic1,historic2,historic3], [1,2,3]);
// const user11 = new Usuario("user11", "correr", [1,2,3], [[0,1],[2,3],[4,5]], estadisticas3, [historic4,historic5,historic6], [1,2,3]);
// const user12 = new Usuario("user12", "correr", [1,2,3], [[0,1],[2,3],[4,5]], estadisticas, [historic1,historic2,historic3], [1,2,3]);
// const user13 = new Usuario("user13", "correr", [1,2,3], [[0,1],[2,3],[4,5]], estadisticas2, [historic4,historic5,historic6], [1,2,3]);
// const user14 = new Usuario("user14", "correr", [1,2,3], [[0,1],[2,3],[4,5]], estadisticas3, [historic1,historic2,historic3], [1,2,3]);
// const user15 = new Usuario("user15", "correr", [1,2,3], [[0,1],[2,3],[4,5]], estadisticas, [historic4,historic5,historic6], [1,2,3]);
// const user16 = new Usuario("user16", "correr", [1,2,3], [[0,1],[2,3],[4,5]], estadisticas2, [historic1,historic2,historic3], [1,2,3]);
// const user17 = new Usuario("user17", "correr", [1,2,3], [[0,1],[2,3],[4,5]], estadisticas3, [historic4,historic5,historic6], [1,2,3]);
// const user18 = new Usuario("user18", "correr", [1,2,3], [[0,1],[2,3],[4,5]], estadisticas, [historic1,historic2,historic3], [1,2,3]);
// const user19 = new Usuario("user19", "correr", [1,2,3], [[0,1],[2,3],[4,5]], estadisticas2, [historic4,historic5,historic6], [1,2,3]);