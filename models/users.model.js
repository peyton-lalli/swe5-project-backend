const { SqlError } = require("mariadb");

module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define("users", {
    email: {
      type: Sequelize.STRING,
    },
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    fName: {
      type: Sequelize.STRING,
    },
    lName: {
      type: Sequelize.STRING,
    },
    picture: {
      type: Sequelize.STRING,
    },
  });
  return Users;
};
