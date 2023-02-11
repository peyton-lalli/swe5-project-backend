const db = require("../models");
const StudentInfo = db.studentinfo;
const Op = db.Sequelize.Op;

//Functions for the pagination
const getPagination = (page, size) => {
  const limit = size ? +size : 25;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};
const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: StudentInfo } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, StudentInfo, totalPages, currentPage };
};

//Add a student to the database
exports.create = (req, res) => {
  const studentinfo = {
    level: req.body.level,
    major: req.body.major,
    classification: req.body.classification,
    googleid: req.body.googleid,
    instrument: req.body.instrument,
  };

  StudentInfo.create(studentinfo)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred, try again later!",
      });
    });
};

//Get a list of all of the students in the database
exports.findAll = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  StudentInfo.findAndCountAll({ limit, offset })
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

//Find a student based on the level
exports.findLevel = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const level = req.params.level;
  StudentInfo.findAndCountAll({
    where: { level: level },
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

//Find a student based on the major
exports.findClassification = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const major = req.params.major;
  StudentInfo.findAndCountAll({
    where: { major: major },
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

//Find a student based on the classification
exports.findClassification = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const classification = req.params.classification;
  StudentInfo.findAndCountAll({
    where: { classification: classification },
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

//Find a student based on the googleid
exports.findGoogleId = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const googleid = req.params.googleid;
  StudentInfo.findAndCountAll({
    where: { googleid: googleid },
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

//Find a student based on the instrument
exports.findInstrument = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const instrument = req.params.instrument;
  StudentInfo.findAndCountAll({
    where: { instrument: instrument },
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

//Update studentinfo using the id
exports.update = (req, res) => {
  const id = req.params.id;
  StudentInfo.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "StudentInfo was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update studentinfo with id=${id}. Maybe studentinfo was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error",
      });
    });
};

//Delete studentinfo using the id
exports.delete = (req, res) => {
  const id = req.params.id;
  StudentInfo.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "StudentInfo was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete studentinfo with id=${id}. Maybe studentinfo was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete",
      });
    });
};
