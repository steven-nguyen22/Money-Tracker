import express, { Request, Response } from "express";
import mongoose from "mongoose";
import User from "./models/User";

const PORT = 5000;

const app = express();

app.use(express.json());

//API endpoint for creating users
app.post("/users", async (req: Request, res: Response) => {
  console.log(req.body);
  const newUser = new User({
    username: req.body.username,
  });
  const createdUser = await newUser.save();
  res.json(createdUser);
});

//connecting to mongodb cluster
mongoose
  .connect(
    "mongodb+srv://scoobysteve:poopdeck2@cluster0.oxrdz7p.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log(`listening on port ${PORT}`);
    app.listen(5000);
  });
