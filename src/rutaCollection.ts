import {Ruta} from "./ruta"
import {ID} from "./types";
class rutaCollection {
  constructor(private coleccion_rutas_: Ruta[]) {
  }

  get getRutas(): Ruta[] {
    return this.coleccion_rutas_;
  } 

  set setRutas(coleccion_rutas: Ruta[]) {
    this.coleccion_rutas_ = coleccion_rutas;
  }

  // añadir, borrar, modificar

  addRuta(ruta: Ruta): Ruta[] | undefined{
    let repetido = false;
    this.coleccion_rutas_.forEach((ruta_aux) => {
      if (ruta.getId === ruta_aux.getId) {
        repetido = true;
      }
    });

    if (repetido === false) {
      this.coleccion_rutas_.push(ruta);
      return this.coleccion_rutas_;
    }
    else {
      return undefined;
      
    }
    
  }


  borrarRuta(identificador: ID): Ruta | undefined{
    let ruta_aux: Ruta; 
    this.coleccion_rutas_.forEach((ruta, indice) => {
      if (ruta.getId === identificador) {
        ruta_aux = ruta;
        this.coleccion_rutas_.splice(indice, 1);
        return ruta_aux;
      }
    });
    return undefined;
  }


  // modificarRuta(): 






}