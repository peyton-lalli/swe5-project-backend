const db = require("../models");
const StudentInstructor = db.studentinstructor;
const Op = db.Sequelize.Op;

//Functions for the pagination
const getPagination = (page, size) => {
  const limit = size ? +size : 25;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};
const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: StudentInstructor } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, StudentInstructor, totalPages, currentPage };
};

//Add a student instructor to the database
exports.create = (req, res) => {
  const studentinstructor = {};

  StudentInstructor.create(studentinstructor)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred, try again later!",
      });
    });
};

//Get a list of all of the studentinstructors in the database
exports.findAll = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  StudentInstructor.findAndCountAll({ limit, offset })
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

//Find all instructors for a student
exports.findStudent = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const studentinfoId = req.params.studentinfoId;
  StudentInstructor.findAndCountAll({
    where: { studentinfoId: studentinfoId },
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

//Find a studentinstructor based on the instructor
exports.findInstructor = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const instructorId = req.params.instructorId;
  StudentInstructor.findAndCountAll({
    where: { instructorId: instructorId },
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

//Update studentinstructor using the studentinstructor id
exports.update = (req, res) => {
  const id = req.params.id;
  StudentInstructor.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "StudentInstructor was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update studentinstructor with id=${id}. Maybe studentinstructor was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error",
      });
    });
};

//Delete studentinstructor using the id
exports.delete = (req, res) => {
  const id = req.params.id;
  StudentInstructor.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "StudentInstructor was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete studentinstructor with id=${id}. Maybe studentinstructor was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete",
      });
    });
};
