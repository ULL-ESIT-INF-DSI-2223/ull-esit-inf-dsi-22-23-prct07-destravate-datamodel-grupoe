# Informe 

En esta práctica se ha llevado a cabo un diseño orientado a objetos del modelo de datos de un sistema de información que permita almacenar registros de actividades deportivas. Para la resolución de este ejercicio se han desarrollado un total de 8 clases junto con un conjunto de tipos y una base de datos, donde para cada una de ellas se han desarrollado pruebas las cuales se pueden observar en el coverage: 

# Insertar Coveralls

Cabe destacar el uso de `schemaType`, que es un tipo que representa el esquema del `Lowdb` para los objetos rutas, usuarios, grupos y retos almacenados en el mismo. Este tipo contiene diferentes subtipos desarrollados por nuestro grupo, los cuales se argumentarán en cada apartado.

Las dificultades presentadas a lo largo de la práctica fueron la cantidad de problemas por parte del `Inquirer.js` y del `Lowdb`, lo cual desencadenó en una gran pérdida de tiempo, que junto con el poco tiempo disponible para la realización de la misma debido a la carga lectiva del resto de las asignaturas, llevó a la conclusión de que la práctica era muy larga para su realización en tan sólo dos semanas.

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
    - 4.2. [retoCollection](#retocollection)
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
        /**
         * Buscar el id más alto y sumarle 1
         */
      const id_global = database.get("rutas").map("id").value();
      id_global.sort((a, b) => a - b);
      if (id_global.length === 0) {
        this.id_ = 1;
      }
      else {
        this.id_ = id_global[id_global.length - 1] + 1;
      }
    }
```

Como se puede observar se declara como constante el `id_global` que es utilizado para definir el id a cada una de las rutas de manera incremental si es que el id que se extrae de la ruta es de tipo `undefined`. Por último se agrega en el `Lowdb` la ruta con todos sus atributos.

Y por último dentro de esta clase se dispone para cada atributo un __getter__ y un __setter__ determinados los cuales serán utilizados para el acceso a los mismos de manera externa a la clase, es decir, en otras clases como puede ser ``rutaCollection`.

#### _rutaCollection:_ 

`rutaCollection` consiste en una clase que representa una colección de rutas las cuales son de tipo `Ruta`, es decir, de la clase anteriormente mencionada:

- __`coleccion_rutas`:__ Colección de rutas.

Esta clase consta de un __constructor__ el cual realiza una llamada al método `leerBD()`, donde se realiza una lectura de las diferentes rutas presentes en el `Lowdb` y actualiza así el atributo `coleccion_rutas_` con todas las rutas presentes en dicho `Lowdb`. Para poder acceder al atributo mencionado se recurre a su __getter__ y __setter__ específico, donde seguido al mismo tenemos dos métodos con funcionalidades similares.
Por una parte tenemos `borrarElementoBD(identificador: ID)` el cual se encargará de eliminar la ruta del _identificador_ pasado por parámetro del `Lowdb`, mientras que por la otra parte tenemos el método `borrarRuta(identificador: ID)` que se encargará de borrar la ruta con dicho _identificador_ pero en este caso tanto de `Lowdb` como del atributo `coleccion_rutas_`. 

Estos dos métodos a pesar de ser similares se llevaron a cabo debido a que en ciertas ocasiones se debía eliminar la ruta únicamente del `Lowdb` y no de ambos, puesto a que el algunos escenarios el método `borrarRuta(identificador: ID)` generaba errores al eliminar la ruta en ambos lugares.

Para que el usuario pueda recurrir a la acción de `borrarRutas(identificador: ID)` se desarrolló el método `promptBorrarRuta()` que permitirá la inserción del _id_ de la ruta a eliminar, dando dos posibles resultados:

