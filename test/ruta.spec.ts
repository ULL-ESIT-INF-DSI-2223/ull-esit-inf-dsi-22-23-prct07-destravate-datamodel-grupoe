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
  
// nombre: string, geolocalizacion_inicio: coordenadas[], geolocalizacion_fin: coordenadas[], longitud: number, desnivel: number, usuario: Usuario[], tipo_actividad: actividad, calificacion: number
  
const ruta0 = new Ruta('San Vicente', [eje_x0, eje_y0, eje_z0], [eje_x1, eje_y1, eje_z1], 1000, 200, [1,2,3], "correr", 9, 1);

describe('Ruta class tests', () => {
  // Getters - Setters
  it('ruta0.getId returns 2', () => {
    ruta0.setId = 2;
    expect(ruta0.getId).to.be.eql(2);
  });

  it('ruta0.getNombre returns "La Laguna"', () => {
    ruta0.setNombre = 'La Laguna';
    expect(ruta0.getNombre).to.be.eql('La Laguna');
  });

  it('ruta0.getGeolocalizacionInicio returns [eje_x0, eje_y0, eje_z0]', () => {
    ruta0.setGeolocalizacionInicio = [eje_x1, eje_y1, eje_z1];
    expect(ruta0.getGeolocalizacionInicio).to.be.eql([eje_x1, eje_y1, eje_z1]);
  });

  it('ruta0.getGeolocalizacionFin returns [eje_x0, eje_y0, eje_z0]', () => {
    ruta0.setGeolocalizacionFin = [eje_x0, eje_y0, eje_z0];
    expect(ruta0.getGeolocalizacionFin).to.be.eql([eje_x0, eje_y0, eje_z0]);
  });

  it('ruta0.getLongitud returns 2000', () => {
    ruta0.setLongitud = 2000;
    expect(ruta0.getLongitud).to.be.eql(2000);
  });

  it('ruta0.getDesnivel returns 100', () => {
    ruta0.setDesnivel = 100;
    expect(ruta0.getDesnivel).to.be.eql(100);
  });

  it('ruta0.getUsuarios returns [1,2]', () => {
    ruta0.setUsuarios = [1,2];
    expect(ruta0.getUsuarios).to.be.eql([1,2]);
  });

  it('ruta0.getTipoActividad returns "correr"', () => {
    ruta0.setTipoActividad = "bicicleta";
    expect(ruta0.getTipoActividad).to.be.eql("bicicleta");
  });

  it('ruta0.getCalificacion returns 10', () => {
    ruta0.setCalificacion = 10;
    expect(ruta0.getCalificacion).to.be.eql(10);
  });

  it('Prueba Condición Id_global', () => {
    const ruta_aux = new Ruta('Almendros en Flor', [eje_x0, eje_y0, eje_z0], [eje_x1, eje_y1, eje_z1], 1000, 200, [1,2,3], "correr", 9);
    const mi_coleccion = new rutaCollection();
    mi_coleccion.borrarElementoBD(ruta_aux.getId);
    mi_coleccion.borrarElementoBD(ruta0.getId);
  });
});