const sendEmail = require("./gmail.js");

exports.sendNotification = async (req, res) => {
  const options = {
    to: req.body.studentEmail,
    replyTo: req.body.instructorEmail,
    subject: "A Critique Has Been Added",
    text: "A critique has been added for a recent event you participated in. Please log in to view the critique. https://perform.eaglesoftwareteam.com/performance/t3/",
    html: `<p>A critique has been added for a recent event you participated in. Please log in to view the critique. <a href="https://perform.eaglesoftwareteam.com/performance/t3/">https://perform.eaglesoftwareteam.com/performance/t3/</a></p>`,
    textEncoding: "base64",
  };

  const user = { userId: req.body.userId };

  const response = (await sendEmail(options, user)).status;
  res.status(response).send();
};

exports.sendChangeRequest = async (req, res) => {
  const options = {
    to: req.body.changerEmail,
    replyTo: req.body.requesterEmail,
    subject: req.body.requesterName + " has Requested an Event Timeslot Change",
    text:
      req.body.requesterName +
      " is requesting a timeslot change for the following event: \n\n" +
      "Event Title: " +
      req.body.eventTitle +
      "\n" +
      "Event Date: " +
      req.body.date +
      "\n" +
      "Signup Timeslot: " +
      req.body.timeslot +
      "\n\nIf you wish to accept this request, please log in and make the change: https://perform.eaglesoftwareteam.com/performance/t3/",
    textEncoding: "base64",
  };

  const user = { userId: req.body.userId };

  const response = (await sendEmail(options, user)).status;

  res.status(response).send();
};

exports.sendMessage = async (req, res) => {
  const options = {
    bcc: req.body.studentEmailList,
    replyTo: req.body.instructorEmail,
    subject: req.body.subject,
    text: req.body.message,
    textEncoding: "base64",
  };

  const user = { userId: req.body.userId };

  const response = (await sendEmail(options, user)).status;
  res.status(response).send();
};
