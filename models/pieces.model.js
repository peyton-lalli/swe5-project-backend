const { SqlError } = require("mariadb");

module.exports = (sequelize, Sequelize) => {
  const Pieces = sequelize.define("pieces", {
    name: {
      type: Sequelize.STRING,
    },
    lyrics: {
      type: Sequelize.TEXT,
    },
    translation: {
      type: Sequelize.TEXT,
    },
    language: {
      type: Sequelize.STRING,
    },
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
  });
  return Pieces;
};
