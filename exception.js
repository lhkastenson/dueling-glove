module.exports = {
  MissingApiKeyException: function(msg) {
    this.name = "MissingApiKeyException";
    this.message = msg;
  }
};
