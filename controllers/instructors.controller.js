const db = require("../models");
const Instructors = db.instructors;
const Op = db.Sequelize.Op;

//Functions for the pagination
const getPagination = (page, size) => {
  const limit = size ? +size : 25;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};
const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: Instructors } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, Instructors, totalPages, currentPage };
};

//Add an instructors to the database
exports.create = (req, res) => {
  const instructors = {
    googleid: req.body.googleid,
    title: req.body.title,
  };

  Instructors.create(instructors)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred, try again later!",
      });
    });
};

//Get a list of all of the instructorss in the database
exports.findAll = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  Instructors.findAndCountAll({ limit, offset })
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

//Find an instructors based on the user ID
exports.findUserId = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const userId = req.params.userId;
  Instructors.findAndCountAll({
    where: { userId: userId },
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

//Find an instructors based on the title
exports.findTitle = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const title = req.params.title;
  Instructors.findAndCountAll({
    where: { title: title },
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

//Find an instructors based on the googleid
exports.findGoogleId = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const googleid = req.params.googleid;
  Instructors.findAndCountAll({
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

//Update instructors using the instructors id
exports.update = (req, res) => {
  const id = req.params.id;
  Instructors.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Instructors was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update instructors with id=${id}. Maybe instructors was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error",
      });
    });
};

//Delete instructors using the id
exports.delete = (req, res) => {
  const id = req.params.id;
  Instructors.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Instructors was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete instructors with id=${id}. Maybe instructors was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete",
      });
    });
};
