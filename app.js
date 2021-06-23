// Require the Bolt package (github.com/slackapi/bolt)
const { App } = require("@slack/bolt");
const { Chess } = require("chess.js");
const Game = require("./Game");
const functions = require("./functions");
const alerts = require("./alerts");
const messages = require("./messages");

const chess = new Chess();
const games = {}
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

app.command("/start-chess", async ({ body, command, ack, say }) => {
  // Acknowledge command request
  await ack();
  const selectedPlayers = body.text.split(" ");
  functions.validateStartChess(selectedPlayers, alerts, say, messages,games,Game,chess) 

  
});

app.command("/chess-move", async ({ command, ack, body, say }) => {
  const move = body.text.split(" ");
   const game = games["1"]
  // Acknowledge command request
  if (body.username !== game.currentPlayer) {
    
  }
  await ack();
  
  chess.move({ from: move[0], to: move[1] });
  const fen = chess.fen().split(" ");
  const fenURl = `http://www.fen-to-image.com/image/${fen[0]}`;
  await say(messages.chessMove(fenURl,chess,move));
});



(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log("⚡️ Bolt app is running!");
})();
