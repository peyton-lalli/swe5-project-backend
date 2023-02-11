module.exports = (app) => {
  // A variable for each controller for the API to use
  const availability = require("../controllers/availability.controller.js");
  const composers = require("../controllers/composers.controller.js");
  const critiques = require("../controllers/critiques.controller.js");
  const ensemble = require("../controllers/ensemble.controller.js");
  const event = require("../controllers/event.controller.js");
  const eventsongs = require("../controllers/eventsongs.controller.js");
  const instructors = require("../controllers/instructors.controller.js");
  const members = require("../controllers/members.controller.js");
  const pieces = require("../controllers/pieces.controller.js");
  const repertoire = require("../controllers/repertoire.controller.js");
  const requirements = require("../controllers/requirements.controller.js");
  const auth = require("../controllers/auth.controller.js");
  const users = require("../controllers/users.controller.js");
  const studentinfo = require("../controllers/studentinfo.controller.js");
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

  //Login
  router.post("/login", auth.login);

  // Authorization
  router.post("/authorize/:id", auth.authorize);

  // Logout
  router.post("/logout", auth.logout);

  //File Import
  router.post(
    "/import/sections",
    upload.single("file"),
    fileImport.sectionFile
  );
  router.post("/import/courses", upload.single("file"), fileImport.courseFile);

  // Availability
  router.post("/availability", [authenticate], availability.create);
  router.put("/availability/:id", [authenticate], availability.update);
  router.get("/availability", [authenticate], availability.findAll);
  router.get(
    "/availability/:startdate",
    [authenticate],
    availability.findStartDate
  );
  router.get(
    "/availability/:enddate",
    [authenticate],
    availability.findEndDate
  );
  router.delete("/availability/:id", [authenticate], availability.delete);

  // Composers
  router.post("/composers", [authenticate], composers.create);
  router.put("/composers/:id", [authenticate], composers.update);
  router.get("/composers", [authenticate], composers.findAll);
  router.get("/composers/:name", [authenticate], composers.findName);
  router.get("/composers/:birthyear", [authenticate], composers.findBirthYear);
  router.get("/composers/:deathyear", [authenticate], composers.findDeathYear);
  router.delete("/composers/:id", [authenticate], composers.delete);

  // Critiques
  router.post("/critiques", [authenticate], critiques.create);
  router.put("/critiques/:id", [authenticate], critiques.update);
  router.get("/critiques", [authenticate], critiques.findAll);
  router.get(
    "/critiques/:instructor",
    [authenticate],
    critiques.findInstructor
  );
  router.delete("/critiques/:id", [authenticate], critiques.delete);

  // Ensemble
  router.post("/ensemble", [authenticate], ensemble.create);
  router.put("/ensemble/:id", [authenticate], ensemble.update);
  router.get("/ensemble", [authenticate], ensemble.findAll);
  router.get("/ensemble/:name", [authenticate], ensemble.findName);
  router.delete("/ensemble/:id", [authenticate], ensemble.delete);

  // Event
  router.post("/event", [authenticate], event.create);
  router.put("/event/:id", [authenticate], event.update);
  router.get("/event", [authenticate], event.findAll);
  router.get("/event/:type", [authenticate], event.findType);
  router.get("/event/:date", [authenticate], event.findDate);
  router.delete("/event/:id", [authenticate], event.delete);

  // Event Songs
  router.post("/eventsongs", [authenticate], eventsongs.create);
  router.get("/eventsongs", [authenticate], eventsongs.findAll);
  router.delete("/eventsongs/:id", [authenticate], eventsongs.delete);

  // Instructors
  router.post("/instructors", [authenticate], instructors.create);
  router.put("/instructors/:id", [authenticate], instructors.update);
  router.get("/instructors", [authenticate], instructors.findAll);
  router.get(
    "/instructors/:googleid",
    [authenticate],
    instructors.findGoogleId
  );
  router.delete("/instructors/:id", [authenticate], instructors.delete);

  // Members
  router.post("/members", [authenticate], members.create);
  router.get("/members", [authenticate], members.findAll);
  router.delete("/members/:id", [authenticate], members.delete);

  // Pieces
  router.post("/pieces", [authenticate], pieces.create);
  router.put("/pieces/:id", [authenticate], pieces.update);
  router.get("/pieces", [authenticate], pieces.findAll);
  router.get("/pieces/:name", [authenticate], pieces.findName);
  router.get("/pieces/:lyrics", [authenticate], pieces.findLyrics);
  router.get("/pieces/:translation", [authenticate], pieces.findTranslation);
  router.get("/pieces/:language", [authenticate], pieces.findLanguage);
  router.delete("/pieces/:id", [authenticate], pieces.delete);

  // Repertoire
  router.post("/repertoire", [authenticate], repertoire.create);
  router.get("/repertoire", [authenticate], repertoire.findAll);
  router.delete("/repertoire/:id", [authenticate], repertoire.delete);

  // Requirements
  router.post("/requirements", [authenticate], requirements.create);
  router.put("/requirements/:id", [authenticate], requirements.update);
  router.get("/requirements", [authenticate], requirements.findAll);
  router.get(
    "/requirements/:classification",
    [authenticate],
    requirements.findClassification
  );
  router.get("/requirements/:name", [authenticate], requirements.findName);
  router.get(
    "/requirements/:description",
    [authenticate],
    requirements.findDescription
  );
  router.delete("/requirements/:id", [authenticate], requirements.delete);

  //Users
  router.post("/users", [authenticate], users.create);
  router.put("/users/:id", [authenticate], users.update);
  router.get("/users", [authenticate], users.findAll);
  router.get("/users/email/:email", [authenticate], users.findEmail);
  router.get("/users/facultyid/:role", [authenticate], users.findRole);
  router.get("/users/role/:fName", [authenticate], users.findFName);
  router.get("/users/role/:lName", [authenticate], users.findLName);
  router.delete("/users/:id", [authenticate], users.delete);

  //The route that the API uses
  app.use("/performance-t3", router);
};
