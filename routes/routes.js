module.exports = (app) => {
  //A variable for each controller for the API to use
  const buildings = require("../controllers/buildings.controller.js");
  const courses = require("../controllers/courses.controller.js");
  const events = require("../controllers/events.controller.js");
  const faculty = require("../controllers/faculty.controller.js");
  const facultysection = require("../controllers/facultysection.controller.js");
  const favorites = require("../controllers/favorites.controller.js");
  const rooms = require("../controllers/rooms.controller.js");
  const sections = require("../controllers/sections.controller.js");
  const sectiontime = require("../controllers/sectiontime.controller.js");
  const semesters = require("../controllers/semesters.controller.js");
  const users = require("../controllers/users.controller.js");
  const auth = require("../controllers/auth.controller.js");
  const { authenticate } = require("../authorization/authorization.js");

  const fileImport = require("../controllers/filehandling.controller.js");
  const upload = require("../filehandling/fileUploader.js");

  var router = require("express").Router();

  /*
  The functions that can be done with the router/API
  router.post();
  router.put();
  router.get();
  router.delete();
  */

  // Login
  router.post("/login", auth.login);

  // Authorization
  router.post("/authorize/:id", auth.authorize);

  // Logout
  router.post("/logout", auth.logout);

  // File Import
  router.post(
    "/import/sections",
    upload.single("file"),
    fileImport.sectionFile
  );
  router.post("/import/courses", upload.single("file"), fileImport.courseFile);

  //Buildings
  router.post("/buildings", [authenticate], buildings.create);
  router.put("/buildings/:id", [authenticate], buildings.update);
  router.get("/buildings", [authenticate], buildings.findAll);
  router.get("/buildings/name/:name", [authenticate], buildings.findName);
  router.delete("/buildings:id", [authenticate], buildings.delete);

  //Courses
  router.post("/courses", [authenticate], courses.create);
  router.put("/courses/:id", [authenticate], courses.update);
  router.get("/courses", [authenticate], courses.findAll);
  router.get(
    "/courses/description/:description",
    [authenticate],
    courses.findDescription
  );
  router.get("/courses/hours/:hours", [authenticate], courses.findHours);
  router.get("/courses/level/:level", [authenticate], courses.findLevel);
  router.get("/courses/name/:name", [authenticate], courses.findName);
  router.get("/courses/number/:number", [authenticate], courses.findNumber);
  router.get(
    "/courses/semesteravailable/:semesteravailable",
    [authenticate],
    courses.findSemesterAvailable
  );
  router.get(
    "/courses/yearavailable/:yearavailable",
    [authenticate],
    courses.findYearAvailable
  );
  router.get(
    "/courses/searcheverything",
    [authenticate],
    courses.searchEverything
  );
  router.delete("/courses:id", [authenticate], courses.delete);

  //Events
  router.post("/events", [authenticate], events.create);
  router.put("/events/:id", [authenticate], events.update);
  router.get("/events", [authenticate], events.findAll);
  router.get("/events/name/:name", [authenticate], events.findName);
  router.get("/events/roomid/:roomid", [authenticate], events.findRoomID);
  router.get(
    "/events/semesterid/:semesterid",
    [authenticate],
    events.findSemesterID
  );
  router.get("/events/userid/:userid", [authenticate], events.findUserID);
  router.delete("/events:id", [authenticate], events.delete);

  //Faculty
  router.post("/faculty", [authenticate], faculty.create);
  router.put("/faculty/:id", [authenticate], faculty.update);
  router.get("/faculty", [authenticate], faculty.findAll);
  router.get("/faculty/name/:name", [authenticate], faculty.findName);
  router.delete("/faculty/:id", [authenticate], faculty.delete);

  //Faculty Section
  router.post("/facultysection", [authenticate], facultysection.create);
  router.put("/facultysection:id", [authenticate], facultysection.update);
  router.get("/facultysection", [authenticate], facultysection.findAll);
  router.get(
    "/facultysection/facultyid/:facultyid",
    [authenticate],
    facultysection.findFacultyID
  );
  router.get(
    "/facultysection/sectionid/:sectionid",
    [authenticate],
    facultysection.findSectionID
  );
  router.delete("/facultysection/:id", [authenticate], facultysection.delete);

  //Favorites
  router.post("/favorites", [authenticate], favorites.create);
  router.put("/favorites/:id", [authenticate], favorites.update);
  router.get("/favorites", [authenticate], favorites.findAll);
  router.get(
    "/favorites/courseid/:courseid",
    [authenticate],
    favorites.findCourseID
  );
  router.get("/favorites/userid/:userid", [authenticate], favorites.findUserID);
  router.delete("/favorites/:id", [authenticate], favorites.delete);

  //Rooms
  router.post("/rooms", [authenticate], rooms.create);
  router.put("/rooms/:id", [authenticate], rooms.update);
  router.get("/rooms", [authenticate], rooms.findAll);
  router.get(
    "/rooms/buildingid/:buildingid",
    [authenticate],
    rooms.findBuildingID
  );
  router.get("/rooms/capacity/:capacity", [authenticate], rooms.findCapacity);
  router.get("/rooms/number/:number", [authenticate], rooms.findNumber);
  router.delete("/rooms/:id", [authenticate], rooms.delete);

  //Sections
  router.post("/sections", [authenticate], sections.create);
  router.put("/sections/:id", [authenticate], sections.update);
  router.get("/sections", [authenticate], sections.findAll);
  router.get(
    "/sections/courseid/:courseid",
    [authenticate],
    sections.findCourseID
  );
  router.get(
    "/sections/semesterid/:semesterid",
    [authenticate],
    sections.findSemesterID
  );
  router.delete("/sections/:id", [authenticate], sections.delete);

  //Section Time
  router.post("/sectiontime", [authenticate], sectiontime.create);
  router.put("/sectiontime/:id", [authenticate], sectiontime.update);
  router.get("/sectiontime", [authenticate], sectiontime.findAll);
  router.get(
    "sectiontime/daysofweek/:daysofweek",
    [authenticate],
    sectiontime.findDaysOfWeek
  );
  router.get(
    "/sectiontime/enddate/:enddate",
    [authenticate],
    sectiontime.findEndDate
  );
  router.get(
    "/sectiontime/endtime/:endtime",
    [authenticate],
    sectiontime.findEndTime
  );
  router.get(
    "/sectiontime/roomid/:roomid",
    [authenticate],
    sectiontime.findRoomID
  );
  router.get(
    "/sectiontime/sectionid/:sectionid",
    [authenticate],
    sectiontime.findSectionID
  );
  router.get(
    "/sectiontime/startdate/:startdate",
    [authenticate],
    sectiontime.findStartDate
  );
  router.get(
    "/sectiontime/starttime/:starttime",
    [authenticate],
    sectiontime.findStartTime
  );
  router.delete("/sectiontime/:id", [authenticate], sectiontime.delete);

  //Semesters
  router.post("/semesters", [authenticate], semesters.create);
  router.put("/semesters/:id", [authenticate], semesters.update);
  router.get("/semesters", [authenticate], semesters.findAll);
  router.get("/semesters/code/:code", [authenticate], semesters.findCode);
  router.get(
    "/semesters/enddate/:enddate",
    [authenticate],
    semesters.findEndDate
  );
  router.get(
    "/semesters/startdate/:startdate",
    [authenticate],
    semesters.findStartDate
  );
  router.delete("/semesters/:id", [authenticate], semesters.delete);

  //Users
  router.post("/users", [authenticate], users.create);
  router.put("/users/:id", [authenticate], users.update);
  router.get("/users", [authenticate], users.findAll);
  router.get("/users/email/:email", [authenticate], users.findEmail);
  router.get(
    "/users/facultyid/:facultyid",
    [authenticate],
    users.findFacultyID
  );
  router.get("/users/role/:role", [authenticate], users.findRole);
  router.delete("/users/:id", [authenticate], users.delete);

  //The route that the API uses
  app.use("/schedule-t3", router);
};
