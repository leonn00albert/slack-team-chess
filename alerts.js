const alerts = {
  duplicatedPlayers : {
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
  
  
}

module.exports = alerts;