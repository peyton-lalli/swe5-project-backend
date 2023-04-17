const { SqlError } = require("mariadb");

module.exports = (sequelize, Sequelize) => {
  const Critiques = sequelize.define("critiques", {
    critiqueText: {
      type: Sequelize.STRING,
    },
    isExpanded: {
      type: Sequelize.BOOLEAN,
    },
    deportment: {
      type: Sequelize.STRING,
    },
    deportmentRating: {
      type: Sequelize.STRING,
    },
    diction: {
      type: Sequelize.STRING,
    },
    dictionRating: {
      type: Sequelize.STRING,
    },
    tone: {
      type: Sequelize.STRING,
    },
    toneRating: {
      type: Sequelize.STRING,
    },
    interpretation: {
      type: Sequelize.STRING,
    },
    interpretationRating: {
      type: Sequelize.STRING,
    },
    accuracy: {
      type: Sequelize.STRING,
    },
    accuracyRating: {
      type: Sequelize.STRING,
    },
    balance: {
      type: Sequelize.STRING,
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
