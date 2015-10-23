var assert = require('assert'),
    sinon = require('sinon'),
    request = require('request'),
    fs = require('fs');
var testData = JSON.parse(fs.readFileSync('./test/test-data.json', 'utf8'));
var duel = require('../index');
var exception = require('../exception');

describe('Tournament', function() {
  describe('#create()', function() {
    it('should not create a tournament without an api_key', function () {
      assert.throws( function () {
	duel.createTournament(testData.InvalidTestTournament);
      }, exception.MissingApiKey);
    });
    
    before(function(done){
      sinon
    	.stub(request, 'post')
    	.yields(null, null, JSON.stringify(testData.ExistingTestTournament.tournament.name));
      done();
    });

    after(function(done){
      request.get.restore();
      done();
    });

    it('should create a tournament', function(done) {
	duel.createTournament(testData.ValidTestTournament, function(err, result){
	  if(err) return done(err);
	  request.post.called.should.be.equal(true);
	  result.should.not.be.empty;
	  done(result);
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
