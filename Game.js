class Game {
  constructor(chess ,id, players) {
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
    this.id = id;
    this.currentFen = "";
    this.currentUser = "";
    this.turns = 0;
    this.startingDate = "";
    
    this.startGame(players)
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
      game.currentUser = game.team.w.players[0];
      game.currentFen =
        "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
      game.startingDate = game.getCurrentDate();
      game.chess.load(game.currentFen);
      return game.fenUrl(game.currentFen);
    }
    return _private(players);
  }

  createTeams(arr) {
    const teams = this.teams;
    const players = arr;
    function _private(players) {
      players.forEach((player, i) => {
        if (i % 2) {
          player.team = "b";
          teams.b.players.push(player);
        } else {
          player.team = "w";
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

  move(str) {
    const move = str;
    const game = this;
    const player = this.teams[this.chess.turn()].players[
      this.teams[this.chess.turn()].currentPlayer
    ];

    function _private(move, player) {
      this.move(move);
      game.incrementTurns();
      game.changePlayer(player.team);

      console.log(`${player.name} made this move (${JSON.stringify(move)})`);
      if (this.chess.game_over()) {
        console.log("Game over!");
      } else {
        console.log(
          "next player is " +
            game.teams[game.chess.turn()].players[
              game.teams[game.chess.turn()].currentPlayer
            ].name
        );
      }
      return game.fenUrl(this.chess.fen());
    }
    return _private(move, player);
  }

  checkForGameOver() {}
}

module.exports = Game;
