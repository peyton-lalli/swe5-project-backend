const { SqlError } = require("mariadb");

module.exports = (sequelize, Sequelize) => {
  const Ensemle = sequelize.define(
    "ensemble",
    {
      name: {
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
  return Ensemle;
};
