const db = require("../models");
const Critiques = db.critiques;
const Op = db.Sequelize.Op;

//Functions for the pagination
const getPagination = (page, size) => {
  const limit = size ? +size : 25;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};
const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: Critiques } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, Critiques, totalPages, currentPage };
};

//Add a critique to the database
exports.create = (req, res) => {
  const critiques = {
    critiquetext: req.body.critiquetext,
    instructorid: req.body.instructorid,
  };

  Critiques.create(critiques)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred, try again later!",
      });
    });
};

//Get a list of all of the critiques in the database
exports.findAll = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  Critiques.findAndCountAll({ limit, offset })
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

//Find a critiques based on the instructor id
exports.findInstructor = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const id = req.params.id;
  Critiques.findAndCountAll({
    where: { instructorid: id },
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

//Update critiques using the critique id
exports.update = (req, res) => {
  const id = req.params.id;
  Critiques.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Critiques was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update critiques with id=${id}. Maybe critiques was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error",
      });
    });
};

//Delete critiques using the id
exports.delete = (req, res) => {
  const id = req.params.id;
  Critiques.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Critiques was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete critiques with id=${id}. Maybe critiques was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete",
      });
    });
};
