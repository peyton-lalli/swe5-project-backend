const { SqlError } = require("mariadb");

module.exports = (sequelize, Sequelize) => {
  const Event = sequelize.define(
    "event",
    {
      type: {
        type: Sequelize.STRING,
      },
      datetime: {
        type: Sequelize.DATETIME,
      },
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
  return Event;
};
