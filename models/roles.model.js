const { SqlError } = require("mariadb");

module.exports = (sequelize, Sequelize) => {
  const Roles = sequelize.define(
    "roles",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      type: {
        type: Sequelize.STRING,
      },
    },
    { timestamps: false }
  );
  return Roles;
};
