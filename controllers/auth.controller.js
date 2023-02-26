const db = require("../models");
const authconfig = require("../config/auth.config");
const User = db.users;
const Session = db.session;

const { google } = require("googleapis");

var jwt = require("jsonwebtoken");

let googleUser = {};

const google_id = process.env.CLIENT_ID;

exports.login = async (req, res) => {
  var googleToken = req.body.credential;

  const { OAuth2Client } = require("google-auth-library");
  const client = new OAuth2Client(google_id);
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: googleToken,
      audience: google_id,
    });
    googleUser = ticket.getPayload();
  }
  await verify().catch(console.error);

  let email = googleUser.email;
  let firstName = googleUser.given_name;
  let lastName = googleUser.family_name;
  let picture = googleUser.picture;
  //let role = User.role;

  let user = {};
  let session = {};

  await User.findOne({
    where: {
      email: email,
    },
  })
    .then((data) => {
      if (data != null) {
        user = data.dataValues;
      } else {
        // create a new User and save to database
        user = {
          fName: firstName,
          lName: lastName,
          email: email,
          picture: picture,
        };
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });

  // this lets us get the user id
  if (user.id === undefined) {
    console.log("need to get user's id");
    console.log(user);
    await User.create(user)
      .then((data) => {
        console.log("user was registered");
        user = data.dataValues;
        // res.send({ message: "User was registered successfully!" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ message: err.message });
      });
  } else {
    // doing this to ensure that the user's name is the one listed with Google
    user.fName = firstName;
    user.lName = lastName;
    console.log(user);
    await User.update(user, { where: { id: user.id } })
      .then((num) => {
        if (num == 1) {
          console.log("updated user's name");
        } else {
          console.log(
            `Cannot update User with id=${user.id}. Maybe User was not found or req.body is empty!`
          );
        }
      })
      .catch((err) => {
        console.log("Error updating User with id=" + user.id + " " + err);
      });
  }

  await Session.findOne({
    where: {
      email: email,
      token: googleToken,
    },
  })
    .then(async (data) => {
      if (data !== null) {
        session = data.dataValues;
        if (session.expirationDate < Date.now()) {
          session.token = "";
          // clear session's token if it's expired
          await Session.update(session, { where: { id: session.id } })
            .then((num) => {
              if (num == 1) {
                console.log("successfully logged out");
              } else {
                console.log("failed");
                res.send({
                  message: `Error logging out user.`,
                });
              }
            })
            .catch((err) => {
              console.log(err);
              res.status(500).send({
                message: "Error logging out user.",
              });
            });
          //reset session to be null since we need to make another one
          session = {};
        } else {
          // if the session is still valid, then send info to the front end
          let userInfo = {
            email: user.email,
            fName: user.fName,
            lName: user.lName,
            userId: user.id,
            token: session.token,
            role: user.role,
            picture: googleUser.picture,
            // refresh_token: user.refresh_token,
            // expiration_date: user.expiration_date
          };
          console.log("found a session, don't need to make another one");
          console.log(userInfo);
          res.send(userInfo);
        }
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving sessions.",
      });
    });

  if (session.id === undefined) {
    // create a new Session with an expiration date and save to database
    let token = jwt.sign({ id: email }, authconfig.secret, {
      expiresIn: 86400,
    });
    let tempExpirationDate = new Date();
    tempExpirationDate.setDate(tempExpirationDate.getDate() + 1);
    const session = {
      token: token,
      email: email,
      userId: user.id,
      expirationDate: tempExpirationDate,
    };

    console.log("making a new session");
    console.log(session);

    await Session.create(session)
      .then(() => {
        let userInfo = {
          email: user.email,
          fName: user.fName,
          lName: user.lName,
          userId: user.id,
          token: token,
          role: user.role,
          picture: googleUser.picture,
        };
        console.log(userInfo);
        res.send(userInfo);
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  }
};

exports.authorize = async (req, res) => {
  console.log("authorize client");
  const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    "postmessage"
  );

  console.log("authorize token");
  // Get access and refresh tokens (if access_type is offline)
  let { tokens } = await oauth2Client.getToken(req.body.code);
  oauth2Client.setCredentials(tokens);

  let user = {};
  console.log("findUser");

  await User.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
      if (data != null) {
        user = data.dataValues;
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
      return;
    });
  console.log("user");
  console.log(user);
  user.refresh_token = tokens.refresh_token;
  let tempExpirationDate = new Date();
  tempExpirationDate.setDate(tempExpirationDate.getDate() + 100);
  user.expiration_date = tempExpirationDate;

  await User.update(user, { where: { id: user.id } })
    .then((num) => {
      if (num == 1) {
        console.log("updated user's google token stuff");
      } else {
        console.log(
          `Cannot update User with id=${user.id}. Maybe User was not found or req.body is empty!`
        );
      }
      let userInfo = {
        refresh_token: user.refresh_token,
        expiration_date: user.expiration_date,
      };
      console.log(userInfo);
      res.send(userInfo);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });

  console.log(tokens);
  console.log(oauth2Client);
};

exports.logout = async (req, res) => {
  // invalidate session -- delete token out of session table
  let session = {};
  await Session.findAll({ where: { token: req.body.token } })
    .then((data) => {
      session = data[0].dataValues;
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving sessions.",
      });
      return;
    });

  session.token = "";

  Session.update(session, { where: { id: session.id } })
    .then((num) => {
      if (num == 1) {
        console.log("successfully logged out");
        res.send({
          message: "User has been successfully logged out!",
        });
      } else {
        console.log("failed");
        res.send({
          message: `Error logging out user.`,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Error logging out user.",
      });
    });
};
