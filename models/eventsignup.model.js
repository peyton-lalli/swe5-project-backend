const { SqlError } = require("mariadb");

module.exports = (sequelize, Sequelize) => {
  const EventSignUp = sequelize.define("eventsignup", {
    timeslot: {
      type: Sequelize.TIME,
    },
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
  });
  return EventSignUp;
};
