// Require the Bolt package (github.com/slackapi/bolt)
const { App } = require("@slack/bolt");
const { Chess } = require("chess.js");
const Game = require("./Game");
const functions = require("./functions");
const alerts = require("./alerts");
const messages = require("./messages");
const mongoose = require("mongoose");
mongoose.connect(
  `mongodb+srv://leon:${process.env.MONGO_KEY}@cluster0.umurs.mongodb.net/teamchess?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}`
);

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
  console.log(selectedPlayers);
  functions
    .validateStartChess(
      selectedPlayers,
      alerts,
      say,
      messages,
      games,
      Game,
      chess
    )
    .then(game => {
      const chessGameSchema = new mongoose.Schema({
        teams: {
          w: {
            players: Array,
            currentPlayer: Number
          },
          b: {
            players: Array,
            currentPlayer: Number
          }
        },
        gameId: String,
        state: String,
        currentFen: String,
        currentFenUrl: String,
        currentUser: String,
        turns: Number,
        startingDate: Number,
        lastMove: String
      });
      const chessGame = mongoose.model("Game", chessGameSchema);
      const newGame = {
        teams: game.teams,
        gameId: 0,
        state: "Active",
        currentFen: game.currentFen,
        currentFenUrl: game.currentFenUrl,
        currentUser: game.currentUser,
        turns: game.turns,
        startingDate: 22,
        lastMove: ""
      };
      const newChessGame = new chessGame(game);
      newChessGame.save();
    });
});

app.command("/chess-move", async ({ command, ack, body, say }) => {
  await ack();
  const user = body.user_name;

  const text = body.text.toLowerCase().split(" ");

  console.log(text + " " + user);
  const gameId = text[0];
  text.shift();
  const move = text;
  const game = games[gameId];

  // Acknowledge command request
  if (!functions.checkForGameId(gameId)) {
    return await say(alerts.notValidGameId);
  } else if (functions.checkIfRightUser(user, game.currentUser.split("@")[1])) {
    return await say(alerts.notSamePlayer);
  } else {
    functions.checkForValidMove(move, game, alerts, say, messages);
  }
});

app.command("/chess-show", async ({ command, ack, body, say }) => {
  await ack();
  const user = body.user_name;
  let action = body.text.toLowerCase().split(" ")[0];
  console.log(action);

  if (Object.values(games).length === 0) {
    return await say(alerts.noGames);
  } else if (action) {
    await say(
      messages.showChess(functions.showChessAction(action, games, user))
    );
  } else {
    return await say(alerts.showChessNotValidInput);
  }
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log("⚡️ Bolt app is running!");
})();
