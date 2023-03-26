import 'mocha';
import { expect } from 'chai';
import { GruposCollection } from '../src/gruposCollection';
import { Grupo } from '../src/grupo';
import { fecha, estadistica, historicoRutas, estadisticaEntrenamiento } from '../src/types'

const coleccion = new GruposCollection();

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
  
  const semana: estadistica = {
    km: 10,
    desnivel: 1000
  }
  
  const mes: estadistica = {
    km: 20,
    desnivel: 2000
  }
  
  const año: estadistica = {
    km: 30,
    desnivel: 3000
  }

  const estadisticas: estadisticaEntrenamiento = {
    semana: semana,
    mes: mes,
    año: año
  }

describe('GruposCollection class tests', () => {
  it('Getter & Setter coleccion', () => {
    coleccion.setGrupos = coleccion.getGrupos;
    expect(coleccion.getGrupos).to.be.eql(coleccion.getGrupos);
  });
  
  it('Prueba Condición Id_global & borrarElementoBD(grupos_aux.getId)', () => {
    const grupos_aux = new Grupo('UwU', [0,1,2,3,4,5,6,7,8,9,10], estadisticas, [historic1,historic2]);
    const mi_coleccion = new GruposCollection();
    expect(mi_coleccion.borrarElementoBD(grupos_aux.getID)).to.be.eql(true);
    expect(mi_coleccion.borrarElementoBD(1000)).to.be.eql(false);
  });

  it('eliminarGrupo(grupos_aux.getId) returns 8', () => {
    const grupos_aux = new Grupo('UwU', [0,1,2,3,4,5,6,7,8,9,10], estadisticas, [historic1,historic2]);    
    const mi_coleccion = new GruposCollection();
    expect(mi_coleccion.eliminarGrupo(grupos_aux.getID)).to.be.eql(8);
  });

  it('eliminarGrupo(300) returns undefined', () => {
    const mi_coleccion = new GruposCollection();
    expect(mi_coleccion.eliminarGrupo(300)).to.be.eql(undefined);
  });
});