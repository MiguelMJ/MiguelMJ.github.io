---
layout: post
title: Interfaces para la desvirtualización
pseudodate: 2025
category: misc
permalink: /reflections/misc/sobre-la-virtualidad
---

## Introducción

Uno de los principales efectos del progreso tecnológico, especialmente digital, es la creciente virtualización de nuestro entorno, nuestras relaciones y nuestra vida en general. Me gustaría reflexionar sobre la naturaleza de esta virtualización e identificar dónde se encuentra el punto que convierte el avance de la técnica en algo desadaptativo.

Por estar hablando de tecnología, hay dos acepciones del diccionario que me interesan.

> Virtual:
> - Que está ubicado o tiene lugar en línea, generalmente a través de internet. Tienda, campus, curso, encuentro virtual.<br>
> Sinónimos: digital, telemático.
> - Que tiene existencia aparente y no real.<br>
> Sinónimos: aparente, irreal, imaginario, supuesto.
> 
> -- [Diccionario de la RAE](https://dle.rae.es/virtual)

A través del concepto de lo virtual, se establece una relación entre lo que existe sólo en un soporte digital y lo que es pura apariencia. Aunque esto nos da un punto de partida, cualquier crítica o análisis desde aquí sería superficial. Hace falta profundizar en el concepto y descubrir que la virtualización no aparece con las tecnologías digitales.

La fuente de lo virtual, que tenemos que analizar para entenderlo del todo, son las *interfaces*. Debemos comprender cómo pueden modelar, enriquecer, condicionar o limitar nuestra relación con el mundo. Sólo así podemos entender del todo cómo aparece lo virtual, cómo se producen sus efectos y cuáles son las consecuencias de sumergirse en ello.

## Relaciones de sujeto, objeto e interfaz

El contacto con la realidad, la forma más elemental de relación con el mundo, se experimenta a través del cuerpo. Aquello que podemos percibir y manipular sin intermediarios es lo que conforma nuestro entorno inmediato. Existe una relación física o **relación directa** con el mundo:

<div role="img" arial-label="Diagrama relacionando bidireccionalmente dos nodos llamados sujeto y objeto">
<span class="card">Sujeto</span>⟷<span class="card">Objeto</span>
</div>

También es posible relacionarse con el mundo a través de un elemento intermedio: la interfaz. Ésta modela la información que hay al otro lado y nos permite razonar sobre ello en términos propios. Al recibir información de la interfaz y actuar sobre ella, lo hacemos indirectamente sobre el objeto, pero pensando en el lenguaje de la interfaz y no de aquello que modela. Cuando existe este tipo de interacción, existe una **relación indirecta**:

<span class="card">Sujeto</span>⟷<span class="card">Interfaz</span>⟷<span class="card">Objeto</span>

Las interfaces siempre tienen un aspecto material (tangible o no, pero material) y uno formal, que modela el objeto de la relación. Cuando el aspecto formal se refiere al mundo, consideramos que la interfaz supone una indirección entre éste y el sujeto. Pero cuando el aspecto formal se refiere a sí mismo (se autocontiene), entonces la interfaz se convierte propiamente en el objeto de relación y es entonces cuando consideramos que existe un **sistema virtual**, que produce una **relación virtual**:

<span class="card">Sujeto</span>⟷<span class="card">Interfaz</span>⮌

Estos sistemas presentan, como apuntábamos antes, cierto grado de *irrealidad*, porque al otro lado de la interfaz no hay nada. La información que recibe el sujeto sólo tiene sentido en la medida en la que el el modelo de la interfaz se ajusta a un objeto del mundo real. En otras palabras: el sistema virtual sólo puede tener un carácter de simulación.

La información que el sujeto recibe del sistema proviene del conocimiento con el que se creó la interfaz, y los efectos de actuar sobre ella no se trasladan al mundo. En cambio, se limitan al componente físico de la interfaz, se transforman según el modelo que implementan, y se devuelven al sujeto. La única manera en la que un sistema virtual repercute en el mundo es a través de su repercusión en el sujeto. 

De hecho, los sistemas virtuales "analógicos" a los que nos exponemos a una edad más temprano son los juegos de simulación. Los juguetes son interfaces a una versión virtual (en ese sentido, imaginaria) de lo que representan: herramientas, personas, animales, etc.

El aislamiento del sujeto que se da en estos sistemas es a menudo deseable, para minimizar las consecuencias de los errores durante un aprendizaje. Por otra parte, presenta el primer riesgo de inaptabilidad, porque si dicho aprendizaje termina o directamente no existe, el espacio virtual se convierte en una trampa, un lugar donde el sujeto queda expulsado de la realidad.

La mayoría de sistemas lo suficientemente complejos acaban requiriendo interfaces que, por la necesidad de simular el sistema que modelan, son **parcialmente virtuales**: modelan la interacción con el objeto y, al mismo tiempo, la extienden a una simulación. 


<span class="card">Sujeto</span>⟷<span class="card">Interfaz</span><sup>⮌</sup><sub>⟷<span class="card">Objeto</span></sub>

Antes de explorar esta cuestión, describiremos con más precisión las características y el funcionamiento de las interfaces. Esto nos hará falta para explicar la naturaleza de los sistemas parcialmente virtuales.

## Interfaces para el modelado

> Interfaz:
> - Conexión o frontera común entre dos aparatos o sistemas independientes.
> - Conexión, física o lógica, entre una computadora y el usuario, un dispositivo periférico o un enlace de comunicaciones.
> 
> -- [Diccionario de la RAE](https://dle.rae.es/interfaz)

Cuando nos referimos a las interfaces que usamos como seres humanos, hablamos de puntos de conexión entre nosotros como sujetos y un tercer sistema que llamamos objeto.

## Sistemas parcialmente virtuales

El propósito original de una interfaz en medio de una relación indirecta es modelar la interacción entre las partes. Sin embargo, cuando dicha interfaz extiende esta relación con un componente simulado, la correspondencia verdadera se deforma. Es entonces cuando los riesgos más graves de inadaptabilidada aparecen.


Es más difícil para el sujeto medir el impacto que tiene en el mundo la relación con una interfaz parcialmente virtual. También es más fácil confundir al objeto real con el elemento simulado. Como consecuencia, se puede producir un círculo vicioso en el que el sujeto sólo mide el impacto virtual de sus acciones sobre un objeto real, quedando aislado el sujeto del objeto, pero no el objeto del sujeto. Una buena parte, por no decir la mayoría, de nuestros sistemas son parcialmente virtuales. 

En la economía encontramos un caso claro. La divisa es la virtualización del valor que en una relación directa se transmitiría mediante el trueque. Se crea una relación indirecta con el valor de los objetos al modelarlo con un numérico medido en cierta divisa: un precio. Además, se crea un nuevo valor sobre el propio dinero, un valor virtual. En un trueque, la relación entre lo que se da y lo que se recibe es directa; cualquier regateo tiene unas consecuencias inmediatas. Con el dinero, hay un valor virtual que no se corresponde a ningún objeto sino a objetos potenciales modelados por su precio. Terminamos con una interfaz que nos relaciona con el valor de los objetos, pero también con su propio modelo virtual.

Otro ejemplo son las métricas de evaluación en el sistema educativo, en los controles de calidad, etc. Lás métricas proporcionan una interfaz entre los sujetos y aquello que miden, con el objeto de razonar mejor sobre aspectos como los resultados de un aprendizaje o de un proceso productivo. Fácilmente, la implementación de estas métricas se convierte en un modelo a atajar, olvidando aquello que se pretendía cuantificar y pasando a medir la capacidad de las propias métricas de ser satisfechas. Esto es a lo que se refieren, en otros contextos, el concepto de *reward hacking* en Inteligencia Artificial o la ley de Goodhart:

> Cuando un indicador socioeconómico u otra medida sustituta se convierte en el objetivo de políticas socioeconómicas, pierde el contenido informativo que podía cualificarla para jugar ese papel.

Todos estos bucles de retroalimentación secundarios con el potencial de atrapar el significado un fenómeno principal provienen de un diseño, intencional o no, que modela dicho fenómeno haciéndolo partícipe de una simulación; un sistema parcialmente virtual, que mezcla la relación con el mundo y la relación consigo mismo.

## Identificar lo virtual

Después de los ejemplos que hemos puesto, cabe preguntarse si acaso la virtualidad no emerge de manera inevitable a partir de cierta complejidad en las relaciones que queremos resolver. Cualquier interfaz que pretenda modelar una realidad compleja va a crear espacios virtuales intermedios que pueden convertirse en agujeros, trampas o bucles en los que caer. Cualquier propuesta que pretenda eliminarlos se revela enseguida como una solución utópica. Más bien, necesitamos saber identificarlos y, en la medida de lo posible, reducirlos.

Para distinguir el componente virtual del objeto real en una interfaz hay que contemplar con detenimiento la información y las operaciones que ofrece una interfaz. En una relación indirecta, sin virtualización, la interfaz modela la relación con el objeto, haciéndolo más accesible de alguna manera o aumentando algún aspecto de la interacción, pero no atribuyéndole nuevas propiedades. Si eliminamos el componente físico de la interfaz, la relación con el objeto tendrá que redefinirse de manera directa, física. Será una relación más lenta, más compleja o más costosa, pero la información obtenida y las operaciones posibles serán, teóricamente, las mismas.

Cuando existe informacioń teóricamente inobtenible u operaciones teóricamente irrealizables, entonces nos encontramos con que dicha interacción no se realizaba sobre el objeto, sino únicamente sobre el modelo proporcionado por la interfaz


