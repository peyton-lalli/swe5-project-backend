const { SqlError } = require("mariadb");

module.exports = (sequelize, Sequelize) => {
  const EventSignUpJuror = sequelize.define("eventsignupjuror", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
  });
  return EventSignUpJuror;
};
