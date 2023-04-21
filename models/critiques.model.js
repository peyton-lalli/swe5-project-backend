const { SqlError } = require("mariadb");

module.exports = (sequelize, Sequelize) => {
  const Critiques = sequelize.define("critiques", {
    critiqueText: {
      type: Sequelize.TEXT,
    },
    isExpanded: {
      type: Sequelize.BOOLEAN,
    },
    deportment: {
      type: Sequelize.TEXT,
    },
    deportmentRating: {
      type: Sequelize.STRING,
    },
    diction: {
      type: Sequelize.TEXT,
    },
    dictionRating: {
      type: Sequelize.STRING,
    },
    tone: {
      type: Sequelize.TEXT,
    },
    toneRating: {
      type: Sequelize.STRING,
    },
    interpretation: {
      type: Sequelize.TEXT,
    },
    interpretationRating: {
      type: Sequelize.STRING,
    },
    accuracy: {
      type: Sequelize.TEXT,
    },
    accuracyRating: {
      type: Sequelize.STRING,
    },
    balance: {
      type: Sequelize.TEXT,
    },
    balanceRating: {
      type: Sequelize.STRING,
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
