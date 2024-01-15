import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";

//encrypting mongodb link
import { config } from "dotenv";
config();

import User from "./models/User";
import Item from "./models/Item";

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

//API endpoint for posting items
app.post("/postItem", async (req: Request, res: Response) => {
  console.log(req.body);

  const { token } = req.cookies;

  var decoded = jwt.verify(token, secret);

  console.log(decoded.id);

  jwt.verify(token, secret, {}, async (err: Error, info: Response) => {
    if (err) throw err;
    console.log(info);

    const newItem = new Item({
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      author: decoded.id,
      authorName: decoded.username,
      date: req.body.date,
    });
    try {
      const createdItem = await newItem.save();
      res.json(createdItem);
    } catch (e) {
      res.status(400).json(e);
    }
  });
});

//API endpoint for getting items
app.get("/getItem", async (req: Request, res: Response) => {
  const { token } = req.cookies;

  var decoded = jwt.verify(token, secret);

  const items = await Item.find({ author: decoded.id });
  res.json(items);
});

//API endpoint for deleting items
app.delete("/deleteItem/:itemId", async (req: Request, res: Response) => {
  const itemId = req.params.itemId;
  const item = await Item.findByIdAndDelete(itemId);
  res.json(item);
});

//API endpoint for getting items by current day
app.get("/getItemDay", async (req: Request, res: Response) => {
  const { token } = req.cookies;
  console.log("testing getItemDay");

  var today = new Date();
  var month = today.getMonth() + 1;
  var day = today.getDate();
  var myMonth = "";
  var myDay = "";

  if (month < 10) {
    myMonth = "0" + month;
  } else {
    myMonth = month.toString();
  }

  if (day < 10) {
    myDay = "0" + day;
  } else {
    myDay = day.toString();
  }

  var todayDate =
    today.getFullYear() + "-" + myMonth + "-" + myDay + "T00:00:00.000+00:00";

  console.log(todayDate);

  var decoded = jwt.verify(token, secret);

  const items = await Item.find({
    author: decoded.id,
    date: todayDate,
  });
  res.json(items);
});

//API endpoint for getting items by current week
app.get("/getItemWeek", async (req: Request, res: Response) => {
  const { token } = req.cookies;
  console.log("testing week");

  var today = new Date();
  var first = today.getDate() - today.getDay() - 1; // Sunday beginning of the week
  var last = first + 6; // Saturday end of the week

  var firstDay = new Date(today.setDate(first));
  var lastDay = new Date(today.setDate(last));

  firstDay.setUTCHours(0, 0, 0, 0);
  lastDay.setUTCHours(0, 0, 0, 0);

  console.log(firstDay);
  console.log(lastDay);

  var decoded = jwt.verify(token, secret);

  const items = await Item.find({
    author: decoded.id,
    date: { $gte: firstDay, $lte: lastDay },
  });
  res.json(items);
});

//API endpoint for getting items by current month
app.get("/getItemMonth", async (req: Request, res: Response) => {
  const { token } = req.cookies;
  console.log("testing month");

  var today = new Date();
  var firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
  var lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  firstDay.setUTCHours(0, 0, 0, 0);
  lastDay.setUTCHours(0, 0, 0, 0);

  console.log(firstDay);
  console.log(lastDay);

  var decoded = jwt.verify(token, secret);

  const items = await Item.find({
    author: decoded.id,
    date: { $gte: firstDay, $lte: lastDay },
  });
  res.json(items);
});

//API endpoint for getting items by current year
app.get("/getItemYear", async (req: Request, res: Response) => {
  const { token } = req.cookies;
  console.log("testing year");

  var today = new Date();
  var firstDay = new Date(today.getFullYear(), 0, 1);
  var lastDay = new Date(today.getFullYear() + 1, 0, 0);

  firstDay.setUTCHours(0, 0, 0, 0);
  lastDay.setUTCHours(0, 0, 0, 0);

  console.log(firstDay);
  console.log(lastDay);

  var decoded = jwt.verify(token, secret);

  const items = await Item.find({
    author: decoded.id,
    date: { $gte: firstDay, $lte: lastDay },
  });
  res.json(items);
});

//connecting to mongodb cluster
mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log(`listening on port ${PORT}`);
  app.listen(5000);
});
