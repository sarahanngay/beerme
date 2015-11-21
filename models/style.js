'use strict';
module.exports = function(sequelize, DataTypes) {
  var Style = sequelize.define('Style', {
    category: DataTypes.STRING,
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Style;
};