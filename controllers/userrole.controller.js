const db = require("../models");
const UserRoles = db.userroles;
const Op = db.Sequelize.Op;

//Functions for the pagination
const getPagination = (page, size) => {
  const limit = size ? +size : 25;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};
const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: UserRoles } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, UserRoles, totalPages, currentPage };
};

//Add an userroles to the database
exports.create = (req, res) => {
  const userroles = {
    roleId: req.body.roleId,
    userId: req.body.userId,
  };

  UserRoles.create(userroles)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred, try again later!",
      });
    });
};

//Get a list of all of the userroless in the database
exports.findAll = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  UserRoles.findAndCountAll({ limit, offset })
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

//Update userroles using the userroles id
exports.update = (req, res) => {
  const id = req.params.id;
  UserRoles.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "UserRoles was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update userroles with id=${id}. Maybe userroles was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error",
      });
    });
};

//Delete userroles using the id
exports.delete = (req, res) => {
  const id = req.params.id;
  UserRoles.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "UserRoles was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete userroles with id=${id}. Maybe userroles was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete",
      });
    });
};
