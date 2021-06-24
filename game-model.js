const mongoose = require('mongoose');
const Game = {
     teams : {
      w: {
        players: Array,
        currentPlayer: Number
      },
      b: {
        players: Array,
        currentPlayer: Number
      }
    },
    state: String,
    id: String,
    currentFen: String,
    currentFenUrl: String,
    currentUser: String,
    turns: Number,
    startingDate: String,
    lastMove: String,
}

module.exports = mongoose.model('Game', Game);