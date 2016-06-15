var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var sequelize = null;
var basename  = path.basename(module.filename);
var env       = process.env.DATABASE_URL || 'development';
var config    = require(__dirname + '/../config/config.json')[env];
var db        = {};

console.log(process.env.DATABASE_URL);
if (process.env.DATABASE_URL) {
    // the application is executed on Heroku ... use the postgres database
    sequelize = new Sequelize(process.env.DATABASE_URL, {
      dialect:  'postgres',
      protocol: 'postgres',
      host:     process.env.DATABASE_URL,
      logging:  true //false
    });
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
