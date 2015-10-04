var assert = require('assert');
var fs = require('fs');
var testData = JSON.parse(fs.readFileSync('./test/test-data.json', 'utf8'));
var duel = require('../index');



describe('Tournament', function() {
  describe('#create()', function() {
    it('should not create a tournament without an api_key', function () {
      duel.createTournament(testData.InvalidTestTournament);
    });

    it('should create a tournament', function() {
      duel.createTournament(testData.ValidTestTournament);
    });
  });

  describe('#save()', function() {
    it('should save a existing tournament', function() {
      duel.saveTournament(testData.ExistingTournament);
    });
  });
});
    
      
