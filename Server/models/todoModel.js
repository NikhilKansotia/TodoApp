import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    done: { type: Boolean, default: false },
    priority: { type: String, default: "Low", enum: ["High", "Medium", "Low"] },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const Todo = mongoose.model("Todo", todoSchema);
