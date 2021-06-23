const assert = require("assert");

const functions = require("../functions");
/* run test by  ./node_modules/mocha/bin/mocha */
const test = {
  checkDuplicatePlayers: {
    shouldFail: ["<@Leon>", "<@Leon>"],
    shouldSucceed: ["<@Leon>", "<@James>"]
  },
  checkEnoughPlayers: {
     shouldFail: ["<@Leon>"],
     shouldSucceed: ["<@Leon>", "<@James>"]
  },
  checkPlayersTagged: {
     shouldFail: ["Leon> @Leon"],
     shouldSucceed: ["@Leon", "@James"]
  }
};

describe("/start-chess", function() {
  describe("checkDuplicatePlayers()", function() {
    it("Should return True when there are duplicated users", function() {
      assert.ok(
        functions.checkDuplicatePlayers(test.checkDuplicatePlayers.shouldFail)
      );
    });
    it("Should return False when there are no duplicated users", function() {
      assert.ok(
        !functions.checkDuplicatePlayers(test.checkDuplicatePlayers.shouldSucceed)
      );
    });
  });
    describe("checkEnoughPlayers()", function() {
    it("Should return True when there are not enough users", function() {
      assert.ok(
        functions.checkEnoughPlayers(test.checkEnoughPlayers.shouldFail)
      );
    });
    it("Should return False when there are enough users", function() {
      assert.ok(
        !functions.checkEnoughPlayers(test.checkEnoughPlayers.shouldSucceed)
      );
    });
  });
    describe("checkPlayersTagged()", function() {
    it("Should return True when one of the users is not tagged", function() {
      assert.ok(
        functions.checkPlayersTagged(test.checkPlayersTagged.shouldFail)
      );
    });
    it("Should return False when all the users are tagged", function() {
      assert.ok(
        !functions.checkPlayersTagged(test.checkPlayersTagged.shouldSucceed)
      );
    });
  });
});
