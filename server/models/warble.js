const mongoose = require("mongoose");
const User = require("./user");

const warbleSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
      maxLength: 140
    },
    mediaUrl: {
      type: String
    },
    likes: {
      type: Number
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

warbleSchema.pre("remove", function(next) {
  User.findById(this.userId)
    .then(user => {
      user.messages.remove(this.id);
      user.save().then(function(e) {
        next();
      });
    })
    .catch(function(err) {
      next(err);
    });
});

const Warble = mongoose.model("Warble", warbleSchema);

module.exports = Warble;
