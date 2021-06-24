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
  chessMove: game => ({
    blocks: [
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
        alt_text: "inspiration"
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `<${game.currentUser}> Your Turn! Current Team: ${game.chess.turn()} Last Move: ${game.lastMove}`
        }
      }
    ]
  }),
  
  showChess: games => ({
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `${games.map(
            game =>
              `Game ID: ${game.id}* - *Turn: ${
                game.turns
              }* -  *Current Player*: ${game.currentUser.toUpperCase()} state: ${game.state.toUpperCase()}\n`
          )}`
        }
      }
    ]
  })
};

module.exports = messages;
