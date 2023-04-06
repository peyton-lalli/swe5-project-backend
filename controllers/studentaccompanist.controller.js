const db = require("../models");
const StudentAccompanist = db.studentaccompanist;
const Op = db.Sequelize.Op;

//Functions for the pagination
const getPagination = (page, size) => {
  const limit = size ? +size : 25;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};
const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: StudentAccompanist } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, StudentAccompanist, totalPages, currentPage };
};

//Add a studentaccompanist to the database
exports.create = (req, res) => {
  const studentaccompanist = {};

  StudentAccompanist.create(studentaccompanist)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred, try again later!",
      });
    });
};

//Get a list of all of the studentaccompanists in the database
exports.findAll = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  StudentAccompanist.findAndCountAll({ limit, offset })
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

//Get all students for a specific accompanist
exports.findAllStudentsforAccompanist = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const accompanistId = req.params.accompanistId;
  StudentAccompanist.findAndCountAll({
    attributes: ["studentId"],
    where: { accompanistId: accompanistId },
    limit,
    offset,
  })
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

//Find all accompanists for a student
exports.findStudent = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const studentId = req.params.studentId;
  StudentAccompanist.findAndCountAll({
    where: { studentId: studentId },
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

//Find a studentaccompanist based on the accompanist
exports.findAccompanist = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const accompanistId = req.params.accompanistId;
  StudentAccompanist.findAndCountAll({
    where: { accompanistId: accompanistId },
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

//Update studentaccompanist using the studentaccompanist id
exports.update = (req, res) => {
  const id = req.params.id;
  StudentAccompanist.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "StudentAccompanist was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update studentaccompanist with id=${id}. Maybe studentaccompanist was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error",
      });
    });
};

//Delete studentaccompanist using the id
exports.delete = (req, res) => {
  const id = req.params.id;
  StudentAccompanist.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "StudentAccompanist was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete studentaccompanist with id=${id}. Maybe studentaccompanist was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete",
      });
    });
};