1. El id de la ruta existe en el `Lowdb` y por lo tanto la acción resulta exitosa y envía al usuario el mensaje _"Ruta borrada: "_ junto con el id de dicha ruta suprimida.
2. El id de la ruta es inexistente en el `Lowdb` y por ello se procede al fracaso de la acción retornando al usuario el mensaje _"La ruta no existe"_.

Por otra parte tenemos la funcionalidad `modificarRuta(identificador: ID)` la cual es accesible para el usuario mediante el método `promptModificarRuta()`. En primer lugar nos encontramos con dicha funcionalidad, que consiste en el análisis del _id_ de la ruta a modificar pasado por parámetro, que puede resultar en error si la misma no existe, o en éxito accediendo a una nueva elección del usuario, específicamente del atributo que desee modificar:

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
2. Eliminación del elemento en el `Lowdb`.
3. Construcción de una ruta auxiliar con los nuevos datos de la ruta en cuestión, añadiendo así dicho elemento en el `Lowdb`.
4. Inserción de dicha ruta auxiliar en el atributo `coleccion_rutas_`.
5. Supresión de la antigüa ruta del atributo `coleccion_rutas_`.

Como se mencionó anteriormente el usuario accederá a dicha funcionalidad mediante `promptModificarRuta()`, que solicita al usuario el _id_ de la ruta que desee modificar llamando así con el mismo al método `modificarRuta(identificador: ID)`.

A este le sigue el método `promptAddRuta()`, cuya funcionalidad es la adicción de una ruta insertada por el usuario en el `Lowdb` y en el atributo `coleccion_rutas_`. Para ello se solicitan al usuario todos los datos necesarios para la creación de un objeto `Ruta` a excepción del _id_, puesto a que será asignado mediante el __id global__ mencionado en el constructor de la clase `Ruta`. Una vez obtenidos los datos se procede a la creación de las coordenadas de inicio y de fin, de los usuarios, y de la ruta en cuestión con todos los elementos excepto el _id_, la cual será insertada en el `Lowdb`, debido a la creación de la misma, y en el atributo `coleccion_rutas_`, debido a un _push_.

Todas estas funcionalidades serán invocadas en `manageRutas()` el cual mostrará al usuario todas las opciones:

- Añadir ruta.
- Borrar ruta.
- Modificar ruta.
- Salir.

Según la respuesta del usuario se llamará al prompt _X_ Ruta correspondiente, o bien si la respuesta es _Salir_ se finalizará el proceso `process.exit(0)`.

Como últimos métodos de esta clase nos encontramos `infoRutas()`, `ordenarRutasPorNombre()`, `ordenarRutasPorCantidadUsuarios()`, `ordenarRutasPorLongitud()`, `ordenarRutasPorCalificacion()` y `ordenarRutasPorActividad()`. Donde `infoRutas()` tiene la misma funcionalidad que `manageRutas()` pero con respecto al orden en el que se desee mostras el atributo `coleccion_rutas_`.

Todos los restantes métodos que suponen una ordenación de dicho atributo realizan en primer lugar una petición al usuario que consiste en la selección de un orden _ascendente_ o _descendente_, seguida de:

1. Se realiza una copia del atributo `coleccion_rutas_`.
2. Se ordena dicha copia según la respuesta del usuario, _ascendete_ o _descendente_.
3. Se muestra al usuario la copia del atributo `coleccion_rutas_` según el orden que haya solicitado el mismo.

### __Usuarios:__ 

#### _Usuario_

`Usuario` consiste en una clase que representa un usuario el cual consta de los siguientes atributos privados, de los cuales cabe destacar los tipos `ID`, `actividad`, `estadisticaEntrenamiento` e `historicoRutas`, los cuales fueron desarrollados de manera específica para que por una parte el _id_ fuese un __número__, la _actividad_ fuese de tipo __correr__ o __bibicleta__, la _estadisticaEntrenamiento_ fuese un conjunto de __semana__, __mes__ y __año__ de tipo `estadistica`, el cual consta de dos características numéricas __km__ y __desnivel__, y el _historicoRutas_ que consta de __fecha__ y __id__, donde el id es númerico pero fechas es de tipo `fecha`, es decir, con las características numéricas __dia__, __mes__ y __año__:

