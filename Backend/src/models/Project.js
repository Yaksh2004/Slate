import mongoose from "mongoose";

const projectSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name for you project"],
      trim: true,
      minlength: [1, "Project name cannot be empty"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Need a user for project"],
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Project", projectSchema);
