import * as inquirer from "inquirer";
import { database } from "./bd";
import { Grupo } from "./grupo";
import { ID, fecha, estadistica, estadisticaEntrenamiento, historicoRutas } from "./types";

export class GruposCollection {
  private grupos_: Grupo[];

  constructor() {
    this.leerBD();
  }
  
  leerBD() {
    const grupos_aux = database.get("grupos").value();
    const array_aux: Grupo[] = [];
    grupos_aux.forEach((group) => {
      const group_aux: Grupo = new Grupo(group.nombre, group.participantes, group.estadisticasEntrenamiento, group.historicoRutas, group.id);
      array_aux.push(group_aux);
    });
    this.setGrupos = array_aux;  
  }


  //* INFO
  infoUsuario() {
    const prompt = inquirer.createPromptModule();
    prompt([
      {
        type: 'list',
        name: 'opcion',
        message: '¿Qué deseas ver?',
        choices: [
          {name:'Mostrar por orden alfabético los usuarios', value: 'alfabetico'},
          {name:'Ordenar por kms semanales', value: 'kms_semanales'},
          {name:'Ordenar por kms mensuales', value: 'kms_mensuales'},
          {name:'Ordenar por kms anuales', value:'kms_anuales'},
          {name:'Ordenar por nº de usuarios', value: 'num_usuarios'},
          {name:'Salir', value: 'Salir'},
        ]
      }
    ]).then((answers) => {
      switch (answers.opcion) {
        case 'alfabetico':
          this.ordenarGruposPorNombre();
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
  
  ordenarGruposPorNombre() {
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
      const copia_grupos = this.grupos_;
      // ordenar de forma ascendete o descendente según el valor de la variable ascendente
      copia_grupos.sort((a, b) => {
        if (ascendente) {
          return a.getNombre.localeCompare(b.getNombre);
        }
        else {
          return b.getNombre.localeCompare(a.getNombre);
        }
      });
      // mostrar
      copia_grupos.forEach((ruta) => {
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
      const copia_grupos = this.grupos_
      // ordenar de forma ascendete o descendente según el valor de la variable ascendente
      copia_grupos.sort((a, b) => {
        if (ascendente) {
          return a.getEstadisticasEntrenamiento.semana.km - b.getEstadisticasEntrenamiento.semana.km;
        }
        else {
          return b.getEstadisticasEntrenamiento.semana.km - a.getEstadisticasEntrenamiento.semana.km;
        }
      });
      // mostrar
      copia_grupos.forEach((ruta) => {
        console.log(`Kms semanales: ${ruta.getEstadisticasEntrenamiento.semana.km}`);
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
      const copia_grupos = this.grupos_;
      // ordenar de forma ascendete o descendente según el valor de la variable ascendente
      copia_grupos.sort((a, b) => {
        if (ascendente) {
          return a.getEstadisticasEntrenamiento.mes.km - b.getEstadisticasEntrenamiento.mes.km;
        }
        else {
          return b.getEstadisticasEntrenamiento.mes.km - a.getEstadisticasEntrenamiento.mes.km;
        }
      });
      // mostrar
      copia_grupos.forEach((ruta) => {
        console.log(`Kms mensuales: ${ruta.getEstadisticasEntrenamiento.mes.km}`);
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
      const copia_grupos = this.grupos_;
      // ordenar de forma ascendete o descendente según el valor de la variable ascendente
      copia_grupos.sort((a, b) => {
        if (ascendente) {
          return a.getEstadisticasEntrenamiento.año.km - b.getEstadisticasEntrenamiento.año.km;
        }
        else {
          return b.getEstadisticasEntrenamiento.año.km - a.getEstadisticasEntrenamiento.año.km;
        }
      });
      // mostrar
      copia_grupos.forEach((ruta) => {
        console.log(`Kms anuales: ${ruta.getEstadisticasEntrenamiento.año.km}`);
      });
      this.infoUsuario();
    });
  }

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
      const copia_grupos = this.grupos_;
      // ordenar de forma ascendete o descendente según el valor de la variable ascendente
      copia_grupos.sort((a, b) => {
        if (ascendente) {
          return a.getParticipantes.length - b.getParticipantes.length;
        }
        else {
          return b.getParticipantes.length - a.getParticipantes.length;
        }
      });
      // mostrar
      copia_grupos.forEach((ruta) => {
        console.log(`Número de usuarios: ${ruta.getParticipantes.length}`);
      });
      this.infoUsuario();
    });
  }

  //* MANAGE

  manageGrupos() {
    const prompt = inquirer.createPromptModule();
    prompt([
      {
        type: 'list',
        name: 'opcion',
        message: '¿Qué deseas hacer?',
        choices: [
          {name:'Añadir grupo', value: 'añadir'},
          {name:'Eliminar grupo', value: 'eliminar'},
          {name: 'Modificar', value: 'modificar'},
          {name:'Salir', value: 'Salir'},
        ]
      }
    ]).then((answers) => {
      switch (answers.opcion) {
        case 'añadir':
          this.promptAñadirGrupo();
          break;
        case 'eliminar':
          this.promptEliminarGrupo();
          break;
        case 'modificar':
          this.promptModificarGrupo();
          break;
        case 'Salir':
          // cerrar prompt
          process.exit(0);
          break;
      }
    });
  }

  promptModificarGrupo() {
    const prompt = inquirer.createPromptModule();
    prompt([
      {
        type: 'list',
        name: 'opcion',
        message: '¿Qué grupo deseas modificar?',
        choices: this.getGrupos.map((group) => {
          return {name: group.getNombre, value: group.getID};
        }
        )
      }
    ]).then((answers) => {
      this.modificarGrupo(answers.opcion);    });
  }

  /**
   * Metodo para borrar un elemento de la base de datos
   * @param identificador 
   */
  borrarElementoBD(identificador: ID): boolean{
    this.grupos_.forEach((grp, indice) => {
      if (grp.getID == identificador) {
        database.get("grupos").splice(indice,1).write();
        return true;
      }
    });
    return false;
  }


  modificarGrupo(identificador: ID) {
    // 1. comprobar que el id de la ruta existe
    // 2. preguntar que se quiere modificar
    // 3. modificarlo
    // 4. devolver true si se ha modificado o false si no se ha modificado
    let id_existe_en_coleccion = false;
    let indice = -1;
    this.grupos_.forEach((grp, index) => {
      if (grp.getID == identificador) {
        id_existe_en_coleccion = true;
        indice = index;
      }
    }
    );
    if (!id_existe_en_coleccion) {
      console.log('No existe el grupo que se intenta modificar');
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
          {name:'Participantes', value: 'participantes'},
          {name:'Estadísticas', value: 'estadisticas'},
          {name:'Historico de rutas', value: 'historico_rutas'},
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
            this.grupos_[indice].setNombre = answers.nombre2;
            this.borrarElementoBD(identificador);
            const grupo_aux = new Grupo(this.grupos_[indice].getNombre, this.grupos_[indice].getParticipantes, this.grupos_[indice].getHistoricoRutas, this.grupos_[indice].getEstadisticasEntrenamiento, this.grupos_[indice].getID);
            this.grupos_.push(grupo_aux);
            this.grupos_.splice(indice, 1);
            this.manageGrupos();
          }
          );
          break;
        case 'participantes':
          // solicitar participantes
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
            this.grupos_[indice].setEstadisticasEntrenamiento = new_estadisticas;
            const grupos_aux = new Grupo(this.grupos_[indice].getNombre, this.grupos_[indice].getParticipantes, this.grupos_[indice].getEstadisticasEntrenamiento, this.grupos_[indice].getHistoricoRutas, this.grupos_[indice].getID);
            this.grupos_.push(grupos_aux);
            this.grupos_.splice(indice, 1);
            this.manageGrupos();
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
        
      }
    });
  }

  promptEliminarGrupo() {
    const prompt = inquirer.createPromptModule();
    prompt([
      {
        type: 'list',
        name: 'opcion',
        message: '¿Qué grupo deseas eliminar?',
        choices: this.getGrupos.map((group) => {
          return {name: group.getNombre, value: group.getID};
        }
        )
      }
    ]).then((answers) => {
      this.eliminarGrupo(answers.opcion);
      this.manageGrupos();
    });
  }
  
  eliminarGrupo(identificador: ID): Grupo | undefined {
    let control_bool = false;
    let grupo_aux: Grupo | undefined;

    this.grupos_.forEach((grupo, indice) => {

      if (grupo.getID == identificador) {
        grupo_aux = grupo;
        this.grupos_.splice(indice, 1);
        control_bool = true;
        database.get("grupos").splice(indice,1).write();
      }
    });
    if (control_bool) {
      return grupo_aux;
    }
    else {
      return undefined;
    }
    
  }



  promptAñadirGrupo() {
    const prompt = inquirer.createPromptModule();
    prompt([
      {
        type: 'input',
        name: 'nombre',
        message: 'Introduce el nombre del grupo',
      },
      {
        type: 'input',
        name: 'participantes',
        message: 'Introduce los participantes del grupo "id1,id2,..."',
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
        name: 'historico',
        message: 'Introduce el histórico de rutas del grupo: "id1,id2,..."',
      },
    ]).then((answers) => {
      // sacar participantes
      const participantes: ID[] = answers.participantes.split(',');
      const estadisticas_aux = [];
      const historico2 = answers.historico.split(',');
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

      const grupo_aux = new Grupo(answers.nombre, participantes, estadisticas, historico2);
      this.grupos_.push(grupo_aux);
      this.manageGrupos();

    });



  }

  














    
  //* SETTERs Y GETTERs

  /**
   * Método que devuelve los grupos
   */
  get getGrupos(): Grupo[] {
    return this.grupos_;
  }

  /**
   * Método que modifica los grupos
   */
  set setGrupos(grupos: Grupo[]) {
    this.grupos_ = grupos;
  }

}

const gruposCollection = new GruposCollection();

// gruposCollection.infoUsuario();
gruposCollection.manageGrupos();