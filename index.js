var request = require('request');
var exception = require('./exception.js');

module.exports = {
  createTournament: function(data) {
    validate_request(data);
    request.post({url:'https://challonge.com/api/tournaments.json', data: data}, function done(err, httpResponse, body) {
      if (err) {
	return console.error('upload failed:', err);
      }
      console.log('Upload successful!  Server responded with:', body);
    });
  },

  saveTournament: function(data) {
    validate_request(data);
    request.put({url:'https://challonge.com/api/tournaments.json', data: data}, function done(err, httpResponse, body) {
      if (err) {
	return console.error('upload failed:', err);
      }
      console.log('Update successful! Server responded with:', body);
    });
  },

  deleteTournament: function(data) {
    validate_request(data);
    console.log(data.tournament.toString());
  }
};

function validate_request(data) {
  if(data.api_key === undefined ||data.api_key === null || data.api_key === '') {
    throw exception.MissingApiKeyException();
  }
}

//require('util').inherits(challonge, require('events').EventsEmitter);
