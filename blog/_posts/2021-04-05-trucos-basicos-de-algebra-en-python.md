---
title: Trucos básicos de álgebra en Python
date: 2021-04-05
layout: post
highlight: true
links:
    Hashnode: https://dev.to/miguelmj/trucos-basicos-de-algebra-en-python-48mf
---
Hay dos tipos de personas con una dificultad común a la hora de empezar a usar Python: las que aprenden los fundamentos de programación directamente en este lenguaje y quienes vienen de programar en un lenguaje de más bajo nivel.

Como pertenezco al segundo grupo, sé que tendemos a ignorar las soluciones nativas para ciertos problemas y preferimos resolverlo de manera algorítmica (escribiendo el código desde cero). Esta decisión es mejor si queremos aprender, pero los lenguajes de alto nivel ofrecen soluciones que suelen ser más fáciles de escribir, leer y mantener.

Daré por hecho conocimiento de listas, diccionarios y conjuntos en Python y que tienes nociones básicas de álgebra.

<h2 id="1">Comprensión de Listas, Diccionarios y Conjuntos</h2>

Digamos que tenemos una lista de números y queremos extraer de ella sólo los pares en una lista separada. Una posibilidad válida sería:

```python
mi_lista = [5,4,3,7,8,1,12]
pares = []
for n in mi_lista:
  if (n%2 == 0):
    pares.append(n)
print(pares)
# [4,8,12]
```

Este proceso es bastante estándar en lenguajes de tipo C, por ejemplo. Sin embargo, una manera más pitónica de conseguir lo mismo es construir una **lista por comprensión**:

```python
mi_lista = [5,4,3,7,8,1,12]
pares = [x for x in mi_lista if x%2 == 0]
print(pares)
# [4,8,12]
```

La comprensión de listas es un atajo para construir una nueva lista usando una expresión y una condición opcional, aplicados a los elementos de un objeto iterable. La sintaxis es la siguiente:

```python
# sin filtro
[expresion for elemento in secuencia]
# con filtro
[expresion for elemento in secuencia if condicion]
```

Veamos otro ejemplo, como copiar una lista de strings cambiando los elementos de minúscula a mayúscula:

```python
nombres = ['Mikkel', 'Jonas', 'Martha']
nombres_mayus = [nombre.upper() for nombre in nombres]
print(nombres_mayus)
# ['MIKKEL','JONAS','MARTHA']
```

Ahora, también es posible definir conjuntos y diccionarios por comprensión:

```python
# conjuntos
set(expresion for elemento in secuencia)
{expresion for elemento in secuencia}
# diccionarios (nota la diferencia de como especificar el par clave-valor en cada caso)
dict((clave, valor) for elemento in secuencia if condicion)
{clave:valor for elemento in secuencia if condicion}
```

Pero, ¡hay más! No tienes por qué iterar una sola secuencia; Python te permite añadir más de un `for <secuencia>` en tus comprensiones. Algunos ejemplos:

```python
# unir dos diccionarios
union = {k:v for (k,v) in dic1 for (k,v) in dic2}
# producto cartesiano de dos conjuntos
# - notese que el resultado no es un diccionario, sino un set de tuplas
cartesiano = {(x,y) for x in conj1 for y in conj2}
```

