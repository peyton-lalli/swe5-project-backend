const { SqlError } = require("mariadb");

module.exports = (sequelize, Sequelize) => {
  const Requirements = sequelize.define(
    "requirements",
    {
      classification: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      description: {
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
  return Requirements;
};
