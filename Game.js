class Game {
  constructor(chess) {
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
    this.turns = 0;
    this.startingDate = this.getCurrentDate();
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

  createTeams(arr) {
    const teams = this.teams;
    const players = arr;
    function _private(players) {
      players.forEach((player, i) => {
        if (i % 2) {
          player.team = "b";
          teams.w.players.push(player);
        } else {
          player.team = "w";
          teams.b.players.push(player);
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