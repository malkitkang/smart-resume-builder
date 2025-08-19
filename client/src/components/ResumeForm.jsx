import { useState } from "react";
import axios from "axios";

export default function ResumeForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    education: [{ school: "", degree: "", year: "" }],
    experience: [{ company: "", role: "", duration: "", description: "" }],
    projects: [{ title: "", description: "", link: "" }]
  });

  // Handle single field change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle nested array (education, experience, projects)
  const handleNestedChange = (e, index, section) => {
    const updatedSection = [...formData[section]];
    updatedSection[index][e.target.name] = e.target.value;
    setFormData({ ...formData, [section]: updatedSection });
  };

  // Add new field (for dynamic sections)
  const addField = (section) => {
    const emptyFields = Object.fromEntries(
      Object.keys(formData[section][0]).map((key) => [key, ""])
    );
    setFormData({ ...formData, [section]: [...formData[section], emptyFields] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        skills: formData.skills.split(",").map((s) => s.trim()), // convert to array
      };

      const response = await axios.post("http://localhost:5000/api/resumes", payload);
      alert("Resume submitted successfully!");
      console.log(response.data);
    } catch (err) {
      console.error(err);
      alert("Error submitting resume");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Resume Builder</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Basic Info */}
        <input className="w-full p-2 border rounded" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
        <input className="w-full p-2 border rounded" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <input className="w-full p-2 border rounded" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
        <input className="w-full p-2 border rounded" name="skills" placeholder="Skills (comma separated)" value={formData.skills} onChange={handleChange} />

        {/* Education */}
        <h3 className="text-xl font-semibold">Education</h3>
        {formData.education.map((edu, i) => (
          <div key={i} className="space-y-2 border p-3 rounded mb-3">
            <input className="w-full p-2 border rounded" name="school" placeholder="School" value={edu.school} onChange={(e) => handleNestedChange(e, i, "education")} />
            <input className="w-full p-2 border rounded" name="degree" placeholder="Degree" value={edu.degree} onChange={(e) => handleNestedChange(e, i, "education")} />
            <input className="w-full p-2 border rounded" name="year" placeholder="Year" value={edu.year} onChange={(e) => handleNestedChange(e, i, "education")} />
          </div>
        ))}
        <button type="button" onClick={() => addField("education")} className="bg-gray-200 px-3 py-1 rounded">+ Add Education</button>

        {/* Experience */}
        <h3 className="text-xl font-semibold">Experience</h3>
        {formData.experience.map((exp, i) => (
          <div key={i} className="space-y-2 border p-3 rounded mb-3">
            <input className="w-full p-2 border rounded" name="company" placeholder="Company" value={exp.company} onChange={(e) => handleNestedChange(e, i, "experience")} />
            <input className="w-full p-2 border rounded" name="role" placeholder="Role" value={exp.role} onChange={(e) => handleNestedChange(e, i, "experience")} />
            <input className="w-full p-2 border rounded" name="duration" placeholder="Duration" value={exp.duration} onChange={(e) => handleNestedChange(e, i, "experience")} />
            <textarea className="w-full p-2 border rounded" name="description" placeholder="Description" value={exp.description} onChange={(e) => handleNestedChange(e, i, "experience")} />
          </div>
        ))}
        <button type="button" onClick={() => addField("experience")} className="bg-gray-200 px-3 py-1 rounded">+ Add Experience</button>

        {/* Projects */}
        <h3 className="text-xl font-semibold">Projects</h3>
        {formData.projects.map((proj, i) => (
          <div key={i} className="space-y-2 border p-3 rounded mb-3">
            <input className="w-full p-2 border rounded" name="title" placeholder="Project Title" value={proj.title} onChange={(e) => handleNestedChange(e, i, "projects")} />
            <textarea className="w-full p-2 border rounded" name="description" placeholder="Project Description" value={proj.description} onChange={(e) => handleNestedChange(e, i, "projects")} />
            <input className="w-full p-2 border rounded" name="link" placeholder="Project Link" value={proj.link} onChange={(e) => handleNestedChange(e, i, "projects")} />
          </div>
        ))}
        <button type="button" onClick={() => addField("projects")} className="bg-gray-200 px-3 py-1 rounded">+ Add Project</button>

        {/* Submit */}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Submit Resume
        </button>
      </form>
    </div>
  );
}