- __`id_`:__ ID único del usuario.
- __`nombre_`:__ Nombre del usuario.
- __`actividad_`:__ Actividad del usuario.
- __`amigos_`:__ Amigos del usuario.
- __`grupo_de_amigos_`:__ Grupo de amigos del usuario.
- __`estadisticas_`:__ Estadísticas del usuario.
- __`rutasFavoritas_`:__ Rutas favoritas del usuario.
- __`retos_`:__ Retos del usuario.
- __`historicoRutas_`:__ Histórico de rutas del usuario.

Para crear un objeto ruta se utiliza el __constructor__ de la clase el cual instancia todos los atributos de manera obligatoria excepto por las _rutas favoritas_, que se obtienen mediante el método `obtenerRutasFavoritas()`, y el _id_, el cual se asigna de manera interna mediante condicionales:

```ts
  const id_global = database.get("usuarios").map("nombre").value();
  if (id_global.includes(this.nombre_)) {
    this.id_ = database.get("usuarios").find({ nombre: this.nombre_ }).value().id;
  }
  else {
    if (id !== undefined) {
      this.id_ = id;
    }
    else {
      /**
       * Buscar el id más alto y sumarle 1
       */
      const id_global = database.get("usuarios").map("id").value();
      id_global.sort((a, b) => a - b);
      if (id_global.length === 0) {
        this.id_ = 1;
      }
      else {
        this.id_ = id_global[id_global.length - 1] + 1;
      }
    }
```

Como se puede observar se declara como constante el `id_global` que es utilizado para definir el id a cada uno de los usuarios de manera incremental si es que el id que se extrae del usuario es de tipo `undefined`. Por último se agrega en el `Lowdb` el usuario con todos sus atributos.

