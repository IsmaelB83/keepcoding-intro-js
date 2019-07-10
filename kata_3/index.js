// Imports
let Poker = require('./Poker/Poker');

// Tests sobre el paquete de clases "Poker"
// Instancio la clase de poker con dos jugadores
let poker = new Poker('Player 1', 'Player 2');

// Test 1: ['♡2','♢3','♣5','♠9','♢K'], ['♠2','♡3','♣4','♠8','♡A']
poker.dealCards([['♡2','♢3','♣5','♠9','♢K'], ['♠2','♡3','♣4','♠8','♡A']]);
poker.printWinner();

/* Entrada: Jugador 1: 2H 4S 4C 2D 4H Jugador 2: 2S 8S AS QS 3S
Salida: Jugador 1 gana, escalera de color

Entrada: Jugador 1: 2H 3D 5S 9C KD Jugador 2: 2C 3H 4S 8C KH
Salida: Jugador 1 gana, carta más alta

Entrada: Jugador 1: 2H 3D 5S 9C KD Jugador 2: 2D 3H 5C 9S KH
Salida: Empate
 */