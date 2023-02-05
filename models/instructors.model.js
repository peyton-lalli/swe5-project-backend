const { SqlError } = require("mariadb");

module.exports = (sequelize, Sequelize) => {
  const Instructors = sequelize.define(
    "instructors",
    {
      googleid: {
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
  return Instructors;
};
