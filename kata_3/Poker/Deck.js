let Card = require('./Card');
let { Suits } = require('./common');

/**
 * Clase para gestionar una baraja de cartas
 */
module.exports = class Deck {

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
     * @return {Card} Carta random devuelta. O null en caso de no haber más cartas
     */
    getCard() {
        if (this.deck.length > 0) {
            let i = Math.floor(Math.random() * this.deck.length);
            let card = this.deck[i];
            this.deck.splice(i,1);
            return card;
        }
        return null;
    }

    /**
     * Extrae la carta específica del mazo. Si no la encuentra devuelve null
     * @param {String} card Representación de la carta en formato NS (donde N = 2-9,T,J,Q,K,A; y S = C,H,S,D)
     * @return {Card} Carta extraida del mazo (o null en caso de no encontrarla)
     */
    getSpecificCard(card) {
        if (card.length !== 2) {
            throw 'El formato de la carta recibida no es correcto';
        }
        for (let i = 0; i < this.deck.length; i++) {
            const aux = this.deck[i];
            if (aux.suit === card[1] && aux.character === card[0]) {
                this.deck.splice(i,1);
                return aux;
            }
        }
        return null;
    }

    /**
     * Devuelve una mano de cartas 
     */
    getHand() {
        let hand = [];
        if (this.deck.length>=5) {
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
     * Imprime el contenido de la baraja
     */
    toString() {
        let output = '';
        this.deck.forEach(card => {
            output += `${card.toString()} `;
        });
        return output;
    }
}