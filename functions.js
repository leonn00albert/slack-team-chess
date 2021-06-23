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
  

  validateStartChess: (arr, alerts, say, messages, games, Game, chess) => {
    const selectedPlayers = arr;
    async function _private(selectedPlayers) {
      if (functions.checkEnoughPlayers(selectedPlayers)) {
        return await say(alerts.notEnoughplayers);
      } else if (functions.checkPlayersTagged(selectedPlayers)) {
        return await say(alerts.playersNotTagged);
      } else if (functions.checkDuplicatePlayers(selectedPlayers)) {
        return await say(alerts.duplicatedPlayers);
      } else {
        const gameId = Object.keys(games).length;
        games[gameId] = new Game(chess,gameId, functions.prepPlayers(selectedPlayers));
        await say(messages.startChess(games[gameId]));
        console.log(games[gameId]);
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

};
module.exports = functions;
