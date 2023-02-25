const { SqlError } = require("mariadb");

module.exports = (sequelize, Sequelize) => {
  const Instruments = sequelize.define(
    "instruments",
    {
      name: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.STRING,
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
  return Instruments;
};
