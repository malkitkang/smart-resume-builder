import { useState } from "react";
import axios from "axios";

export default function ResumeForm() {
  const initialFormData = {
    name: "",
    email: "",
    phone: "",
    skills: "",
    education: [{ school: "", degree: "", year: "" }],
    experience: [{ company: "", role: "", duration: "", description: "" }],
    projects: [{ title: "", description: "", link: "" }]
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNestedChange = (e, index, section) => {
    const updatedSection = [...formData[section]];
    updatedSection[index][e.target.name] = e.target.value;
    setFormData({ ...formData, [section]: updatedSection });
  };

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
        skills: formData.skills.split(",").map((s) => s.trim()),
      };

      const response = await axios.post("http://localhost:5000/api/resumes", payload);
      alert("✅ Resume submitted successfully!");
      console.log(response.data);
      setFormData(initialFormData);
    } catch (err) {
      console.error(err);
      alert("❌ Error submitting resume");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Resume Builder</h2>
      <form onSubmit={handleSubmit} className="space-y-8">

        {/* Basic Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input className="p-3 border rounded-md" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
          <input className="p-3 border rounded-md" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          <input className="p-3 border rounded-md" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
          <input className="p-3 border rounded-md sm:col-span-2" name="skills" placeholder="Skills (comma separated)" value={formData.skills} onChange={handleChange} />
        </div>

        {/* Education */}
        <section>
          <h3 className="text-2xl font-semibold mb-2 border-b pb-1">Education</h3>
          {formData.education.map((edu, i) => (
            <div key={i} className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4 bg-gray-50 p-4 rounded-lg">
              <input className="p-2 border rounded" name="school" placeholder="School" value={edu.school} onChange={(e) => handleNestedChange(e, i, "education")} />
              <input className="p-2 border rounded" name="degree" placeholder="Degree" value={edu.degree} onChange={(e) => handleNestedChange(e, i, "education")} />
              <input className="p-2 border rounded" name="year" placeholder="Year" value={edu.year} onChange={(e) => handleNestedChange(e, i, "education")} />
            </div>
          ))}
          <button type="button" onClick={() => addField("education")} className="text-sm text-blue-600">+ Add Education</button>
        </section>

        {/* Experience */}
        <section>
          <h3 className="text-2xl font-semibold mb-2 border-b pb-1">Experience</h3>
          {formData.experience.map((exp, i) => (
            <div key={i} className="space-y-2 mb-4 bg-gray-50 p-4 rounded-lg">
              <input className="w-full p-2 border rounded" name="company" placeholder="Company" value={exp.company} onChange={(e) => handleNestedChange(e, i, "experience")} />
              <input className="w-full p-2 border rounded" name="role" placeholder="Role" value={exp.role} onChange={(e) => handleNestedChange(e, i, "experience")} />
              <input className="w-full p-2 border rounded" name="duration" placeholder="Duration" value={exp.duration} onChange={(e) => handleNestedChange(e, i, "experience")} />
              <textarea className="w-full p-2 border rounded" name="description" placeholder="Description" value={exp.description} onChange={(e) => handleNestedChange(e, i, "experience")} />
            </div>
          ))}
          <button type="button" onClick={() => addField("experience")} className="text-sm text-blue-600">+ Add Experience</button>
        </section>

        {/* Projects */}
        <section>
          <h3 className="text-2xl font-semibold mb-2 border-b pb-1">Projects</h3>
          {formData.projects.map((proj, i) => (
            <div key={i} className="space-y-2 mb-4 bg-gray-50 p-4 rounded-lg">
              <input className="w-full p-2 border rounded" name="title" placeholder="Project Title" value={proj.title} onChange={(e) => handleNestedChange(e, i, "projects")} />
              <textarea className="w-full p-2 border rounded" name="description" placeholder="Project Description" value={proj.description} onChange={(e) => handleNestedChange(e, i, "projects")} />
              <input className="w-full p-2 border rounded" name="link" placeholder="Project Link" value={proj.link} onChange={(e) => handleNestedChange(e, i, "projects")} />
            </div>
          ))}
          <button type="button" onClick={() => addField("projects")} className="text-sm text-blue-600">+ Add Project</button>
        </section>

        <div className="text-center">
          <button type="submit" className="bg-[#2563EB] text-white px-6 py-2 rounded-md hover:bg-[#1E40AF]">Submit Resume</button>
        </div>
      </form>
    </div>
  );
}
