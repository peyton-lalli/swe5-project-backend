const { SqlError } = require("mariadb");

module.exports = (sequelize, Sequelize) => {
  const Accompanists = sequelize.define("accompanists", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
  });
  return Accompanists;
};
