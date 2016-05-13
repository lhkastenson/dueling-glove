var assert = require('assert'),
    sinon = require('sinon'),
    request = require('request'),
    fs = require('fs');
var testData = JSON.parse(fs.readFileSync('./test/test-data.json', 'utf8'));
var duel = require('../index');
var exception = require('../exception');

describe('index', function() {
})
