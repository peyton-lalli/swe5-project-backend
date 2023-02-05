const db = require("../models");
const Users = db.users;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
  const limit = size ? +size : 25;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};
const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: Users } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, Users, totalPages, currentPage };
};

//Add an event to the database
exports.create = (req, res) => {
  if (!req.body.facultyID) {
    res.status(400).send({
      message: "Faculty ID cannot be empty!",
    });
  }

  const users = {
    facultyID: req.body.facultyID,
    email: req.body.email,
    role: req.body.role,
  };

  Users.create(users)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred, try again later!",
      });
    });
};

//Get a list of all of the users in the database
exports.findAll = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  Users.findAndCountAll({ limit, offset })
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

//Find a user based on a specific facultyID
exports.findFacultyID = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const facultyID = req.params.facultyID;
  Users.findAndCountAll({
    where: { facultyID: facultyID },
    limit,
    offset,
  })
    .then((data) => {
      if (data) {
        const response = getPagingData(data, page, limit);
        res.send(response);
      } else {
        res.status(404).send({
          message: `Cannot find user with facultyID=${facultyID}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving user with facultyID=" + facultyID,
      });
    });
};

//Find a user based on a specific email
exports.findEmail = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const email = req.params.email;
  Users.findAndCountAll({
    where: { email: email },
    limit,
    offset,
  })
    .then((data) => {
      if (data) {
        const response = getPagingData(data, page, limit);
        res.send(response);
      } else {
        res.status(404).send({
          message: `Cannot find user with email=${email}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving user with email=" + email,
      });
    });
};

//Find a user based on a specific role
exports.findRole = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const role = req.params.role;
  Users.findAndCountAll({
    where: { role: role },
    limit,
    offset,
  })
    .then((data) => {
      if (data) {
        const response = getPagingData(data, page, limit);
        res.send(response);
      } else {
        res.status(404).send({
          message: `Cannot find user with role=${role}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving user with role=" + role,
      });
    });
};

//Update a user using the id
exports.update = (req, res) => {
  const id = req.params.id;
  Users.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update user with id=${id}. Maybe user was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating user with id=" + id,
      });
    });
};

//Delete a user using the id
exports.delete = (req, res) => {
  const id = req.params.id;
  Users.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete user with id=${id}. Maybe user was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete user with id=" + id,
      });
    });
};
