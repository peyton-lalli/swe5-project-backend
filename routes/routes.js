module.exports = (app) => {
  // A variable for each controller for the API to use
  const accompanists = require("../controllers/accompanists.controller.js");
  const availability = require("../controllers/availability.controller.js");
  const composers = require("../controllers/composers.controller.js");
  const critiques = require("../controllers/critiques.controller.js");
  const ensemble = require("../controllers/ensemble.controller.js");
  const event = require("../controllers/event.controller.js");
  const eventsignup = require("../controllers/eventsignup.controller.js");
  const eventsignupjuror = require("../controllers/eventsignupjuror.controller.js");
  const eventsongs = require("../controllers/eventsongs.controller.js");
  const eventtime = require("../controllers/eventtime.controller.js");
  const instructors = require("../controllers/instructors.controller.js");
  const instruments = require("../controllers/instruments.controller.js");
  const studentaccompanist = require("../controllers/studentaccompanist.controller.js");
  const studentinstructor = require("../controllers/studentinstructor.controller.js");
  const studentinstruments = require("../controllers/studentinstruments.controller.js");
  const members = require("../controllers/members.controller.js");
  const pieces = require("../controllers/pieces.controller.js");
  const repertoire = require("../controllers/repertoire.controller.js");
  const requirements = require("../controllers/requirements.controller.js");
  const roles = require("../controllers/roles.controller.js");
  const auth = require("../controllers/auth.controller.js");
  const userrole = require("../controllers/userrole.controller.js");
  const users = require("../controllers/users.controller.js");
  const students = require("../controllers/students.controller.js");
  const studentrepertoire = require("../controllers/studentrepertoire.controller.js");
  const { authenticate } = require("../authorization/authorization.js");

  var router = require("express").Router();

  /*
  The functions that can be done with the router/API
  router.post();
  router.put();
  router.get();
  router.delete();
  */

  //Login
  router.post("/login", auth.login);

  // Authorization
  router.post("/authorize/:id", auth.authorize);

  // Logout
  router.post("/logout", auth.logout);

  //Accompanists
  router.post("/accompanists", [authenticate], accompanists.create);
  router.put("/accompanists/:id", [authenticate], accompanists.update);
  router.get("/accompanists", [authenticate], accompanists.findAll);
  router.get(
    "/accompanists/id/:id",
    [authenticate],
    accompanists.findAccompanistsById
  );
  router.delete("/accompanists/:id", [authenticate], accompanists.delete);

  // Availability
  router.post("/availability", [authenticate], availability.create);
  router.put("/availability/:id", [authenticate], availability.update);
  router.get("/availability", [authenticate], availability.findAll);
  router.get("/availability/id/:id", [authenticate], availability.findId);
  router.get(
    "/availability/instructorid/:instructorid",
    [authenticate],
    availability.findInstructorId
  );
  router.get(
    "/availability/startdate/:startdate",
    [authenticate],
    availability.findStartDate
  );
  router.get(
    "/availability/enddate/:enddate",
    [authenticate],
    availability.findEndDate
  );
  router.delete("/availability/:id", [authenticate], availability.delete);

  // Composers
  router.post("/composers", [authenticate], composers.create);
  router.put("/composers/:id", [authenticate], composers.update);
  router.get("/composers", [authenticate], composers.findAll);
  router.get("/composers/name/:name", [authenticate], composers.findName);
  router.get("/composers/id/:id", [authenticate], composers.findComposerId);
  router.get(
    "/composers/birthyear/:birthyear",
    [authenticate],
    composers.findBirthYear
  );
  router.get(
    "/composers/deathyear/:deathyear",
    [authenticate],
    composers.findDeathYear
  );
  router.delete("/composers/:id", [authenticate], composers.delete);

  // Critiques
  router.post("/critiques", [authenticate], critiques.create);
  router.put("/critiques/:id", [authenticate], critiques.update);
  router.get("/critiques", [authenticate], critiques.findAll);
  router.get(
    "/critiques/eventid/:eventsignupId",
    [authenticate],
    critiques.findCritiqueByEventId
  );
  router.delete("/critiques/:id", [authenticate], critiques.delete);

  // Ensemble
  router.post("/ensemble", [authenticate], ensemble.create);
  router.put("/ensemble/:id", [authenticate], ensemble.update);
  router.get("/ensemble", [authenticate], ensemble.findAll);
  router.get(
    "/ensemble/instructorid/:instructorid",
    [authenticate],
    ensemble.findInstructorId
  );
  router.get("/ensemble/name/:name", [authenticate], ensemble.findName);
  router.delete("/ensemble/:id", [authenticate], ensemble.delete);

  // Event
  router.post("/event", [authenticate], event.create);
  router.put("/event/:id", [authenticate], event.update);
  router.get("/event", [authenticate], event.findAll);
  router.get(
    "/event/allEventsWithInfo",
    [authenticate],
    event.findAllEventsWithInfo
  );
  router.get("event/id/:id", [authenticate], event.findId);
  router.get("/event/type/:type", [authenticate], event.findType);
  router.get("/event/date/:date", [authenticate], event.findDate);
  router.delete("/event/:id", [authenticate], event.delete);

  // Event Signup
  router.post("/eventsignup", [authenticate], eventsignup.create);
  router.put("/eventsignup/:id", [authenticate], eventsignup.update);
  router.get("/eventsignup", [authenticate], eventsignup.findAll);
  router.get(
    "/eventsignup/id/:id",
    [authenticate],
    eventsignup.findEventSignUpById
  );
  router.get(
    "/eventsignup/timeslot/:timeslot",
    [authenticate],
    eventsignup.findTimeSlot
  );
  router.get(
    "/eventsignup/eventid/:eventId",
    [authenticate],
    eventsignup.findEventId
  );
  router.get(
    "/eventsignup/ensembleid/:ensembleId",
    [authenticate],
    eventsignup.findEnsembleId
  );
  router.get(
    "/eventsignup/studentid/:studentId",
    [authenticate],
    eventsignup.findStudentId
  );
  router.delete("/eventsignup/:id", [authenticate], eventsignup.delete);

  // Event Signup Juror
  router.post("/eventsignupjuror", [authenticate], eventsignupjuror.create);
  router.put("/eventsignupjuror/:id", [authenticate], eventsignupjuror.update);
  router.get("/eventsignupjuror", [authenticate], eventsignupjuror.findAll);
  router.get(
    "/eventsignupjuror/eventsignupid/:eventsignupId",
    [authenticate],
    eventsignupjuror.findEventSignUpJurorsBySignUpId
  );
  router.get(
    "/eventsignupjuror/instructorid/:instructorId",
    [authenticate],
    eventsignupjuror.findEventSignUpJurorsByInstructorId
  );
  router.delete(
    "/eventsignupjuror/:id",
    [authenticate],
    eventsignupjuror.delete
  );

  // Event Songs
  router.post("/eventsongs", [authenticate], eventsongs.create);
  router.put("/eventsongs/:id", [authenticate], eventsongs.update);
  router.get("/eventsongs", [authenticate], eventsongs.findAll);
  router.get(
    "/eventsongs/eventsignupId/:eventsignupId",
    [authenticate],
    eventsongs.findEventSignupId
  );
  router.delete("/eventsongs/:id", [authenticate], eventsongs.delete);

  // Event Time
  router.post("/eventtime", [authenticate], eventtime.create);
  router.put("/eventtime/:id", [authenticate], eventtime.update);
  router.get("/eventtime", [authenticate], eventtime.findAll);
  router.get(
    "/eventtime/eventid/:eventId",
    [authenticate],
    eventtime.findEventId
  );
  router.get(
    "/eventtime/starttime/:starttime",
    [authenticate],
    eventtime.findStartTime
  );
  router.get(
    "/eventtime/endtime/:endtime",
    [authenticate],
    eventtime.findEndTime
  );
  router.get(
    "/eventtime/interval/:interval",
    [authenticate],
    eventtime.findInterval
  );
  router.delete("/eventtime/:id", [authenticate], eventtime.delete);

  // Instructors
  router.post("/instructors", [authenticate], instructors.create);
  router.put("/instructors/:id", [authenticate], instructors.update);
  router.get("/instructors", [authenticate], instructors.findAll);
  router.get(
    "/instructors/userid/:userid",
    [authenticate],
    instructors.findUserId
  );
  router.get(
    "/instructors/id/:id",
    [authenticate],
    instructors.findInstructorId
  );
  router.get(
    "/instructors/title/:title",
    [authenticate],
    instructors.findTitle
  );
  router.get(
    "/instructors/googleid/:googleid",
    [authenticate],
    instructors.findGoogleId
  );
  router.delete("/instructors/:id", [authenticate], instructors.delete);

  //Instruments
  router.post("/instruments", [authenticate], instruments.create);
  router.put("/instruments/:id", [authenticate], instruments.update);
  router.get("/instruments", [authenticate], instruments.findAll);
  router.get(
    "/instruments/id/:id",
    [authenticate],
    instruments.findInstrumentById
  );
  router.get("/instruments/type/:type", [authenticate], instruments.findType);
  router.get("/instruments/name/:name", [authenticate], instruments.findName);
  router.delete("/instruments/:id", [authenticate], instruments.delete);

  // Members
  router.post("/members", [authenticate], members.create);
  router.get("/members", [authenticate], members.findAll);
  router.get(
    "/members/ensembleid/:ensembleid",
    [authenticate],
    members.findEnsembleId
  );
  router.delete("/members/:id", [authenticate], members.delete);

  // Pieces
  router.post("/pieces", [authenticate], pieces.create);
  router.put("/pieces/:id", [authenticate], pieces.update);
  router.get("/pieces/id/:id", [authenticate], pieces.findId);
  router.get("/pieces", [authenticate], pieces.findAll);
  router.get("/pieces/name/:name", [authenticate], pieces.findName);
  router.get("/pieces/lyrics/:lyrics", [authenticate], pieces.findLyrics);
  router.get(
    "/pieces/translation/:translation",
    [authenticate],
    pieces.findTranslation
  );
  router.get("/pieces/language/:language", [authenticate], pieces.findLanguage);
  router.get(
    "/pieces/repertoireid/:repertoireId",
    [authenticate],
    pieces.findRepertoireId
  );
  router.delete("/pieces/:id", [authenticate], pieces.delete);

  // Repertoire
  router.post("/repertoire", [authenticate], repertoire.create);
  router.put("/repertoire/:id", [authenticate], repertoire.update);
  router.get("/repertoire", [authenticate], repertoire.findAll);
  router.get(
    "/repertoire/instrumentId/:instrumentId",
    [authenticate],
    repertoire.findRepertoireByInstrument
  );
  router.delete("/repertoire/:id", [authenticate], repertoire.delete);

  // Requirements
  router.post("/requirements", [authenticate], requirements.create);
  router.put("/requirements/:id", [authenticate], requirements.update);
  router.get("/requirements", [authenticate], requirements.findAll);
  router.get(
    "/requirements/classification/:classification",
    [authenticate],
    requirements.findClassification
  );
  router.get("/requirements/name/:name", [authenticate], requirements.findName);
  router.get(
    "/requirements/description/:description",
    [authenticate],
    requirements.findDescription
  );
  router.delete("/requirements/:id", [authenticate], requirements.delete);

  // Roles
  router.post("/roles", [authenticate], roles.create);
  router.put("/roles/:id", [authenticate], roles.update);
  router.get("/roles", [authenticate], roles.findAll);
  router.get("/roles/type/:type", [authenticate], roles.findType);
  router.delete("/roles/:id", [authenticate], roles.delete);

  // Students
  router.post("/students", [authenticate], students.create);
  router.put("/students/:id", [authenticate], students.update);
  router.get("/students", [authenticate], students.findAll);
  router.get(
    "/students/allRepertoires/:id",
    [authenticate],
    students.getStudentRepertoiresByStudentId
  );
  router.get("/students/allInfo/:id", [authenticate], students.findAllInfo);
  router.get("/students/id/:id", [authenticate], students.findStudentById);
  router.get(
    "/students/instructorid/:instructorId",
    [authenticate],
    students.findInstructorId
  );
  router.get("/students/userid/:userid", [authenticate], students.findUserId);
  router.get("/students/level/:level", [authenticate], students.findLevel);
  router.get("/students/major/:major", [authenticate], students.findMajor);
  router.get(
    "/students/classification/:classification",
    [authenticate],
    students.findClassification
  );
  router.get(
    "/students/googleid/:googleid",
    [authenticate],
    students.findGoogleId
  );
  router.delete("/students/:id", [authenticate], students.delete);

  //Student Accompanist
  router.post("/studentaccompanist", [authenticate], studentaccompanist.create);
  router.put(
    "/studentaccompanist/:id",
    [authenticate],
    studentaccompanist.update
  );
  router.get("/studentaccompanist", [authenticate], studentaccompanist.findAll);
  router.get(
    "/studentaccompanist/getStudents/:id",
    [authenticate],
    studentaccompanist.findAllStudentsforAccompanist
  );
  router.get(
    "/studentaccompanist/studentid/:studentId",
    [authenticate],
    studentaccompanist.findStudent
  );
  router.get(
    "/studentaccompanist/accompanistid/:accompanistid",
    [authenticate],
    studentaccompanist.findAccompanist
  );

  //Student Instructors
  router.post("/studentinstructors", [authenticate], studentinstructor.create);
  router.put(
    "/studentinstructors/:id",
    [authenticate],
    studentinstructor.update
  );
  router.get("/studentinstructors", [authenticate], studentinstructor.findAll);
  router.get(
    "/studentinstructors/getStudents/:instructorId",
    [authenticate],
    studentinstructor.findAllStudentsforInstructor
  );
  router.get(
    "/studentinstructors/studentId/:studentId",
    [authenticate],
    studentinstructor.findStudent
  );
  router.get(
    "/studentinstructors/instructorid/:instructorid",
    [authenticate],
    studentinstructor.findInstructor
  );
  router.delete(
    "/studentinstructors/:id",
    [authenticate],
    studentinstructor.delete
  );

  // Student Instruments
  router.post("/studentinstruments", [authenticate], studentinstruments.create);
  router.put(
    "/studentinstruments/:id",
    [authenticate],
    studentinstruments.update
  );
  router.get("/studentinstruments", [authenticate], studentinstruments.findAll);
  router.get(
    "/studentinstruments/id/:id",
    [authenticate],
    studentinstruments.findStudentInstrumentById
  );
  router.get(
    "/studentinstruments/studentId/:studentId",
    [authenticate],
    studentinstruments.findStudent
  );
  router.get(
    "/studentinstruments/instrumentid/:instrumentid",
    [authenticate],
    studentinstruments.findInstrument
  );
  router.delete(
    "/studentinstruments/:id",
    [authenticate],
    studentinstruments.delete
  );

  // Student Repertoire
  router.post("/studentrepertoire", [authenticate], studentrepertoire.create);
  router.put(
    "/studentrepertoire/:id",
    [authenticate],
    studentrepertoire.update
  );
  router.get("/studentrepertoire", [authenticate], studentrepertoire.findAll);
  router.get(
    "/studentrepertoire/studentId/:studentId",
    [authenticate],
    studentrepertoire.findStudentRepertoireByStudent
  );
  router.get(
    "/studentrepertoire/repertoireId/:repertoireId",
    [authenticate],
    studentrepertoire.findStudentRepertoireByRepertoire
  );
  router.delete(
    "/studentrepertoire/:id",
    [authenticate],
    studentrepertoire.delete
  );

  // User Roles
  router.post("/userrole", [authenticate], userrole.create);
  router.put("/userrole/:id", [authenticate], userrole.update);
  router.get("/userrole", [authenticate], userrole.findAll);
  router.get("/userrole/userId/:id", [authenticate], userrole.findUserRoles);
  router.delete("/userrole/:id", [authenticate], userrole.delete);

  //Users
  router.post("/users", [authenticate], users.create);
  router.put("/users/:id", [authenticate], users.update);
  router.get("/users", [authenticate], users.findAll);
  router.get("/users/id/:id", [authenticate], users.findId);
  router.get("/users/email/:email", [authenticate], users.findEmail);
  router.get("/users/first-name/:fName", [authenticate], users.findFName);
  router.get("/users/last-name/:lName", [authenticate], users.findLName);
  router.delete("/users/:id", [authenticate], users.delete);

  //The route that the API uses
  app.use("/performance-t3", router);
};
