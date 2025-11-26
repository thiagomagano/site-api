import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  subtitle: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  stack: [
    {
      type: String,
    },
  ],
  imageUrl: {
    type: String,
  },
  link: {
    type: String,
  },
  github: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Project", ProjectSchema);
