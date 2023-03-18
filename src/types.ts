
export type coordenadas = {
letra: "X" | "Y" | "Z";
coordenada: number;
} // X:28 Y:30 Z:15
  
export type actividad = {
nombre: "correr" | "bicicleta";
}

export type ID = {
  id: number;
}

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