const messages = {
  startChess: {
    callback_id: "playerSelect",
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*Game ID:* - *Turn:* - *Team:*`
        }
      },

      {
        type: "image",
        image_url: fenURl,
        alt_text: "inspiration"
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `:chess_pawn: # Starting a game (GAME id) :chess_pawn: \n>*White* (w) 
             ${game.teams.w.players.map(player => {
               return `\n- <${player.name}> `;
             })}\n\n>*Black* (b)
            ${game.teams.b.players.map(player => {
              return `\n- <${player.name}> `;
            })}

    
    
            \n${
              players[0].name
            } Your Turn! you are team: *${players[0].team.toUpperCase()}*`
        }
      }
    ]
  }
};


module.exports = messages;