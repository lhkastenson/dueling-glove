var request = require('request');

var exception = require('./exception.js');

module.exports = {
  createTournament: function(data) {
    console.log(data.tournament.toString());
  },

  saveTournament: function(data) {
    console.log(data.tournament.toString());
  },

  deleteTournament: function(data) {
    console.log(data.tournament.toString());
  }
};

//require('util').inherits(challonge, require('events').EventsEmitter);
