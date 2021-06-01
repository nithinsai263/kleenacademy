const express = require("express");
const mongoose = require("mongoose");
const { ApolloServer, gql } = require("apollo-server-express");
const cookieParser = require("cookie-parser");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { applyMiddleware } = require("graphql-middleware");
const { verify } = require("jsonwebtoken");
const { Users } = require("./schema");
require("dotenv").config();

const {
  createAccessToken,
  createRefeshToken,
  createAccessToken2,
  createRefeshToken2,
} = require("./auth");
const { sendRefreshToken } = require("./sendRefreshToken");
const { isAuth } = require("./isAuth");
const { typeDefs } = require("./typeDefs");
const { resolvers } = require("./resolvers");
const cors = require("cors");
const { setCurrUser } = require("./currUser");
const path = require("path");
const shortid = require("shortid");
const Razorpay = require("razorpay");

(async () => {
  const app = express();

  //cors
  app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

  app.use(cookieParser());
  //refreshtoken
  app.post("/refresh_token", async (req, res) => {
    const token = req.cookies.jid;
    if (!token) {
      return res.send({ ok: false, accessToken: "" });
    }
    let payload = null;
    try {
      payload = verify(token, process.env.USER_REFRESH_TOKEN);
    } catch (err) {
      try {
        payload = verify(token, process.env.ADMIN_REFRESH_TOKEN);
        const User = await Users.findById(payload.userId);
        if (!User) return res.send({ ok: false, accessToken: "" });

        if (User.tokenVersion !== payload.tokenVersion)
          return res.send({ ok: false, accessToken: "" });
        sendRefreshToken2(res, createRefeshToken(User));
        return res.send({ ok: true, accessToken: createAccessToken2(User) });
      } catch (e) {
        return res.send({ ok: false, accessToken: "" });
      }
      return res.send({ ok: false, accessToken: "" });
    }
    //token is valid
    //we can send back the accessToken
    const User = await Users.findById(payload.userId);
    setCurrUser(payload.userId);

    if (!User) {
      return res.send({ ok: false, accessToken: "" });
    }
    if (User.tokenVersion !== payload.tokenVersion) {
      return res.send({ ok: false, accessToken: "" });
    }
    sendRefreshToken(res, createRefeshToken(User));
    return res.send({ ok: true, accessToken: createAccessToken(User) });
  });

  //Razorpay
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  app.get("/logo.svg", (req, res) => {
    res.sendFile(path.join(__dirname, "logo.png"));
  });

  app.post("/verification", (req, res) => {
    // do a validation
    const secret = "12345678";

    console.log(req.body);

    const crypto = require("crypto");

    const shasum = crypto.createHmac("sha256", secret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    console.log(digest, req.headers["x-razorpay-signature"]);

    if (digest === req.headers["x-razorpay-signature"]) {
      console.log("request is legit");
      // process it
      require("fs").writeFileSync(
        "payment1.json",
        JSON.stringify(req.body, null, 4)
      );
    } else {
      // pass it
    }
    res.json({ status: "ok" });
  });

  app.post("/razorpay", async (req, res) => {
    const payment_capture = 1;
    const amount = 499;
    const currency = "INR";

    const options = {
      amount: amount * 100,
      currency,
      receipt: shortid.generate(),
      payment_capture,
    };

    try {
      const response = await razorpay.orders.create(options);
      console.log(response);
      res.json({
        id: response.id,
        currency: response.currency,
        amount: response.amount,
      });
    } catch (error) {
      console.log(error);
    }
  });

  //middleware
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const middleware = [isAuth];
  const schemaWithMiddleware = applyMiddleware(schema, ...middleware);
  const apolloServer = new ApolloServer({
    schema: schemaWithMiddleware,
    context: ({ req, res }) => ({ req, res }),
  });

  //express as middleware
  apolloServer.applyMiddleware({ app, cors: false });

  await mongoose
    .connect("mongodb://localhost/academy")
    .then(() => console.log("Connected to MongoDB..."))
    .catch((err) => console.error("Could not connect to mongodb", err));

  app.listen(4000, () => {
    console.log("express server started on 4000");
  });
})();

