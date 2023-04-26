const db = require("../models");
const Students = db.students;
const Accompanists = db.accompanists;
const Users = db.users;
const Availability = db.availability;
const StudentAccompanist = db.studentaccompanist;
const StudentInstruments = db.studentinstruments;

exports.getAllAccompanistDataForUserId = async (userId) => {
  let acc = await Accompanists.findAll({
    where: { userId: userId },
    attributes: [["id", "accompanistId"], "createdAt", "updatedAt"],
    include: [
      {
        model: Users,
        attributes: [["id", "userId"]],
        include: {
          model: Availability,
          attributes: [
            ["id", "availabilityId"],
            "eventId",
            "starttime",
            "endtime",
          ],
        },
      },
      {
        model: StudentAccompanist,
        attributes: [["id", "studentAccompanistId"]],
        include: {
          model: StudentInstruments,
          attributes: [["id", "studentinstrumentId"]],
          include: {
            model: Students,
            attributes: [
              ["id", "studentId"],
              "level",
              "major",
              "classification",
              "semesters",
              "userId",
            ],
            include: {
              model: Users,
              attributes: [
                ["id", "userId"],
                "fName",
                "lName",
                "picture",
                "email",
              ],
            },
          },
        },
      },
    ],
  });

  acc = acc[0].dataValues;

  let availabilities = acc.user.availabilities;
  delete acc.user;

  let students = [];

  for (let sI of acc.studentaccompanists) {
    let student = {};
    student = {
      ...sI.dataValues.studentinstrument.student.dataValues,
      ...{ studentAccompanistId: sI.dataValues.studentAccompanistId },
    };
    students.push(student);
  }

  for (let [i, student] of students.entries()) {
    students[i] = {
      ...student,
      ...student.user.dataValues,
    };
    delete students[i].user;
  }

  delete acc.studentaccompanists;

  acc = {
    ...acc,
    ...{ availabilities: availabilities },
    ...{ students: students },
  };

  return acc;
};
