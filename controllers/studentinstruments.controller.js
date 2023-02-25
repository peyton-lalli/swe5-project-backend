const db = require("../models");
const StudentInstruments = db.studentinstruments;
const Op = db.Sequelize.Op;

//Functions for the pagination
const getPagination = (page, size) => {
  const limit = size ? +size : 25;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};
const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: StudentInstruments } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, StudentInstruments, totalPages, currentPage };
};

//Add an instrument to the database
exports.create = (req, res) => {
  const studentinstruments = {
    studentinfoId: req.body.studentinfoId,
    instrumentId: req.body.instrumentId,
  };

  StudentInstruments.create(studentinstruments)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred, try again later!",
      });
    });
};

//Get a list of all of the studentinstruments in the database
exports.findAll = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  StudentInstruments.findAndCountAll({ limit, offset })
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

//Find a student instrument based on the student id
exports.findStudent = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const studentinfoid = req.params.studentinfoid;
  StudentInstruments.findAndCountAll({
    where: { studentinfoId: studentinfoid },
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

//Find a student instrument based on the instrument id
exports.findInstrument = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const instrumentid = req.params.instrumentid;
  StudentInstruments.findAndCountAll({
    where: { instrumentId: instrumentid },
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

//Update studentinstruments using the studentinstruments id
exports.update = (req, res) => {
  const id = req.params.id;
  StudentInstruments.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "StudentInstruments was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update studentinstruments with id=${id}. Maybe studentinstruments was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error",
      });
    });
};

//Delete studentinstruments using the id
exports.delete = (req, res) => {
  const id = req.params.id;
  StudentInstruments.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "StudentInstruments was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete studentinstruments with id=${id}. Maybe studentinstruments was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete",
      });
    });
};
