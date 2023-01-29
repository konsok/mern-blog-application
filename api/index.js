const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const Post = require("./models/Post");
const app = express();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
const fs = require("fs");

const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
const secret = "asdfe45we45w345wegw345werjktjwertkj";

// Podlaczanie do bazy danych
const uri =
  "mongodb+srv://konsok:Qsefthuko123!@atlascluster.dq4ajlx.mongodb.net/?retryWrites=true&w=majority";

try {
  mongoose.set("strictQuery", false);
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to MongoDB");
} catch (error) {
  console.log("Error connecting to MongoDB", error);
}

// mongoose.set("strictQuery", false);
// mongoose.connect(uri);

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());

app.use(cookieParser());

// tworzenie uzytkownika

app.post("/register", async (req, res) => {
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
});

//logowanie

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (passOk) {
    // logged in
    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json({
        id: userDoc._id,
        username,
      });
    });
  } else {
    res.status(400).json("wrong credentials");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

// res.json(req.cookies);

// const authHeader = req.headers["authorization"];
// const token = authHeader && authHeader.split(" ")[1];
// if (token == null) return res.sendStatus(401);

// jwt.verify(token, secret, (err, user) => {
//   if (err) return res.sendStatus(403);
//   res.json(user);
// });

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("logged out");
});

app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const extension = parts[parts.length - 1];
  const newPath = path + "." + extension;
  fs.renameSync(path, newPath);

  const { title, summary, content } = req.body;
  const postDoc = await Post.create({
    title,
    summary,
    content,
    cover: newPath,
  });
  res.json(postDoc);
});

app.get("/post", async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
