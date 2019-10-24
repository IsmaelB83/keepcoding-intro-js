# Primera Kata
## FooBarQuix

Nos dan un número entre el 1 y 100, y tenemos que devolver por orden lo siguiente:

* Si el número es divisible por 3, escribiremos “Foo” en lugar del número
* Si el número es divisible por 5, añadimos “Bar”
* Si el número es divisible por 7, añadimos “Quix”.
* Por cada dígito 3,5 o 7, añadiremos “Foo”, “Bar”, “Quix” respectivamente y en orden de aparición.

### Ejemplos: 

* 1  -> 1
* 2  -> 2
* 3  -> FooFoo (divisible por 3, contiene 3)
* 4  -> 4
* 5  -> BarBar (divisible por 5, contains 5)
* 6  -> Foo (divisible por 3)
* 7  -> QuixQuix (divisible por 7, contiene 7)
* 8  -> 8
* 9  -> Foo
* 10 -> Bar
* 13 -> Foo 
* 15 -> FooBarBar (divisible por 3, divisible por 5, contiene 5)
* 21 -> FooQuix
* 33 -> FooFooFoo (divisible por 3, contiene 3)
* 51 -> FooBar
* 53 -> BarFoo
* 75 -> FooBarQuixBar(divisible por 3, divisible por 5, contiene un 7, contiene un 5)

# Segunda Kata
## Sistema Romano
Vamos a hacer un ejercicio clásico y es jugar con los números romanos y árabes.

Como refresco, vamos a ver sus símbolos y reglas.

#### Símbolos

 Romano | Árabe 
--------|-------
 I | 1 
 V | 5 
 X | 10 
 L | 50 
 C | 100 
 D | 500 
 M | 1000 

### Reglas

Sólo se contemplan números entre el 1 y el 3999

* Los símbolos I, X, C y M se pueden repetir hasta tres veces.
* Los símbolos V, L y D no pueden repetirse.
* Los símbolos I, X y C se suman si están a la derecha de otro mayor o igual.
* Los símbolos I, X y C se restan si están a la izquierda de otro mayor y solamente pueden anteponerse a los dos símbolos que le siguen en la sucesión.
* I se resta de V y X
* X se resta de L y C
* C se resta de D y M
* Los símbolos V, L y D no pueden colocarse a la izquierda de otro mayor.

### Ejercicios

* Crear una función para pasar de número romanos a árabes
* Crear una función para pasar de árabes a romanos
* Hacer un validador de números romanos


# Tercera Kata
## Póker
### Introdución

Una baraja de poker contiene 52 cartas. 

### Cartas
Una carta se compone de dos cosas:

Palo (suit) que pueden ser los siguientes:
* picas/spades (S)
* corazones/hearts (H)
* tréboles/clubs (C)
* diamantes/diamonds (D). 

Valor:
* 2 
* 3
* 4
* 5
* 6
* 7
* 8
* 9
* 10 /Ten (T)
* dama/Jack (J)
* reina/Queen (Q)
* rey/King (K)
* as/Ace (A). 

### Mano

Una mano es un conjunto de 5 cartas, estamos jugando con una baraja, por lo que no puede haber cartas repetidas.

Las manos de poker se ordenan de menor a mayor dependiendo de una serie de reglas asociadas a la mano. 

* High Card (Carta Más Alta): Para manos que no entran en ninguna de las manos superior, el ganador es aquel que tiene la carta más alta. Si se produce un empate entonces se compara la siguiente carta más alta y así sucesivamente. 

* Pair (Parejas): 2 de las 5 cartas de la mano tienen el mismo valor. Si las dos manos tienen pareja, entonces gana la que tenga la pareja más alta. Si ambas parejas son iguales entonces gana el que tenga la carta más alta. 

* Two Pairs (Dobles Parejas): La mano contiene 2 parejas diferentes. Si las dos manos tienen dobles parejas diferentes entonces gana aquella que tenga la pareja más alta. Si las dos manos tienen las mismas parejas entonces se compara la otra pareja. Si ambas manos tiene las mismas parejas entonces gana el que tenga la carta más alta restante. 

* Three of a Kind (Trio): 3 cartas de la mano tienen el mismo valor. Gana la mano que tiene las 3 cartas con mayor valor. 

* Straight (Escalera): La mano contiene 5 cartas consecutivas. Si las dos manos tienen escalera entonces gana la que tiene la carta más alta. 

* Flush (Color): La mano tiene 5 cartas con la misma cara. Si ambas manos tienen color entonces gana el que tenga la carta más alta. 

* Full House (Full): La mano tiene un trío y una pareja. En caso de tener ambas manos full entonces gana el que tenga el trío más alto. 

* Four of a Kind (Poker): 4 cartas con el mismo valor. En caso de tener ambas manos poker gana el que tenga el valor más alto.

* Straight flush (Escalera de Color): 5 cartas de la misma cara pero con valores consecutivos. En caso de tener escalera las dos manos entonces gana el que tenga el valor más alto.

### Ejemplos

Entrada: Jugador 1: 2H 3D 5S 9C KD Jugador 2: 2C 3H 4S 8C AH
Salida: Jugador 2 gana, carta más alta:

Entrada: Jugador 1: 2H 4S 4C 2D 4H Jugador 2: 2S 8S AS QS 3S
Salida: Jugador 1 gana, escalera de color

Entrada: Jugador 1: 2H 3D 5S 9C KD Jugador 2: 2C 3H 4S 8C KH
Salida: Jugador 1 gana, carta más alta

Entrada: Jugador 1: 2H 3D 5S 9C KD Jugador 2: 2D 3H 5C 9S KH
Salida: Empate
