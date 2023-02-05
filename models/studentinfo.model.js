const { SqlError } = require("mariadb");

module.exports = (sequelize, Sequelize) => {
  const StudentInfo = sequelize.define(
    "studentinfo",
    {
      instructorid: {
        type: Sequelize.INTEGER,
      },
      accompanistid: {
        type: Sequelize.INTEGER,
      },
      repertoireid: {
        type: Sequelize.INTEGER,
      },
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
      instrument: {
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
  return StudentInfo;
};
