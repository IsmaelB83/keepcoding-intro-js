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
                this.character = value; break;
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
     * 
     * @param {Array} cards 
     */
    constructor(cards){
        // Si no se reciben 5 cartas se lanza error
        if (cards.length !== 5) { 
            throw `Una mano de poker se compone de 5 cartas. Faltan ${5-cards.length}`;
        }
        this.cards = cards;
        // Valor en el ranking de la mano
        this.cards.sort((a,b) => {
            if (a.value < b.value) return a;
            return b;
        })
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
     */
    dealCards () {
        for (let i = 0; i < this.players.length; i++) {
            this.players[i].hand = new Hand(this.deck.getHand());         
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
        return `${this.players[0].name} - ${this.players[0].hand}`;
    }
}

try {
    let poker = new Poker('Isma', 'Tam');
    poker.dealCards();
    console.log(poker.toString());
    console.log('WINNER!');
    console.log(poker.checkWinner());
} catch (error) {
    console.log(error);
}