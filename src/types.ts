export type coordenadas = {
letra: "X" | "Y" | "Z";
coordenada: number;
} // X:28 Y:30 Z:15
  
export type actividad = "correr" | "bicicleta";

export type ID = number;

export type estadistica = {
  km: number;
  desnivel: number;
}

export type estadisticaEntrenamiento = {
  semana: estadistica;
  mes: estadistica;
  año: estadistica;
}

export type fecha = {
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
    geolocalizacion_inicio: coordenadas[];
    geolocalizacion_fin: coordenadas[];
    longitud: number;
    desnivel: number;
    usuarios: ID[];
    tipo_actividad: actividad;
    calificacion: number;
  }[],
  
  usuarios: {
    id: ID;
    nombre: string;
    actividad: actividad;
    amigos: ID[];
    grupo_de_amigos: ID[][];
    estadisticas: estadisticaEntrenamiento;
    rutasFavoritas: ID[];
    retos: ID[];
    historicoRutas: historicoRutas[];
  }[],

  grupos: {
    id: ID;
    nombre: string;
    participantes: ID[];
    estadisticasEntrenamiento: estadisticaEntrenamiento;
    ranking: ID[];
    rutas_favoritas: ID[];
    historicoRutas: historicoRutas[];
  }[],



};