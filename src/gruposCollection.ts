import * as inquirer from "inquirer";
import { database } from "./bd";
import { Grupo } from "./grupo";
import { ID, fecha, estadistica, estadisticaEntrenamiento, historicoRutas } from "./types";

/**
 * Clase que representa una colección de grupos.
 * @class
 */
export class GruposCollection {
  private grupos_: Grupo[];

  /**
   * Constructor de la clase GruposCollection.
   */
  constructor() {
    this.leerBD();
  }
  
  /**
   * Método que lee los elementos de la base de datos y los guarda en el array de grupos.
   */
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

  /**
   * Método que muestra la información de los grupos.
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
  
  /**
   * Método que ordena los grupos por nombre.
   */
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

  /**
   * Método que ordena los grupos por kms semanales.
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

  /**
   * Método que ordena los grupos por kms mensuales.
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

  /**
   * Método que ordena los grupos por kms anuales.
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

  /**
   * Método que ordena los grupos por número de usuarios.
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

  /**
   * Método que gestiona los grupos.
   */
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

  
  /**
   * Método que impelementa el prompt para modificar un grupo.
   */
  promptModificarGrupo() {
    const prompt = inquirer.createPromptModule();
    prompt([
      {
        type: 'list',
        name: 'opcion',
        message: '¿Qué grupo deseas modificar?',
        choices: this.grupos_.map((group) => {
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

  /**
   * Método que modifica un grupo.
   * @param identificador 
   * @returns 
   */
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
            const grupo_aux = new Grupo(this.grupos_[indice].getNombre, this.grupos_[indice].getParticipantes,this.grupos_[indice].getEstadisticasEntrenamiento, this.grupos_[indice].getHistoricoRutas,  this.grupos_[indice].getID);
            this.grupos_.push(grupo_aux);
            this.grupos_.splice(indice, 1);
            this.manageGrupos();
          }
          );
          break;
        case 'participantes':
          // preguntar que se quiere hacer si añadir o eliminar participantes
          prompt([
            {
              type: 'list',
              name: 'opcion',
              message: '¿Qué deseas hacer?',
              choices: [
                {name:'Añadir participante', value: 'añadir'},
                {name:'Eliminar participante', value: 'eliminar'},
              ]
            }
          ]).then((answers) => {
            switch (answers.opcion) {
              case 'añadir':
                prompt([
                  {
                    type: 'input',
                    name: 'id_participante',
                    message: 'Introduce el id del participante',
                  }
                ]).then((answers) => {
                  this.grupos_[indice].setParticipantes = this.grupos_[indice].getParticipantes.concat(answers.id_participante); 
                  this.borrarElementoBD(identificador);
                  const grupo_aux = new Grupo(this.grupos_[indice].getNombre, this.grupos_[indice].getParticipantes,this.grupos_[indice].getEstadisticasEntrenamiento, this.grupos_[indice].getHistoricoRutas,  this.grupos_[indice].getID);
                  this.grupos_.push(grupo_aux);
                  this.grupos_.splice(indice, 1);
                  this.manageGrupos();
                });
                break;
              case 'eliminar':
                prompt([
                  {
                    type: 'input',
                    name: 'id_participante',
                    message: 'Introduce el id del participante',
                  }
                ]).then((answers) => {
                  this.grupos_[indice].setParticipantes = this.grupos_[indice].getParticipantes.filter((id) => {
                    return id != answers.id_participante;
                  });
                  this.borrarElementoBD(identificador);
                  const grupo_aux = new Grupo(this.grupos_[indice].getNombre, this.grupos_[indice].getParticipantes,this.grupos_[indice].getEstadisticasEntrenamiento, this.grupos_[indice].getHistoricoRutas,  this.grupos_[indice].getID);
                  this.grupos_.push(grupo_aux);
                  this.grupos_.splice(indice, 1);
                  this.manageGrupos();
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
            this.grupos_[indice].setEstadisticasEntrenamiento = new_estadisticas;
            this.borrarElementoBD(identificador);
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
            this.grupos_[indice].getHistoricoRutas.push(new_historico);
            this.borrarElementoBD(identificador);
            const ruta_aux = new Grupo(this.grupos_[indice].getNombre, this.grupos_[indice].getParticipantes, this.grupos_[indice].getEstadisticasEntrenamiento, this.grupos_[indice].getHistoricoRutas, this.grupos_[indice].getID);
            this.grupos_.push(ruta_aux);
            this.grupos_.splice(indice, 1);
            this.manageGrupos();
          });
          break;
        
      }
    });
  }

  /**
   * Método que permite eliminar un grupo
   */
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
  
  /**
   * Método que permite eliminar un grupo
   */
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

  /**
   * Método que permite añadir un grupo
   */
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




//? PRUEBAS


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

// const grupo0 = new Grupo('Grupo 0', [0,1,2,3,4,5,6,7,8,9,10], estadisticas, [historic1,historic2]);
// const grupo1 = new Grupo('Grupo 1', [0,1,2,3,4,5], estadisticas2, [historic3,historic4]);
// const grupo2 = new Grupo('Grupo 2', [0,6,7,8,9,10], estadisticas3, [historic5,historic6]);
// const grupo3 = new Grupo('Grupo 3', [0,4,5,6,7,8,9,10], estadisticas, [historic1,historic2]);
// const grupo4 = new Grupo('Grupo 4', [0,1,2,3,4,5,6,7,8,9,10], estadisticas2, [historic3,historic4]);
// const grupo5 = new Grupo('Grupo 5', [0,6,7,8,9,10], estadisticas3, [historic5,historic6]);


const gruposCollection = new GruposCollection();

// gruposCollection.infoUsuario();
gruposCollection.manageGrupos();