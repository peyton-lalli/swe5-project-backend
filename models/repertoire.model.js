const { SqlError } = require("mariadb");

module.exports = (sequelize, Sequelize) => {
  const Repertoire = sequelize.define(
    "repertoire",
    {
      pieceid: {
        type: Sequelize.INTEGER,
      },
      studentid: {
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
  return Repertoire;
};
