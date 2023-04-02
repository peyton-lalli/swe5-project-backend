module.exports = (app) => {
  // A variable for each controller for the API to use
  const availability = require("../controllers/availability.controller.js");
  const composers = require("../controllers/composers.controller.js");
  const critiques = require("../controllers/critiques.controller.js");
  const ensemble = require("../controllers/ensemble.controller.js");
  const event = require("../controllers/event.controller.js");
  const eventsignup = require("../controllers/eventsignup.controller.js");
  const eventsongs = require("../controllers/eventsongs.controller.js");
  const eventtime = require("../controllers/eventtime.controller.js");
  const instructors = require("../controllers/instructors.controller.js");
  const instruments = require("../controllers/instruments.controller.js");
  const studentinstruments = require("../controllers/studentinstruments.controller.js");
  const members = require("../controllers/members.controller.js");
  const pieces = require("../controllers/pieces.controller.js");
  const repertoire = require("../controllers/repertoire.controller.js");
  const requirements = require("../controllers/requirements.controller.js");
  const roles = require("../controllers/roles.controller.js");
  const auth = require("../controllers/auth.controller.js");
  const userrole = require("../controllers/userrole.controller.js");
  const users = require("../controllers/users.controller.js");
  const studentinfo = require("../controllers/studentinfo.controller.js");
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
    "/critiques/instructor/:instructor",
    [authenticate],
    critiques.findInstructor
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
  router.get("event/id/:id", [authenticate], event.findId);
  router.get("/event/type/:type", [authenticate], event.findType);
  router.get("/event/date/:date", [authenticate], event.findDate);
  router.delete("/event/:id", [authenticate], event.delete);

  // Event Signup
  router.post("/eventsignup", [authenticate], eventsignup.create);
  router.put("/eventsignup/:id", [authenticate], eventsignup.update);
  router.get("/eventsignup", [authenticate], eventsignup.findAll);
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
    "/eventsignup/studentinfoid/:studentinfoId",
    [authenticate],
    eventsignup.findStudentId
  );
  router.delete("/eventsignup/:id", [authenticate], eventsignup.delete);

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
  router.get("/repertoire", [authenticate], repertoire.findAll);
  router.get(
    "/repertoire/studentinfoid/:studentinfoid",
    [authenticate],
    repertoire.findStudentInfoId
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

  // StudentInfo
  router.post("/studentinfo", [authenticate], studentinfo.create);
  router.put("/studentinfo/:id", [authenticate], studentinfo.update);
  router.get("/studentinfo", [authenticate], studentinfo.findAll);
  router.get(
    "/studentinfo/instructorid/:instructorId",
    [authenticate],
    studentinfo.findInstructorId
  );
  router.get(
    "/studentinfo/userid/:userid",
    [authenticate],
    studentinfo.findUserId
  );
  router.get(
    "/studentinfo/level/:level",
    [authenticate],
    studentinfo.findLevel
  );
  router.get(
    "/studentinfo/major/:major",
    [authenticate],
    studentinfo.findMajor
  );
  router.get(
    "/studentinfo/classification/:classification",
    [authenticate],
    studentinfo.findClassification
  );
  router.get(
    "/studentinfo/googleid/:googleid",
    [authenticate],
    studentinfo.findGoogleId
  );
  router.delete("/studentinfo/:id", [authenticate], studentinfo.delete);

  // Student Instruments
  router.post("/studentinstruments", [authenticate], studentinstruments.create);
  router.put(
    "/studentinstruments/:id",
    [authenticate],
    studentinstruments.update
  );
  router.get("/studentinstruments", [authenticate], studentinstruments.findAll);
  router.get(
    "/studentinstruments/studentinfoid/:studentinfoid",
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

  // User Roles
  router.post("/userrole", [authenticate], userrole.create);
  router.put("/userrole/:id", [authenticate], userrole.update);
  router.get("/userrole", [authenticate], userrole.findAll);
  router.get("/userrole/user/:id", [authenticate], userrole.findUserRoles);
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
