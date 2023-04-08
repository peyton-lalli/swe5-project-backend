const db = require("../models");
const EventSignUpJuror = db.eventsignupjuror;
const Op = db.Sequelize.Op;

//Functions for the pagination
const getPagination = (page, size) => {
  const limit = size ? +size : 25;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};
const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: EventSignUpJuror } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, EventSignUpJuror, totalPages, currentPage };
};

//Add an event sign up to the database
exports.create = (req, res) => {
  const eventsignupjuror = {
    instructorId: req.body.instructorId,
    eventsignupId: req.body.eventsignupId,
  };

  EventSignUpJuror.create(eventsignupjuror)
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
  EventSignUpJuror.findAndCountAll({ limit, offset })
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

//Find an event sign up jurors based on the event sign up id
exports.findEventSignUpJurorsBySignUpId = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const eventsignupId = req.params.eventsignupId;
  EventSignUpJuror.findAndCountAll({
    attributes: ["instructorId"],
    where: { eventsignupId: eventsignupId },
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

//Find all event sign up jurors that an instructor was a part of based on the intructorId
exports.findEventSignUpJurorsByInstructorId = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const intructorId = req.params.intructorId;
  EventSignUpJuror.findAndCountAll({
    where: { intructorId: intructorId },
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
  EventSignUpJuror.update(req.body, {
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
  EventSignUpJuror.destroy({
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
