const { verify } = require("jsonwebtoken");
require("dotenv").config();

const isAuth = {
  Query: {
    me: async (resolve, parent, args, { req, res }, info) => {
      const authorization = req.headers["authorization"];

      if (!authorization) {
        res.status(400);
        throw new Error("not authenticated");
      }
      try {
        const token = authorization.split(" ")[1];
        const payload = verify(token, process.env.USER_ACCESS_TOKEN);
      } catch (err) {
        res.status(400);
        throw new Error("not authenticated");
      }

      return await resolve(parent, args, { req, res }, info);
    },
  },
};

module.exports = { isAuth };
