const Player = require('./Player.js')

function spawnPlayers(gameState) {

    return new Promise(resolve => {

        for (let i = 0; i < gameState.numPlayers; i++) {

            let playerInit

            if (i === 0) {
                playerInit = new Player(false, true)
            } else {
                playerInit = new Player(true, false)
            }

            gameState.players.push(playerInit)
        }

        resolve(gameState)
    })
}

module.exports = spawnPlayers
