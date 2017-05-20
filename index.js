const prompt = require('prompt'),
    game = require('./modules/game.js')


let schema = {
    properties: {
        players: {
            pattern: /[2-8]/,
            message: 'Players must be between 2 - 8',
            required: true,
            default: '2'
        },
        games: {
            pattern: /\d+/,
            message: 'Games Must be a digit',
            required: true,
            default: '1'
        }
    }
}


prompt.start()

prompt.get(schema, function(err, result) {
    game(result)
})
