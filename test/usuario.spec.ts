import 'mocha';
import { expect } from 'chai';
import { Usuario } from '../src/usuario'
import { estadistica, estadisticaEntrenamiento, fecha, historicoRutas } from '../src/types'

const semana: estadistica = {
  km: 10,
  desnivel: 1000
}
const semana2: estadistica = {
  km: 20,
  desnivel: 200
}
const mes: estadistica = {
  km: 20,
  desnivel: 2000
}
const mes2: estadistica = {
  km: 30,
  desnivel: 3000
}
const año: estadistica = {
  km: 30,
  desnivel: 3000
}
const año2: estadistica = {
  km: 40,
  desnivel: 4000
}

const estadisticas: estadisticaEntrenamiento = {
  semana: semana,
  mes: mes,
  año: año
}
const estadisticas2: estadisticaEntrenamiento = {
  semana: semana2,
  mes: mes2,
  año: año2
}

const fecha1: fecha = {
  dia: 1,
  mes: 1,
  año: 2021
}
const fecha2: fecha = {
  dia: 2,
  mes: 2,
  año: 2021
}
const fecha3: fecha = {
  dia: 3,
  mes: 3,
  año: 2021
}

const historic1: historicoRutas = {
  fecha: fecha1,
  id: 1
}
const historic2: historicoRutas = {
  fecha: fecha2,
  id: 2
}
const historic3: historicoRutas = {
  fecha: fecha3,
  id: 3
}

// (nombre: string, actividad: actividad, amigos: ID[], grupo_amigos: ID[][], estadisticas: estadisticaEntrenamiento ,historico_rutas: historicoRutas[], retos: ID[], id?: ID)
const user0 = new Usuario("user0", "correr", [1,2,3], [[1,2],[3,4],[5,6]], estadisticas, [historic1,historic2,historic3], [1,2,3]);

describe('Usuario class tests', () => {
 // Getters - Setters
  it('user0.getId returns 2', () => {
    user0.setID = 2;
    expect(user0.getID).to.be.eql(2);
  });

  it('user0.getNombre returns "Juan"', () => {
    user0.setNombre = 'Juan';
    expect(user0.getNombre).to.be.eql('Juan');
  });

  it('user0.getActividad returns "bicicleta"', () => {
    user0.setActividad = 'bicicleta';
    expect(user0.getActividad).to.be.eql('bicicleta');
  });

  it('user0.getAmigos returns [1,2]', () => {
    user0.setAmigos = [1,2];
    expect(user0.getAmigos).to.be.eql([1,2]);
  });

  it('user0.getGrupoAmigos returns [[1,2],[3,4]]', () => {
    user0.setGrupoAmigos = [[1,2],[3,4]];
    expect(user0.getGrupoAmigos).to.be.eql([[1,2],[3,4]]);
  });

  it('user0.getEstadisticas returns estadisticas2', () => {
    user0.setEstadisticas = estadisticas2;
    expect(user0.getEstadisticas).to.be.eql(estadisticas2);
  });

  it('user0.getRutasFavoritas returns [1,2]', () => {
    user0.setRutasFavoritas = [1,2]
    expect(user0.getRutasFavoritas).to.be.eql([1,2]);
  });

  it('user0.getHistoricoRutas returns [historic1,historic2]', () => {
    user0.setHistoricoRutas = [historic1,historic2];
    expect(user0.getHistoricoRutas).to.be.eql([historic1,historic2]);
  });

  it('user0.getRetos returns [1,2]', () => {
    user0.setRetos = [1,2];
    expect(user0.getRetos).to.be.eql([1,2]);
  });
});