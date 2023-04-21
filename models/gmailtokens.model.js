const { SqlError } = require("mariadb");

module.exports = (sequelize, Sequelize) => {
  const GmailTokens = sequelize.define("gmailtokens", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    client_id: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    client_secret: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    refresh_token: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  return GmailTokens;
};
