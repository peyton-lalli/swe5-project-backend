const { SqlError } = require("mariadb");

module.exports = (sequelize, Sequelize) => {
  const StudentInstruments = sequelize.define(
    "studentinstruments",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
    },
    { timestamps: false }
  );
  return StudentInstruments;
};
