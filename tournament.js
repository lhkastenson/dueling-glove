var request = require('request'),
    async = require('async');
var exception = require('./exception.js');

var create = function(err, data, callback) {
  async.waterfall([function(callback){
	  if (err) throw err;
	  validate_request(data);
	  request.post({url:'https://challonge.com/api/tournaments.json', data: data}, function done(err, httpResponse, body) {
	    if (err) {
	      console.error('upload failed:', err);
	    }
	    console.log('Upload successful!  Server responded with:', body);
	  });
  }], callback)
}

var save = function(err, data, callback) {
  async.waterfall([function(callback) {
	  if (err) throw err;
	  validate_request(data);
	  request.put({url:'https://challonge.com/api/tournaments.json', data: data}, function done(err, httpResponse, body) {
	    if (err) {
	      return console.error('upload failed:', err);
	    }
	    console.log('Update successful! Server responded with:', body);
	  });
  }], callback)
};

var delete = function(err, data, callback) {
  async.waterfall([function(callback) {
	  if (err) throw err;
	  validate_request(data);
	  console.log(data.tournament.toString());
  }], callback)
};

function validate_request(data) {
  if(!data.hasOwnProperty('api_key') || data.api_key === '') {
    throw new exception.MissingApiKeyException;
  }
}

module.exports = {
  createTournament: createTournament,
  saveTournament: saveTournament,
  deleteTournament: deleteTournament
}
