const db = require("../models");
const GmailTokens = db.gmailtokens;
const Op = db.Sequelize.Op;

//Add a gmail token to the database
exports.create = async (tokenInfo) => {
  const gmailtokens = {
    type: tokenInfo.type,
    client_id: tokenInfo.client_id,
    client_secret: tokenInfo.client_secret,
    refresh_token: tokenInfo.refresh_token,
    userId: tokenInfo.userId,
  };
  await GmailTokens.create(gmailtokens);
};

//Get a gmail token by a user's id
exports.findTokenForUserId = async (userId) => {
  return await GmailTokens.findAll({
    where: { userId: userId },
    attributes: ["type", "client_id", "client_secret", "refresh_token"],
  });
};
