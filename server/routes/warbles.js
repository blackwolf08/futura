const express = require("express");
const router = express.Router({ mergeParams: true });
const db = require("../models");

router.get("/", function(req, res, next) {
  db.Warble
    .find({ userId: req.params.userId })
    .then(function(warbles) {
      res.status(200).json(warbles);
    })
    .catch(function(err) {
      res.send(err);
    });
});

router.post("/", function(req, res, next) {
  const newWarble = {
    message: req.body.message,
    userId: req.params.userId
  };
  db.Warble
    .create(newWarble)
    .then(function(warble) {
      db.User
        .findById(req.params.userId)
        .then(function(user) {
          user.warbles.push(warble.id);
          user
            .save()
            .then(function(user) {
              return db.Warble
                .findById(warble._id)
                .populate("userId", { username: true, profileImage: true });
            })
            .then(function(w) {
              return res.status(201).json(w);
            })
            .catch(next);
        })
        .catch(next);
    })
    .catch(next);
});

router.delete("/:warbleId", function(req, res, next) {
  db.Warble
    .findByIdAndRemove(req.params.warbleId)
    .then(function(warble) {
      res.status(204).json({ message: "Warble Deleted" });
    })
    .catch(function(err) {
      res.send(err);
    });
});

module.exports = router;