[Aquí](https://www.smallsurething.com/list-dict-and-set-comprehensions-by-example/) encontrarás más ejemplos de comprensión de listas, diccionarios y conjuntos en inglés.

[Aquí](https://docs.python.org/es/3.8/tutorial/datastructures.html#list-comprehensions) encontrarás algunos en español.

<h2 id="2">Operaciones de conjuntos</h2>

Con la comprensión de conjuntos, sería fácil definir las operaciones habituales entre conjuntos.  Por suerte, Python ya define estas operaciones de manera nativa.

```python
abcde = {'a','b','c','d','e'}
vocales = {'a','e','i','o','u'}

intereseccion = abcde & vocales
# {'a','e'}
union = abcde | vocales
# {'a', 'b', 'c', 'd', 'e', 'i', 'o', 'u'}
diferencia = abcde - vocales
# {'b','c','d'}
diferencia_simetrica = abcde ^ vocales
# {'b','c','d','i','o','u'}
```

_Ojo, los valores resultantes no tienen porque estar ordenados, pero lo he escrito así para facilitar su lectura._

Además, no sólo define operaciones que resulten en nuevos conjuntos, sino también operadores booleanos como:

```python
es_subconjunto_estricto1 = abcde < abcde
# False
es_subconjunto_estricto2 = diferencia < abcde
# True

es_subconjunto1 = abcde <= vocales
# False
es_subconjunto2 = abcde <= abcde
# True
es_subconjunto3 = diferencia <= abcde
# True

vacio = bool(abcde)
# False
vacio = bool(abcde - abcde)
# True
```

<h3 id="2-1">Conjuntos de conjuntos</h3>

Una limitación a tener en cuenta al trabajar con conjuntos en Python, es que éstos solo pueden contener tipos a los que se les pueda hacer un hash (_hashable_), como los tipos numéricos, los string o las tuplas. Los conjuntos, en cambio, no son _hashables_. Por esta razón, si quieres almacenar un conjunto de conjuntos, debes utilizar en cambio una lista de conjuntos. Ahora sí que nos va a servir la comprensión de listas para remplazar las operaciones de conjuntos.

```python
conj1 = [{1,2,3}, {'a','b','c'}, {'A','B','C'}]
conj2 = [{'a','b','c'}, {'b','c'}, {'c'}]

interseccion = [x for x in conj1 if x in conj2]
# [{'a','b','c'}]
diferencia  = [x for x in conj1 if x not in conj2]
# [{1,2,3}, {'a','b','c'}, {'A','B','C'}]
union = conj2 + diferencia
# [{'a', 'b', 'c'}, {'b', 'c'}, {'c'}, {1, 2, 3}, {'A', 'B', 'C'}]

# Creo que la idea está clara
```

<h2 id="3">Módulo <code>functools</code></h2>

Este módulo proporciona utilidades bastante interesantes, pero sólo hablaré de dos: `reduce` y `@lru_cache`.

[Aquí](https://docs.python.org/es/3.8/library/functools.html) encontrarás la documentación oficial del módulo en español.

<h3 id="3-1"><code>functools.reduce</code></h3>

`reduce` es una herramienta muy potente, capaz de generalizar casi cualquier proceso iterativo en una lista (si no todos) y os recomiendo encarecidamente que profundicéis en su uso por vuestra cuenta. Para lo que nos concierne, lo utilizaré para generalizar las operaciones de conjuntos en un número indefinido de sets.

Digamos que tenemos los mismos conjuntos que en el último ejemplo, y queremos hacer la unión de todos los conjuntos. Sería posible hacer:

```python
conj1 = [{1,2,3}, {'a','b','c'}, {'A','B','C'}]
union = set() 
for x in conj1:
  union = union | x
```

Pero con `reduce` obtenemos el mismo comportamiento como sigue:

```python
conj1 = [{1, 2, 3}, {'a', 'b', 'c'}, {'A', 'B', 'C'}]
union = functools.reduce(set.union, set1)
# {1, 2, 3, 'a', 'A', 'b', 'c', 'B', 'C'}
```

El primer argumento es la función que queremos aplicar entre los elementos de la lista de manera acumulativa. Para ello, en lugar de el operador (`|` en este caso), hay que usar la función con nombre (`set.union` en este caso). Para encontrar las funciones con nombre correspondientes a los operadores de conjuntos, puedes escribir `help(set)` en la consola de Python.

<h3 id="3-2"><code>@functools.lru_cache</code></h3>

Como puedes imaginar, las comprensiones son fáciles de escribir y entender, pero no son muy baratas en coste de computación. El módulo `functools` proporciona varias maneras de almacenar en una caché los resultados de una función (un comportamiento similar se obtiene con `@functools.cached_property`).

```python
@functools.lru_cache
def contar_vocales(frase):
    frase = frase.casefold()
    return sum(frase.count(vocal) for vocal in 'aeiou')
```

Con esa sencilla anotación, un número limitado de llamadas almacenarán su resultado, por si vuelven a ser llamadas, para devolver el valor almacenado en lugar de ejecutar el mismo código de nuevo.

Esto no sólo es útil para funciones deterministas lentas, sino también para funciones recursivas que se vayan a usar repetidamente. Por ejemplo:

```python
@functools.lru_cache
def factorial(n):
    return n*factorial(n-1) if n else 1
```

<h2 id="4">Ejemplo práctico</h2>

Veamos como se aplica todo, por ejemplo, para representar y procesar relaciones familiares.

```python
import functools

# https://es.wikipedia.org/wiki/Clausura_transitiva
def cierre_transitivo(relacion):
    cierre = relacion
    while True:
        delta = {(x,y) for (x,r1) in cierre for (r2,y) in cierre if r1 == r2}
        nuevo_cierre = cierre | delta
        if nuevo_cierre == cierre:
            break
        cierre  = nuevo_cierre
    return cierre

# Información de descendencia directa
relacion_hijo = {
         ('Martha','Ulrich'),
         ('Mikkel','Ulrich'),
         ('Magnus','Ulrich'),
         ('Mads','Tronte'),
         ('Ulrich','Tronte'),
         ('Tronte','Agnes'),
         ('Jonas','Hannah'),
         ('Jonas','Michael')}

relacion_descendiente = cierre_transitivo(relacion_hijo)

# Algunas funciones que usan la nueva relación
@functools.lru_cache
def ancestros_de(x):
    return {b for (a,b) in relacion_descendiente if a==x}

def es_descendiente_de(x,y):
    return y in ancestros_de(x)

def son_familia(lista_personas):
    ancestros = [ancestors_de(x) for x in lista_personas]
    ancestros_comunes = functools.reduce(set.intersection, ancestros)
    return bool(ancestros_comunes)

print(ancestros_de('Martha'))
# {'Agnes','Tronte','Ulrich'}
print(es_descendiente_de('Jonas', 'Agnes'));
# False
print(es_descendiente_de('Martha', 'Agnes'));
# True
print(son_familia(['Martha', 'Jonas']));
# False
print(son_familia(['Martha', 'Magnus', 'Mikkel']));
# True
```