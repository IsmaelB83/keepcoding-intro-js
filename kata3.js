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
 * 
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

try {
    let baraja = new CardDeck('P');
    baraja.shuffle();
    let hand1 = new Hand(baraja.getHand());
    let hand2 = new Hand(baraja.getHand());
    console.log(`Hand 1: ${hand1.toString()}`);
    console.log(`Hand 2: ${hand2.toString()}`);
} catch (error) {
    console.log(error);
}