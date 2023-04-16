const db = require("../models");
const Students = db.students;
const Instructors = db.instructors;
const Users = db.users;
const Availability = db.availability;
const StudentInstructor = db.studentinstructor;

exports.getAllInstructorDataForUserId = async (userId) => {
  const ins = await Instructors.findAll({
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
    ],
  });
  return ins;
};
