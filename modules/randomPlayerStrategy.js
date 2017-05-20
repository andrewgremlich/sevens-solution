function main(gameState, turn) {

    let playerWithTurn = gameState.players[turn]

    function playCard(gameState, i) {
        gameState.playedCards.push(playerWithTurn.cardsHolding[i])
        gameState.cardsPlayed++

        playerWithTurn.cardsPlayed.push(playerWithTurn.cardsHolding[i])
        playerWithTurn.cardsHolding.splice(i, 1)
    }

    function startAnotherColumnSuite(cardToConsiderToPlay, i) {
        if (cardToConsiderToPlay[0] === 'spades' || cardToConsiderToPlay[0] === 'hearts' || cardToConsiderToPlay[0] === 'clubs') {
            if (cardToConsiderToPlay[1] === 7) {
                playCard(gameState, i)
            }
        }
    }

    // player's hand
    function start() {
        for (let j = 0; j < gameState.playedCards.length; j++) {

            let oneCardOnTableToAnalyze = gameState.playedCards[j]

            for (let i = 0; i < playerWithTurn.cardsHolding.length; i++) {

                let cardToConsiderToPlay = playerWithTurn.cardsHolding[i]
                //check if the suite is a diamond
                if (cardToConsiderToPlay[0] === oneCardOnTableToAnalyze[0]) {

                    //check cardToConsiderToPlay is one up or
                    //one down from oneCardOnTableToAnalyze

                    let nextNumUp = oneCardOnTableToAnalyze[1] + 1,
                        nextNumDown = oneCardOnTableToAnalyze[1] - 1

                    if (nextNumUp === cardToConsiderToPlay[1] || nextNumDown === cardToConsiderToPlay[1]) {
                        playCard(gameState, i)
                        return
                    }
                }
                startAnotherColumnSuite(cardToConsiderToPlay, i)
            }
        }
    }

    start()
}

module.exports = main
