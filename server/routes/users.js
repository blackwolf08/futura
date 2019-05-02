const express = require("express");
const router = express.Router({ mergeParams: true });
const db = require("../models");

router.get("/", function(req, res, next) {
  db.User
    .findById(req.params.userId)
    .then(function(user) {
      res.status(200).json(user);
    })
    .catch(function(err) {
      res.send(err);
    });
});

router.patch("/", function(req, res, next) {
  db.User
    .findByIdAndUpdate(req.params.userId)
    .then(function(user) {
      res.status(200).json(user);
    })
    .catch(function(err) {
      res.send(err);
    });
});

router.delete("/", function(req, res, next) {
  db.User
    .findByIdAndRemove(req.params.userId)
    .then(function() {
      res.status(204).json({ message: "Deleted" });
    })
    .catch(function(err) {
      res.send(err);
    });
});

router.post("/followUser", function(req, res, next) {
  db.User
    .findOne({ username: req.body.username })
    .then(function(user) {
      var followedUser = user._id;
      user.followers.push(req.params.userId);
      user
        .save()
        .then(function(u) {
          db.User
            .findById(req.params.userId)
            .then(function(currUser) {
              currUser.following.push(followedUser);
              currUser.save();
            })
            .catch(next);
        })
        .catch(next);
    })
    .catch(next);
});

module.exports = router;
