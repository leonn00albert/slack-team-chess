const alerts = {
  duplicatedPlayers: {
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text:
            ":warning: *Could not start!* Duplicated player make sure you only add one of each :arrow_right: `e.g /start-chess @name @name2"
        }
      }
    ]
  },

  notEnoughplayers: {
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text:
            ":warning: *Could not start!* Please add some players :arrow_right: `e.g /start-chess  @name @name2 @name3`"
        }
      }
    ]
  },
  playersNotTagged: {
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text:
            ":warning: *Could not start!* Make sure to Tag the player `e.g /start-chess @name`"
        }
      }
    ]
  },

  notSamePlayer: {
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: ":warning: *INVALID MOVE*: Please wait for your turn!"
        }
      }
    ]
  },
  notValidGameId: {
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: ":warning: *INVALID MOVE*: Please use a valid `game ID!``"
        }
      }
    ]
  },
  canMakemove: {
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: ":warning: *INVALID MOVE*: You have made your move``"
        }
      }
    ]
  },

  NotValidMove: {
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: ":warning: *INVALID MOVE*: Please try something else"
        }
      }
    ]
  },
  
    noGames: {
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: ":warning: No games started yet... start a game with /start-chess "
        }
      }
    ]
  },
  showChessNotValidInput : {
     blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: ":warning: Not a valid input! either try `mygames` or `allgames`"
        }
      }
    ]
  }
};

module.exports = alerts;
