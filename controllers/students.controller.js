const db = require("../models");
const Students = db.students;
const Op = db.Sequelize.Op;
const Student = require("../utils/students.js");

//Functions for the pagination
const getPagination = (page, size) => {
  const limit = size ? +size : 25;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};
const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: Students } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, Students, totalPages, currentPage };
};

//Add a student to the database
exports.create = (req, res) => {
  const students = {
    level: req.body.level,
    major: req.body.major,
    classification: req.body.classification,
    googleid: req.body.googleid,
    userId: req.body.userId,
    instructorId: req.body.instructorsId,
    memberId: req.body.memberId,
    repertoireId: req.body.repertoireId,
    requirementId: req.body.requirementId,
  };

  Students.create(students)
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
  Students.findAndCountAll({ limit, offset })
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

exports.findAllInfo = async (req, res) => {
  await Student.getAllStudentDataForUserId(req.params.id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Not Found` + data,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error" + err,
      });
    });
};

//Find a student based on the student id
exports.findStudentById = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const id = req.params.id;
  Students.findAndCountAll({
    where: { id: id },
    include: [
      { model: db.users, attributes: ["fName", "lName", "picture", "email"] },
    ],
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

//Find a student based on the student id
exports.getStudentRepertoiresByStudentId = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const id = req.params.id;
  Students.findAndCountAll({
    where: { id: id },
    attributes: ["id"],
    include: [
      {
        model: db.studentrepertoire,
        as: "repertoires",
        attributes: ["id", "repertoireId"],
        include: [
          {
            model: db.studentinstruments,
            attributes: ["id"],
            include: [
              { model: db.instruments, attributes: ["id", "name", "type"] },
            ],
          },
          {
            model: db.repertoire,
            as: "repertoire",
            include: [
              {
                model: db.pieces,
                attributes: ["id", "name", "composerId"],
                include: [{ model: db.composers, attributes: ["id", "name"] }],
              },
            ],
          },
        ],
      },
    ],
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
        message: err.message,
      });
    });
};

//Find a student based on the instructor id
exports.findInstructorId = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const instructorId = req.params.instructorId;
  Students.findAndCountAll({
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

//Find a student based on the user Id
exports.findUserId = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const userid = req.params.userid;
  Students.findAndCountAll({
    where: { userId: userid },
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

//Find a student based on the level
exports.findLevel = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const level = req.params.level;
  Students.findAndCountAll({
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
exports.findMajor = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const major = req.params.major;
  Students.findAndCountAll({
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
        message: err,
      });
    });
};

//Find a student based on the classification
exports.findClassification = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const classification = req.params.classification;
  Students.findAndCountAll({
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
        message: err,
      });
    });
};

//Find a student based on the googleid
exports.findGoogleId = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const googleid = req.params.googleid;
  Students.findAndCountAll({
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

//Update students using the id
exports.update = (req, res) => {
  const id = req.params.id;
  Students.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Students was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update students with id=${id}. Maybe students was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error",
      });
    });
};

//Delete students using the id
exports.delete = (req, res) => {
  const id = req.params.id;
  Students.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Students was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete students with id=${id}. Maybe students was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete",
      });
    });
};
