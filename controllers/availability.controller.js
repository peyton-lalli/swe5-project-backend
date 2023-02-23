const db = require("../models");
const Availability = db.availability;
const Op = db.Sequelize.Op;

//Functions for the pagination
const getPagination = (page, size) => {
  const limit = size ? +size : 25;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};
const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: Availability } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, Availability, totalPages, currentPage };
};

//Add availability to the database
exports.create = (req, res) => {
  const availability = {
    datetimestart: req.body.datetimestart,
    datetimeend: req.body.datetimeend,
  };

  Availability.create(availability)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred, try again later!",
      });
    });
};

//Get a list of all availability in the database
exports.findAll = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  Availability.findAndCountAll({ limit, offset })
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

//Find availability based on a specific start date
exports.findStartDate = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const date = req.params.id;
  Availability.findAndCountAll({
    where: { datetimestart: date },
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

//Find a availability based on the end date
exports.findEndDate = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const date = req.params.id;
  Availability.findAndCountAll({
    where: { datetimeend: date },
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

//Update availability using the course id
exports.update = (req, res) => {
  const id = req.params.id;
  Availability.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Availability was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update availability with id=${id}. Maybe availability was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error",
      });
    });
};

//Delete availability using the id
exports.delete = (req, res) => {
  const id = req.params.id;
  Availability.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Availability was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete availability with id=${id}. Maybe availability was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete",
      });
    });
};
