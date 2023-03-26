import 'mocha';
import { expect } from 'chai';
import { Grupo } from '../src/grupo';
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

const historic1: historicoRutas = {
  fecha: fecha1,
  id: 1
}
const historic2: historicoRutas = {
  fecha: fecha2,
  id: 2
}

const grupo0 = new Grupo('Grupo 0', [0,1,2,3,4,5,6,7,8,9,10], estadisticas, [historic1,historic2]);

describe('Grupo class tests', () => {
  // Getters - Setters
  it('grupo0.getId returns 2', () => {
    grupo0.setID = 2;
    expect(grupo0.getID).to.be.eql(2);
  });

  it('grupo0.getNombre returns "ULL"', () => {
    grupo0.setNombre = 'ULL';
    expect(grupo0.getNombre).to.be.eql('ULL');
  });

  it('grupo0.getParticipantes returns [0,1,2,3,4,5,6,7,8]', () => {
    grupo0.setParticipantes= [0,1,2,3,4,5,6,7,8];
    expect(grupo0.getParticipantes).to.be.eql([0,1,2,3,4,5,6,7,8]);
  });

  it('grupo0.getEstadisticasEntrenamiento returns estadisticas2', () => {
    grupo0.setEstadisticasEntrenamiento = estadisticas2;
    expect(grupo0.getEstadisticasEntrenamiento).to.be.eql(estadisticas2);
  });

  it('grupo0.getRanking returns [1]', () => {
    grupo0.setRanking = [1];
    expect(grupo0.getRanking).to.be.eql([1]);
  });

  it('grupo0.getRutasFavoritas returns [1,2]', () => {
    grupo0.setRutasFavoritas = [1,2];
    expect(grupo0.getRutasFavoritas).to.be.eql([1,2]);
  });

  it('grupo0.getHistoricoRutas returns [historico1]', () => {
    grupo0.setHistoricoRutas = [historic1];
    expect(grupo0.getHistoricoRutas).to.be.eql([historic1]);
  });
});