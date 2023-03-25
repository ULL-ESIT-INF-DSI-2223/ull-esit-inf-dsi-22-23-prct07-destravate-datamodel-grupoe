/**
 * Tipo que representa una coordenada
 * @file Types
 */
export type coordenadas = {
letra: "X" | "Y" | "Z";
coordenada: number;
} // X:28 Y:30 Z:15
  
/**
 * Tipo que representa una actividad que solo puede ser correr o bicicleta
 * @file Types
 */
export type actividad = "correr" | "bicicleta";

/**
 * Tipo que representa un identificador
 * @file Types
 */
export type ID = number;

/**
 * Tipo que representa una estadistica para la estadistica de entrenamiento
 * @file Types
 */
export type estadistica = {
  km: number;
  desnivel: number;
}

/**
 * Tipo que representa las estadisticas de entrenamiento
 * @file Types
 */
export type estadisticaEntrenamiento = {
  semana: estadistica;
  mes: estadistica;
  año: estadistica;
}

/**
 * Tipo que representa una fecha
 * @file Types
 */
export type fecha = {
  dia: number;
  mes: number;
  año: number;
}

/**
 * Tipo que representa un historico de rutas
 * @file Types
 */
export type historicoRutas = {
  fecha: fecha;
  id: number;
}

/**
 * Tipo que representa el esquema de la base de datos
 * @file Types
 */
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

  retos: {
    id: ID;
    nombre: string;
    rutas : ID[];
    tipo_actividad: actividad;
    km_totales: number;
    usuarios: ID[];
  }[]
};