import { Usuario } from "./usuario";

export type coordenadas = {
letra: "X" | "Y" | "Z";
coordenada: number;
} // X:28 Y:30 Z:15
  
export type actividad = "correr" | "bicicleta";

export type ID = number;

type estadistica = {
  km: number;
  desnivel: number;
}

export type estadisticaEntrenamiento = {
  semana: estadistica;
  mes: estadistica;
  año: estadistica;
}

type fecha = {
  dia: number;
  mes: number;
  año: number;
}

export type historicoRutas = {
  fecha: fecha;
  id: number;
}


export type schemaType = {
  rutas: { 
    id: ID;
    nombre: string;
    geolocalización_inicio: coordenadas[];
    geolocalización_fin: coordenadas[];
    longitud: number;
    desnivel: number;
    usuarios: Usuario[];
    tipo_actividad: actividad;
    calificacion: number;
  }[]
};