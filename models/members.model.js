const { SqlError } = require("mariadb");

module.exports = (sequelize, Sequelize) => {
  const Members = sequelize.define(
    "members",
    {
      studentid: {
        type: Sequelize.INTEGER,
      },
      ensembleid: {
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
  return Members;
};
