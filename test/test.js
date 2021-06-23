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
  },
  checkIfRightUser: {
    shouldFail: ["leon", "james"],
    shouldSucceed: ["leon", "leon"]
  },
  checkForGameId: {
    shouldFail: "fail",
    shouldSucceed: "3"
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
        !functions.checkDuplicatePlayers(
          test.checkDuplicatePlayers.shouldSucceed
        )
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

describe("/chess-move", function() {
  describe("checkIfRightUser()", function() {
    it("Should return True when the users are not the same", function() {
      assert.ok(
        functions.checkIfRightUser(
          test.checkIfRightUser.shouldFail[0],
          test.checkIfRightUser.shouldFail[1]
        )
      );
    });
    it("Should return False when the users are  the same", function() {
      assert.ok(
        !functions.checkIfRightUser(
          test.checkIfRightUser.shouldSucceed[0],
          test.checkIfRightUser.shouldSucceed[1]
        )
      );
    });
  });
  
    describe("checkForGameId()", function() {
    it("Should return False when the game id is not present", function() {
      assert.ok(!
        functions.checkForGameId(
          test.checkForGameId.shouldFail
        
        )
      );
    });
    it("Should return True when the game id is present", function() {
      assert.ok(
        functions.checkForGameId(
          test.checkForGameId.shouldSucceed
        
        )
      );
    });
  });
});
