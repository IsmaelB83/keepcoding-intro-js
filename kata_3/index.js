// Imports
let Poker = require('./Poker/Poker');
 
// Tests sobre el paquete de clases "Poker"
// Instancio la clase de poker con dos jugadores
let poker = new Poker('Player 1', 'Player 2');

// T1 - Resultado esperado: gana player 2 por carta alta A
console.log ('\nTEST 1');
poker.dealCards([['♡2','♢3','♣5','♠9','♢K'], ['♠2','♡3','♣4','♠8','♡A']]);
poker.printWinner();

// T2 - Resultado esperado: gana player 1 por full house
console.log ('\nTEST 2');
poker.shuffle();
poker.dealCards([['♡2','♣4','♠4','♢2','♡4'], ['♣2','♣8','♣A','♣Q','♣3']]);
poker.printWinner();

// T3 - Resultado esperado: gana player 1 por carta alta
console.log ('\nTEST 3');
poker.shuffle();
poker.dealCards([['♡2','♢3','♣5','♠9','♢K'], ['♠2','♡3','♣4','♠8','♡K']]);
poker.printWinner();

// T4 - Resultado esperado: EMPATE
console.log ('\nTEST 4');
poker.shuffle();
poker.dealCards([['♡2','♢3','♣5','♠9','♢K'], ['♢2','♡3','♠5','♣9','♡K']]);
poker.printWinner();

// T5 - Resultado esperado: player 1 gana con color (el trio de player 2 vale menos)
console.log ('\nTEST 5');
poker.shuffle();
poker.dealCards([['♡2','♡3','♡5','♡9','♡K'], ['♢2','♢3','♠3','♣3','♣K']]);
poker.printWinner();

// T6 - Resultado esperado: gana player 1 con dobles parejas (es mejor que una pareja simple)
console.log ('\nTEST 6');
poker.shuffle();
poker.dealCards([['♡2','♢2','♣5','♠5','♢K'], ['♢3','♡3','♠6','♣9','♡K']]);
poker.printWinner();

// T7 - Resultado esperado: gana player 2 con trio (es mejor que una doble pareja)
console.log ('\nTEST 7');
poker.shuffle();
poker.dealCards([['♡2','♢2','♣5','♠5','♢K'], ['♢8','♢3','♠3','♣3','♡K']]);
poker.printWinner();

// T8 - Resultado esperado: excepción porque el 2 de corazones se está intentando repartir dos veces
try {
    console.log ('\nTEST 8');
    poker.shuffle();
    poker.dealCards([['♡2','♡2','♣5','♠5','♢K'], ['♢8','♢3','♠3','♣3','♡K']]);
    poker.printWinner();    
} catch (error) {   
    console.log(`ERROR: ${error}`);
}

// T9 - Resultado esperado: excepción porque la mano que se intentar repartir al jugador 1 tiene menos de 5 cartas
try {
    console.log ('\nTEST 9');
    poker.shuffle();
    poker.dealCards([['♡2','♣5','♠5','♢K'], ['♢8','♢3','♠3','♣3','♡K']]);
    poker.printWinner();    
} catch (error) {   
    console.log(`ERROR: ${error}`);
}

// T10 - Resultado esperado: excepción porque solo se reparte una mano, en juego que se instanció para 2 jugadores
try {
    console.log ('\nTEST 10');
    poker.shuffle();
    poker.dealCards([['♢8','♢3','♠3','♣3','♡K']]);
    poker.printWinner();    
} catch (error) {   
    console.log(`ERROR: ${error}`);
}
 
// T11-20 - Resultado esperado: se generan manos aleatorias para comprobar el resultado
let n = 11;
for (let n = 11; n <= 20; n++) {
    console.log (`\nTEST ${n}`);
    poker.shuffle();
    poker.dealCards();
    poker.printWinner();    
}

// T21 - Resultado esperado: gana player 1 con escalera de color al 5
console.log ('\nTEST 21');
poker.shuffle();
poker.dealCards([['♡2','♡3','♡4','♡A','♡5'], ['♢K','♡K','♠K','♣K','♡10']]);
poker.printWinner();

// T22 - Resultado esperado: gana player 2 con escalera de color al A
console.log ('\nTEST 22');
poker.shuffle();
poker.dealCards([['♡2','♡3','♡4','♡6','♡5'], ['♡A','♡J','♡10','♡K','♡Q']]);
poker.printWinner();

// T23 - esultado esperado: gana player 1 con pareja (la escalera de player 2 no es válida por cruzar el A)
console.log ('\nTEST 23');
poker.shuffle();
poker.dealCards([['♡2','♣2','♣4','♡6','♡10'], ['♡A','♢2','♡3','♣K','♡Q']]);
poker.printWinner();