const db = require("../models");
const StudentRepertoire = db.studentrepertoire;
const Op = db.Sequelize.Op;

//Functions for the pagination
const getPagination = (page, size) => {
  const limit = size ? +size : 25;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};
const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: StudentRepertoire } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, StudentRepertoire, totalPages, currentPage };
};

//Add an studentrepertoire to the database
exports.create = (req, res) => {
  const studentrepertoire = {
    studentId: req.body.studentId,
    repertoireId: req.body.repertoireId,
  };

  StudentRepertoire.create(studentrepertoire)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred, try again later!",
      });
    });
};

//Get a list of all of the studentrepertoires in the database
exports.findAll = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  StudentRepertoire.findAndCountAll({ limit, offset })
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

//Find student repertoire based on student id
exports.findStudentRepertoireByStudent = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const studentId = req.params.studentId;
  StudentRepertoire.findAndCountAll({
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

// Find a student repertoire based on the repertoire id
exports.findStudentRepertoireByRepertoire = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const repertoireId = req.params.repertoireId;
  StudentRepertoire.findAndCountAll({
    where: { repertoireId: repertoireId },
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

//Update student repertoire using the id
exports.update = (req, res) => {
  const id = req.params.id;
  StudentRepertoire.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Student Repertoire was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update student repertoire with id=${id}. Maybe repertoire was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error",
      });
    });
};

//Delete studentrepertoire using the id
exports.delete = (req, res) => {
  const id = req.params.id;
  StudentRepertoire.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "StudentRepertoire was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete studentrepertoire with id=${id}. Maybe studentrepertoire was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete",
      });
    });
};
