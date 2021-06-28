const functions = {
  checkDuplicatePlayers: arr => {
    let findDuplicates = arr =>
      arr.filter((item, index) => arr.indexOf(item) != index);
    function _private() {
      return findDuplicates(arr).length === 0 ? false : true;
    }
    return _private();
  },
  checkEnoughPlayers: arr => {
    const selectedPlayers = arr;
    function _private(selectedPlayers) {
      return selectedPlayers[0] === "" || selectedPlayers.length === 1
        ? true
        : false;
    }
    return _private(selectedPlayers);
  },
  checkPlayersTagged: arr => {
    const selectedPlayers = arr;
    function _private(selectedPlayers) {
      const firstLetters = selectedPlayers.map(player => player.charAt(0));
      return firstLetters.every(letter => letter === "@") ? false : true;
    }

    return _private(selectedPlayers);
  },
  checkforComputer: arr => {
    const selectedPlayers = arr;
    function _private(selectedPlayers) {
      return selectedPlayers.includes("<computer>");
    }

    return _private(selectedPlayers);
  },

  validateStartChess: async (arr, alerts, say, messages, games, Game, chess,gameId) => {
    const selectedPlayers = arr;
    const humanPlayers = selectedPlayers.filter(
      player => player !== "computer"
    );
    async function _private(selectedPlayers) {
      if (functions.checkEnoughPlayers(selectedPlayers)) {
        return await say(alerts.notEnoughplayers);
      } else if (functions.checkPlayersTagged(humanPlayers)) {
        return await say(alerts.playersNotTagged);
      } else if (functions.checkDuplicatePlayers(selectedPlayers)) {
        return await say(alerts.duplicatedPlayers);
      } else {
       console.log(gameId);
        games[gameId] = new Game(
          chess,
          gameId,
          functions.prepPlayers(selectedPlayers)
        );
        await say(messages.startChess(games[gameId]));
        return games[gameId];
      }
    }
    return _private(selectedPlayers);
  },
  prepPlayers: arr => {
    const selectedPlayers = arr;
    function _private(selectedPlayers) {
      return selectedPlayers.map(player => {
        return { name: player, team: "" };
      });
    }
    return _private(selectedPlayers);
  },

  checkIfRightUser: (user, gameUser) => {
    function _private(user, game) {
      return user !== gameUser;
    }
    return _private(user, gameUser);
  },
  checkForGameId: gameId => {
    function _private(gameId) {
      const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      return numbers.some(num => num == gameId);
    }
    return _private(gameId);
  },
  canMakeMove: game => {
    function _private(game) {
      const index = game.chess.turn();
      const key = game.teams;
      return key[index].players[key[index].currentPlayer].canMakeMove;
    }
    return _private(game);
  },
  checkForValidMove: (arr, game, alerts, say, messages) => {
    const currentFen = game.currentFen;
    const [from, to] = arr;
    console.log(arr);
    async function _private() {
      console.log(from + " " + to);
      game.chess.move({ from: from, to: to });
      game.chess.fen();
      console.log(currentFen);
      console.log(game.chess.fen());
      if (game.chess.fen() === currentFen) {
        return await say(alerts.NotValidMove);
      } else {
        return await say(messages.chessMove(game.move({ from: from, to: to })));
      }
    }
    return _private();
  },
  showChessAction: (action, games, user) => {
    if (action === "mygames") {
      let myGames = [];
      for (const id in games) {
        if (
          games[id].teams.w.players.some(player =>
            Object.values(player).includes("@" + user)
          ) ||
          games[id].teams.b.players.some(player =>
            Object.values(player).includes("@" + user)
          )
        ) {
          myGames.push(games[id]);
        }
        return myGames;
      }
    } else if (action === "allgames") {
      let allGames = [];
      for (const id in games) {
        allGames.push(games[id]);
      }
      return allGames;
    }
  }
};
module.exports = functions;
