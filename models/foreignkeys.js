function addForeignKeys(db) {
  const availability = db.availability;
  const composers = db.composers;
  const critiques = db.critiques;
  const ensemble = db.ensemble;
  const event = db.event;
  const eventsongs = db.eventsongs;
  const instructors = db.instructors;
  const instruments = db.instruments;
  const studentinstruments = db.studentinstruments;
  const members = db.members;
  const pieces = db.pieces;
  const repertoire = db.repertoire;
  const requirements = db.requirements;
  const session = db.session;
  const studentinfo = db.studentinfo;
  const users = db.users;

  availability.belongsTo(instructors);

  critiques.belongsTo(event);

  ensemble.belongsTo(instructors);

  event.belongsTo(ensemble);
  event.belongsTo(studentinfo);

  eventsongs.belongsTo(pieces);
  eventsongs.belongsTo(event);

  instructors.belongsTo(users);

  members.belongsTo(studentinfo);
  members.belongsTo(ensemble);

  pieces.belongsTo(composers);

  repertoire.belongsTo(pieces);
  repertoire.belongsTo(studentinfo);

  session.belongsTo(users);

  studentinfo.belongsTo(users);
  studentinfo.belongsTo(instructors);
  studentinfo.belongsTo(members);
  studentinfo.belongsTo(repertoire);
  studentinfo.belongsTo(requirements);

  studentinstruments.belongsTo(instruments);
  studentinstruments.belongsTo(studentinfo);
}

module.exports = { addForeignKeys };
