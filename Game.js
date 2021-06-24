class Game {
  constructor(chess, id, players) {
    this.chess = chess;
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
  incrementTurns() {
    return this.turns++;
  }

  getCurrentDate() {
    const d = new Date();
    const n = d.getDate();
    return n;
  }

  changePlayer(str) {
    const team = str;
    const teams = this.teams;
    function _private(team) {
      if (teams[team].currentPlayer < teams[team].players.length - 1) {
        return teams[team].currentPlayer++;
      } else {
        return (teams[team].currentPlayer = 0);
      }
    }
    return _private(team);
  }

  startGame(arr) {
    const players = arr;
    const game = this;
    function _private(players) {
      game.createTeams(players);
      game.currentUser = game.teams.w.players[0].name;
      game.currentFen =
        "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
      game.startingDate = game.getCurrentDate();
      game.currentFenUrl = game.fenUrl(game.currentFen);
      game.chess.load(game.currentFen);
      return game.fenUrl(game.currentFen);
    }
    return _private(players);
  }

  computerMove() {
    const game = this;
    function _private(game) {
      const moves = game.chess.moves();
      const move = moves[Math.floor(Math.random() * moves.length)];
      console.log("----computer move----");
      console.log(move);
      return move;
    }
    return _private(game);
  }

  createTeams(arr) {
    const teams = this.teams;
    const players = arr;
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

      return;
    }
    return _private(players);
  }
  fenUrl(str) {
    const fen = str;

    function _private(fen) {
      return `http://www.fen-to-image.com/image/${Game.parseFen(fen)}`;
    }
    return _private(fen);
  }

  move(obj) {
    const move = obj;
    const game = this;
    const player = this.teams[this.chess.turn()].players[
      this.teams[this.chess.turn()].currentPlayer
    ];
    function _private(move, player) {
      game.chess.move(move);
      game.incrementTurns();
      game.changePlayer(player.team);
      game.lastMove = JSON.stringify(move);
      game.currentFen = game.chess.fen();
      game.currentFenUrl = game.fenUrl(game.currentFen);
      game.currentUser =
        game.teams[game.chess.turn()].players[
          game.teams[game.chess.turn()].currentPlayer
        ].name;
    game.message = "Game in progress.";
      
      player.canMakeMove = false;
      if (game.chess.in_checkmate()) {
        game.state = "checkmate";
         game.message = "Check Mate!";
        console.log("Game over!");
        return game;
      } else if (game.chess.in_draw()) {
        game.state = "draw";
        game.message = `Game Over! It's a draw!`;
        return game;
      } else if (game.chess.in_stalemate()) {
           game.state = "draw";
        game.message = `Game Over! It's a stalemate!`;
        return game;
      } else if (game.chess.in_threefold_repetition()) {
            game.state = "draw";
        game.message = `Game Over! due to threefold repetition!`;
        return game;
      } else if (game.chess.insufficient_material()) {
            game.state = "draw";
        game.message = `Game Over! Insufficient material!`;
        return game;
      } else if (game.currentUser === "computer") {
        const computerMove = game.computerMove();
        game.chess.move(computerMove);
        game.incrementTurns();
        game.changePlayer(game.chess.turn());
        game.lastMove = "Computer " + computerMove;
        game.currentFen = game.chess.fen();
        game.currentFenUrl = game.fenUrl(game.currentFen);
        game.currentUser =
          game.teams[game.chess.turn()].players[
            game.teams[game.chess.turn()].currentPlayer
          ].name;
        console.log(game.currentUser);
        game.message = "Computer move";
        return game;
      } else {
    
       
        
      }
       return game;
    }

    return _private(move, player);
  }

  checkForGameOver() {}
}

module.exports = Game;
