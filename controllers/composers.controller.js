const db = require("../models");
const Composers = db.composers;
const Op = db.Sequelize.Op;

//Functions for the pagination
const getPagination = (page, size) => {
  const limit = size ? +size : 25;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};
const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: Composers } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, Composers, totalPages, currentPage };
};

//Add a composer to the database
exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Number cannot be empty!",
    });
  }

  const composers = {
    name: req.body.name,
    birthyear: req.body.birthyear,
    deathyear: req.body.deathyear,
  };

  Composers.create(composers)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred, try again later!",
      });
    });
};

//Get a list of all of the composers in the database
exports.findAll = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  Composers.findAndCountAll({ limit, offset })
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

//Find composers based on a specific name
exports.findName = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const name = req.params.name;
  Composers.findAndCountAll({
    where: { name: name },
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

//Find composers based on a specific composer id
exports.findComposerId = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const id = req.params.id;
  Composers.findAndCountAll({
    where: { id: id },
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

//Find a composers based on the birthyear
exports.findBirthYear = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const year = req.params.birthyear;
  Composers.findAndCountAll({
    where: { birthyear: year },
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

//Find a composers based on the deathyear
exports.findDeathYear = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const year = req.params.deathyear;
  Composers.findAndCountAll({
    where: { deathyear: year },
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

//Update composers using the composer id
exports.update = (req, res) => {
  const id = req.params.id;
  Composers.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Composers was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update composers with id=${id}. Maybe composers was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error",
      });
    });
};

//Delete composers using the id
exports.delete = (req, res) => {
  const id = req.params.id;
  Composers.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Composers was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete composers with id=${id}. Maybe composers was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete",
      });
    });
};
