const { SqlError } = require("mariadb");

module.exports = (sequelize, Sequelize) => {
  const StudentRepertoire = sequelize.define("studentrepertoire", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
  });
  return StudentRepertoire;
};
