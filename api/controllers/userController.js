const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const logger = require("../configs/logsConfig");

const salt = bcrypt.genSaltSync(10);
const secret = "asdfe45we45w345wegw345werjktjwertkj";

const registerController = async (req, res) => {
  const salt = await bcrypt.genSaltSync(10);
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
};

const loginController = async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (passOk) {
    // logged in
    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) throw err;
      logger.info("logged in", { username });
      res.cookie("token", token).json({
        id: userDoc._id,
        username,
      });
    });
  } else {
    logger.warn("wrong credentials");
    res.status(400).json("wrong credentials");
  }
};

const profileController = (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) res.status(400).json("not logged in");
    res.json(info);
  });
};

const profilePageController = (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) res.status(400).json("not logged in");
    res.json(info);
  });
};

const changePasswordController = async (req, res) => {
  const { id } = req.params;
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) res.status(400).json("error");

    console.log(req.body);
    const userDoc = await User.findById(id);
    const isOwner = JSON.stringify(userDoc._id) === JSON.stringify(info.id);
    if (!isOwner) {
      return res.status(400).json("you are not the owner");
    }

    const { password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, salt);
    await userDoc.update({
      password: hashedPassword,
    });
    res.json(userDoc);
  });
};

const deleteUserController = async (req, res) => {
  const { id } = req.params;
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) res.status(400).json("error");
    const userDoc = await User.findById(id);
    const isOwner = JSON.stringify(userDoc._id) === JSON.stringify(info.id);
    if (!isOwner) {
      return res.status(400).json("you are not the owner");
    }
    await userDoc.delete();
    res.json(userDoc);
  });
};

const logoutController = (req, res) => {
  res.cookie("token", "").json("logged out");
};

module.exports = {
  registerController,
  loginController,
  profileController,
  profilePageController,
  changePasswordController,
  deleteUserController,
  logoutController,
};
