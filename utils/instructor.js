const db = require("../models");
const Students = db.students;
const Instructors = db.instructors;
const Users = db.users;
const Availability = db.availability;
const StudentInstructor = db.studentinstructor;
const StudentInstruments = db.studentinstruments;

exports.getAllInstructorDataForUserId = async (userId) => {
  let ins = await Instructors.findAll({
    where: { userId: userId },
    attributes: [["id", "instructorId"], "title", "createdAt", "updatedAt"],
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
        model: StudentInstructor,
        attributes: [["id", "studentInstructorId"]],
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
          },
        },
      },
    ],
  });

  ins = ins[0].dataValues;

  let availabilities = ins.user.availabilities;
  delete ins.user;

  let students = [];

  for (let sI of ins.studentinstructors) {
    let student = {};
    student = {
      ...sI.dataValues.studentinstrument.student.dataValues,
      ...{ studentInstructorId: sI.dataValues.studentInstructorId },
    };
    students.push(student);
  }

  delete ins.studentinstructors;

  ins = {
    ...ins,
    ...{ availabilities: availabilities },
    ...{ students: students },
  };

  return ins;
};
