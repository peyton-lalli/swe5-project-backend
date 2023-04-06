const db = require("../models");
const Event = db.event;
const EventTime = db.eventtime;
const EventSignup = db.eventsignup;
const EventSongs = db.eventsongs;
const Pieces = db.pieces;
const Composers = db.composers;

exports.getAllEvents = async () => {
  const events = await Event.findAll({
    attributes: [
      ["id", "eventId"],
      "date",
      ["createdAt", "eventCreatedAt"],
      ["updatedAt", "eventUpdatedAt"],
    ],
    include: [
      {
        model: EventTime,
        as: "times",
        attributes: [["id", "eventtimeId"], "starttime", "endtime", "interval"],
      },
      {
        model: EventSignup,
        as: "signups",
        attributes: [
          ["id", "signupId"],
          "accompanistId",
          "instructorId",
          "ensembleId",
          "studentId",
          "timeslot",
          ["createdAt", "eventSignupCreatedAt"],
          ["updatedAt", "eventSignupUpdatedAt"],
        ],
        include: {
          model: EventSongs,
          as: "songs",
          attributes: [
            ["id", "eventsongId"],
            ["createdAt", "eventSongCreatedAt"],
            ["updatedAt", "eventSongUpdatedAt"],
          ],
          include: {
            model: Pieces,
            attributes: [
              ["id", "pieceId"],
              "name",
              "lyrics",
              "translation",
              "language",
              ["createdAt", "pieceCreatedAt"],
              ["updatedAt", "pieceUpdatedAt"],
            ],
            include: {
              model: Composers,
              attributes: [
                ["id", "composerId"],
                "name",
                "birthyear",
                "deathyear",
                ["createdAt", "composerCreatedAt"],
                ["updatedAt", "composerUpdatedAt"],
              ],
            },
          },
        },
      },
    ],
  });

  return events;
};
