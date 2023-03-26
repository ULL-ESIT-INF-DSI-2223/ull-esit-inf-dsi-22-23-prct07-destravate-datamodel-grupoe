import 'mocha';
import { expect } from 'chai';
import { Reto } from '../src/reto'

import { RetoCollection } from '../src/retoCollection';

const reto0 = new Reto('Maraton', [1,2,3,4,5], "correr", [1,2]);

describe('Reto class tests', () => {
// Getters - Setters
  it('reto0.getId returns 1', () => {
    reto0.setId = 1;
    expect(reto0.getId).to.be.eql(1);
  });

  it('reto0.getNombre returns "Triatlón"', () => {
    reto0.setNombre = 'Triatlón';
    expect(reto0.getNombre).to.be.eql('Triatlón');
  });

  it('reto0.getRutas returns [1,2,3]', () => {
    reto0.setRutas = [1,2,3];
    expect(reto0.getRutas).to.be.eql([1,2,3]);
  });

  it('reto0.getTipoActividad returns "bicicleta"', () => {
    reto0.setTipoActividad = 'bicicleta';
    expect(reto0.getTipoActividad).to.be.eql('bicicleta');
  });

  it('reto0.getKmTotales returns 3300', () => {
    reto0.setKmTotales = 3300;
    expect(reto0.getKmTotales).to.be.eql(3300);
  });

  it('reto0.getUsuarios returns estadisticas2', () => {
    reto0.setUsuarios = [1];
    expect(reto0.getUsuarios).to.be.eql([1]);
  });

  it('Prueba Condición Id_global', () => {
    const reto_aux = new Reto('Reto Boston', [1,2], "correr", [1]);
    const mi_coleccion = new RetoCollection();
    mi_coleccion.borrarElementoBD(reto_aux.getId);
    mi_coleccion.borrarElementoBD(reto0.getId);
  });
});