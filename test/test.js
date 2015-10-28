var assert = require('assert'),
    sinon = require('sinon'),
    request = require('request'),
    fs = require('fs');
var testData = JSON.parse(fs.readFileSync('./test/test-data.json', 'utf8'));
var duel = require('../index');
var exception = require('../exception');

describe('Tournament', function() {
  describe('#create()', function() {
    before(function(done){
      sinon
    	.stub(request, 'post')
    	.yields(null, null, JSON.stringify(testData.ExistingTestTournament.tournament.name));
      done();
    });

    after(function(done){
      done();
    });

    it('should not create a tournament without an api_key', function () {
      assert.throws( function () {
	duel.createTournament(testData.InvalidTestTournament);
      }, exception.MissingApiKeyException);
    });

    it('should create a tournament', function() {
	duel.createTournament(testData.ValidTestTournament, function(err, result){
	  if(err) return done(err);
	  request.post.called.should.be.equal(true);
	  result.should.not.be.empty;
	});
      });
    });

  describe('#save()', function() {
    it('should save a existing tournament', function() {
      duel.saveTournament(testData.ExistingTestTournament, function(err, result) {
        if(err) return done(err);
      	request.put.called.should.be.equal(true);
      	result.should.not.be.empty;
      	done(result);
      });
    });
  });
});
