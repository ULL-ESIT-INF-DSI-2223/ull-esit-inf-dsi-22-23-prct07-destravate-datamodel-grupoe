import 'mocha';
import { expect } from 'chai';
import { RetoCollection } from '../src/retoCollection';
import { Reto } from '../src/reto';

const coleccion = new RetoCollection();

describe('RetosCollection class tests', () => {
  it('Getter & Setter coleccion', () => {
    coleccion.setRetos = coleccion.getRetos;
    expect(coleccion.getRetos).to.be.eql(coleccion.getRetos);
  });
  
  it('Prueba Condición Id_global & borrarElementoBD(grupos_aux.getId)', () => {
    const reto_aux = new Reto('Maraton', [1,2,3,4,5], "correr", [1,2]);
    const mi_coleccion = new RetoCollection();
    expect(mi_coleccion.borrarElementoBD(reto_aux.getId)).to.be.eql(true);
    expect(mi_coleccion.borrarElementoBD(1000)).to.be.eql(false);
  });

  it('eliminarReto(reto_aux.getId) returns 6', () => {
    const reto_aux = new Reto('Maraton', [1,2,3,4,5], "correr", [1,2]);
    const mi_coleccion = new RetoCollection();
    expect(mi_coleccion.eliminarReto(reto_aux.getId)).to.be.eql(6);
  });

  it('eliminarGrupo(300) returns undefined', () => {
    const mi_coleccion = new RetoCollection();
    expect(mi_coleccion.eliminarReto(300)).to.be.eql(undefined);
  });
});