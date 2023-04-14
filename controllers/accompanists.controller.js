const db = require("../models");
const Accompanists = db.accompanists;
const Op = db.Sequelize.Op;

//Functions for the pagination
const getPagination = (page, size) => {
  const limit = size ? +size : 25;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};
const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: Accompanists } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, Accompanists, totalPages, currentPage };
};

//Add an accompanist to the database
exports.create = (req, res) => {
  const accompanists = { userId: req.body.userId };

  Accompanists.create(accompanists)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred, try again later!",
      });
    });
};

//Get a list of all the accompanists in the database
exports.findAll = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  Accompanists.findAndCountAll({ limit, offset })
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

//Find an accompanists based on the id
exports.findAccompanistsById = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const id = req.params.id;
  Accompanists.findAndCountAll({ where: { id: id }, limit, offset })
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
//Update an accompanists using the accompanists id
exports.update = (req, res) => {
  const id = req.params.id;
  Accompanists.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Accompanists was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update accompanists with id=${id}. Maybe accompanists was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error",
      });
    });
};

//Delete an accompanists using the id
exports.delete = (req, res) => {
  const id = req.params.id;
  Accompanists.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Accompanists was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete accompanists with id=${id}. Maybe accompanists was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete",
      });
    });
};
