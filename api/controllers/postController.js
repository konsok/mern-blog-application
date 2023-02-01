const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Post = require("../models/Post");
const fs = require("fs");
const logger = require("../configs/logsConfig");

const salt = bcrypt.genSaltSync(10);
const secret = "asdfe45we45w345wegw345werjktjwertkj";

const createPostContr = async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const extension = parts[parts.length - 1];
  const newPath = path + "." + extension;
  fs.renameSync(path, newPath);

  //po otrzymaniu tokena mozemy odczytac id uzytkownika

  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { title, summary, content } = req.body;
    const username = info.username;
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover: newPath,
      author: info.id,
    });
    logger.info("user: " + username + " created a post + " + postDoc._id);
    res.json(postDoc);
  });
};

const updatePostContr = async (req, res) => {
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }

  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { id, title, summary, content } = req.body;
    const postDoc = await Post.findById(id);
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    if (!isAuthor) {
      return res.status(400).json("you are not the author");
    }
    const username = info.username;
    await postDoc.update({
      title,
      summary,
      content,
      cover: newPath ? newPath : postDoc.cover,
    });
    logger.info("user: " + username + " updated a post");

    res.json(postDoc);
  });
};

const deletePostContr = async (req, res) => {
  const { id } = req.params;
  const { token } = req.cookies;

  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const postDoc = await Post.findById(id);
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    const username = info.username;
    logger.info("user: " + username + " deleted a post");
    if (!isAuthor && username !== "admin") {
      return res.status(400).json("you are not the author");
    }
    await postDoc.delete();
    res.json(postDoc);
  });
};

const getPostsContr = async (req, res) => {
  res.json(
    await Post.find()
      .populate("author", ["username"])
      .sort({ createdAt: -1 })
      .limit(10)
  );
};

const getPostContr = async (req, res) => {
  const { id } = req.params;

  const postDoc = await Post.findById(id).populate("author", ["username"]);
  res.json(postDoc);
};

module.exports = {
  createPostContr,
  updatePostContr,
  deletePostContr,
  getPostsContr,
  getPostContr,
};
