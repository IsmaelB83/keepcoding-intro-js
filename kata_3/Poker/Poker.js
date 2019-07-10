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
        this.shuffle();
    }

    /**
     * Generar el mazo de cartas y mezclarlas
     */
    shuffle() {
        this.deck = new CardDeck();
        this.deck.shuffle();
    }

    /**
     * Repartir cartas a los jugadores
     * @param {Array} hands Parametro opcional, en caso de que no queramos generar manos aleatorias (uso para los tests)
     */
    dealCards (hands = undefined) {
        for (let i = 0; i < this.players.length; i++) {
            if (hands) {
                if (hands[i].length===5 || hands.length !== this.players.length) {
                    let cards = [];
                    for (let j = 0; j < 5; j++) {
                        let card = this.deck.getSpecificCard(hands[i][j][0],hands[i][j].slice(1,3)); // el slice 1,3 me permite obtener también las cartas con valor 10
                        if (card) {
                            cards.push(card);
                        } else {
                            throw 'La carta solicitada no está disponible en el mazo';
                        }
                    }
                    this.players[i].hand = new Hand(cards);
                } else {
                    throw 'La mano recibida debe ser de 5 cartas, y se deben recibir tantas manos como jugadores haya en la partida';
                }                
            } else {
                this.players[i].hand = new Hand(this.deck.getHand());
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
        let winner;
        console.log(`Evaluando manos...`);
        for (let i = 0; i < this.players.length; i++) {
            const player = this.players[i];
            const currentHand = player.hand.evaluateHand();
            if (!winner || currentHand.value > winner.handValue) {
                winner = player;
                winner.handValue = currentHand.value;
            }
            console.log(`${player.name} - Mano: ${player.hand.toString()} - Valoración: ${JSON.stringify(currentHand)}`);
        }
        console.log(`El ganador es ${winner.name} con la mano ${winner.hand} `);
    }
}