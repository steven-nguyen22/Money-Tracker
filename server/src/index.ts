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

const PORT = 5000;
const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

//API endpoint for creating users
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

//connecting to mongodb cluster
mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log(`listening on port ${PORT}`);
  app.listen(5000);
});
