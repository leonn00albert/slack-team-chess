// Require the Bolt package (github.com/slackapi/bolt)
const { App } = require("@slack/bolt");
const { Chess } = require("chess.js");
const Game = require("./Game");
const functions = require("./functions");
const alerts = require("./alerts");
const messages = require("./messages");

const chess = new Chess();
const games = {};
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

app.command("/start-chess", async ({ body, command, ack, say }) => {
  // Acknowledge command request
  await ack();
  const selectedPlayers = body.text.split(" ");
  functions.validateStartChess(
    selectedPlayers,
    alerts,
    say,
    messages,
    games,
    Game,
    chess
  );
});

app.command("/chess-move", async ({ command, ack, body, say }) => {
  await ack();

  const user = body.username;
  const text =  body.text.split(" ");
  const gameId = text[0];
  const move = text.shift();
  const game = games[gameId];
  // Acknowledge command request
  if (!functions.checkForGameId(gameId)) {
    await say(alerts.notValidGameId);
  } else if (!functions.checkIfRightUser(user, game.currentUser)) {
    await say(alerts.notSamePlayer);
  } else if (functions.canMakeMove(game)) {
    
  } 

});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log("⚡️ Bolt app is running!");
})();
