import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  education: [
    {
      school: String,
      degree: String,
      year: String,
    },
  ],
  experience: [
    {
      company: String,
      role: String,
      duration: String,
      description: String,
    },
  ],
  skills: [String],
  projects: [
    {
      title: String,
      description: String,
      link: String,
    },
  ],
}, { timestamps: true });

export default mongoose.model("Resume", ResumeSchema);
