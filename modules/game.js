const dealCards = require('./dealCards.js'),
    spawnPlayers = require('./spawnPlayers.js'),
    playgame = require('./playgame.js')

function main(promptResults) {
    /*Prompt results contains players and games as a string*/

    let numifiedGames = +promptResults.games

    for (let i = 0; i < numifiedGames; i++) {

        let gameState = {
            cardsPlayed: 0,
            playedCards: [],
            players: [],
            numPlayers: +promptResults.players
        }

        /*First spawn out all the players for the game*/
        spawnPlayers(gameState)

            /*Sort cards to the players*/
            .then(dealCards)

            /*Play all thecards out*/
            .then(playgame)
    }
}

module.exports = main