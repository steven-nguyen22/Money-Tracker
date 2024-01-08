import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";

//encrypting mongodb link
import { config } from "dotenv";
config();

import User from "./models/User";

//encrypting passwords
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);

const cookieParser = require("cookie-parser");

const jwt = require("jsonwebtoken");
const secret = "asjsjddhffeheheiw2939";

const PORT = 5000;
const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(cookieParser());

//API endpoint for register users
app.post("/register", async (req: Request, res: Response) => {
  console.log(req.body);
  const newUser = new User({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, salt),
  });
  try {
    const createdUser = await newUser.save();
    res.json(createdUser);
  } catch (e) {
    res.status(400).json(e);
  }
});

//API endpoint for login users
app.post("/login", async (req: Request, res: Response) => {
  console.log(req.body);
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  const passOk = bcrypt.compareSync(password, userDoc?.password);
  if (passOk) {
    jwt.sign(
      { username, id: userDoc?._id },
      secret,
      {},
      (err: Error, token: Response) => {
        if (err) throw err;
        res.cookie("token", token).json({
          id: userDoc?._id,
          username,
        });
      }
    );
  } else {
    res.status(400).json("wrong credentials");
  }
});

//API endpoint for checking login
app.get("/profile", (req: Request, res: Response) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err: Error, info: Response) => {
    if (err) throw err;
    res.json(info);
  });
});

//API endpoint for logging out
app.post("/logout", (req: Request, res: Response) => {
  res.cookie("token", "").json("ok");
});

//connecting to mongodb cluster
mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log(`listening on port ${PORT}`);
  app.listen(5000);
});
