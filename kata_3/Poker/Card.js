let { Suits } = require('./common');

/**
 * Clase que representa una carta del juego de poker
 */
module.exports = class Card {

    /**
     * Genera una carta de una baraja de poker
     * @param {*} suit Palo de la carta
     * @param {*} value Valor (2-10,J=11,Q=12,K=13,A=14)
     */
    constructor(suit, value) {
        this.suit = suit;
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
            case (value===10):
                this.character = 'T';   break;
            case (value >= 2  && value <= 9):
                this.character = `${value}`; break;
            default:
                throw `Carta ${value} incorrecta`;
        }
    }

    /**
     * Devuelve la representación en formato string de una carta
     */
    toString() {
        return `${this.character}${Suits[this.suit]}`;
    }
}