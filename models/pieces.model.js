const { SqlError } = require("mariadb");

module.exports = (sequelize, Sequelize) => {
  const Pieces = sequelize.define(
    "pieces",
    {
      name: {
        type: Sequelize.STRING,
      },
      lyrics: {
        type: Sequelize.STRING,
      },
      translation: {
        type: Sequelize.STRING,
      },
      language: {
        type: Sequelize.STRING,
      },
      composerid: {
        type: Sequelize.INTEGER,
      },
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
    },
    { timestamps: false }
  );
  return Pieces;
};