Para proseguir dentro de esta clase se dispone para cada atributo un __getter__ y un __setter__ determinados los cuales serán utilizados para el acceso a los mismos de manera externa a la clase, es decir, en otras clases como puede ser ``usuarioCollection`. Junto con el método `obtenerRutasFavoritas()` mencionado anteriormente, que según el histórico del usuario calculas sus rutas favoritas en función de si ha realizado las mismas más de dos veces:

1. Almacena el histórico del usuario en la variable constante `historico` e instancia dos arrays vacíos `rutasFav` y `rutas`.
2. En rutas procederá a insertar los _id_ de todos los históricos presentes en `historico`.
3. Ordenará los _id_ de `rutas`.
4. Recorrerá `rutas` y por cada _id_ igual al siguiente incrementará la variable `cont`, pero sino analizará si `cont` es mayor que dos.
5. Si `cont` es mayor que dos añadirá a `rutasFav` el _id_ de la ruta en cuestión, sino establecerá `cont` a uno.
6. Establecerá el atributo `rutasFavoritas` como `rutasFav` mediante su _setter_.

Por último tenemos el método `getKMTotales()`, el cual se encarga de calcular el número total de kilómetros recorricos por el usuario según su histórico. Para ello extrae de cada histórico el número de kilómetros de la ruta en cuestion para añadirlo a la variable `kmTotales`, retornada tras finalizar el análisis de los históricos.

#### _usuarioCollection_

`usuarioCollection` consiste en una clase que representa una colección de usuarios los cuales son de tipo `Usuario`, es decir, de la clase anteriormente mencionada:

- __`usuarios`:__ Colección de usuarios.

Esta clase consta de un __constructor__ el cual realiza una llamada al método `leerBD()`, donde se realiza una lectura de los diferentes usuarios presentes en el `Lowdb` y actualiza así el atributo `usuarios` con todos los usuarios presentes en dicho `Lowdb`. Para poder acceder al atributo mencionado se recurre a su __getter__ y __setter__ específico, donde seguido al mismo tenemos el método `manageUsuarios()` que invoca todas las funcionalidades de esta clase, mostrando al usuario todas las opciones:

- Añadir usuario.
- Borrar usuario.
- Modificar usuario.
- Salir.

Según la respuesta del usuario se llamará al prompt _X_ User correspondiente, o bien si la respuesta es _Salir_ se finalizará el proceso `process.exit(0)`.

A continuación tenemos dos métodos una de las funcionalidades mencionadas anteriormente seguida de su método, `promptBorrarUser()` y `borrarUsuario(id: number)`. Tenemos `promptBorrarUser()`, que permitirá la inserción del _id_ del usuario a eliminar, para así poder llamar al método `borrarUsuario(id: number)` que se encargará de borrar el usuario con dicho _identificador_ pero en este caso tanto de `Lowdb` como del atributo `usuarios`, dando dos posibles resultados:

1. El id del usuario existe en el `Lowdb` y por lo tanto la acción resulta exitosa y envía al usuario el mensaje _"Usuario borrado"_.
2. El id del usuario es inexistente en el `Lowdb` y por ello se procede al fracaso de la acción retornando al usuario el mensaje _"No se ha encontrado el usuario"_.

A este le sigue el método `promptAddUser()`, cuya funcionalidad es la adicción de un usuario insertado en el `Lowdb` y en el atributo `usuarios`. Para ello se solicitan al usuario todos los datos necesarios para la creación de un objeto `Usuario` a excepción del _id_ y de las _rutas favoritas_, puesto a que serán asignados u obtenidos en el constructor de la clase `Usuario`. Una vez obtenidos los datos se procede a la creación del usuario en cuestión con todos los elementos excepto el _id_ y las _rutas favoritas_, el cual será insertado en el `Lowdb`, debido a la creación del mismo, y en el atributo `usuarios`, debido a un _push_.

Después nos encontramos con `promptModificarUser()`, que solicita al usuario el _id_ del usuario que desee modificar llamando así con el mismo al método `modificarUsuario(identificador: ID)`, seguido de `borrarElementoBD(identificador: ID)` el cual se encargará de eliminar el usuario del _identificador_ pasado por parámetro del `Lowdb`.

Con respecto al `promptModificarUser()` obtenemos su funcionalidad debido al método `modificarUsuario(identificador: ID)`. En primer lugar nos encontramos con el análisis del _id_ del usuario a modificar pasado por parámetro, que puede resultar en error si el mismo no existe, o en éxito accediendo a una nueva elección del usuario, específicamente del atributo que desee modificar:

- Nombre.
- Actividad.
- Amigos.
- Grupos de amigos.
- Estadísticas.
- Histórico de rutas.
- Retos.

En función de la elección del usuario se procederá a un nuevo __prompt__ en el cual se insertarán los nuevos datos a modificar, en todos los casos tendremos que realizar los siguientes pasos para la exitosa modificación:

1. Cambio de la característica en su usuario correspondiente mediante su setter, todo ello dentro del atributo `usuarios`.
2. Eliminación del elemento en el `Lowdb`.
3. Construcción de un usuario auxiliar con los nuevos datos del usuario en cuestión, añadiendo así dicho elemento en el `Lowdb`.
4. Inserción de dicho usuario auxiliar en el atributo `usuarios`.
5. Supresión del antigüo usuario del atributo `usuarios`.

Como últimos métodos de esta clase nos encontramos `infoUsuario()`, `ordenarUsuarioPorNombre()`, `ordenarPorKmsSemanales()`, `ordenarPorKmsMensuales()` y `ordenarPorKmsAnuales()`. Donde `infoUsuario()` tiene la misma funcionalidad que `manageUsuarios()` pero con respecto al orden en el que se desee mostras el atributo `usuarios`.

Todos los restantes métodos que suponen una ordenación de dicho atributo realizan en primer lugar una petición al usuario que consiste en la selección de un orden _ascendente_ o _descendente_, seguida de:

1. Se realiza una copia del atributo `usuarios`.
2. Se ordena dicha copia según la respuesta del usuario, _ascendete_ o _descendente_.
3. Se muestra al usuario la copia del atributo `usuarios` según el orden que haya solicitado el mismo.

### __Grupos:__ 

#### _Grupo_

`Grupo` consiste en una clase que representa un grupo el cual consta de los siguientes atributos privados, de los cuales cabe destacar los tipos `ID`, `estadisticaEntrenamiento` e `historicoRutas`, los cuales fueron desarrollados de manera específica para que por una parte el _id_ fuese un __número__, la _estadisticaEntrenamiento_ fuese un conjunto de __semana__, __mes__ y __año__ de tipo `estadistica`, el cual consta de dos características numéricas __km__ y __desnivel__, y el _historicoRutas_ que consta de __fecha__ y __id__, donde el id es númerico pero fechas es de tipo `fecha`, es decir, con las características numéricas __dia__, __mes__ y __año__:

- __`id_`:__ ID único del grupo.
- __`nombre_`:__ Nombre del grupo.
- __`participantes_`:__ Participantes del grupo.
- __`estadisticasEntrenamiento_`:__ Estadísticas del grupo.
- __`ranking_`:__ Ranking del grupo.
- __`rutasFavoritas_`:__ Rutas favoritas del grupo.
- __`historicoRutas_`:__ Histórico de rutas del usuario.

Para crear un objeto ruta se utiliza el __constructor__ de la clase el cual instancia todos los atributos de manera obligatoria excepto por el _id_, el cual se asigna de manera interna mediante condicionales:

```ts
  const id_global = database.get("grupos").map("nombre").value();
  if (id_global.includes(this.nombre_)) {
    this.id_ = database.get("grupos").find({ nombre: this.nombre_ }).value().id;
  } else {
    if (id !== undefined) {
      this.id_ = id;
    }
    else {
      /**
       * Buscar el id más alto y sumarle 1
       */
      const id_global = database.get("grupos").map("id").value();
      id_global.sort((a, b) => a - b);
      if (id_global.length === 0) {
        this.id_ = 1;
      }
      else {
        this.id_ = id_global[id_global.length - 1] + 1;
      }
    }
```

Como se puede observar se declara como constante el `id_global` que es utilizado para definir el id a cada uno de los grupos de manera incremental si es que el id que se extrae del grupo es de tipo `undefined`. Por último se agrega en el `Lowdb` el grupo con todos sus atributos.

Y por último dentro de esta clase se dispone para cada atributo un __getter__ y un __setter__ determinados los cuales serán utilizados para el acceso a los mismos de manera externa a la clase, es decir, en otras clases como puede ser ``gruposCollection`.

#### _gruposCollection_

`gruposCollection` consiste en una clase que representa una colección de grupos los cuales son de tipo `Grupo`, es decir, de la clase anteriormente mencionada:

- __`grupos_`:__ Colección de grupos.

Esta clase consta de un __constructor__ el cual realiza una llamada al método `leerBD()`, donde se realiza una lectura de los diferentes grupos presentes en el `Lowdb` y actualiza así el atributo `grupos_` con todos los grupos presentes en dicho `Lowdb`. Para poder acceder al atributo mencionado se recurre a su __getter__ y __setter__ específico.

Para comenzar tenemos los métodos `infoUsuario()`, `ordenarGruposPorNombre()`, `ordenarPorKmsSemanales()`, `ordenarPorKmsMensuales()`, `ordenarPorKmsAnuales()` y `ordenarPorNumUsuarios()`. Donde `infoUsuario()` tiene la misma funcionalidad que `manageGrupos()` pero con respecto al orden en el que se desee mostras el atributo `grupos_`.

Todos los restantes métodos que suponen una ordenación de dicho atributo realizan en primer lugar una petición al usuario que consiste en la selección de un orden _ascendente_ o _descendente_, seguida de:

1. Se realiza una copia del atributo `grupos_`.
2. Se ordena dicha copia según la respuesta del usuario, _ascendete_ o _descendente_.
3. Se muestra al usuario la copia del atributo `grupos_` según el orden que haya solicitado el mismo.

Este método `manageGrupos()` mencionado anteriormente invoca todas las funcionalidades de esta clase, mostrando al usuario todas las opciones:

- Añadir grupo.
- Eliminar grupo.
- Modificar.
- Salir.

Según la respuesta del usuario se llamará al prompt _X_ Grupo correspondiente, o bien si la respuesta es _Salir_ se finalizará el proceso `process.exit(0)`.

Tras este método nos encontramos con `promptModificarGrupo()`, que solicita al usuario el _id_ del grupo que desee modificar llamando así con el mismo al método `modificarGrupo(identificador: ID)`, seguido de `borrarElementoBD(identificador: ID)` el cual se encargará de eliminar el grupo del _identificador_ pasado por parámetro del `Lowdb`.

Con respecto al `promptModificarGrupo()` obtenemos su funcionalidad debido al método `modificarGrupo(identificador: ID)`. En primer lugar nos encontramos con el análisis del _id_ del grupo a modificar pasado por parámetro, que puede resultar en error si el mismo no existe, o en éxito accediendo a una nueva elección del usuario, específicamente del atributo que desee modificar:

- Nombre.
- Participantes.
- Estadísticas.
- Histórico de rutas.

En función de la elección del usuario se procederá a un nuevo __prompt__ en el cual se insertarán los nuevos datos a modificar, en todos los casos tendremos que realizar los siguientes pasos para la exitosa modificación:

1. Cambio de la característica en su grupo correspondiente mediante su setter, todo ello dentro del atributo `grupos_`.
2. Eliminación del elemento en el `Lowdb`.
3. Construcción de un grupo auxiliar con los nuevos datos del grupo en cuestión, añadiendo así dicho elemento en el `Lowdb`.
4. Inserción de dicho grupo auxiliar en el atributo `grupos_`.
5. Supresión del antigüo grupo del atributo `grupos_`.

A continuación tenemos dos métodos una de las funcionalidades mencionadas anteriormente seguida de su método, `promptEliminarGrupo()` y `eliminarGrupo(identificador: ID)`. Tenemos `promptEliminarGrupo()`, que permitirá la inserción del _id_ del grupo a eliminar, para así poder llamar al método `eliminarGrupo(identificador: ID)` que se encargará de borrar el grupo con dicho _identificador_ pero en este caso tanto de `Lowdb` como del atributo `grupos_`, dando dos posibles resultados:

1. El id del grupo existe en el `Lowdb` y por lo tanto la acción resulta exitosa retornando el grupo auxiliar utilizado.
2. El id del grupo es inexistente en el `Lowdb` y por ello se procede al fracaso de la acción retornando así undefined.

Para finalizar está el método `promptAñadirGrupo()`, cuya funcionalidad es la adicción de un grupo insertado en el `Lowdb` y en el atributo `grupos_`. Para ello se solicitan al usuario todos los datos necesarios para la creación de un objeto `Grupo` a excepción del _id_, de las _rutas favoritas_ y del _ranking_, puesto a que serán asignados u obtenidos en el constructor de la clase `Grupo`. Una vez obtenidos los datos se procede a la creación del grupo en cuestión con todos los elementos excepto el _id_, las _rutas favoritas_ y el _ranking_, el cual será insertado en el `Lowdb`, debido a la creación del mismo, y en el atributo `grupos_`, debido a un _push_.

### __Reto:__ 

#### _Reto_

`Reto` consiste en una clase que representa un reto la cual consta de los siguientes atributos privados, de los cuales cabe destacar los tipos `ID` y `actividad`, los cuales fueron desarrollados de manera específica para que por una parte el _id_ fuese un __número__ y la _actividad_ fuese de tipo __correr__ o __bibicleta__:

- __`id_`:__ ID único del reto.
- __`nombre_`:__ Nombre del reto.
- __`rutas_`:__ Rutas del reto.
- __`tipo_actividad_`:__ Tipo de actividad del reto.
- __`km_totales_`:__ Kilómetros totales del reto.
- __`usuarios_`:__ Usuarios del reto.

Para crear un objeto ruta se utiliza el __constructor__ de la clase el cual instancia todos los atributos de manera obligatoria, excepto por el _id_, el cual se asigna de manera interna mediante condicionales:

```ts
  const id_global = database.get("retos").map("nombre").value();
  if (id_global.includes(this.nombre_)) {
    this.id_ = database.get("retos").find({ nombre: this.nombre_ }).value().id;
  } else {
    if (id !== undefined) {
      this.id_ = id;
    }
    else {
      /**
       * Buscar el id más alto y sumarle 1
       */
      const id_global = database.get("retos").map("id").value();
      id_global.sort((a, b) => a - b);
      if (id_global.length === 0) {
        this.id_ = 1;
      }
      else {
        this.id_ = id_global[id_global.length - 1] + 1;
      }
    }
```

Como se puede observar se declara como constante el `id_global` que es utilizado para definir el id a cada uno de los retos de manera incremental si es que el id que se extrae del reto es de tipo `undefined`. Por último se agrega en el `Lowdb` el reto con todos sus atributos.

Y por último dentro de esta clase se dispone para cada atributo un __getter__ y un __setter__ determinados los cuales serán utilizados para el acceso a los mismos de manera externa a la clase, es decir, en otras clases como puede ser ``retoCollection`.

#### _retoCollection_

`retoCollection` consiste en una clase que representa una colección de retos los cuales son de tipo `Reto`, es decir, de la clase anteriormente mencionada:

- __`retos_`:__ Colección de retos.

Esta clase consta de un __constructor__ el cual realiza una llamada al método `leerBD()`, donde se realiza una lectura de los diferentes retos presentes en el `Lowdb` y actualiza así el atributo `retos_` con todos los retos presentes en dicho `Lowdb`. Para poder acceder al atributo mencionado se recurre a su __getter__ y __setter__ específico.

El primer método encontrado es `manageRetos()`, que invoca todas las funcionalidades de esta clase, mostrando al usuario todas las opciones:

- Añadir reto.
- Eliminar reto.
- Modificar.
- Salir.

Según la respuesta del usuario se llamará al prompt _X_ Reto correspondiente, o bien si la respuesta es _Salir_ se finalizará el proceso `process.exit(0)`.

Una de estos métodos es `promptAñadirReto()`, cuya funcionalidad es la adicción de un reto insertado en el `Lowdb` y en el atributo `retos_`. Para ello se solicitan al usuario todos los datos necesarios para la creación de un objeto `Reto` a excepción del _id_, puesto a que será asignados en el constructor de la clase `Reto`. Una vez obtenidos los datos se procede a la creación del reto en cuestión con todos los elementos excepto el _id_, el cual será insertado en el `Lowdb`, debido a la creación del mismo, y en el atributo `retos_`, debido a un _push_.

A continuación tenemos dos métodos, una de las funcionalidades mencionadas anteriormente seguida de su método, `promptEliminarReto()` y `eliminarReto(identificador: ID)`. Tenemos `promptEliminarReto()`, que permitirá la selección del reto a eliminar, para así poder llamar al método `eliminarReto(identificador: ID)` que se encargará de borrar el reto con dicho _identificador_ pero en este caso tanto de `Lowdb` como del atributo `retos_`, dando dos posibles resultados:

1. El id del reto existe en el `Lowdb` y por lo tanto la acción resulta exitosa retornando el reto auxiliar utilizado.
2. El id del reto es inexistente en el `Lowdb` y por ello se procede al fracaso de la acción retornando así undefined.

Tras estos métodos nos encontramos con `promptModificarReto()`, que solicita al usuario que seleccione el reto que desee modificar llamando así con el mismo al método `modificarReto(identificador: ID)`, cuya funcionalidad consta del análisis del _id_ del reto a modificar pasado por parámetro, que puede resultar en error si el mismo no existe, o en éxito accediendo a una nueva elección del usuario, específicamente del atributo que desee modificar:

- Nombre.
- Rutas.
- Tipo de Actividad.
- Usuarios.

En función de la elección del usuario se procederá a un nuevo __prompt__ en el cual se insertarán los nuevos datos a modificar, en todos los casos tendremos que realizar los siguientes pasos para la exitosa modificación:

1. Cambio de la característica en su reto correspondiente mediante su setter, todo ello dentro del atributo `retos_`.
2. Eliminación del elemento en el `Lowdb`.
3. Construcción de un reto auxiliar con los nuevos datos del reto en cuestión, añadiendo así dicho elemento en el `Lowdb`.
4. Inserción de dicho reto auxiliar en el atributo `retos_`.
5. Supresión del antigüo reto del atributo `retos_`.

Por último tenemos `borrarElementoBD(identificador: ID)` el cual se encargará de eliminar el reto del _identificador_ pasado por parámetro del `Lowdb`, seguido de los métodos `infoUsuario()`, `ordenarRetosPorNombre()`, `ordenarPorKms()` y `ordenarPorNumUsuarios()`. Donde `infoUsuario()` tiene la misma funcionalidad que `manageRetos()` pero con respecto al orden en el que se desee mostras el atributo `retos_`.

Todos los restantes métodos que suponen una ordenación de dicho atributo realizan en primer lugar una petición al usuario que consiste en la selección de un orden _ascendente_ o _descendente_, seguida de:

1. Se realiza una copia del atributo `retos_`.
2. Se ordena dicha copia según la respuesta del usuario, _ascendete_ o _descendente_.
3. Se muestra al usuario la copia del atributo `retos_` según el orden que haya solicitado el mismo.

### __Gestor:__ 

`Gestor` consiste en una clase que gestiona el tratamiento de la información del sistema, la cual consta de diferentes métodos cuya explicación constará a continuación.

En primer lugar nos encontramos con `registrarUsuario()`, cuya función es registrar un usuario en el sistema, para ello solicita al usuario sus datos y se llevaraán acabo la creación de los diferentes objetos necesarios para creación del nuevo usuario.

1. Se obtienen todos los nombres de usuarios presentes en el `Lowdb`  y se comprueba que el nombre del usuario no exista, puesto a que no puede haber dos usuarios con el mismo nombre.
2. Creación de los diferentes elementos para el posterior establecimiento de los mismos como atributos del nuevo usuario.
3. Creación del usuario y por lo tanto adición del mismo al `Lowdb`.

En segundo lugar nos encontramos con el método `iniciarSesion()`, que como su nombre indica permitirá al usuario iniciar sesión en el sistema mediante la selección de usuario presentes en el `Lowbd`. Seguido a este tenemos el `programaPrincipal()` que maneja el sistema proponiendo al usuario de acción desea realizar y según su respuesta llamando al método determinado:

- Registrarse en el sistema.
- Iniciar sesión.
- Funcionamiento del sistema.
- Salir.

A continuación tenemos el `userManage()` utilizado para la administración de usuarios con una funcionalidad similar al `programaPrincipal()`, esto se debe a que se le muestran al usuario un listado de opciones que puede realizar en función a los usuarios, y según su elección realizará la llamada al método correspondiente:

- Ver listado de usuarios.
- Modificar mis amigos.
- Visualizar rutas.
- Unirse a un grupo.
- Gestionar grupos.
- Salir

## Referencias

[Guón de la práctica 7](https://ull-esit-inf-dsi-2223.github.io/prct07-destravate-dataModel/)









