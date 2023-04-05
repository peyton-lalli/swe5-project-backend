const { SqlError } = require("mariadb");

module.exports = (sequelize, Sequelize) => {
  const Students = sequelize.define("students", {
    level: {
      type: Sequelize.INTEGER,
    },
    major: {
      type: Sequelize.STRING,
    },
    classification: {
      type: Sequelize.STRING,
    },
    googleid: {
      type: Sequelize.INTEGER,
    },
    semesters: {
      type: Sequelize.INTEGER,
    },
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
  });
  return Students;
};
