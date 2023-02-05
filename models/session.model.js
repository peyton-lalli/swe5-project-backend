const { SqlError } = require("mariadb");

module.exports = (sequelize, Sequelize) => {
  const Session = sequelize.define(
    "session",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      token: {
        type: Sequelize.STRING(3000),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      expirationDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
  return Session;
};
