const mongoose = require("mongoose");
const chessGameSchema = new mongoose.Schema({
  teams: {
    w: {
      players: Array,
      currentPlayer: Number
    },
    b: {
      players: Array,
      currentPlayer: Number
    }
  },
  id: String,
  state: String,
  currentFen: String,
  currentFenUrl: String,
  currentUser: String,
  turns: Number,
  startingDate: Number,
  lastMove: String,
  message: String,
  turn: String
});

module.exports = mongoose.model("Game", chessGameSchema);