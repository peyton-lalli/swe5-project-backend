const db = require("../models");
const Students = db.students;
const Repertoire = db.repertoire;
const Pieces = db.pieces;
const Composers = db.composers;
const Instructors = db.instructors;
const Users = db.users;
const Accompanists = db.accompanists;
const StudentInstructor = db.studentinstructor;
const StudentAccompanist = db.studentaccompanist;

exports.getAllStudentDataForUserId = async (userId) => {
  const stud = await Students.findAll({
    where: { userId: userId },
    attributes: [
      ["id", "studentId"],
      "level",
      "major",
      "classification",
      "semesters",
      "memberId",
      "requirementId",
      "createdAt",
      "updatedAt",
    ],
    include: [
      {
        model: StudentInstructor,
        as: "instructors",
        attributes: [["id", "studentinstructorId"]],
        include: {
          model: Instructors,
          attributes: [["id", "instructorId"], "title"],
          include: {
            model: Users,
            attributes: [
              ["id", "userId"],
              "email",
              "fName",
              "lName",
              "picture",
            ],
          },
        },
      },
      {
        model: StudentAccompanist,
        as: "accompanists",
        attributes: [["id", "studentaccompanistId"]],
        include: {
          model: Accompanists,
          attributes: [["id", "accompanistId"]],
          include: {
            model: Users,
            attributes: [
              ["id", "userId"],
              "email",
              "fName",
              "lName",
              "picture",
            ],
          },
        },
      },
      {
        model: Repertoire,
        attributes: [["id", "repertoireId"], "createdAt", "updatedAt"],
        include: {
          model: Pieces,
          attributes: [
            ["id", "pieceId"],
            "name",
            "lyrics",
            "translation",
            "language",
            "createdAt",
            "updatedAt",
          ],

          include: {
            model: Composers,
            attributes: [
              ["id", "composerId"],
              "name",
              "birthyear",
              "deathyear",
              "createdAt",
              "updatedAt",
            ],
          },
        },
      },
    ],
  });
  return stud;
};
