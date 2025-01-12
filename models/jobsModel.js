import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Company name is required"],
    },
    position: {
      type: String,
      required: [true, "Job Position is required"],
    },
    status: {
      type: String,
      enum: ["Pending", "Reject", "Interview"], // Ensure proper casing here
      default: "Pending", // Update the default value to match the enum casing
    },
    workType: {
      type: String,
      enum: ["Full-time", "part-time", "internship", "contract"], // Ensure proper casing here
      default: "Full-time", // Update the default value to match the enum casing
    },
    workLocation: {
      type: String,
      default: "Mumbai",
      required: [true, "Work location is required"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
