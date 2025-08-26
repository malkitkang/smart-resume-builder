import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function ResumeFullView() {
  const { id } = useParams();
  const [resume, setResume] = useState(null);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/resumes");
        setResume(response.data[id]); // get resume by index
      } catch (err) {
        console.error("Error fetching resume:", err);
      }
    };
    fetchResume();
  }, [id]);

  const downloadPDF = async () => {
    const element = document.getElementById("resume-full");
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("resume.pdf");
  };

  if (!resume) return <p className="text-center mt-10">Loading resume...</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">
      <div id="resume-full" className="bg-white shadow-xl rounded-lg p-8 w-[800px]">
        {/* Header */}
        <div className="border-b pb-3 mb-6 text-center">
          <h1 className="text-4xl font-bold text-gray-900">{resume.name}</h1>
          <p className="text-gray-600">{resume.email} | {resume.phone}</p>
        </div>

        {/* Skills */}
        {resume.skills?.length > 0 && (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold border-b pb-1 mb-3">Skills</h2>
            <div className="flex flex-wrap gap-3">
              {resume.skills.map((skill, idx) => (
                <span key={idx} className="px-3 py-1 bg-gray-200 rounded-full text-sm">{skill}</span>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {resume.education?.length > 0 && (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold border-b pb-1 mb-3">Education</h2>
            {resume.education.map((edu, idx) => (
              <p key={idx} className="text-lg">{edu.degree} - {edu.school} ({edu.year})</p>
            ))}
          </div>
        )}

        {/* Experience */}
        {resume.experience?.length > 0 && (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold border-b pb-1 mb-3">Experience</h2>
            {resume.experience.map((exp, idx) => (
              <div key={idx} className="mb-4">
                <p className="font-medium text-lg">{exp.role} @ {exp.company}</p>
                <p className="text-gray-500">{exp.duration}</p>
                <p>{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {resume.projects?.length > 0 && (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold border-b pb-1 mb-3">Projects</h2>
            {resume.projects.map((proj, idx) => (
              <div key={idx} className="mb-3">
                <p className="font-medium">{proj.title}</p>
                <p>{proj.description}</p>
                {proj.link && <a href={proj.link} target="_blank" rel="noreferrer" className="text-blue-600 underline">{proj.link}</a>}
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="text-center mt-8 flex gap-4 justify-center">
          <button onClick={downloadPDF} className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700">
            Download as PDF
          </button>
          <button onClick={() => window.print()} className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
            Print
          </button>
        </div>
      </div>
    </div>
  );
}
