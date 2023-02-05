const { SqlError } = require("mariadb");

module.exports = (sequelize, Sequelize) => {
  const Courses = sequelize.define(
    "courses",
    {
      number: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      hours: {
        type: Sequelize.INTEGER,
      },
      level: {
        type: Sequelize.INTEGER,
      },
      yearAvailable: {
        type: Sequelize.STRING,
      },
      semesterAvailable: {
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
  return Courses;
};
