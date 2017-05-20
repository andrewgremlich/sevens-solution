const cards = require('./cards.js'),
    shuffle = require('./shuffle.js')

function dealCards(gameState) {

    return new Promise(resolve => {
        let shuffled = shuffle(cards.concat()),
            amountOfPlayers = gameState.numPlayers,
            size = Math.floor(shuffled.length / amountOfPlayers),
            assignment = []

        while (shuffled.length > 0)
            assignment.push(shuffled.splice(0, size))

        for (let i = 0; i < amountOfPlayers; i++) {
            for (let j = 0; j < assignment[i].length; j++) {
                gameState.players[i].cardsHolding.push(assignment[i][j])
            }
        }

        if (assignment.length > amountOfPlayers) {
            let lastArrayToIterate = assignment[assignment.length - 1]

            for (let k = 0; k < lastArrayToIterate.length; k++) {
                gameState.players[k].cardsHolding.push(lastArrayToIterate[k])
            }
        }
        resolve(gameState)
    })

}

module.exports = dealCards
