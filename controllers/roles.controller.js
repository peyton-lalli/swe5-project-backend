const db = require("../models");
const Roles = db.roles;
const Op = db.Sequelize.Op;

//Functions for the pagination
const getPagination = (page, size) => {
  const limit = size ? +size : 25;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};
const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: Roles } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, Roles, totalPages, currentPage };
};

//Add an roles to the database
exports.create = (req, res) => {
  const roles = {
    type: req.body.type,
  };

  Roles.create(roles)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred, try again later!",
      });
    });
};

//Get a list of all of the roless in the database
exports.findAll = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  Roles.findAndCountAll({ limit, offset })
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

//Find an roles based on the type
exports.findType = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const type = req.params.type;
  Roles.findAndCountAll({
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

//Update roles using the roles id
exports.update = (req, res) => {
  const id = req.params.id;
  Roles.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Roles was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update roles with id=${id}. Maybe roles was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error",
      });
    });
};

//Delete roles using the id
exports.delete = (req, res) => {
  const id = req.params.id;
  Roles.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Roles was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete roles with id=${id}. Maybe roles was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete",
      });
    });
};
