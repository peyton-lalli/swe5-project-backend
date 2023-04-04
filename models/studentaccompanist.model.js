const { SqlError } = require("mariadb");

module.exports = (sequelize, Sequelize) => {
  const StudentAccompanist = sequelize.define("studentaccompanist", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
  });
  return StudentAccompanist;
};
