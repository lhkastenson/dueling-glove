var assert = require('assert'),
    sinon = require('sinon'),
    request = require('request'),
    fs = require('fs');
var testData = JSON.parse(fs.readFileSync('./test/test-data.json', 'utf8'));
var duel = require('../index');
var exception = require('../exception');

describe('Tournament', function() {
  describe('#create()', function() {
    beforeEach(function(done){
      this.request = sinon
    	.stub(request, 'post')
    	.yields(null, null, JSON.stringify(testData.ExistingTestTournament.tournament.name));
      done();
    });

    afterEach(function(done){
      request.post.restore();
      done();
    });

    it('should not create a tournament without an api_key', function () {
      assert.throws(
	function () {
	  duel.createTournament(null, testData.InvalidTestTournament);
	},
	function(err) {
	  if (err instanceof Error) {
	    return true;
	  }
	});
    });

    it('should create a tournament', function() {
      duel.createTournament(null, testData.ValidTestTournament, function(err, result){
	var expected = testData.ExistingTestTournament.tournament.name;
	console.log(result);
	console.log(expected);

	if(err) return done(err);
	var write = sinon.spy(request, 'post');

	result.should.not.be.empty;
	assert(result.equals(expected));
      });
    });
  });

  describe('#save()', function() {
    it('should save a existing tournament', function() {
      before(function(done){
	sinon
    	  .stub(request, 'put')
    	  .yields(null, null, JSON.stringify(testData.ExistingTestTournament.tournament.name));
	done();
      });

      after(function(done){
	done();
      });

      duel.saveTournament(null, testData.ExistingTestTournament, function(err, result) {
        if(err) return done(err);
      	request.put.called.should.be.equal(true);
      	result.should.not.be.empty;
      	done(result);
      });
    });
  });

  it('should not save a tournament without an api_key', function () {
    assert.throws(
      function () {
	duel.saveTournament(null, testData.InvalidTestTournament);
      },
      function(err) {
	if (err instanceof Error) {
	  return true;
	}
      });
  });
});
