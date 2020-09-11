---
layout: project
title: Browser Animation
acronym: BrAnim
slogan: Learning to animate in a website
---
## Animation with JS
<style>
#container {
  width: 400px;
  height: 400px;
  position: relative;
  background: #CCC;
}
#animate {
  width: 50px;
  height: 50px;
  position: absolute;
  background: #333;
}
</style>
<script>
function myMove() {
  var elem = document.getElementById("animate");
  var pos = 0;
  var id = setInterval(frame, 100/3);
  function frame() {
    if (pos >= 350) {
      clearInterval(id);
    } else {
      pos+=5;
      elem.style.top = pos + 'px';
      elem.style.left = pos + 'px';
    }
  }
}
</script>
<p><button onclick="myMove()">Click Me</button></p> 
<div id="container">
<div id="animate"></div>
</div>

## Animation with CSS

<style>
@keyframes example{
  0%    {left: 0; transform: rotate(0);border-radius:0%} /*inicial*/
  25%   {left: 0; transform: rotate(360deg); border-radius:50%} /*rota*/
  50%   {left: 350px; transform: rotate(360deg);border-radius:50%} /*avanza*/
  75%   {left: 350px; transform: rotate(720deg);border-radius:0%} /*rota*/
  100%  {left: 0; transform: rotate(720deg);border-radius:0%} /*retorna*/
}

.csscontain{
    position:relative;
    background: #CCC;
    height: 50px;
    width: 400px
}
.cssanim{
    position:absolute;
    background: #333;
    height: 50px;
    width: 50px;
}
.csscontain.contain2{
    height:100px;
}
.csscontain > .cssanim + .cssanim{
    top: 50px;
    animation-delay: 2s;
}
.cssanim.yes{
    animation: example 4s ease-in-out 0s infinite none;
}
.oneAnim{
    animation: example 4s ease-in-out 0s 1 none;
}
</style>

<div class="csscontain contain2">

<div class="cssanim yes"></div>
<div class="cssanim yes"></div>

</div>

Diría que la animación con CSS es más fácil de programar y se ve mejor. Voy a probar a hacer trigger de la animación con JS.
Por lo que he leído [aquí](https://medium.com/better-programming/how-to-restart-a-css-animation-with-javascript-and-what-is-the-dom-reflow-a86e8b6df00f), esto requiere de un DOM reflow, una operación bastante costosa computacionalmente, así que no hay que abusar de ello.
<script>
    animatefoo = function (){
        let foo = document.getElementById("foo");
        foo.classList.remove("oneAnim");
        void foo.offsetWidth; // trigger reflow
        foo.classList.add("oneAnim");
    }
</script>
<p><button onclick="animatefoo()">Click Me</button></p> 
<div class="csscontain">
<div id="foo" class="cssanim"></div>
</div>


