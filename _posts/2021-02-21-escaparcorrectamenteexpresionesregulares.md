---
layout: post
title: Escapar correctamente expresiones regulares
date: 2021-02-21
author: Miguel MJ
tags: ['\n  -spanish', '\n  -regex', '\n  -begginers', '\n  -tips']
dev_url: https://dev.to/miguelmj/escapar-correctamente-expresiones-regulares-dl2
---
Las expresiones regulares suelen ser difíciles de entender y aún más de escribir. Probablemente uno de los aspectos más confusos al principio son los caracteres de escape.

## Cuándo y por qué escapar caracteres.

Las expresiones regulares (ER para abreviar) son herramientas para buscar patrones en texto. Hay algunos caracteres con significados especiales (su explicación no es el objetivo de esta publicación) y si queremos usarlos sin significado especial, añadimos una barra invertida (`\`) delante de ellos. A esto lo llamamos escapar un carácter. 

_Nótese que esto hace de `\` un carácter especial en sí mismo._

Un ejemplo simple: Una ER que coincida con `Balance de cuenta: 50$` sería `Balance de cuenta: 50\$`.
No obstante, en la mayoría de los lenguajes, `\` también es un carácter especial para los strings (además de para las ER). Por eso, el string que tendríamos que usar para construir la ER anterior, debería ser: `Balance de cuenta: 50\\$`.

## Consejo para escapar las ER manualmente.

Debemos pensar en el paso de las cadenas que buscamos a ER y de ER a string, en lugar de pensar en los pasos de string a ER y a cadena. Veamos un ejemplo:

¿Y si queremos hacer coincidir `[ERR] $var tiene valor “gg”`?

1. _Cadena coincidente_:
    `[ERR] $var tiene valor “gg”`
    
2. A _ER_: `[`, `]`, `$` y `"` son caracteres especiales en la ER, así que los escapamos:

     `\[ERR\] \$var tiene valor \"gg\"`

3. A _String_: `\` y `"` son caracteres especiales; los escapamos:

     `\\[ERR\\] \\$var tiene valor \\\"gg\\\"`

El punto es escribir un ejemplo de la cadena que quieres hacer coincidir y escapar, paso a paso, los caracteres especiales de la ER y el string hasta que tengas el que vas a usar en tu programa.

## Escapar ER con funciones

_(Enlaces a respuestas de Stack Overflow)_

También, otra opción es escapar la ER con alguna función auxiliar. Algunos lenguajes, como [Python](https://stackoverflow.com/questions/4202538/escape-regex-special-characters-in-a-python-string) o [Java](https://stackoverflow.com/questions/60160/how-to-escape-text-for-regular-expression-in-java) ofrecen estas funciones por defecto. En otros, como [JavaScript](https://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript) o [C++](https://stackoverflow.com/questions/39228912/stdregex-escape-backslashes-in-file-path) debes definirlas por tu cuenta.

**¡Atención!** Asegúrate de usar estas funciones con RE en las que no quieres caracteres especiales, porque si no tienes cuidado, puedes acabar escapando algún caracter sin querer y estropeando la ER.


