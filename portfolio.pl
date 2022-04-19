:- use_module(library(lists)).
:- use_module(library(pairs)).

tag(T, Attrs, GRBody) --> 
    "<",T, ">",GRBody,"</",T,">".

attrs([], [], []).
attrs([[K]-[V]|X]) -->
    " ",[K],"=\"",[V],"\"",attrs(X).

test(A) --> "r",[A],"uu".