---
title: Sobre la programación declarativa
subtitle: Por qué estoy aprendiendo Prolog
date: 2021-03-24
layout: post
---

Antes de nada, quiero dejar claro que en adelante usaré _lenguaje de programación declarativa_ para referirme a programación puramente funcional (Haskell, Miranda) y lógica (Prolog). No para lenguajes de consulta (SQL) o de marcado (XML).

La mayoría de nosotros, si no todos, comenzamos nuestro camino como programadores con un lenguaje imperativo (C, Python, JS...). De esta manera aprendemos a pensar en los algoritmos, a resolver los problemas paso por paso. 

Estoy de acuerdo con que ésta es la mejor forma de empezar, pero también creo que los desarrolladores deberíamos ser curiosos por naturaleza y probar nuevos enfoques. Muchos, en cambio, prefieren mantener distancias con la programación declarativa, sin entender cómo podría beneficiarles. He aquí mis opiniones al respecto.

<h2 id="¿Por-qué-la-programación-declarativa-es-menos-popular?10">¿Por qué la programación declarativa es menos popular?</h2> 

1. **Los ordenadores no funcionan así**
   Para empezar, los propios ordenadores ejecutan los programas de manera imperativa (una instrucción tras otra) y estoy bastante seguro de que siempre lo harán, porque no vivimos en una dimensión matemática donde las definiciones se aplican sin más. Por este mismo motivo, **la programación imperativa es la mejor manera de conocer el funcionamiento de tu ordenador**, cómo se compila el código a lenguaje máquina, cómo se ejecuta, etc. Estos conceptos se entienden mejor incluso aunque el lenguaje imperativo en cuestión sea interpretado.

2. **Se siente como empezar de cero**
   En mi segundo año de carrera, me dijeron que escribiera un programa en Haskell por primera vez. Al ver que **no podía utilizar asignaciones o bucles**, me sentí algo desarmado, como un principiante. La diferencia en cómo se manejan los datos y el hecho de que no comprendía del todo cómo funcionaba la ejecución (con lo que me pareció una cantidad obscena de llamadas recursivas) me bloqueó bastante en un primer momento.
   Es completamente normal pensar _"haría esto mucho más rápido en mi lenguaje habitual, en el que tengo mucha más experiencia y que se ajusta mejor mi manera de pensar"_.

3. **No es el estándar de la industria**
   **Los [lenguajes más populares de 2020](https://www.northeastern.edu/graduate/blog/most-popular-programming-languages/) son imperativos**, algunos más multiparadigmáticos que otros, pero ninguno puramente declarativo. Así que, ¿para qué molestarse? Si no me conseguirá un mejor salario, ¿vale la pena?

<h2 id="Razones-para-aprender-un-lenguaje-declarativo22">Razones para aprender un lenguaje declarativo</h2> 

1. **Si mejoras en declarativo, mejoras en imperativo**
   Y por lo que he visto y experimentado, no se aplica en la otra dirección. **El enfoque declarativo facilita ciertas buenas prácticas que no son estrictamente necesarias en el imperativo**.
   Cuando mantenemos nuestro código limpio de los pequeños apaños que hacemos a veces, es más fácil de documentar, depurar, mantener y escalar.

2. **Céntrate en el problema, escribe menos código**
   La primera vez que escribí un programa en Python, después de años de C++, no podía creer que cientos de líneas de código se vieran reducidas a unas docenas. Pues eso no fue nada comparado a lo que sentí aprendiendo Haskell, donde esas docenas de líneas de Python pueden escribirse en menos de diez.
   La programación lógica y la funcional toman mucho de las matemáticas, así que las definiciones son cortas, expresivas y potentes. Lo difícil es que necesitan un nivel de abstracción que requiere tiempo aprehender.

3. **Haz una diferencia en tu CV**
   Ya hemos visto que los lenguajes más populares no son los declarativos. Esto significa que hay menos desarrolladores (y aún así, sus comunidades están creciendo). Vas a encontrar programadores de Python, Java o JavaScript hasta debajo de las piedras, pero colgarse un lenguaje distinto al cinturón demuestra que **le has dedicado tiempo a salir de una zona de confort** y que has diversificado tus enfoques.

<h2 id="Mi-experiencia-personal---Por-qué-he-elegido-Prolog35">Mi experiencia personal - Por qué he elegido Prolog</h2> 

Prolog tiene más de una implementación, pero yo recomiendo SWI-Prolog, disponible para Windows, Linux y Mac. Puedes probarlo online en su sitio oficial (enlace más abajo). Viene con una buena variedad de librerías y buena documentación.

1. **Una curva de aprendizaje suave**
   Ya he mencionado que mi primera experiencia con la programación declarativa fue Haskell. Es cierto que me enamoré muy pronto del lenguaje, pero pronto se volvió demasiado abstracto para mí (dichosas mónadas). Más adelante, descubrí que Prolog es más intuitivo en muchos aspectos.
   Además, hay recursos fantásticos para aprender Prolog desde cero hasta un nivel muy decente. Conozco mejor los que están en inglés, pero he encontrado algunos en español que también parecen de muy buena calidad.
   - En inglés
     http://www.learnprolognow.org/
     https://www.swi-prolog.org/ (Web oficial, documentación de librerías.
   - En español
     https://blog.adrianistan.eu/supertutorial-prolog
     https://www.lawebdelprogramador.com/cursos/Prolog/index1.html
   
2. **Sintaxis nativa para gramáticas**
   Personalmente, me encanta trabajar con gramáticas; son herramientas potentes y versátiles. He hecho bastante trabajo personal con Flex y Bison, así que cuando descubrí que Prolog tenía soporte nativo para gramáticas, a través de lo que llama Gramáticas de Cláusulas Definidas (Definite Clause Grammars o DCG), el flechazo fue inmediato. Tal vez no sean la mejor opción para lidiar con semánticas de alto nivel de complejidad (o sí, no lo sé), pero son más que suficientes para usos más comunes de procesado de texto.

3. **Fácil de empotrar/integrar**
   Si quieres utilizar Prolog como una especie de motor de inferencias o una manera de conectar tus aplicaciones a una base de conocimiento, en lugar del lenguaje principal, también sirve. Hay implementaciones de Prolog con interfaces para varios lenguajes, como [C](https://www.swi-prolog.org/pldoc/man?section=foreign), [C++](https://www.swi-prolog.org/pldoc/doc_for?object=section(%27packages/pl2cpp.html%27)), [Java](https://www.swi-prolog.org/pldoc/doc_for?object=section(%27packages/jpl.html%27)) o [Python](https://pypi.org/project/pylog/).

***

¿Cuál es tu experiencia con la programación declarativa?¿Piensas que vale la pena? ¡No dudes en comentar sobre tu lenguaje favorito o recomendar otros recursos para aprender!

