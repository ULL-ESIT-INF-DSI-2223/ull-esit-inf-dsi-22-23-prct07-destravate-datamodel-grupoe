import {Grupo} from '../src/grupo';
import { Usuario } from '../src/usuario';
import {Reto} from '../src/reto';
import {Ruta} from '../src/ruta';
import {coordenadas}  from '../src/types';

// USUARIOS

const user0 = new Usuario('Pepe', "correr" , [1,2,3]);
const user1 = new Usuario('Adrian', "correr" , [3,4,5]);
const user2 = new Usuario('Eduardo', "correr" , [6,7,8,9,10,11]);
const user3 = new Usuario('Eva', "correr" , [1,2,3,4,5,6]);
const user4 = new Usuario('Marco', "correr" , [1,2,3]);
const user5 = new Usuario('Ismael', "bicicleta" , [1,2,3,5,6,7]);
const user6 = new Usuario('Daniel_Felipe', "bicicleta" , [1,2,3,20,19,18]);
const user7 = new Usuario('Alberto', "bicicleta" , [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]);
const user8 = new Usuario('Facundo', "bicicleta" , [1,2,3,4,5,6]);
const user9 = new Usuario('Jose', "bicicleta" , [1,2,3,7,8,9]);
const user10 = new Usuario('Xis', "correr" , [1,2,3,10,11,12,14]);
const user11 = new Usuario('Sonic', "correr" , [1,2,3,17,18,19,20]);
const user12 = new Usuario('Neo', "correr" , [1,2,3,10]);
const user13 = new Usuario('Morpheo', "correr" , [1,2,3]);
const user14 = new Usuario('Julius', "correr" , [20,19,18,17]);
const user15 = new Usuario('Dani', "bicicleta" , [5,6,7]);
const user16 = new Usuario('Nestor', "bicicleta" , [8,9,10,11]);
const user17 = new Usuario('Ana', "bicicleta" , [12,13,14,15,16,17]);
const user18 = new Usuario('Amanda', "bicicleta" , [18,19,20]);
const user19 = new Usuario('Natalia', "bicicleta" , [1,2,3,4,5,6,7,8,9]);

// RUTAS

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


const eje_x4:coordenadas = {
  letra : "X",
  coordenada : 1010
}
const eje_y4: coordenadas = {
  letra : "Y",
  coordenada : 2020
}
const eje_z4: coordenadas = {
  letra : "Z",
  coordenada : 3030
}


const eje_x5:coordenadas = {
  letra : "X",
  coordenada : 1001
}
const eje_y5: coordenadas = {
  letra : "Y",
  coordenada : 2002
}
const eje_z5: coordenadas = {
  letra : "Z",
  coordenada : 3003
}

const eje_x6:coordenadas = {
  letra : "X",
  coordenada : 101010
}
const eje_y6: coordenadas = {
  letra : "Y",
  coordenada : 202020
}
const eje_z6: coordenadas = {
  letra : "Z",
  coordenada : 3030330
}


const eje_x7:coordenadas = {
  letra : "X",
  coordenada : 1001010110
}
const eje_y7: coordenadas = {
  letra : "Y",
  coordenada : 2020202020
}
const eje_z7: coordenadas = {
  letra : "Z",
  coordenada : 303403030
}


const eje_x8:coordenadas = {
  letra : "X",
  coordenada : 101231
}
const eje_y8: coordenadas = {
  letra : "Y",
  coordenada : 2021314
}
const eje_z8: coordenadas = {
  letra : "Z",
  coordenada : 301324
}


const eje_x9:coordenadas = {
  letra : "X",
  coordenada : 10000001
}
const eje_y9: coordenadas = {
  letra : "Y",
  coordenada : 202020202
}
const eje_z9: coordenadas = {
  letra : "Z",
  coordenada : 30000003
}

// nombre: string, geolocalización_inicio: coordenadas[], geolocalización_fin: coordenadas[], longitud: number, desnivel: number, usuario: Usuario[], tipo_actividad: actividad, calificacion: number

const ruta0 = new Ruta('San Vicente', [eje_x0, eje_y0, eje_z0], [eje_x1, eje_y1, eje_z1], 1000, 200, [user0, user1, user2], "correr", 9);
const ruta1 = new Ruta('Plaza el charco', [eje_x2, eje_y2, eje_z2], [eje_x3, eje_y3, eje_z3], 2000, 200, [user3, user4, user5], "bicicleta", 8);
const ruta2 = new Ruta('Adventour', [eje_x4, eje_y4, eje_z4], [eje_x5, eje_y5, eje_z5], 300, 200, [user6, user7, user8], "correr", 8);
const ruta3 = new Ruta('Hop-On Hop-off', [eje_x6, eje_y6, eje_z6], [eje_x7, eje_y7, eje_z7], 400, 200, [user9, user10, user11], "bicicleta", 5);
const ruta4 = new Ruta('Mind the Gap', [eje_x8, eje_y8, eje_z8], [eje_x9, eje_y9, eje_z9], 5000, 200, [user12, user13, user14], "correr", 6);
const ruta5 = new Ruta('City Sightseeing', [eje_x0, eje_y0, eje_z0], [eje_x9, eje_y9, eje_z9], 6100, 200, [user15, user16, user17], "bicicleta", 7);
const ruta6 = new Ruta('La ruta real', [eje_x2, eje_y2, eje_z2], [eje_x7, eje_y7, eje_z7], 1200, 200, [user18, user19], "correr", 5);
const ruta7 = new Ruta('Keep Calm and travel On', [eje_x4, eje_y4, eje_z4], [eje_x1, eje_y1, eje_z1], 3100, 200, [user2, user3, user4], "bicicleta", 1);
const ruta8 = new Ruta('Wander Rush', [eje_x6, eje_y6, eje_z6], [eje_x3, eje_y3, eje_z3], 1040, 200, [user5, user6, user7], "correr", 9);
const ruta9 = new Ruta('My BigFat City Tour', [eje_x8, eje_y8, eje_z8], [eje_x5, eje_y5, eje_z5], 1000, 200, [user8, user9, user10], "bicicleta", 10);

// GRUPOS

const grupo0 = new Grupo('Grupo 0', [0,1,2,3,4,5,6,7,8,9,10]);
const grupo1 = new Grupo('Grupo 1', [0,1,2,3,4,5]);
const grupo2 = new Grupo('Grupo 2', [6,7,8,9,10]);
const grupo3 = new Grupo('Grupo 3', [10,11,12,13,14,15,16,17,18,19]);
const grupo4 = new Grupo('Grupo 4', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]);


// RETOS

const reto0 = new Reto('Reto 0', [ruta0,ruta2,ruta4,ruta6,ruta8], "correr");
const reto1 = new Reto('Reto 1', [ruta1,ruta3,ruta5,ruta7,ruta9], "bicicleta");
const reto2 = new Reto('Reto 2', [ruta0,ruta2,ruta4], "correr");