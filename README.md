# Informe 

En esta práctica se ha llevado a cabo un diseño orientado a objetos del modelo de datos de un sistema de información que permita almacenar registros de actividades deportivas. Para la resolución de este ejercicio se han desarrollado un total de 8 clases junto con un conjunto de tipos y una base de datos, donde para cada una de ellas se han desarrollado pruebas las cuales se pueden observar en el coverage: 

# Insertar Coveralls

Las dificultades presentadas a lo largo de la práctica fueron la cantidad de problemas por parte del ```Inquirer.js``` y del ```Lowdb```, lo cual desencadenó en una gran pérdida de tiempo, que junto con el poco tiempo disponible para la realización de la misma debido a la carga lectiva del resto de las asignaturas, llevó a la conclusión de que la práctica era muy larga para su realización en tan sólo dos semanas.

A continuación se mostrará un índice que corresponderá con los diferentes apartados desarrollados en la práctica:

## Índice

1. [Rutas](#Rutas):
    - 1.1. [Ruta](#ruta)
    - 1.2. [rutaCollection](#rutacollection)
2. [Usuarios](#Usuarios):
    - 2.1. [Usuario](#usuario)
    - 2.2. [usuarioCollection](#usuariocollection)
3. [Grupos:](#Grupos)
    - 3.1. [Grupo](#grupo)
    - 3.2. [gruposCollection](#gruposcollection)
4. [Reto](#Reto):
    - 4.1. [Reto](#reto)
    - 4.2. [retosCollection](#retoscollection)
5. [Gestor](#Gestor)

## Desarrollo

### __Rutas:__ 

#### _Ruta_

`Ruta` consiste en una clase que representa una ruta la cual consta de los siguientes atributos privados, de los cuales cabe destacar los tipos `ID`, `coordenadas` y `actividad`, los cuales fueron desarrollados de manera específica para que por una parte el _id_ fuese un __número__, las _coordenadas_ fuesen de un __eje__ específico(X, Y o Z) junto con su __valor__ numérico, y la _actividad_ fuese de tipo __correr__ o __bibicleta__:

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

Esta clase consta en un __constructor__ el cual realiza una llamada al método `leerBD()`, donde se realiza una lectura de las diferentes rutas presentes en el `Lowdb` y actualiza así el atributo `coleccion_rutas_` con todas las rutas presentes en dicho `Lowdb`. Para poder acceder al atributo mencionado se recurre a su __getter__ y __setter__ específico, donde seguido al mismo tenemos dos métodos con funcionalidades similares.
Por una parte tenemos `borrarElementoBD(identificador: ID)` el cual se encargará de eliminar la ruta del _identificador_ pasado por parámetro del `Lowbd`, mientras que por la otra parte tenemos el método `borrarRuta(identificador: ID)` que se encargará de borrar la ruta con dicho _identificador_ pero en este caso tanto de `Lowbd` como del atributo `coleccion_rutas_`. 

Estos dos métodos a pesar de ser similares se llevaron a cabo debido a que en ciertas ocasiones se debía eliminar la ruta únicamente del `Lowdb` y no de ambos, puesto a que el algunos escenarios el método `borrarRuta(identificador: ID)` generaba errores al eliminar la ruta en ambos lugares.

Para que el usuario pueda recurrir a la acción de `borrarRutas(identificador: ID)` se desarrolló el método `promptBorrarRuta()` que permitirá la inserción del _id_ de la ruta a eliminar, dando dos posibles resultados:

1. El id de la ruta existe en el `Lowbd` y por lo tanto la acción resulta exitosa y envía al usuario el mensaje _"Ruta borrada: "_ junto con el id de dicha ruta suprimida.
2. El id de la ruta es inexistente en el `Lowbd` y por ello se procede al fracaso de la acción retornando al usuario el mensaje _"La ruta no existe"_.

Por otra parte tenemos la funcionalidad `modificarRuta(identificador: ID)` la cual es accesible para el usuario mediante el método `promptModificarRuta()`. En primer lugar nos encontramos con dicha funcionalidad, que consiste en el análisis del  _id_ de la ruta a modificar pasado por parámetro, que puede resultar en error si la misma no existe, o en éxito accediendo a una nueva elección del usuario, específicamente del atributo que desee modificar:

- Nombre.
- Geolocalización inicio.
- Geolocalización fin.
- Longitud.
- Desnivel.
- Usuario.
- Tipo de actividad.
- Calificación.

En función de la elección del usuario se procederá a un nuevo __prompt__ en el cual se insertarán los nuevos datos a modificar, en todos los casos tendremos que realizar los siguientes pasos para la exitosa modificación:

1. Cambio de la característica en su ruta correspondiente mediante su setter, todo ello dentro del atributo `coleccion_rutas_`.
2. Eliminación del elemento en el `Lowbd`.
3. Construcción de una ruta auxiliar con los nuevos datos de la ruta en cuestión, añadiendo así dicho elemento en el `Lowbd`.
4. Inserción de dicha ruta auxiliar en el atributo `coleccion_rutas_`.
5. Supresión de la antigüa ruta del atributo `coleccion_rutas_`.

Como se mencionó anteriormente el usuario accederá a dicha funcionalidad mediante `promptModificarRuta()`, que solicita al usuario el _id_ de la ruta que desee modificar llamando así con el mismo al método `modificarRuta(identificador: ID)`.

A este le sigue el método `promptAddRuta()`, cuya funcionalidad es la adicción de una ruta insertada por el usuario en el `Lowbd` y en el atributo `coleccion_rutas_`. Para ello se solicitan al usuario todos los datos necesarios para la creación de un objeto `Ruta` a excepción del _id_, puesto a que será asignado mediante el __id global__ mencionado en el constructor de la clase `Ruta`. Una vez obtenidos los datos se procede a la creación de las coordenadas de inicio y de fin, de los usuarios, y de la ruta en cuestión con todos los elementos excepto el _id_, la cual será insertada en el `Lowbd`, debido a la creación de la misma, y en el atributo `coleccion_rutas_`, debido a un _push_.

Todas estas funcionalidades serán invocadas en `manageRutas()` el cual mostrará al usuario todas las opciones:

- Añadir ruta.
- Borrar ruta.
- Modificar ruta.
- Salir.

Segón la respuesta del usuario se llamará al prompt _X_ Ruta correspondiente, o bien si la respuesta es _Salir_ se finalizará el proceso `process.exit(0)`.

Como últimos métodos de esta clase nos encontramos `infoRutas()`, `ordenarRutasPorNombre()`, `ordenarRutasPorCantidadUsuarios()`, `ordenarRutasPorLongitud()`, `ordenarRutasPorCalificacion()` y `ordenarRutasPorActividad()`. Donde `infoRutas` tiene la misma funcionalidad que `manageRutas()` pero con respecto al orden en el que se desee mostras el atributo `coleccion_rutas_`.

Todos los restantes métodos que suponen una oredenación de dicho atributo realizan en primer lugar una petición al usuario que consiste en la selección de un orden _ascendente_ o _descendente_, seguida de:

1. Se realiza una copia el atributo `coleccion_rutas_`.
2. Se ordena dicha copia según la respuesta del usuario, _ascendete_ o _descendente_.
3. Se muestra al usuario la copia del atributo `coleccion_rutas_` según el orden que haya solicitado el mismo.

### __Usuarios:__ 

#### _Usuario_

#### _usuarioCollection_

### __Grupos:__ 

#### _Grupo_

#### _gruposCollection_

### __Reto:__ 

#### _Reto_

#### _retosCollection_

### __Gestor:__ 

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
