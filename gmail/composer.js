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
