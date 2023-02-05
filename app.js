require("dotenv").config();
var express = require("express");
var path = require("path");
var cors = require("cors");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

var app = express();

var corsOptions = {
  origin: "*",
};

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const db = require("./models");
db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

require("./routes/schedule.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3013;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

app.post("/upload_files", upload.array("files"), uploadFiles);

function uploadFiles(req, res) {
  console.log(req.body);
  console.log(req.files);
  res.json({ message: "Successfully uploaded files" });
}

module.exports = app;
