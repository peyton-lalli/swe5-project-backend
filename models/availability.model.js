const { SqlError } = require("mariadb");

module.exports = (sequelize, Sequelize) => {
  const Availability = sequelize.define(
    "availability",
    {
      personid: {
        type: Sequelize.INTEGER,
      },
      datetimestart: {
        type: Sequelize.DATETIME,
      },
      datetimeend: {
        type: Sequelize.DATETIME,
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
  return Availability;
};
