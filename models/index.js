const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const { addForeignKeys } = require("./foreignkeys.js");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.DIALECT,
  operatorsAliases: false,
  pool: {
    max: dbConfig.POOL.max,
    min: dbConfig.POOL.min,
    acquire: dbConfig.POOL.acquire,
    idle: dbConfig.POOL.idle,
  },
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.buildings = require("./buildings.model.js")(sequelize, Sequelize);
db.courses = require("./courses.model.js")(sequelize, Sequelize);
db.events = require("./events.model.js")(sequelize, Sequelize);
db.faculty = require("./faculty.model.js")(sequelize, Sequelize);
db.facultysection = require("./facultysection.model.js")(sequelize, Sequelize);
db.favorites = require("./favorites.model.js")(sequelize, Sequelize);
db.rooms = require("./rooms.model.js")(sequelize, Sequelize);
db.sections = require("./sections.model.js")(sequelize, Sequelize);
db.sectiontime = require("./sectiontime.model.js")(sequelize, Sequelize);
db.semesters = require("./semesters.model.js")(sequelize, Sequelize);
db.session = require("./session.model.js")(sequelize, Sequelize);
db.users = require("./users.model.js")(sequelize, Sequelize);

// Add Foreign Keys
addForeignKeys(db);

module.exports = db;
