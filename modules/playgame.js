const mainPlayerStrategy = require('./mainPlayerStrategy.js'),
    randomPlayerStrategy = require('./randomPlayerStrategy.js')

function whoHasFewerCards(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var min = arr[0];
    var minIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] < min) {
            minIndex = i;
            min = arr[i];
        }
    }

    if (minIndex === 0) {
        console.log('Main player wins!')
    } else {
        console.log(`Winner is player ${minIndex + 1}`)
    }
}

function continueAfterSevenDiamondsPlay(gameState, turnp) {

    let totalCardsAfterSevDiamond = 0,
        amountOfPlayers = gameState.players.length,
        turn = turnp

    for (let j = 0; j < amountOfPlayers; j++) {
        let numCardsInHand = gameState.players[j].cardsHolding.length
        totalCardsAfterSevDiamond += numCardsInHand
    }

    for (let i = 0; i < totalCardsAfterSevDiamond; i++) {
        if (amountOfPlayers === turn) turn = 0

        if (turn === 0) mainPlayerStrategy(gameState)

        if (turn !== 0) randomPlayerStrategy(gameState, turn)

        turn++
    }

    let amountOfCardsInHand = []

    for (let k = 0; k < amountOfPlayers; k++) {
        if (gameState.players[k].cardsHolding.length === 0) {
            if (k === 0) {
                console.log(`You don't have any cards left!  He wins!`)
            } else {
                console.log(`Player ${k+1} doesn't have any cards left!  He wins!`)
            }
            return
        }

        amountOfCardsInHand.push(gameState.players[k].cardsHolding.length)
    }

    whoHasFewerCards(amountOfCardsInHand)
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
