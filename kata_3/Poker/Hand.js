let Card = require('./Card');
let { Ranking } = require('./common');

/**
 * Clase que representa una mano de poker
 */
module.exports = class Hand {
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
        let handValue = {
            description: '',    // Ranking de mano en descriptivo
            value: 0,           // Ranking de mano en valor
            topPair: 0,         // En caso de tener pareja o full
            topPairB: 0,        // En caso de dobles parejas
            topThree: 0,        // En caso de tener un trio o full
            topFour: 0          // En caso de tener poker
        }
        // Posibles manos que tenemos:
        let straightFlush, poker, fullHouse, flush, straight, three, doublePair, pair;
        // Tiene color?
        flush = this.isFlush();
        // Tiene escalera?
        straight = this.isStraight();
        // Tiene escalera de color?
        straightFlush = flush && straight;
        // Que combinaciones de cartas (parejas, trios, etc.) tengo?
        pair = false; 
        three = false; 
        doublePair = false; 
        poker = false;
        this.getCombinations().forEach((value,key,map) => {
            if (value === 2) {
                if (pair) {
                    doublePair = true;
                    handValue.topPairB = key;
                } else {
                    pair = true;
                    handValue.topPair = key;   
                }
            } else if (value === 3) {
                three = true;
                handValue.topThree = key;
            } else if (value === 4) {
                poker = true;
                handValue.topFour = key;
            }
        });
        // Tiene Full House?
        fullHouse = pair && three;
        // Cual es la mano más valiosa?
        if (straightFlush) {
            handValue.description = Object.getOwnPropertyNames(Ranking)[0];
            handValue.value = Ranking.STRAIGHT_FLUSH;
        } else if (poker) {
            handValue.description = Object.getOwnPropertyNames(Ranking)[1];
            handValue.value = Ranking.POKER;
        } else if (fullHouse) {
            handValue.description = Object.getOwnPropertyNames(Ranking)[2];
            handValue.value = Ranking.FULL_HOUSE;
        } else if (flush) {
            handValue.description = Object.getOwnPropertyNames(Ranking)[3];
            handValue.value = Ranking.FLUSH;
        } else if (straight) {
            handValue.description = Object.getOwnPropertyNames(Ranking)[4];
            handValue.value = Ranking.STRAIGHT;
        } else if (three) {
            handValue.description = Object.getOwnPropertyNames(Ranking)[5];
            handValue.value = Ranking.THREE;
        } else if (doublePair) {
            handValue.description = Object.getOwnPropertyNames(Ranking)[6];
            handValue.value = Ranking.DOUBLE_PAIR;
        } else if (pair) {
            handValue.description = Object.getOwnPropertyNames(Ranking)[7];
            handValue.value = Ranking.PAIR;
        } else {
            handValue.description = Object.getOwnPropertyNames(Ranking)[8];
            handValue.value = Ranking.HIGH_CARD;
        }
        return handValue;
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
        let card = this.cards[0];
        for (let i = 1; i < this.cards.length; i++) {
            if (card.value + 1 !== this.cards[i].value) {
                return false;
            }
        }
        return true;
    }

    /**
     * Devuelve un diccionario con las combinaciones que tenemos en la mano sirve para calcular si tenemos parejas, dobles parejas, trio, full o poker
     * @return {Map} Diccionario con las combinaciones de cartas que tiene la mano
     */
    getCombinations() {
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