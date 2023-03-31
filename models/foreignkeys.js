function addForeignKeys(db) {
  const availability = db.availability;
  const composers = db.composers;
  const critiques = db.critiques;
  const ensemble = db.ensemble;
  const event = db.event;
  const eventsignup = db.eventsignup;
  const eventsongs = db.eventsongs;
  const eventtime = db.eventtime;
  const instructors = db.instructors;
  const instruments = db.instruments;
  const studentinstruments = db.studentinstruments;
  const members = db.members;
  const pieces = db.pieces;
  const repertoire = db.repertoire;
  const requirements = db.requirements;
  const roles = db.roles;
  const session = db.session;
  const studentinfo = db.studentinfo;
  const userrole = db.userrole;
  const users = db.users;

  availability.belongsTo(instructors);

  critiques.belongsTo(event);

  ensemble.belongsTo(instructors);

  eventsignup.belongsTo(event);
  eventsignup.belongsTo(studentinfo);
  eventsignup.belongsTo(ensemble);

  eventsongs.belongsTo(pieces);
  eventsongs.belongsTo(eventsignup);

  eventtime.belongsTo(event);

  instructors.belongsTo(users);

  members.belongsTo(studentinfo);
  members.belongsTo(ensemble);

  pieces.belongsTo(composers);
  pieces.belongsTo(repertoire);

  repertoire.belongsTo(studentinfo);

  session.belongsTo(users);

  studentinfo.belongsTo(users);
  studentinfo.belongsTo(instructors);
  studentinfo.belongsTo(members);
  studentinfo.belongsTo(repertoire);
  studentinfo.belongsTo(requirements);

  studentinstruments.belongsTo(instruments);
  studentinstruments.belongsTo(studentinfo);

  userrole.belongsTo(roles);
  userrole.belongsTo(users);

  users.belongsTo(userrole);
}

module.exports = { addForeignKeys };
