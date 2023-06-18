const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const cookieParser = require("cookie-parser");
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
const server = require("http").createServer(app);

const {
  registerController,
  loginController,
  profileController,
  profilePageController,
  changePasswordController,
  deleteUserController,
  logoutController,
} = require("./controllers/userController");
const {
  createPostContr,
  updatePostContr,
  deletePostContr,
  getPostsContr,
  getPostContr,
} = require("./controllers/postController");
const logger = require("./configs/logsConfig");
const https = require("https");
const fs = require("fs");
// Podlaczanie do bazy danych

// const connectDB = async () => {
//   try {
//     const uri =
//       "mongodb+srv://konsok:CdnXn3j57OTKRMde@atlascluster.dq4ajlx.mongodb.net/?retryWrites=true&w=majority";

//     mongoose.set("strictQuery", false);
//     await mongoose.connect(uri, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     // console.log("Connected to MongoDB");
//     logger.info("Connected to MongoDB");
//   } catch (error) {
//     logger.error("Error connecting to MongoDB", error);
//   }
// };

// connectDB();

mongoose.connect(
  "mongodb+srv://konsok:CdnXn3j57OTKRMde@atlascluster.dq4ajlx.mongodb.net/?retryWrites=true&w=majority"
);

// const key = fs.readFileSync("/Users/konrad/klucz.key");
// const cert = fs.readFileSync("/Users/konrad/cert365.crt");
// const cert = fs.readFileSync("/Users/konrad/cert365.crt");

// const credentials = { key, cert };

// const server = https.createServer(app);


app.use;

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

// tworzenie uzytkownika
app.post("/register", registerController);
// logowanie uzytkownika
app.post("/login", loginController);
// pobieranie sesji
app.get("/profile", profileController);
// pobieranie profilu
app.get("/profile/:id", profilePageController);
// wylogowywanie
app.post("/logout", logoutController);
//usuwanie uzytkownika
app.delete("/profile/:id", deleteUserController);
// zmiana hasla
app.put("/edit-profile/:id", changePasswordController);

// tworzenie posta
app.post("/post", uploadMiddleware.single("file"), createPostContr);
// edycja posta
app.put("/post", uploadMiddleware.single("file"), updatePostContr);
// usuwanie posta
app.delete("/post/:id", deletePostContr);
// pobieranie postow
app.get("/post", getPostsContr);
// pobieranie pojedynczego posta
app.get("/post/:id", getPostContr);

app.listen(3001, () => logger.info("Server is running on port 3001"));
