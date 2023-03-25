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
  constructor() {
    this.leerBD();

    // this.usuarios = usuario_array;
    // usuario_array.forEach((usuario1) => {
    //   const user_aux = new Usuario(usuario1.getNombre, usuario1.getActividad, usuario1.getAmigos, usuario1.getGrupoAmigos, usuario1.getEstadisticas, usuario1.getHistoricoRutas, usuario1.getRetos, usuario1.getID);
    //   this.usuarios.push(user_aux);
    // });
    // this.usuarios = usuario_array;
  }

  leerBD() {
    const usuarios_aux = database.get("usuarios").value();
    const array_aux: Usuario[] = [];
    usuarios_aux.forEach((user) => {
      const user_aux: Usuario = new Usuario(user.nombre, user.actividad, user.amigos, user.grupo_de_amigos, user.estadisticas, user.historicoRutas, user.retos, user.id);
      array_aux.push(user_aux);
    });
    this.setUsuarios = array_aux;  
  }
  

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
      // sacar grupos de amigos
      const grupos_aux = answers.grupo_de_amigos.split(";");
      // sacar estadisticas
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

      // crear usuario
      const user_aux = new Usuario(answers.nombre, answers.actividad, amigos_aux, grupos_aux, estadisticas, historicoRutas_aux, retos_aux);
      // añadir usuario
      this.usuarios.push(user_aux);
      this.manageUsuarios();
    });
  }

  promptModificarUser() {
    const prompt = inquirer.createPromptModule();
    prompt([
      {
        type: 'list',
        name: 'opcion',
        message: '¿Qué usuario quieres modificar? Introduce su ID: ',
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
    
  modificarUsuario(identificador: ID) {
    // 1. comprobar que el id de la ruta existe
    // 2. preguntar que se quiere modificar
    // 3. modificarlo
    // 4. devolver true si se ha modificado o false si no se ha modificado
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
          // solicitar kms y desnivel para semana mes y año
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
            // generar una fecha nueva
            const new_fecha = {
              dia: answers.dia,
              mes: answers.mes,
              año: answers.año,
            }
            // crear un nuevo historico e insertarlo en el array de historicos de la clase
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
     // ordenar
     const copia_rutas = this.usuarios;
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
     this.infoUsuario();
   });
  }

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
     // ordenar
     const copia_rutas = this.usuarios;
     // ordenar de forma ascendete o descendente según el valor de la variable ascendente
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
      // ordenar
      const copia_rutas = this.usuarios;
      // ordenar de forma ascendete o descendente según el valor de la variable ascendente
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
      // ordenar
      const copia_rutas = this.usuarios;
      // ordenar de forma ascendete o descendente según el valor de la variable ascendente
      copia_rutas.sort((a, b) => {
        if (ascendente) {
          return a.getEstadisticas.año.km - b.getEstadisticas.año.km;
        }
        else {
          return b.getEstadisticas.año.km - a.getEstadisticas.año.km;
        }
      });
      // mostrar
      copia_rutas.forEach((ruta) => {
        console.log(`Kms anuales: ${ruta.getEstadisticas.año.km}`);
      });
      this.infoUsuario();
    });
  }

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
          // cerrar prompt
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

const coleccion_usuarios = new usuarioCollection();

coleccion_usuarios.manageUsuarios();
// console.log('MARCO SI VES ESTO ACUERDATE DE DESCOMENTAR EL METODO QUE QUIERAS COMPROBAR')
// Coleccion_usuarios.infoUsuario();