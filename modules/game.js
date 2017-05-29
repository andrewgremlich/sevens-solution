const dealCards = require('./dealCards.js'),
    spawnPlayers = require('./spawnPlayers.js'),
    playgame = require('./playgame.js'),
    summary = require('./summary.js')

function main(promptResults) {
    /*Prompt results contains players and games as a string*/

    let numifiedGames = +promptResults.games

    for (let i = 0; i < numifiedGames; i++) {

        let gameState = {
            howManyGamesToPlay: numifiedGames,
            gamesMainPlayerWon: 0,
            cardsPlayed: 0,
            playedCards: [],
            players: [],
            numPlayers: +promptResults.players
        }

        /*First spawn out all the players for the game*/
        spawnPlayers(gameState)

            /*Sort cards to the players*/
            .then(dealCards)

            /*Catch the error if there is an odd number of players*/
            .catch(reason => console.log('reason is! ',reason))

            /*Play all thecards out*/
            .then(playgame)
    }
}

module.exports = main
