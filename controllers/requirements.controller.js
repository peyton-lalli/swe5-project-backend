const db = require("../models");
const Requirements = db.requirements;
const Op = db.Sequelize.Op;

//Functions for the pagination
const getPagination = (page, size) => {
  const limit = size ? +size : 25;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};
const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: Requirements } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, Requirements, totalPages, currentPage };
};

//Add a requirement to the database
exports.create = (req, res) => {
  const requirements = {
    classification: req.body.classification,
    name: req.body.name,
    description: req.body.description,
  };

  Requirements.create(requirements)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred, try again later!",
      });
    });
};

//Get a list of all of the requirements in the database
exports.findAll = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  Requirements.findAndCountAll({ limit, offset })
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

//Find a requirement based on the name
exports.findName = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const name = req.params.name;
  Requirements.findAndCountAll({
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

//Find a requirement based on the classification
exports.findClassification = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const classification = req.params.classification;
  Requirements.findAndCountAll({
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

//Find a requirement based on the description
exports.findDescription = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const description = req.params.description;
  Requirements.findAndCountAll({
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

//Update requirements using the requirement id
exports.update = (req, res) => {
  const id = req.params.id;
  Requirements.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Requirements was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update requirements with id=${id}. Maybe requirements was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error",
      });
    });
};

//Delete requirement using the id
exports.delete = (req, res) => {
  const id = req.params.id;
  Requirements.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Requirements was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete requirements with id=${id}. Maybe requirements was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete",
      });
    });
};
