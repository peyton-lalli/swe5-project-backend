const db = require("../models");
const Instruments = db.instruments;
const Op = db.Sequelize.Op;

//Functions for the pagination
const getPagination = (page, size) => {
  const limit = size ? +size : 25;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};
const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: Instruments } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, Instruments, totalPages, currentPage };
};

//Add an instrument to the database
exports.create = (req, res) => {
  const instruments = {
    name: req.body.name,
    type: req.body.type,
  };

  Instruments.create(instruments)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred, try again later!",
      });
    });
};

//Get a list of all of the instruments in the database
exports.findAll = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  Instruments.findAndCountAll({ limit, offset })
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

//Find an instrument based on the id
exports.findInstrumentById = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const id = req.params.id;
  Instruments.findAndCountAll({
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

//Find an instrument based on the name
exports.findName = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const name = req.params.name;
  Instruments.findAndCountAll({
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

//Find an instrument based on the type
exports.findType = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const type = req.params.type;
  Instruments.findAndCountAll({
    where: { type: type },
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

//Update instruments using the instruments id
exports.update = (req, res) => {
  const id = req.params.id;
  Instruments.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Instruments was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update instruments with id=${id}. Maybe instruments was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error",
      });
    });
};

//Delete instruments using the id
exports.delete = (req, res) => {
  const id = req.params.id;
  Instruments.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Instruments was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete instruments with id=${id}. Maybe instruments was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete",
      });
    });
};
