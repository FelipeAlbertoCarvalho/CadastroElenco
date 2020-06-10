var mongoDb = require('mongodb');

var connMongoDb = function() {
  var db = new mongoDb.Db(
    'campeonato',
    new mongoDb.Server(
      'localhost',
      27017,
      {}
    ),
    {}
  );

  return db;
}

module.exports = function() {
  return connMongoDb;
}