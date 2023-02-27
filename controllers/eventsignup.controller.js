const db = require("../models");
const EventSignUp = db.eventsignup;
const Op = db.Sequelize.Op;

//Functions for the pagination
const getPagination = (page, size) => {
  const limit = size ? +size : 25;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};
const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: EventSignUp } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, EventSignUp, totalPages, currentPage };
};

//Add an event sign up to the database
exports.create = (req, res) => {
  const eventsignup = {
    timeslot: req.body.timeslot,
    eventId: req.body.eventId,
    studentinfoId: req.body.studentinfoId,
  };

  EventSignUp.create(eventsignup)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred, try again later!",
      });
    });
};

//Get a list of all of the event sign up in the database
exports.findAll = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  EventSignUp.findAndCountAll({ limit, offset })
    .then((data) => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Something happend, try again!",
      });
    });
};

//Find an event sign up based on the time slot
exports.findTimeSlot = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const timeslot = req.params.timeslot;
  EventSignUp.findAndCountAll({
    where: { timeslot: timeslot },
    limit,
    offset,
  })
    .then((data) => {
      if (data) {
        const response = getPagingData(data, page, limit);
        res.send(response);
      } else {
        res.status(404).send({
          message: `Not Found`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error",
      });
    });
};

//Find an event sign up based on the event id
exports.findEventId = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const eventId = req.params.eventId;
  EventSignUp.findAndCountAll({
    where: { eventId: eventId },
    limit,
    offset,
  })
    .then((data) => {
      if (data) {
        const response = getPagingData(data, page, limit);
        res.send(response);
      } else {
        res.status(404).send({
          message: `Not Found`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error",
      });
    });
};

//Find an event sign up based on the student id
exports.findStudentId = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const studentinfoId = req.params.studentinfoId;
  EventSignUp.findAndCountAll({
    where: { studentinfoId: studentinfoId },
    limit,
    offset,
  })
    .then((data) => {
      if (data) {
        const response = getPagingData(data, page, limit);
        res.send(response);
      } else {
        res.status(404).send({
          message: `Not Found`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error",
      });
    });
};

//Update event sign up using the event id
exports.update = (req, res) => {
  const id = req.params.id;
  EventSignUp.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Event was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update event with id=${id}. Maybe event was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error",
      });
    });
};

//Delete event sign up using the id
exports.delete = (req, res) => {
  const id = req.params.id;
  EventSignUp.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Event was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete event with id=${id}. Maybe event was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete",
      });
    });
};
