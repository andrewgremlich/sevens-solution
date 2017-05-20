/*

isRandom will just follow default decision
tree making according to the game.

hasStrategy will be an object specifying for
the main players decisions.

*/

function Player(isRandom, hasStrategy) {
    this.cardsHolding = []
    this.cardsPlayed = []
    this.isRandom = isRandom
    this.hasStrategy = hasStrategy
}

Player.prototype.playCard = function() {

}

Player.prototype.getDealtCards = function() {

}

module.exports = Player
