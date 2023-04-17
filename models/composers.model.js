const { SqlError } = require("mariadb");

module.exports = (sequelize, Sequelize) => {
  const Composers = sequelize.define("composers", {
    name: {
      type: Sequelize.STRING,
    },
    picture: {
      type: Sequelize.STRING,
    },
    birthyear: {
      type: Sequelize.STRING,
    },
    deathyear: {
      type: Sequelize.STRING,
    },
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
  });
  return Composers;
};
