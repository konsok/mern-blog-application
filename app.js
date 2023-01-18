// const express = require("express");
// const app = express();
// const PORT = process.env.PORT || 3000; // use the port from the environment or 3000
// // const mqtt = require("./utils/mqtt");
// // const auth = require("./middlewares/auth");

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));

// app.use("/", require("./routes"));
// app.use("/api", require("./routes/api"));

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

const express = require("express");
const app = express();
const PORT = 3000; // choose a port number for your server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
