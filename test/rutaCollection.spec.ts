// import 'mocha';
// import { expect } from 'chai';
// import { coordenadas } from '../src/types';
// import { rutaCollection } from '../src/rutaCollection';
// import { Ruta } from '../src/ruta';

// const coleccion = new rutaCollection();

// const eje_x0:coordenadas = {
//   letra : "X",
//   coordenada : 10
// }

// const eje_y0: coordenadas = {
//   letra : "Y",
//   coordenada : 20
// }
// const eje_z0: coordenadas = {
//   letra : "Z",
//   coordenada : 30
// }

// const eje_x1:coordenadas = {
//   letra : "X",
//   coordenada : 40 
// }
// const eje_y1: coordenadas = {
//   letra : "Y",
//   coordenada : 50
// }
// const eje_z1: coordenadas = {
//   letra : "Z",
//   coordenada : 60
// }

// describe('rutaCollection class tests', () => {
//   it('Getter & Setter coleccion', () => {
//     coleccion.setRutas = coleccion.getRutas;
//     expect(coleccion.getRutas).to.be.eql(coleccion.getRutas);
//   });
  
//   it('Prueba Condición Id_global & borrarElementoBD(ruta_aux.getId)', () => {
//     const ruta_aux = new Ruta('San Mamés', [eje_x0, eje_y0, eje_z0], [eje_x1, eje_y1, eje_z1], 10127, 456, [1,2,3], "correr", 9);
//     const mi_coleccion = new rutaCollection();
//     expect(mi_coleccion.borrarElementoBD(ruta_aux.getId)).to.be.eql(true);
//     expect(mi_coleccion.borrarElementoBD(1000)).to.be.eql(false);
//   });

//   it('borrarRuta(ruta_aux.getId) returns 11', () => {
//     const ruta_aux = new Ruta('San Mamés', [eje_x0, eje_y0, eje_z0], [eje_x1, eje_y1, eje_z1], 10127, 456, [1,2,3], "correr", 9);
//     const mi_coleccion = new rutaCollection();
//     expect(mi_coleccion.borrarRuta(ruta_aux.getId)).to.be.eql(11);
//   });

//   it('borrarRuta(300) returns undefined', () => {
//     const mi_coleccion = new rutaCollection();
//     expect(mi_coleccion.borrarRuta(300)).to.be.eql(undefined);
//   });
// });