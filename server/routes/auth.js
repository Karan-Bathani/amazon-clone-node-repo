const express = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");

// SIGNUP ROUTE
authRouter.post("/api/signup", async (req, res) => {
  try {
    // GET THE DATA FROM THE CLIENT
    const { name, email, password } = req.body;

    // POST DATA IN THE DATABASE
    const exisitingUser = await User.findOne({ email });
    if (exisitingUser) {
      return res
        .status(400)
        .json({ msg: "User with same email already exisits!" });
    }

    const hashedPassword = await bcryptjs.hash(password, 8);

    let user = new User({
      email,
      password: hashedPassword,
      name,
    });
    user = await user.save();

    //RETURN THE DATA TO THE USER
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// SIGNIN ROUTE
authRouter.post("/api/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "User with this email does not exist!" });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Incorrect Password!" });
    }

    const token = jwt.sign({ id: user._id }, "passwordKey");
    res.json({ token, ...user._doc });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = authRouter;
