const { SqlError } = require("mariadb");

module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define(
    "users",
    {
      /*facultyID: {
        type: Sequelize.INTEGER,
      },*/
      email: {
        type: Sequelize.STRING,
      },
      role: {
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
    },
    { timestamps: false }
  );
  return Users;
};
