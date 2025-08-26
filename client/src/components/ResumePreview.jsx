import { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Link } from "react-router-dom";

export default function ResumePreview() {
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/resumes");
        setResumes(response.data);
      } catch (err) {
        console.error("Error fetching resumes:", err);
      }
    };
    fetchResumes();
  }, []);

  const downloadPDF = async (id) => {
    const element = document.getElementById(`resume-${id}`);
    if (!element) return alert("Resume element not found!");
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("resume.pdf");
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Resume Preview
      </h2>

      {resumes.map((resume, i) => (
        <div
          key={i}
          id={`resume-${i}`}
          className="bg-white shadow-lg rounded-lg p-6 mb-10 border border-gray-200"
        >
          {/* Header */}
          <div className="border-b pb-3 mb-4">
            <h3 className="text-3xl font-bold text-gray-900">{resume.name}</h3>
            <p className="text-gray-600">
              {resume.email} | {resume.phone}
            </p>
          </div>

          {/* Skills */}
          {resume.skills?.length > 0 && (
            <div className="mb-4">
              <h4 className="text-xl font-semibold border-b pb-1 mb-2">
                Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {resume.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-gray-200 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {resume.education?.length > 0 && (
            <div className="mb-4">
              <h4 className="text-xl font-semibold border-b pb-1 mb-2">
                Education
              </h4>
              {resume.education.map((edu, idx) => (
                <p key={idx} className="text-gray-800">
                  {edu.degree} - {edu.school} ({edu.year})
                </p>
              ))}
            </div>
          )}

          {/* Experience */}
          {resume.experience?.length > 0 && (
            <div className="mb-4">
              <h4 className="text-xl font-semibold border-b pb-1 mb-2">
                Experience
              </h4>
              {resume.experience.map((exp, idx) => (
                <div key={idx} className="mb-3">
                  <p className="font-medium text-gray-900">
                    {exp.role} @ {exp.company}
                  </p>
                  <p className="text-sm text-gray-500">{exp.duration}</p>
                  <p className="text-gray-700">{exp.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {resume.projects?.length > 0 && (
            <div className="mb-4">
              <h4 className="text-xl font-semibold border-b pb-1 mb-2">
                Projects
              </h4>
              {resume.projects.map((proj, idx) => (
                <div key={idx} className="mb-3">
                  <p className="font-medium text-gray-900">{proj.title}</p>
                  <p className="text-gray-700">{proj.description}</p>
                  {proj.link && (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline"
                    >
                      {proj.link}
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Download Button */}
          <div className="text-right flex gap-3 justify-end">
            <button
              onClick={() => downloadPDF(i)}
              className="bg-[#16A34A] text-white px-6 py-2 rounded-md hover:bg-[#15803D]"
            >
              Download as PDF
            </button>

            <Link to={`/resume/${i}`}>
              <button className="bg-[#2563EB] text-white px-6 py-2 rounded-md hover:bg-[#1E40AF]">
                View Full Resume
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
