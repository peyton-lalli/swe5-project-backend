const { SqlError } = require("mariadb");

module.exports = (sequelize, Sequelize) => {
  const Instructors = sequelize.define(
    "instructors",
    {
      googleid: {
        type: Sequelize.INTEGER,
      },
      title: {
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
  return Instructors;
};
