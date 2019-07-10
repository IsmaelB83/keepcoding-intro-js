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
    STRAIGHT_FLUSH: 256,   // Straight Flush
    POKER:          128,   // Four of a kind
    FULL_HOUSE:     64,    // Full House
    FLUSH:          32,    // Flush
    STRAIGHT:       16,    // Straight
    THREE:          8,     // Three of a kind
    DOUBLE_PAIR:    4,     // Two pairs
    PAIR:           2,     // Pair
    HIGH_CARD:      1      // High card
}

// Exports
module.exports.Suits = Suits;
module.exports.Ranking = Ranking;
