const { SqlError } = require("mariadb");

module.exports = (sequelize, Sequelize) => {
  const Members = sequelize.define("members", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
  });
  return Members;
};
