function addForeignKeys(db) {
  const events = db.events;
  const facultysection = db.facultysection;
  const favorites = db.favorites;
  const sectiontime = db.sectiontime;
  const semesters = db.semesters;
  const users = db.users;
  const rooms = db.rooms;
  const faculty = db.faculty;
  const sections = db.sections;
  const courses = db.courses;
  const buildings = db.buildings;

  events.belongsTo(semesters);
  events.belongsTo(users);
  events.belongsTo(rooms);

  facultysection.belongsTo(faculty);
  facultysection.belongsTo(sections);

  favorites.belongsTo(users);
  favorites.belongsTo(courses);

  rooms.belongsTo(buildings);

  sections.belongsTo(courses);
  sections.belongsTo(semesters);

  sectiontime.belongsTo(sections);
  sectiontime.belongsTo(rooms);
}

module.exports = { addForeignKeys };
