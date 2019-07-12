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
        // Valor de la mano. Lo inicializo a cero para que sea entendible lo que se maneja en este objeto,
        // y luego llamo a evaluate hand
        this.value = {
            description: '',    // Ranking de mano en descriptivo
            rank: 0,            // Ranking de mano en valor
            topPair: 0,         // En caso de tener pareja o full
            topPairB: 0,        // En caso de dobles parejas
            topThree: 0,        // En caso de tener un trio o full
            topFour: 0,         // En caso de tener poker
            highCard: 0,        // Carta más alta de todas (para deshacer un empate a escaleras)
            totalSum: 0         // Cuenta el punteo total de la mano (sin tener en cuenta ranking)
        }
        this.evaluateHand();
    }

    /**
     * @return {Object} Object representing the hand value.
     */
    evaluateHand() {
        // Posibles manos que tenemos:
        let straightFlush, poker, fullHouse, flush, straight, three, doublePair, pair;
        // TotalSum (lo utilizo para desempatar cualquier jugada que desempata por carta alta)
        // Doy a cada carta (en orden de valor mayor a menor) un peso más alto cuanto más alta es la carta
        for (let i = 4; i >= 0; i--) {
            const c = this.cards[i];
            this.value.totalSum += (c.value * Math.pow(10, i * 2));
        }
        // Carta más alta? (Sólo la utilizo para desempatar la escalera)
        this.value.highCard = this.cards[4].value;
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
                    this.value.topPairB = key;
                } else {
                    pair = true;
                    this.value.topPair = key;   
                }
            } else if (value === 3) {
                three = true;
                this.value.topThree = key;
            } else if (value === 4) {
                poker = true;
                this.value.topFour = key;
            }
        });
        // Tiene Full House?
        fullHouse = pair && three;
        // Cual es la mano más valiosa?
        if (straightFlush) {
            this.value.description = Object.getOwnPropertyNames(Ranking)[0];
            this.value.rank = Ranking.STRAIGHT_FLUSH;
        } else if (poker) {
            this.value.description = Object.getOwnPropertyNames(Ranking)[1];
            this.value.rank = Ranking.POKER;
        } else if (fullHouse) {
            this.value.description = Object.getOwnPropertyNames(Ranking)[2];
            this.value.rank = Ranking.FULL_HOUSE;
        } else if (flush) {
            this.value.description = Object.getOwnPropertyNames(Ranking)[3];
            this.value.rank = Ranking.FLUSH;
        } else if (straight) {
            this.value.description = Object.getOwnPropertyNames(Ranking)[4];
            this.value.rank = Ranking.STRAIGHT;
        } else if (three) {
            this.value.description = Object.getOwnPropertyNames(Ranking)[5];
            this.value.rank = Ranking.THREE;
        } else if (doublePair) {
            this.value.description = Object.getOwnPropertyNames(Ranking)[6];
            this.value.rank = Ranking.DOUBLE_PAIR;
        } else if (pair) {
            this.value.description = Object.getOwnPropertyNames(Ranking)[7];
            this.value.rank = Ranking.PAIR;
        } else {
            this.value.description = Object.getOwnPropertyNames(Ranking)[8];
            this.value.rank = Ranking.HIGH_CARD;
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
        let card = this.cards[0];
        for (let i = 1; i < 5; i++) {
            if (card.value === 5 && i === 4 && this.cards[i].value === 14) {
                // Escalera empezando por A (caso especial porque el A está al final del array, y con valor 14)
                return true;
            } else if (card.value + 1 !== this.cards[i].value) {
                return false;
            } 
            card = this.cards[i];
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
            if (!aux.get(c.value)) {
                aux.set(c.value, 1);
            } else {
                aux.set(c.value, aux.get(c.value) + 1);
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