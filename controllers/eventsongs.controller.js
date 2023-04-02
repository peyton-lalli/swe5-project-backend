const db = require("../models");
const EventSongs = db.eventsongs;
const Op = db.Sequelize.Op;

//Functions for the pagination
const getPagination = (page, size) => {
  const limit = size ? +size : 25;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};
const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: EventSongs } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, EventSongs, totalPages, currentPage };
};

//Add an eventsongs to the database
exports.create = (req, res) => {
  const eventsongs = {
    pieceId: req.body.pieceId,
    eventsignupId: req.body.eventsignupId,
  };

  EventSongs.create(eventsongs)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred, try again later!",
      });
    });
};

//Update event song using the event id
exports.update = (req, res) => {
  const id = req.params.id;
  EventSongs.update(req.body, {
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
        message: "Error" + err,
      });
    });
};

//Get a list of all of the eventsongss in the database
exports.findAll = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  EventSongs.findAndCountAll({ limit, offset })
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

//Find event songs for id based on the event signup id
exports.findEventSignupId = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const eventsignupId = req.params.eventsignupId;
  EventSongs.findAndCountAll({
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

//Delete eventsongs using the id
exports.delete = (req, res) => {
  const id = req.params.id;
  EventSongs.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "EventSongs was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete eventsongs with id=${id}. Maybe eventsongs was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete",
      });
    });
};
