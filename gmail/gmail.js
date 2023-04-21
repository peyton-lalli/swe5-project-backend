const fs = require("fs").promises;
const fileWriter = require("fs");
const path = require("path");
const process = require("process");
const { authenticate } = require("@google-cloud/local-auth");
const { google } = require("googleapis");
const content = process.env.GMAIL_CREDENTIALS;
const MailComposer = require("nodemailer/lib/mail-composer");
const gmailTokens = require("../utils/gmailtokens.js");

const SCOPES = ["https://www.googleapis.com/auth/gmail.send"];

/**
 * Reads previously authorized credentials from the databse
 * if they are there.
 * @return {Promise<OAuth2Client|null>}
 */
async function retrieveTokenIfExists(userId) {
  try {
    const retrievedToken = await gmailTokens.findTokenForUserId(userId);
    return google.auth.fromJSON(JSON.parse(JSON.stringify(retrievedToken[0])));
  } catch (err) {
    return null;
  }
}

/**
 * Serializes credentials to the database in order to
 * retrieve later for GoogleAUth.fromJSON.
 * @param {OAuth2Client} client
 * @param {Object} user
 * @return {Promise<void>}
 */
async function addTokenToDatabase(client, user) {
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const gmailtokens = {
    type: "authorized_user",
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
    userId: user.userId,
  };
  await gmailTokens.create(gmailtokens);
}

/**
 * Load or request or authorization to call APIs.
 * @param {Object} user
 */
async function authorize(user) {
  let client = await retrieveTokenIfExists(user.userId);
  if (client) {
    return client;
  }
  await fs.writeFile("credentials.json", content);
  const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json");
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await addTokenToDatabase(client, user);
  }
  fileWriter.rm("credentials.json");
  return client;
}

/**
 * Creates a base64 encoded email from the given options.
 * @param {Object} options
 */
async function createMail(options) {
  // const mailComposer = new MailComposer(options);
  const mail = new MailComposer(options).compile();
  mail.keepBcc = true;
  const message = await mail.build();
  return Buffer.from(message)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

/**
 * Sends an email using the given options.
 * @param {Object} options
 * @param {Object} user
 * @return {Promise<Object>}
 */
async function sendEmail(options, user) {
  const auth = await authorize(user);
  const gmail = google.gmail({ version: "v1", auth });
  const rawMessage = await createMail(options);
  const res = await gmail.users.messages.send({
    userId: "me",
    requestBody: {
      raw: rawMessage,
    },
  });
  return res;
}

module.exports = sendEmail;
