const db = require("../models");
const Pieces = db.pieces;
const Op = db.Sequelize.Op;

//Functions for the pagination
const getPagination = (page, size) => {
  const limit = size ? +size : 25;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};
const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: Pieces } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, Pieces, totalPages, currentPage };
};

//Add a piece to the database
exports.create = (req, res) => {
  const pieces = {
    name: req.body.name,
    lyrics: req.body.lyrics,
    translation: req.body.translation,
    language: req.body.language,
    composerId: req.body.composerId,
    repertoireId: req.body.repertoireId,
  };

  Pieces.create(pieces)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred, try again later!",
      });
    });
};

//Get a list of all of the piecess in the database
exports.findAll = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  Pieces.findAndCountAll({ limit, offset })
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
// Find a piece based on the pieceId
exports.findId = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const id = req.params.id;
  Pieces.findAndCountAll({
    where: { id: id },
    limit,
    offset,
  })
    .then((data) => {
      if (data) {
        const response = getPagingData(data, page, limit);
        res.send(response);
      } else {
        res.status(404).send({
          message: `Cannot find user with that name`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Something happend, try again!",
      });
    });
};

//Find a piece based on the name
exports.findName = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const name = req.params.name;
  Pieces.findAndCountAll({
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

//Find a piece based on the lyrics
exports.findLyrics = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const lyrics = req.params.lyrics;
  Pieces.findAndCountAll({
    where: { lyrics: { [Op.substring]: lyrics } },
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

//Find a piece based on the translation
exports.findTranslation = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const translation = req.params.translation;
  Pieces.findAndCountAll({
    where: { translation: { [Op.substring]: translation } },
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

//Find a piece based on the language
exports.findLanguage = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const language = req.params.language;
  Pieces.findAndCountAll({
    where: { langauge: language },
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

//Find a piece based on the repertoire id
exports.findRepertoireId = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const repertoireId = req.params.repertoireId;
  Pieces.findAndCountAll({
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

//Update pieces using the piece id
exports.update = (req, res) => {
  const id = req.params.id;
  Pieces.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Pieces was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update pieces with id=${id}. Maybe pieces was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error",
      });
    });
};

//Delete piece using the id
exports.delete = (req, res) => {
  const id = req.params.id;
  Pieces.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Pieces was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete pieces with id=${id}. Maybe pieces was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete",
      });
    });
};
