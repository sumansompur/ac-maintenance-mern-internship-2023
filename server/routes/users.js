const express = require("express");
const router = express.Router();
const Users = require("../models/users");
const jwt = require("jsonwebtoken");

router.get("/users", async (req, res) => {
  try {
    const users = await Users.find().sort({ isAdmin: 1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/users", async (req, res) => {
  const user = new Users({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    isAdmin: req.body.admin,
  });

  try {
    const exist = await Users.findOne({
      $or: [{ username: user.username }, { email: user.email }],
    });
    if (!exist) {
      const newUser = await user.save();
      console.log("New user added");
      res.status(201).json(newUser);
    } else res.json({ message: "Username and email already registered" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/users/:username", getUser, (req, res) => {
  res.send(res.user);
});

router.delete("/users/:username", getUser, async (req, res) => {
  try {
    await Users.deleteOne(res.user);
    res.json({
      message: "User with username " + res.user.username + " deleted!",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
});

router.post("/users/login", async (req, res) => {
  const { username, password } = req.body;
  if (!(username || password))
    return res.json({ message: "Please enter data before logging in" });

  const user = await Users.findOne({ username: username }).catch((err) => {
    console.error("Error: ", err);
  });

  if (!user) return res.json({ message: "No such user exists" });
  else if (user?.password !== password)
    return res.json({ message: "Username and password do not match" });

  const jwtToken = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET
  );

  res.json({
    hello: "Welcome Back",
    token: jwtToken,
    username: user.username,
    name: user.name,
    isAdmin: user.isAdmin,
  });
});

async function getUser(req, res, next) {
  let user = null;
  try {
    user = await Users.findOne({ username: req.params.username });
    if (user == null) {
      return res.status(404).json({ message: "Cannot find such user" });
    }
  } catch (error) {
    res.status(500).json({ message: console.error.message });
  }
  res.user = user;
  next();
}

module.exports = router;
