const { SqlError } = require("mariadb");

module.exports = (sequelize, Sequelize) => {
  const Availability = sequelize.define(
    "availability",
    {
      datetimestart: {
        type: Sequelize.DATE,
      },
      datetimeend: {
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
  return Availability;
};
