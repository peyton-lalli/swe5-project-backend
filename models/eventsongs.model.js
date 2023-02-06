const { SqlError } = require("mariadb");

module.exports = (sequelize, Sequelize) => {
  const EventSongs = sequelize.define(
    "eventsongs",
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
  return EventSongs;
};
