const { SqlError } = require("mariadb");

module.exports = (sequelize, Sequelize) => {
  const StudentInstructor = sequelize.define("studentinstructor", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
  });
  return StudentInstructor;
};
