const  assert = require('assert');

const functions = require('../functions');

const test = {
  checkDuplicatePlayers: {
    shouldFail: ['<@Leon>' , '<@Leon>'],
    shouldSucceed: ['<@Leon>','<@James>']
  }
}
assert

var assert = require('assert');
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});