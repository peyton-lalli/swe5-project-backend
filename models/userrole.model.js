const { SqlError } = require("mariadb");

module.exports = (sequelize, Sequelize) => {
  const UserRole = sequelize.define("userrole", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
  });
  return UserRole;
};
