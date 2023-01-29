const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
    },
    summary: {
      type: String,
      required: [true, "Please provide a summary"],
    },
    content: {
      type: String,
      required: [true, "Please provide a content"],
    },
    cover: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const PostModel = mongoose.model("Post", PostSchema);

module.exports = PostModel;
