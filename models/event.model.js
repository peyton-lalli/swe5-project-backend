const { SqlError } = require("mariadb");

module.exports = (sequelize, Sequelize) => {
  const Event = sequelize.define(
    "event",
    {
      title: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.STRING,
      },
      datetime: {
        type: Sequelize.DATE,
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
  return Event;
};
