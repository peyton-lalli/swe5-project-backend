const db = require("../models");
const Courses = db.courses;
const Op = db.Sequelize.Op;

//Functions for the pagination
const getPagination = (page, size) => {
  const limit = size ? +size : 25;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};
const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: Courses } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, Courses, totalPages, currentPage };
};

//Add a course to the database
exports.create = (req, res) => {
  if (!req.body.number) {
    res.status(400).send({
      message: "Number cannot be empty!",
    });
  }

  const courses = {
    number: req.body.number,
    name: req.body.name,
    description: req.body.description,
    hours: req.body.hours,
    level: req.body.level,
    yearAvailable: req.body.yearAvailable,
    semesterAvailable: req.body.semesterAvailable,
  };

  Courses.create(courses)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred, try again later!",
      });
    });
};

//Get a list of all of the courses in the database
exports.findAll = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  Courses.findAndCountAll({ limit, offset })
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

//Find course based on a specific number
exports.findNumber = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const number = req.params.number;
  Courses.findAndCountAll({
    where: { number: number },
    limit,
    offset,
  })
    .then((data) => {
      if (data) {
        const response = getPagingData(data, page, limit);
        res.send(response);
      } else {
        res.status(404).send({
          message: `Cannot find course with course number=${number}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Course with course number=" + number,
      });
    });
};

//Find a course based on the name
exports.findName = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const name = req.params.name;
  Courses.findAndCountAll({
    where: { name: name },
    limit,
    offset,
  })
    .then((data) => {
      if (data) {
        const response = getPagingData(data, page, limit);
        res.send(response);
      } else {
        res.status(404).send({
          message: `Cannot find course with course name=${name}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Course with course name=" + name,
      });
    });
};

//Find a course based on the description
exports.findDescription = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const description = req.params.description;
  Courses.findAndCountAll({
    where: { description: { [Op.substring]: description } },
    limit,
    offset,
  })
    .then((data) => {
      if (data) {
        const response = getPagingData(data, page, limit);
        res.send(response);
      } else {
        res.status(404).send({
          message: `Cannot find course with Descritpion=${description}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Course with Description=" + description,
      });
    });
};

//Find a course based on the hours
exports.findHours = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const hours = req.params.hours;
  Courses.findAndCountAll({
    where: { hours: hours },
    limit,
    offset,
  })
    .then((data) => {
      if (data) {
        const response = getPagingData(data, page, limit);
        res.send(response);
      } else {
        res.status(404).send({
          message: `Cannot find course with Hours=${hours}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Course with Hours=" + hours,
      });
    });
};

//Find a course based on the level
exports.findLevel = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const level = req.params.level;
  Courses.findAndCountAll({
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
          message: `Cannot find course with Level=${level}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Course with Level=" + level,
      });
    });
};

//Find a course based on the year it is avaiable
exports.findYearAvailable = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const yearAvailable = req.params.yearAvailable;
  Courses.findAndCountAll({
    where: { yearAvailable: yearAvailable },
    limit,
    offset,
  })
    .then((data) => {
      if (data) {
        const response = getPagingData(data, page, limit);
        res.send(response);
      } else {
        res.status(404).send({
          message: `Cannot find course with the Year=${yearAvailable}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Course with the Year=" + yearAvailable,
      });
    });
};

//Find a course based on the Semester available
exports.findSemesterAvailable = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const semesterAvailable = req.params.semesterAvailable;
  Courses.findAndCountAll({
    where: { semesterAvailable: semesterAvailable },
    limit,
    offset,
  })
    .then((data) => {
      if (data) {
        const response = getPagingData(data, page, limit);
        res.send(response);
      } else {
        res.status(404).send({
          message: `Cannot find course with the Semester=${semesterAvailable}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          "Error retrieving Course with the Semester=" + semesterAvailable,
      });
    });
};

//Searches the entire database for keywords
exports.searchEverything = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const search = req.params.search;
  Courses.findAndCountAll({
    distinct: true,
    where: {
      [Op.or]: [
        { number: { [Op.substring]: search } },
        { name: { [Op.substring]: search } },
        { description: { [Op.like]: search } },
        { hours: { [Op.substring]: search } },
        { level: { [Op.substring]: search } },
        { yearAvailable: { [Op.substring]: search } },
        { semesterAvailable: { [Op.substring]: search } },
      ],
    },
    limit,
    offset,
  })
    .then((data) => {
      if (data) {
        const response = getPagingData(data, page, limit);
        res.send(response);
      } else {
        res.status(404).send({
          message: `you stoopid`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "server stoopid",
      });
    });
};

//Update a course using the course id
exports.update = (req, res) => {
  const id = req.params.id;
  Courses.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Course was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Course with course id=${id}. Maybe Course was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Course with course id=" + id,
      });
    });
};

//Delete a course using the course number
exports.delete = (req, res) => {
  const number = req.params.number;
  Courses.destroy({
    where: { number: number },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Course was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Course with course number=${number}. Maybe Course was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Course with course number=" + number,
      });
    });
};
