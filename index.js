var request = require('request');
var exception = require('./exception.js');

module.exports = {
  createTournament: function(data) {
    if(data.api_key && data.api_key !== "") {
      request.post({url:'http://challonge.com/api/tournaments.json', data: data}, function done(err, httpResponse, body) {
	if (err) {
	  return console.error('upload failed:', err);
	}
	console.log('Upload successful!  Server responded with:', body);
      });
    } else {
      throw exception.MissingApiKeyException
    }
  },

  saveTournament: function(data) {
    console.log(data.tournament.toString());
  },

  deleteTournament: function(data) {
    console.log(data.tournament.toString());
  }
};

//require('util').inherits(challonge, require('events').EventsEmitter);
