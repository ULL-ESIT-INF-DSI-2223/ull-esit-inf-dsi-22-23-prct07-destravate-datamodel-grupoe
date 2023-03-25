import 'mocha';
import { expect } from 'chai';
import { Ruta } from '../src/ruta';
import { coordenadas } from '../src/types';
import { rutaCollection } from '../src/rutaCollection';

const eje_x0:coordenadas = {
  letra : "X",
  coordenada : 10
}
const eje_y0: coordenadas = {
  letra : "Y",
  coordenada : 20
}
const eje_z0: coordenadas = {
  letra : "Z",
  coordenada : 30
}  
  
const eje_x1:coordenadas = {
  letra : "X",
  coordenada : 12435
}
const eje_y1: coordenadas = {
  letra : "Y",
  coordenada : 1234325436
}
const eje_z1: coordenadas = {
  letra : "Z",
  coordenada : 1232
}

const eje_x2:coordenadas = {
  letra : "X",
  coordenada : 214
}
const eje_y2: coordenadas = {
  letra : "Y",
  coordenada : 20213
}
const eje_z2: coordenadas = {
  letra : "Z",
  coordenada : 3023
}

const eje_x3:coordenadas = {
  letra : "X",
  coordenada : 10
}
const eje_y3: coordenadas = {
  letra : "Y",
  coordenada : 20
}
const eje_z3: coordenadas = {
  letra : "Z",
  coordenada : 30
}

// describe('rutaCollection', () => {
//   it('borrar elementobd', () => {
    
//   });


// });