const cards = require('./cards.js'),
    shuffle = require('./shuffle.js')

function dealCards(gameState) {

    return new Promise(resolve => {
        let shuffled = shuffle(cards.concat()),
            size = Math.floor(shuffled.length / gameState.numPlayers),
            assignment = []

        // TODO If number of players is ODD then it throws an error for the promise chain

        while (shuffled.length > 0)
            assignment.push(shuffled.splice(0, size))


        for (let i = 0; i < assignment.length; i++) {
            for (let j = 0; j < assignment[i].length; j++) {
                gameState.players[i].cardsHolding.push(assignment[i][j])
            }
        }

        resolve(gameState)
    })

}

module.exports = dealCards
