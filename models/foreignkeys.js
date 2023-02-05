function addForeignKeys(db) {
  const availability = db.availability;
  const composers = db.composers;
  const critiques = db.critiques;
  const ensemble = db.ensemble;
  const event = db.event;
  const eventsongs = db.eventsongs;
  const instructors = db.instructors;
  const members = db.members;
  const pieces = db.pieces;
  const repertoire = db.repertoire;
  const requirements = db.requirements;
  const sessions = db.sessions;
  const studentinfo = db.studentinfo;
  const users = db.users;

  availability.belongsTo(instructors);

  composers.belongsTo(pieces);

  critiques.belongsTo(event);

  ensemble.belongsTo(members);
  ensemble.belongsTo(event);
  ensemble.belongsTo(instructors);

  event.belongsTo(eventsongs);
  event.belongsTo(critiques);
  event.belongsTo(ensemble);
  event.belongsTo(studentinfo);

  eventsongs.belongsTo(pieces);
  eventsongs.belongsTo(event);

  instructors.belongsTo(users);
  instructors.belongsTo(availability);
  instructors.belongsTo(ensemble);
  instructors.belongsTo(studentinfo);

  members.belongsTo(studentinfo);
  members.belongsTo(ensemble);

  pieces.belongsTo(composers);
  pieces.belongsTo(eventsongs);
  pieces.belongsTo(repertoire);

  repertoire.belongsTo(pieces);
  repertoire.belongsTo(studentinfo);

  requirements.belongsTo(studentinfo);

  sessions.belongsTo(users);

  studentinfo.belongsTo(users);
  studentinfo.belongsTo(instructors);
  studentinfo.belongsTo(members);
  studentinfo.belongsTo(repertoire);
  studentinfo.belongsTo(requirements);
  studentinfo.belongsTo(event);

  users.belongsTo(instructors);
  users.belongsTo(studentinfo);
  users.belongsTo(sessions);
}

module.exports = { addForeignKeys };
