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
          text: `*Game ID: ${game.id}* - *Turn: ${
            game.turns
          }* - *Team: ${game.turn.toUpperCase()}*`
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
          text: `${game.currentUser} Your Turn`
        }
      }
    ]
  }),
  chessMove: game => {
    if (game.state === "checkmate") {
      return {
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `:chess_pawn:-X-X-X-X-X-X-  *${game.message}*  -X-X-X-X-X-X-:chess_pawn:`
            }
          },
          {
            type: "image",
            image_url: game.currentFenUrl,
            alt_text: "chessboard"
          },
          {
            type: "image",
            image_url: "https://i.imgflip.com/5ednb4.jpg",
            alt_text: "CheckMatekitty"
          }
        ]
      };
    } else {
      return {
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `:chess_pawn:-X-X-X-X-X-X-  *${game.message}*  -X-X-X-X-X-X-:chess_pawn:`
            }
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `*Game ID: ${game.id}* - *Turn: ${
                game.turns
              }* - *Team: ${game.turn.toUpperCase()}*`
            }
          },
          {
            type: "image",
            image_url: game.currentFenUrl,
            alt_text: "chessboard"
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `<${
                game.currentUser
              }> Your Turn! *Current Team*: ${game.turn} *Last Move*: ${
                game.lastMove
              }`
            }
          }
        ]
      };
    }
  },

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
