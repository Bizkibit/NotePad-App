'use strict';
module.exports = (sequelize, DataTypes) => {
  var Note = sequelize.define('Note', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    starred: DataTypes.BOOLEAN
  });
  Note.associate = function({User}) {
    Note.belongsTo(User);
  }

  return Note;
};
