const messages = {
  startChess: game => ({
    callback_id: "playerSelect",
    blocks: [

      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `:chess_pawn: # Starting a game with ID *${
            game.id
          }* :chess_pawn: \n>*White* (w) 
             ${game.teams.w.players.map(player => {
               return `\n- <${player.name}> `;
             })}\n\n>*Black* (b)
            ${game.teams.b.players.map(player => {
              return `\n- <${player.name}> `;
            })}`
        }
        
      },
            {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*Game ID: ${game.id}* - *Turn: ${game.turns}* - *Team: ${game.chess.turn().toUpperCase()}*`
        }
      },

      {
        type: "image",
        image_url: game.currentFenUrl,
        alt_text: "Chess Board"
      },
      
                 {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `${game.currentUser}> Your Turn`
        }
      },
    ]
  }),
  chessMove: (fenURl, chess, move) => ({
    blocks: [
      {
        type: "image",
        image_url: fenURl,
        alt_text: "inspiration"
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `Your Turn! Current Team: ${chess.turn()} Last Move: ${move}`
        }
      }
    ]
  })
};

module.exports = messages;
