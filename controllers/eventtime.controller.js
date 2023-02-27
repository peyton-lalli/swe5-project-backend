const db = require("../models");
const EventTime = db.eventtime;
const Op = db.Sequelize.Op;

//Functions for the pagination
const getPagination = (page, size) => {
  const limit = size ? +size : 25;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};
const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: EventTime } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, EventTime, totalPages, currentPage };
};

//Add an event sign up to the database
exports.create = (req, res) => {
  const eventtime = {
    starttime: req.body.starttime,
    endtime: req.body.endtime,
    interval: req.body.interval,
    eventId: req.body.eventId,
  };

  EventTime.create(eventtime)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred, try again later!",
      });
    });
};

//Get a list of all of the event times in the database
exports.findAll = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  EventTime.findAndCountAll({ limit, offset })
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

//Find an event time based on the start time
exports.findStartTime = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const starttime = req.params.starttime;
  EventTime.findAndCountAll({
    where: { starttime: starttime },
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

//Find an event time based on the event end time
exports.findEndTime = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const endtime = req.params.endtime;
  EventTime.findAndCountAll({
    where: { endtime: endtime },
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

//Find an event time based on the interval
exports.findInterval = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const interval = req.params.interval;
  EventTime.findAndCountAll({
    where: { interval: interval },
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

//Find an event time based on the event id
exports.findEventId = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const eventId = req.params.eventId;
  EventTime.findAndCountAll({
    where: { eventId: eventId },
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

//Update event time using the event time id
exports.update = (req, res) => {
  const id = req.params.id;
  EventTime.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Event was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update event with id=${id}. Maybe event was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error",
      });
    });
};

//Delete event time using the event time id
exports.delete = (req, res) => {
  const id = req.params.id;
  EventTime.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Event was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete event with id=${id}. Maybe event was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete",
      });
    });
};
