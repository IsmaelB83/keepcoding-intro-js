let Ranking = require('./common');
let CardDeck = require('./CardDeck');
let Hand = require('./Hand');

/**
 * Clase que representa un juego de poker
 */
module.exports = class PokerGame {
    /**
     * Constructor del juego de poker
     * @param {int} players Array de jugadores
     */
    constructor(...players) {
        this.players = [];
        for (let i = 0; i < players.length; i++) {
            this.players.push({
                name: players[i],
                hand: null
            })
        }
        this.deck = new CardDeck();
    }

    /**
     * Generar el mazo de cartas y mezclarlas
     */
    shuffle() {
        this.deck.restart();
        this.deck.shuffle();
    }

    /**
     * Repartir cartas a los jugadores
     * @param {Array} hands Parametro opcional, en caso de que no queramos generar manos aleatorias (uso para los tests)
     */
    dealCards (hands) {
        for (let i = 0; i < this.players.length; i++) {
            if (hands) {
                if (hands[i].length===5 && hands.length === this.players.length) {
                    let cards = [];
                    for (let j = 0; j < 5; j++) {
                        let card = this.deck.getSpecificCard(hands[i][j][0],hands[i][j].slice(1,3)); // el slice 1,3 me permite obtener también las cartas con valor 10
                        if (card) {
                            cards.push(card);
                        } else {
                            throw `La carta solicitada ${hands[i][j][0]}${hands[i][j].slice(1,3)} ya no está disponible en el mazo`;
                        }
                    }
                    this.players[i].hand = new Hand(cards);
                } else {
                    throw 'La mano recibida debe ser de 5 cartas, y se deben recibir tantas manos como jugadores haya en la partida';
                }                
            } else {
                this.players[i].hand = new Hand(this.deck.getHand());
                if (!this.players[i].hand) {
                    throw 'No hay cartas suficientes para generar una mano adicional';
                }
            }
        }
    }

    /**
     * Obtener manos de los jugadores
     */
    toString() {
        let result = '';
        for (let i = 0; i < this.players.length; i++) {
            const p = this.players[i];
            result += `${this.players[i].name} - ${this.players[i].hand}\n\r`;
        }
        return result;
    }

    /**
     * Chequear ganador de la mano
     */
    printWinner() {
        let winner, tie = false;
        console.log(`Evaluando manos...`);
        // De momento gana el jugador 1 :)
        winner = this.players[0];
        console.log(`${winner.name} - Mano: ${winner.hand.toString()} - Valoración: ${JSON.stringify(winner.hand.value)}`);
        // Recorro el resto de manos a ver si le pueden ganar, y en ese caso actualizo el ganador. También controlo si hay empates
        for (let i = 1; i < this.players.length; i++) {
            const player = this.players[i];
            if (player.hand.value.rank > winner.hand.value.rank) {
                tie = false;
                winner = player;
            } else if (player.hand.value.rank === winner.hand.value.rank) {
                let changeWinner = false;
                tie = true;
                switch (player.hand.value.rank) {
                    case Ranking.Ranking.STRAIGHT_FLUSH:
                        // La escalera más alta gana. NO hay empate posible
                        if (player.hand.value.highCard > winner.hand.value.highCard) changeWinner = true;
                        tie = false;
                        break;
                    case Ranking.Ranking.POKER:
                        // El poker más alto gana. NO hay empate posible
                        if (player.hand.value.topFour > winner.hand.value.topFour) changeWinner = true;
                        tie = false;
                        break;
                    case Ranking.Ranking.FULL_HOUSE:
                        // El full house más alto gana. NO hay empate posible
                        if (player.hand.value.topThree > winner.hand.value.topThree) changeWinner = true;
                        tie = false; 
                        break;
                    case Ranking.Ranking.FLUSH:
                        // El color con mayor valor gana (el totalSum da más peso a las artas altas)
                        if (player.hand.value.totalSum > winner.hand.value.totalSum) changeWinner = true;
                        break;
                    case Ranking.Ranking.STRAIGHT:
                        // La escalera con mayor valor gana (el totalSum da más peso a las artas altas)
                        if (player.hand.value.totalSum > winner.hand.value.totalSum) changeWinner = true;
                        break;
                    case Ranking.Ranking.THREE:
                        // El trio más alto gana. NO hay empate posible
                        if (player.hand.value.topThree > winner.hand.value.topThree) changeWinner = true;
                        tie = false;     
                        break;
                    case Ranking.Ranking.DOUBLE_PAIR:
                        let pairsPlayer = player.hand.value.topPair + player.hand.value.topPairB;
                        let pairsWinner = winner.hand.value.topPair + winner.hand.value.topPairB;
                        // La parejas más altas gana
                        if (pairsPlayer > pairsWinner) changeWinner = true;
                        // En caso de empate las cartas más altas
                        else if (pairsPlayer === pairsWinner && player.hand.value.totalSum > winner.hand.value.totalSum) changeWinner = true;
                        break;
                    case Ranking.Ranking.PAIR:
                        // La pareja más alta gana
                        if (player.hand.value.topPair > winner.hand.value.topPair) changeWinner = true;
                        // En caso de empate las cartas más altas
                        else if (player.hand.value.topPair === winner.hand.value.topPair && player.hand.value.totalSum > winner.hand.value.totalSum) changeWinner = true;
                        break;
                    case Ranking.Ranking.HIGH_CARD:
                        // La mano con mayor puntaje gana (el totalSum da más peso a las cartas altas)
                        if (player.hand.value.totalSum > winner.hand.value.totalSum) changeWinner = true;
                        break;
                }
                // Si se deshace el empate con el jugador actual
                if (changeWinner) {
                    winner = player;
                    tie = false;
                } else if (tie && player.hand.value.totalSum < winner.hand.value.totalSum) {
                    // Deshago el empate, si el totalSum del winner anterior es mayor
                    tie = false;
                }
            }
           console.log(`${player.name} - Mano: ${player.hand.toString()} - Valoración: ${JSON.stringify(player.hand.value)}`);
        }
        if (tie) {
            console.log(`El resultado es EMPATE!`);
        } else {
            console.log(`El ganador es ${winner.name} con la mano ${winner.hand} `);            
        }
    }
}