'use strict';
module.exports = function(sequelize, DataTypes) {
  var BookReferences = sequelize.define('BookReferences', {
    google_spreadsheet_link: DataTypes.STRING,
    uuid: DataTypes.STRING,
    number_entries: DataTypes.INTEGER,
    view_count: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return BookReferences;
};
