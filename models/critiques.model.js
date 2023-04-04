const { SqlError } = require("mariadb");

module.exports = (sequelize, Sequelize) => {
  const Critiques = sequelize.define("critiques", {
    critiquetext: {
      type: Sequelize.STRING,
    },
    instructorid: {
      type: Sequelize.INTEGER,
    },
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
  });
  return Critiques;
};
