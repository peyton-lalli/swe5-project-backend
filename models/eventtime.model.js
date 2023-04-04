const { SqlError } = require("mariadb");

module.exports = (sequelize, Sequelize) => {
  const EventTime = sequelize.define("eventtime", {
    starttime: {
      type: Sequelize.TIME,
    },
    endtime: {
      type: Sequelize.TIME,
    },
    interval: {
      type: Sequelize.INTEGER,
    },
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
  });
  return EventTime;
};
