const { Chess } = require("chess.js");
const chess = new Chess();

class Game {
  constructor(chess, id, players) {
    this.teams = {
      w: {
        players: [],
        currentPlayer: 0
      },
      b: {
        players: [],
        currentPlayer: 0
      }
    };
    this.state = "active";
    this.id = id;
    this.currentFen = "";
    this.currentFenUrl = "";
    this.currentUser = "";
    this.turns = 0;
    this.startingDate = "";
    this.lastMove = "";
    this.startGame(players);
  }
  static parseFen(str) {
    const fen = str;
    function _private(fen) {
      const arr = fen.split(" ");
      return arr[0];
    }
    return _private(fen);
  }
  static incrementTurns() {
    return this.turns++;
  }

  static getCurrentDate() {
    const d = new Date();
    const n = d.getDate();
    return n;
  }

  static startGame(arr) {
    const players = arr;
    const game = {};
    console.log("----start game----");
    console.log(players);
    function _private(players) {
      Game.createTeams(players);
      game.teams = Game.createTeams(players);
      game.state = "Active";
      game.turns = 0;
      game.lastMove = "Start of Game";
      game.currentUser = game.teams.w.players[0].name;
      game.currentFen =
        "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
      game.startingDate = Game.getCurrentDate();
      game.currentFenUrl = Game.fenUrl(game.currentFen);
      game.turn = "w";
      return game;
    }
    return _private(players);
  }

  static computerMove() {
    function _private() {
      const moves = chess.moves();
      const move = moves[Math.floor(Math.random() * moves.length)];
      console.log("----computer move----");
      console.log(move);
      return move;
    }
    return _private();
  }

  static createTeams(arr) {
    const teams = {
      w: {
        players: [],
        currentPlayer: 0
      },
      b: {
        players: [],
        currentPlayer: 0
      }
    };
    const players = arr;
    console.log("-------teams-----");

    console.log(players);
    function _private(players) {
      players.forEach((player, i) => {
        if (i % 2) {
          player.team = "b";
          teams.b.players.push(player);
          player.canMakeMove = true;
        } else {
          player.team = "w";
          player.canMakeMove = true;
          teams.w.players.push(player);
        }
      });
      console.log(teams);
      return teams;
    }
    return _private(players);
  }
  static fenUrl(str) {
    const fen = str;

    function _private(fen) {
      return `http://www.fen-to-image.com/image/36/double/coords/${Game.parseFen(
        fen
      )}`;
    }
    return _private(fen);
  }

  static move(obj, game) {
    const move = obj;
    chess.load(game.currentFen);
    const player =
      game.teams[chess.turn()].players[game.teams[chess.turn()].currentPlayer];
    function _private(move, player) {
      chess.move(move);
      game.turns += 1;

      game.lastMove = JSON.stringify(move);
      game.currentFen = chess.fen();
      game.currentFenUrl = Game.fenUrl(game.currentFen);
      if (chess.turn() === "w") {
        if (
          game.teams["w"].currentPlayer ===
          game.teams["w"].players.length - 1
        ) {
          game.teams["w"].currentPlayer = 0;
        } else {
          game.teams["w"].currentPlayer += 1;
        }
      } else {
        if (
          game.teams["b"].currentPlayer ===
          game.teams["b"].players.length - 1
        ) {
          game.teams["b"].currentPlayer = 0;
        } else {
          game.teams["b"].currentPlayer += 1;
        }
      }
      console.log('---old user----')
          console.log(game.currentUser);
       console.log('---new user----')
      game.currentUser =
        game.teams[chess.turn()].players[
          game.teams[chess.turn()].currentPlayer
        ].name;
      
        console.log(game.currentUser);
      game.message = "Game in progress.";
      player.canMakeMove = false;
      if (chess.in_checkmate()) {
        game.state = "checkmate";
        game.message = "Check Mate!";
        console.log("Game over!");
        return game;
      } else if (chess.in_draw()) {
        game.state = "draw";
        game.message = `Game Over! It's a draw!`;
        return game;
      } else if (chess.in_stalemate()) {
        game.state = "draw";
        game.message = `Game Over! It's a stalemate!`;
        return game;
      } else if (chess.in_threefold_repetition()) {
        game.state = "draw";
        game.message = `Game Over! due to threefold repetition!`;
        return game;
      } else if (chess.insufficient_material()) {
        game.state = "draw";
        game.message = `Game Over! Insufficient material!`;
        return game;
      } else if (game.currentUser === "computer") {
        const computerMove = Game.computerMove();
        chess.load(game.currentFen);
        chess.move(computerMove);
        game.turns += 1;
        game.currentFen = chess.fen();
        game.currentFenUrl = Game.fenUrl(game.currentFen);
        game.currentUser =
          game.teams[chess.turn()].players[
            game.teams[chess.turn()].currentPlayer
          ].name;
        console.log(game.currentUser);
        game.lastMove = "Computer move: " + computerMove;
        game.message = "Computer move";
        return game;
      } else {
        return game;
      }
      return game;
    }

    return _private(move, player);
  }

  checkForGameOver() {}
}

module.exports = Game;
