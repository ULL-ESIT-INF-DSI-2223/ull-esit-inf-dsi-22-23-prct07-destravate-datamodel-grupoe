import 'mocha';
import { expect } from 'chai';
import { usuarioCollection } from '../src/usuarioCollection';
import { Usuario } from '../src/usuario';
import { fecha, estadistica, historicoRutas, estadisticaEntrenamiento } from '../src/types'

const coleccion = new usuarioCollection();

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

describe('usuarioCollection class tests', () => {
  it('Getter & Setter coleccion', () => {
    coleccion.setUsuarios = coleccion.getUsuarios;
    expect(coleccion.getUsuarios).to.be.eql(coleccion.getUsuarios);
  });
  
  it('Prueba Condición Id_global & borrarElementoBD(usuario_aux.getId)', () => {
    const usuario_aux = new Usuario("Marco", "correr", [1,2,3], [[1,2],[3,4],[5,6]], estadisticas, [historic1,historic2,historic3], [1,2,3]);
    const mi_coleccion = new usuarioCollection();
    expect(mi_coleccion.borrarElementoBD(usuario_aux.getID)).to.be.eql(true);
    expect(mi_coleccion.borrarElementoBD(1000)).to.be.eql(false);
  });

  it('borrarUsuario(usuario_aux.getId) returns 21', () => {
    const usuario_aux2 = new Usuario("Marco", "correr", [1,2,3], [[1,2],[3,4],[5,6]], estadisticas, [historic1,historic2,historic3], [1,2,3]);
    const mi_coleccion = new usuarioCollection();
    expect(mi_coleccion.borrarUsuario(usuario_aux2.getID)).to.be.eql(21);
  });

  it('borrarUsuario(300) returns undefined', () => {
    const mi_coleccion = new usuarioCollection();
    expect(mi_coleccion.borrarUsuario(300)).to.be.eql(undefined);
  });
});