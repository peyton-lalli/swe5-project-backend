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
db.accompanists = require("./accompanists.model.js")(sequelize, Sequelize);
db.availability = require("./availability.model.js")(sequelize, Sequelize);
db.composers = require("./composers.model.js")(sequelize, Sequelize);
db.critiques = require("./critiques.model.js")(sequelize, Sequelize);
db.ensemble = require("./ensemble.model.js")(sequelize, Sequelize);
db.event = require("./event.model.js")(sequelize, Sequelize);
db.eventsignup = require("./eventsignup.model.js")(sequelize, Sequelize);
db.eventsongs = require("./eventsongs.model.js")(sequelize, Sequelize);
db.eventtime = require("./eventtime.model.js")(sequelize, Sequelize);
db.instructors = require("./instructors.model.js")(sequelize, Sequelize);
db.instruments = require("./instruments.model.js")(sequelize, Sequelize);
db.members = require("./members.model.js")(sequelize, Sequelize);
db.pieces = require("./pieces.model.js")(sequelize, Sequelize);
db.repertoire = require("./repertoire.model.js")(sequelize, Sequelize);
db.requirements = require("./requirements.model.js")(sequelize, Sequelize);
db.roles = require("./roles.model.js")(sequelize, Sequelize);
db.session = require("./session.model.js")(sequelize, Sequelize);
db.studentaccompanist = require("./studentaccompanist.model.js")(
  sequelize,
  Sequelize
);
db.studentinfo = require("./studentinfo.model.js")(sequelize, Sequelize);
db.studentinstructor = require("./studentinstructor.model.js")(
  sequelize,
  Sequelize
);
db.studentinstruments = require("./studentinstruments.model.js")(
  sequelize,
  Sequelize
);
db.userrole = require("./userrole.model.js")(sequelize, Sequelize);
db.users = require("./users.model.js")(sequelize, Sequelize);

// Add Foreign Keys
addForeignKeys(db);

module.exports = db;
