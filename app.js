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
  const user = body.user_name;
  const text = body.text.tolLowerCase().split(" ");
  const gameId = text[0];
  text.shift();
  const move = text;
  const game = games[gameId];

  // Acknowledge command request
  if (!functions.checkForGameId(gameId)) {
    return await say(alerts.notValidGameId);
  } else if (functions.checkIfRightUser(user, game.currentUser.split("@")[1])) {
    console.log(user + " " + game.currentUser);
    return await say(alerts.notSamePlayer);
  } else if (functions.checkForValidMove(move, game, alerts, say === false)) {
    return await say(
      messages.chessMove(game.move({ from: move[0], to: move[1] }))
    );
  }
});

app.command("/chess-show", async ({ command, ack, body, say }) => {
  await ack();
  const user = body.user_name;
  let action = body.text.toLowerCase().split(" ")[0];
  console.log(action);
  if (action === "mygames") {
    let myGames = [];
    for (const id in games) {
      if (
        games[id].teams.w.players.includes({ name: "@" + user }) ||
        games[id].teams.b.players.includes({ name: "@" + user })
      ) {
        myGames.push(games[id]);
      }
      console.log(myGames)
      await say(messages.showChess(myGames));
    }
  } else if (action === "allgames") {
    let allGames = [];
    for (const id in games) {
      allGames.push(games[id]);
    }
    await say(messages.showChess(allGames));
  }
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log("⚡️ Bolt app is running!");
})();
