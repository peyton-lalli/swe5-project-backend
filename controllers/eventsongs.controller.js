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
    piecesId: req.body.piecesId,
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
