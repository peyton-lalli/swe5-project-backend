function addForeignKeys(db) {
  const accompanists = db.accompanists;
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
  const students = db.students;
  const studentaccompanist = db.studentaccompanist;
  const studentinstructor = db.studentinstructor;
  const userrole = db.userrole;
  const users = db.users;

  availability.belongsTo(instructors);

  critiques.belongsTo(eventsignup);

  ensemble.belongsTo(instructors);

  eventsignup.belongsTo(event);
  eventsignup.belongsTo(students);
  eventsignup.belongsTo(ensemble);
  eventsignup.belongsTo(instructors);
  eventsignup.belongsTo(accompanists);

  eventsongs.belongsTo(pieces);
  eventsongs.belongsTo(eventsignup);

  eventtime.belongsTo(event);

  instructors.belongsTo(users);
  users.hasMany(instructors);

  accompanists.belongsTo(users);
  users.hasMany(accompanists);

  members.belongsTo(students);
  members.belongsTo(ensemble);

  pieces.belongsTo(composers);
  pieces.belongsTo(repertoire);
  composers.hasMany(pieces);
  repertoire.hasMany(pieces);

  repertoire.belongsTo(students);

  session.belongsTo(users);

  studentaccompanist.belongsTo(students);
  studentaccompanist.belongsTo(accompanists);
  accompanists.hasMany(studentaccompanist);

  students.belongsTo(users);
  students.belongsTo(members);
  students.belongsTo(repertoire);
  students.belongsTo(requirements);

  students.hasMany(studentinstructor, { as: "instructors" });
  students.hasMany(studentaccompanist, { as: "accompanists" });
  students.hasMany(repertoire);

  studentinstructor.belongsTo(students);
  studentinstructor.belongsTo(instructors);
  instructors.hasMany(studentinstructor);

  studentinstruments.belongsTo(instruments);
  studentinstruments.belongsTo(students);

  userrole.belongsTo(roles);
  userrole.belongsTo(users);
}

module.exports = { addForeignKeys };
