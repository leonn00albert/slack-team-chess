// Require the Bolt package (github.com/slackapi/bolt)
const { App } = require("@slack/bolt");
const { Chess } = require("chess.js");
const Game = require("./Game");
const functions = require("./functions");
const alerts = require("./alerts");
const messages = require("./messages");
const mongoose = require("mongoose");
const GameModel = require("./game-model");
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
  await GameModel.find({})
    .then(foundGames => {
      functions.validateStartChess(
        selectedPlayers,
        alerts,
        say,
        messages,
        games,
        Game,
        foundGames
      );
    })
    .then(game => {
      console.log(game)
      const mongoGame = new GameModel(game);
      console.log(mongoGame)
    console.log('---------------')
      mongoGame.save();
  }
    );



});

app.command("/chess-move", async ({ command, ack, body, say }) => {
  await ack();
  const user = body.user_name;

  const text = body.text.toLowerCase().split(" ");

  console.log(text + " " + user);
  const gameId = text[0];
  text.shift();
  const move = text;


  // Acknowledge cgitommand request

  GameModel.find({ gameID: parseInt(gameId) })
    .then(async foundGame => {
      
      if (!functions.checkForGameId(gameId)) {
        return await say(alerts.notValidGameId);
      } else if (
  
        functions.checkIfRightUser(user, foundGame.currentUser.split("@")[1])
      ) {
        return await say(alerts.notSamePlayer);
      } else {
        functions.checkForValidMove(move, foundGame, alerts, say, messages);
      }
    })
    .then(updateGame => GameModel.findOneAndUpdate({ id: gameId }, updateGame));
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
