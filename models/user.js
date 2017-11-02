'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING
  });
  User.associate = function({Note}) {
    User.hasMany(Note, {
      constraints: false
    });
  }

  return User;
};
