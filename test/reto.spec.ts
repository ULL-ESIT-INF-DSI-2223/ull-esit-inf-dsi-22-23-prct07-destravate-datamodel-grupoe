import 'mocha';
import { expect } from 'chai';
import { Reto } from '../src/reto'

const reto0 = new Reto('Maraton', [1,2,3,4,5], "correr",200, [1,2]);
// const reto1 = new Reto('Triatlon', [2,3,4,5,6], "bicicleta",300, [3,4,5,6,7,8,9,10,11,12,13]);
// const reto2 = new Reto('Iron man', [9,8,7], "correr",50, [14,15,16,17,18,19]);

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

  it('reto0.getKmTotales returns 500', () => {
    reto0.setKmTotales = 500;
    expect(reto0.getKmTotales).to.be.eql(500);
  });

  it('reto0.getUsuarios returns estadisticas2', () => {
    reto0.setUsuarios = [1];
    expect(reto0.getUsuarios).to.be.eql([1]);
  });
});