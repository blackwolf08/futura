const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const warbleRoutes = require("./routes/warbles");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const auth = require("./middleware/auth");
const db = require("./models");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use(
  "/api/users/:userId",
  auth.loginRequired,
  auth.ensureCorrectUser,
  userRoutes
);
app.use(
  "/api/users/:userId/warbles",
  auth.loginRequired,
  auth.ensureCorrectUser,
  warbleRoutes
);

app.get("/", function(req, res) {
  res.json({ message: "Welcome to Warbler" });
});

app.get("/api/public/:username", function(req, res, next) {
  db.User
    .findOne({ username: req.params.username })
    .populate("warbles", { message: true, createdAt: true })
    .then(function(user) {
      let userInfo = {
        username: user.username,
        profileImage: user.profileImage,
        warbles: user.warbles
      };
      res.status(200).json(userInfo);
    })
    .catch(function(err) {
      res.send(err);
    });
});

app.get("/api/warbles", function(req, res, next) {
  db.Warble
    .find()
    .sort({ createdAt: "desc" })
    .limit(100)
    .populate("userId", { username: true, profileImage: true })
    .then(function(warbles) {
      res.status(200).json(warbles);
    })
    .catch(function(err) {
      res.send(err);
    });
});

app.listen(2000, function() {
  console.log("Server is listening on port 2000");
});
