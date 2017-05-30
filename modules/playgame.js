const mainPlayerStrategy = require('./mainPlayerStrategy.js'),
    randomPlayerStrategy = require('./randomPlayerStrategy.js')

let gamesPlayed = 0,
    gamesMainPlayerWon = 0

function whoHasFewerCards(arr, gameState) {
    if (arr.length === 0)
        return -1

    let min = arr[0],
        minIndex = 0

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] < min) {
            minIndex = i
            min = arr[i]
        }
    }

    if (minIndex === 0) gamesMainPlayerWon++

    if (gameState.howManyGamesToPlay === gamesPlayed) {
        console.log((gamesMainPlayerWon / gamesPlayed) * 100 + '%')
        console.timeEnd("Time of Execution:")
    }
}

function continueAfterSevenDiamondsPlay(gameState, turnp) {

    let totalCardsAfterSevDiamond = 0,
        amountOfPlayers = gameState.players.length,
        turn = turnp

    // determine how many cards to play after seven of diamonds.

    for (let j = 0; j < amountOfPlayers; j++) {
        let numCardsInHand = gameState.players[j].cardsHolding.length
        totalCardsAfterSevDiamond += numCardsInHand
    }

    // Run through all the cards left by turns.

    for (let i = 0; i < totalCardsAfterSevDiamond; i++) {
        if (amountOfPlayers === turn) turn = 0
        if (turn === 0) mainPlayerStrategy(gameState)
        if (turn !== 0) randomPlayerStrategy(gameState, turn)
        turn++
    }

    gamesPlayed++

    let amountOfCardsInHand = []

    for (let k = 0; k < amountOfPlayers; k++) {

        // determine if the main player ran out of cards

        if (gameState.players[k].cardsHolding.length === 0 && k === 0) {
            gamesMainPlayerWon++

            if (gameState.howManyGamesToPlay === gamesPlayed) {
                console.log((gamesMainPlayerWon/gamesPlayed) * 100 + '%')
                console.timeEnd("Time of Execution:")
            }
            return
        }
        amountOfCardsInHand.push(gameState.players[k].cardsHolding.length)
    }

    whoHasFewerCards(amountOfCardsInHand, gameState)
}

function findSevenDiamonds(players) {
    for (let i = 0; i < players.length; i++) {
        let cardsHolding = players[i].cardsHolding
        for (let j = 0; j < cardsHolding.length; j++) {
            if (cardsHolding[j][0] === 'diamonds' && cardsHolding[j][1] === 7) {
                return [i, j]
            }
        }
    }
}

function playgame(gameState) {

    let players = gameState.players,
        locSevDiamonds = findSevenDiamonds(players),
        playerNumWithSevDiamonds = locSevDiamonds[0],
        sevDiamondsLocInHand = locSevDiamonds[1]

    playerWithSevDiamonds = players[playerNumWithSevDiamonds],
        sevDiamonds = playerWithSevDiamonds.cardsHolding[sevDiamondsLocInHand]

    gameState.playedCards.push(sevDiamonds)
    gameState.cardsPlayed++

        playerWithSevDiamonds.cardsPlayed.push(sevDiamonds)
    playerWithSevDiamonds.cardsHolding.splice(sevDiamondsLocInHand, 1)

    continueAfterSevenDiamondsPlay(gameState, playerNumWithSevDiamonds)
}

module.exports = playgame
