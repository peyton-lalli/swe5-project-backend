function addForeignKeys(db) {
  const accompanists = db.accompanists;
  const availability = db.availability;
  const composers = db.composers;
  const critiques = db.critiques;
  const ensemble = db.ensemble;
  const event = db.event;
  const eventsignup = db.eventsignup;
  const eventsignupjuror = db.eventsignupjuror;
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
  const studentrepertoire = db.studentrepertoire;
  const userrole = db.userrole;
  const users = db.users;

  availability.belongsTo(users);
  availability.belongsTo(event);

  critiques.belongsTo(eventsignup);

  ensemble.belongsTo(instructors);

  composers.hasMany(pieces);

  instruments.hasMany(studentinstruments);

  eventsignup.belongsTo(event);
  eventsignup.belongsTo(students);
  eventsignup.belongsTo(ensemble);
  eventsignup.belongsTo(instructors);
  eventsignup.belongsTo(accompanists);
  eventsignup.hasMany(eventsongs, { as: "songs" });
  eventsignup.hasMany(eventsignupjuror, { as: "jurors" });

  eventsignupjuror.belongsTo(eventsignup);
  eventsignupjuror.belongsTo(instructors);

  eventsongs.belongsTo(pieces);
  eventsongs.belongsTo(eventsignup);

  eventtime.belongsTo(event);

  event.hasMany(eventsignup, { as: "signups" });
  event.hasMany(eventtime, { as: "times" });
  event.hasMany(availability);

  instructors.belongsTo(users);
  instructors.hasMany(eventsignupjuror);
  instructors.hasMany(studentinstructor);

  users.hasMany(instructors);
  users.hasMany(accompanists);
  users.hasMany(availability);

  accompanists.belongsTo(users);
  accompanists.hasMany(studentaccompanist);

  members.belongsTo(students);
  members.belongsTo(ensemble);

  pieces.belongsTo(composers);
  pieces.belongsTo(repertoire);
  pieces.hasMany(eventsongs);

  session.belongsTo(users);

  studentaccompanist.belongsTo(students);
  studentaccompanist.belongsTo(accompanists);
  studentaccompanist.belongsTo(studentinstruments);

  students.belongsTo(users);
  students.belongsTo(members);
  students.belongsTo(requirements);
  students.hasMany(studentinstructor, { as: "instructors" });
  students.hasMany(studentaccompanist, { as: "accompanists" });
  students.hasMany(studentrepertoire, { as: "repertoires" });
  students.hasMany(studentinstruments, { as: "instruments" });

  studentinstructor.belongsTo(studentinstruments);
  studentinstructor.belongsTo(students);
  studentinstructor.belongsTo(instructors);

  studentinstruments.belongsTo(instruments);
  studentinstruments.belongsTo(students);
  studentinstruments.hasMany(studentrepertoire);
  studentinstruments.hasMany(studentinstructor);
  studentinstruments.hasMany(studentaccompanist);

  studentrepertoire.belongsTo(students);
  studentrepertoire.belongsTo(repertoire);
  studentrepertoire.belongsTo(studentinstruments);

  repertoire.hasMany(pieces);
  repertoire.hasMany(studentrepertoire);

  userrole.belongsTo(roles);
  userrole.belongsTo(users);
}

module.exports = { addForeignKeys };
