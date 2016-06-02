'use strict';
module.exports = function(sequelize, DataTypes) {
  var BookReferences = sequelize.define('BookReferences', {
    title: DataTypes.STRING,
    link: DataTypes.STRING,
    opt_in: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return BookReferences;
};