require("dotenv").config();
const { sign } = require("jsonwebtoken");

const createAccessToken = (User) => {
  return sign({ userId: User.id }, process.env.USER_ACCESS_TOKEN, {
    expiresIn: "15m",
  });
};
const createRefeshToken = (User) => {
  return sign(
    { userId: User.id, tokenVersion: User.tokenVersion },
    process.env.USER_REFRESH_TOKEN,
    {
      expiresIn: "7d",
    }
  );
};
const createAccessToken2 = (User) => {
  return sign({ userId: User.id }, process.env.ADMIN_ACCESS_TOKEN, {
    expiresIn: "15m",
  });
};
const createRefeshToken2 = (User) => {
  return sign(
    { userId: User.id, tokenVersion: User.tokenVersion },
    process.env.ADMIN_REFRESH_TOKEN,
    {
      expiresIn: "7d",
    }
  );
};
module.exports = {
  createAccessToken,
  createRefeshToken,
  createAccessToken2,
  createRefeshToken2,
};
