// Require the Bolt package (github.com/slackapi/bolt)
const { App } = require("@slack/bolt");
const { Chess } = require("chess.js");
const chess = new Chess();
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

app.command("/start-chess", async ({ body, command, ack, say }) => {
  // Acknowledge command request
  await ack();
  chess.load("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
  const players = body.text.split(" ");
  const fen = chess.fen().split(" ");
  const fenURl = `http://www.fen-to-image.com/image/${fen[0]}`;
  await say({
    callback_id: "playerSelect",
    blocks: [      {
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
          text: `:chess_pawn: Starting a game with ${players.map(player => player)} \n ${
            players[0]
          } Your Turn! Current Team: ${chess.turn()}`
        }
      }
    ]
  });
});

app.command("/chess-move", async ({ command, ack, body, say }) => {
  // Acknowledge command request
  await ack();
  const move = body.text.split(" ");
  chess.move({ from: move[0], to: move[1] });
  const fen = chess.fen().split(" ");
  const fenURl = `http://www.fen-to-image.com/image/${fen[0]}`;
  await say({
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
  });
});

app.view("playerSelect", async ({ say, ack, body, view, client }) => {
  await ack();
  await say("hello");
  const val =
    view["state"]["values"]["playerBlock"]["multi_users_select-action"];

  console.log(val);
});
app.action(
  "multi_users_select-action",
  async ({ say, ack, body, view, client }) => {
    const fen = chess.fen().split(" ");
    const fenURl = `http://www.fen-to-image.com/image/${fen[0]}`;

    await ack();
    const selectedUsers = body.actions[0].selected_users;
    await say({
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
            text: `<@${
              selectedUsers[0]
            }> Your Turn! Current Team: ${chess.turn()}`
          }
        }
      ]
    });
  }
);

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log("⚡️ Bolt app is running!");
})();
