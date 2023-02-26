const { SqlError } = require("mariadb");

module.exports = (sequelize, Sequelize) => {
  const StudentInfo = sequelize.define(
    "studentinfo",
    {
      level: {
        type: Sequelize.INTEGER,
      },
      major: {
        type: Sequelize.STRING,
      },
      classification: {
        type: Sequelize.STRING,
      },
      googleid: {
        type: Sequelize.INTEGER,
      },
      semesters: {
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
  return StudentInfo;
};
