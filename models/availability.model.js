const { SqlError } = require("mariadb");

module.exports = (sequelize, Sequelize) => {
  const Availability = sequelize.define("availability", {
    starttime: {
      type: Sequelize.TIME,
    },
    endtime: {
      type: Sequelize.TIME,
    },
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
  });
  return Availability;
};
