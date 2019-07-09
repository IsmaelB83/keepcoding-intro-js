/**
 * Palos de una baraja de poker
 */
const Suits = {
    C: '♣',     // Clubs
    H: '♡',     // Hearts
    S: '♠',     // Spades
    D: '♢'      // Diamonds
}

/**
 * Ranking de valor de cada mano
 */
const Ranking = {
    SF:  256,   // Straight Flush
    FOK: 128,   // Four of a kind
    FH:  64,    // Full House
    FL:  32,    // Flush
    ST:  16,    // Straight
    TOK: 8,     // Three of a kind
    TP:  4,     // Two pairs
    P:   2,     // Pair
    HC:  1      // High card
}

/**
 * Clase que representa una carta del juego de poker
 */
class Card {

    /**
     * Genera una carta de una baraja de poker
     * @param {*} suit Palo de la carta
     * @param {*} value Valor (2-10,J=11,Q=12,K=13,A=14)
     */
    constructor(suit, value) {
        this.suit = Suits[suit];
        this.value = value;
        switch (true) {
            case (value===14):
                this.character = 'A';   break;
            case (value===13):
                this.character = 'K';   break;
            case (value===12):
                this.character = 'Q';   break;
            case (value===11):
                this.character = 'J';   break;
            case (value >= 2  && value <= 10):
                this.character = `${value}`; break;
            default:
                console.log(suit, value);
                throw `Carta ${value} incorrecta`;
        }
    }
}

/**
 * Clase para gestionar una baraja de cartas
 */
class CardDeck {

    /**
     * Constructor de una baraja de cartas
     */
    constructor() {
        this.restart();
    }

    /**
     * Reinicializa el mazo de cartas 
     */
    restart() {
        this.deck = [];
        for (const key in Suits) {
            for (let i = 2; i <= 14; i++) {
                this.deck.push(new Card(key,i));
            }
        }
    }

    /**
     * Mezcla las cartas de la baraja
     */
    shuffle() {
        let n = this.deck.length, shuffled = [], i;
        // Mientras haya cartas por mezclar
        while (n) {
            // Selecciono una carta (indice realmente) aleatoria de los restantes
            i = Math.floor(Math.random() * this.deck.length);
            if (i in this.deck) {
                // La añado a la nueva baraja
                shuffled.push(this.deck[i]);
                delete this.deck[i];
                n--;
            }
        }
        // Sustituyo la propiedad de la baraja mezclada
        this.deck = shuffled;
    }
  
    /**
     * Extrae una carta random y la devuelve
     * @return {Card} Carta random devuelta
     */
    getCard() {
        let i = Math.floor(Math.random() * this.deck.length);
        let card = this.deck[i];
        this.deck.splice(i,1);
        return card;
    }

    /**
     * Extrae la carta específica del mazo. Si no la encuentra devuelve null
     * @param {*} suit Palo de la carta
     * @param {*} value Valor de la carta (2-10,J,Q,K,A)
     */
    getSpecificCard(suit, character) {
        for (let i = 0; i < this.deck.length; i++) {
            const card = this.deck[i];
            if (card.suit === suit && card.character === character) {
                this.deck.splice(i,1);
                return card;
            }
        }
        return null;
    }

    /**
     * Devuelve una mano de cartas 
     */
    getHand() {
        let hand = [];
        if (this.getNumCards()>=5) {
            hand.push(this.getCard());
            hand.push(this.getCard());
            hand.push(this.getCard());
            hand.push(this.getCard());
            hand.push(this.getCard());
            return hand;
        }
        return null;
    }

    /**
     * Devuelve el número de cartas restantes del mazo
     * @return {int} Número de cartas restantes en el mazo
     */
    getNumCards () {
        return this.deck.length;
    }

    /**
     * Imprime el contenido de la baraja
     */
    toString() {
        let output = '';
        this.deck.forEach(card => {
            output += `${card.suit}-${card.character} `;
        });
        return output;
    }
}

/**
 * Clase que representa una mano de poker
 */
class Hand {
    /**
     * Crea una mano con las cartas indicadas por parámetro
     * @param {Array de Card} cards 
     */
    constructor(cards){
        // Si no se reciben 5 cartas se lanza error
        if (cards.length !== 5) { 
            throw `Una mano de poker se compone de 5 cartas. Faltan ${5-cards.length}`;
        }
        this.cards = cards;
        // Valor en el ranking de la mano
        this.cards = this.cards.sort((a,b) => {
            return a.value - b.value;
        })
    }

    /**
     * @return {Object} Object representing the hand value.
     */
    evaluateHand() {
        let value = {
            hand: '',
            topPair: 0,  // En caso de tener pareja o full
            topPairB: 0, // En caso de dobles parejas
            topThree: 0, // En caso de tener un trio o full
            topFour: 0   // En caso de tener poker
        }
        // Jugadas posibles
        let straightFlush, flush, straight;
        // Tiene color?
        flush = this.isFlush();
        // Tiene escalera?
        straight = this.isStraight();
        // Tiene escalera de color?
        straightFlush = false;
        if (flush && straight) {
            straightFlush = true;
        }
        // Calcular combinaciones
        let combinations = this.hasCombinations();
        combinations.forEach((value,key,map) => {
            if (value === 2) {
                if (pair) {
                    doublePair = true;
                    value.topPairB = key;
                } else {
                    topPair = key;
                    value.pair = true;
                }                
            } else if (value === 3) {
                three = true;
                value.topThree = key;
            } else if (value === 4) {
                poker = true;
                value.topFour = key;
            }
        });
        // Tiene Full House?
        fullHouse = false;
        if (pair && three) {
            fullHouse = true;
        }
    }

    /**
     * Indica si la mano tiene Color o no
     * @return {Boolean} True = Color, False = No Color
     */
    isFlush() {
        let suit = this.cards[0].suit;
        for (let i = 1; i < this.cards.length; i++) {
            if (this.cards[i].suit!==suit) {
                return false
            }
        }
        return true;
    }

    /**
     * Indica si la mano tiene escalera o no
     * @return {Boolean} True = escalera, False = No Color
     */
    isStraight () {
        return false;
    }

    /**
     * 
     */
    hasCombinations() {
        let aux = new Map();
        for (let i = 0; i < this.cards.length; i++) {
            const c = this.cards[i];
            if (!aux.get(c.character)) {
                aux.set(c.character, 1);
            } else {
                aux.set(c.character, aux.get(c.character) + 1);
            }
        }
        return aux;
    }

    /**
     * Imprime la mano de poker
     */
    toString() {
        let output = '';
        this.cards.forEach(c => {
            output += `${c.suit}-${c.character} `;
        });
        return output;
    }
}

/**
 * Clase que representa un juego de poker
 */
class Poker {
    /**
     * Constructor del juego de poker
     * @param {int} players Array de jugadores
     */
    constructor(...players) {
        this.players = [];
        for (let i = 0; i < players.length; i++) {
            this.players.push({
                name: players[i],
                score: 0,
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
    checkWinner() {
    }
}

try {
    let poker = new Poker('Isma', 'Tam');
    poker.dealCards([['♣A','♢A','♢Q','♢9','♠9'], ['♣10','♡K','♢4','♣3','♢2']]);
    console.log(poker.toString());
    console.log(poker.players[0].hand.evaluateHand());
} catch (error) {
    console.log(error);
}