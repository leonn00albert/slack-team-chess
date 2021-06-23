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
  }
};

module.exports = alerts;
