# Informe 

En esta práctica se ha llevado a cabo un diseño orientado a objetos del modelo de datos de un sistema de información que permita almacenar registros de actividades deportivas. Para la resolución de este ejercicio se han desarrollado un total de 8 clases junto con un conjunto de tipos y una base de datos, donde para cada una de ellas se han desarrollado pruebas las cuales se pueden observar en el coverage: 

# Insertar Coveralls

Las dificultades presentadas a lo largo de la práctica fueron la cantidad de problemas por parte del ```Inquirer.js``` y del ```Lowdb```, lo cual desencadeno en una gran pérdida de tiempo, que junto con el poco tiempo disponible para la realización de la misma debido a la carga lectiva del resto de las asignaturas, llevó a la conclusión de que la práctica era muy larga para su realización en solo dos semanas.

A continuación se mostrará un índice que corresponderá con los diferentes apartados desarrollados en la práctica:

## Índice

1. Rutas:
    - 1.1. Ruta
    - 1.2. rutaCollection
2. Usuarios:
    - 2.1. Usuario
    - 2.2. UsuarioCollection
3. Grupos:
    - 3.1. Grupo
    - 3.2. gruposCollection
4. Reto:
    - 4.1. Reto
    - 4.2.retosCollection
5. Referencias

## Desarrollo

### __Rutas:__ 

#### _Ruta_

`Ruta` consiste en una clase que representa una ruta la cual consta de los siguientes atributos privados, de los cuales caben destacar los tipos `ID`, `coordenadas` y `actividad`, los cuales fueron desarrollados de manera específica para que por una parte el _id_ fuese un __número__, las _coordenadas_ fuesen de un __eje__ específico(X, Y o Z) junto con su __valor__ numérico, y la _actividad_ fuese de tipo __correr__ o __bibicleta__:

- __`id_`:__ ID único de la ruta.
- __`nombre_`:__ Nombre de la ruta.
- __`geolocalizacion_inicio_`:__ Coordenadas de inicio de la ruta.
- __`geolocalizacion_fin_`:__ Coordenadas del final de la ruta.
- __`longitud_`:__ Longitud de la ruta.
- __`desnivel_`:__ Desnivel de la ruta.
- __`usuarios_`:__ Usuarios de la ruta.
- __`tipo_actividad_`:__ Tipo de actividad de la ruta.
- __`calificacion_`:__ Calificación de la ruta.

Para crear un objeto ruta se utiliza el __constructor__ de la clase el cual instancia todos los atributos de manera obligatoria excepto por el _id_, el cual se asigna de manera interna mediante condicionales:

```ts
  const id_global = database.get("rutas").map("nombre").value();
  if (id_global.includes(this.nombre_)) {
    this.id_ = database.get("rutas").find({ nombre: this.nombre_ }).value().id;

  } else {
    if (id !== undefined) {
      this.id_ = id;
    }
    else {
      // buscar el id más alto y sumarle 1
      const id_global = database.get("rutas").map("id").value();
      id_global.sort((a, b) => a - b);
      if (id_global.length === 0) {
        this.id_ = 1;
      }
      else {
        this.id_ = id_global[id_global.length - 1] + 1;
      }
    }
  }
```

Como se puede observar se declara como constante el `id_global` que es utilizado para definir el id a cada una de las rutas de manera incremental si es que el id que se extrae de la ruta es de tipo `undefined`. Por último se agrega en el `Lowdb` la ruta con todos sus atributos.

Y por último dentro de esta clase se dispone para cada atributo un __getter__ y un __setter__ determinados los cuales serán utilizados para el acceso a los mismos de manera externa a la clase, es decir, en otras clases como puede ser ``rutaCollection`.

#### _rutaCollection:_ 

`rutaCollection` consiste en una clase que representa una colección de rutas las cuales son de tipo `Ruta`, es decir, de la clase anteriormente mencionada:

- __`coleccion_rutas`:__ Colección de rutas.

Esta clase consta en un __constructor__ el cual realiza una llamada al método `leerBD()`, donde se realiza una lectura de las diferentes rutas presentes en el `Lowdb` y actualiza así el atributo _coleccion de rutas_ con todas las rutas presentes en dicho `Lowdb`. Para poder acceder al atributo mencionado se recurre a su __getter__ y __setter__ específico, donde seguido al mismo tenemos el siguiente método `borrarElementoBD`

### __Ejercicio 1:__ 

- __Enuncido:__
- __Solución propuesta:__
- __Algoritmo/Funciones utilizadas:__
- __Difucultades__

### __Ejercicio 1:__ 

- __Enuncido:__
- __Solución propuesta:__
- __Algoritmo/Funciones utilizadas:__
- __Difucultades__

### __Ejercicio 1:__ 

- __Enuncido:__
- __Solución propuesta:__
- __Algoritmo/Funciones utilizadas:__
- __Difucultades__

### __Ejercicio 1:__ 

- __Enuncido:__
- __Solución propuesta:__
- __Algoritmo/Funciones utilizadas:__
- __Difucultades__

### __Ejercicio 1:__ 

- __Enuncido:__
- __Solución propuesta:__
- __Algoritmo/Funciones utilizadas:__
- __Difucultades__

### __Ejercicio 1:__ 

- __Enuncido:__
- __Solución propuesta:__
- __Algoritmo/Funciones utilizadas:__
- __Difucultades__

## __Dificultades/Reflexión

## Referencias

[]()
[]()
[]()
[]()
[]()
[]()
[]()
[]()
[]()
[]()
