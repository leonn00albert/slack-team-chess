const commands = {
  startChess : async ({ body, command, ack, say },messages,alerts,functions,Game,chess) => {
  // Acknowledge command request
  await ack();
  const selectedPlayers = body.text.split(" ");
  if (functions.checkEnoughPlayers(selectedPlayers)) {
    return await say(alerts.notEnoughplayers);
  } else if (functions.checkPlayersTagged(selectedPlayers)) {
    return await say(alerts.playersNotTagged);
  } else if (functions.checkDuplicatePlayers(selectedPlayers)) {
    return await say(alerts.duplicatedPlayers);
  } else {
    chess.load("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
    const players = selectedPlayers.map(player => {
      return { name: player, team: "" };
    });

    const game = new Game(chess);
    game.createTeams(players);
    const fen = chess.fen().split(" ");
    const fenURl = `http://www.fen-to-image.com/image/${fen[0]}`;
  
    await say(messages.startChess(fenURl, game, players));
  }
}
}
module.exports = commands;