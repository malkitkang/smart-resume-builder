import { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

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

  // Function to download PDF
  const downloadPDF = async (id) => {
    const element = document.getElementById(`resume-${id}`);
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const imgWidth = 190; // A4 width in mm (with margin)
    const pageHeight = pdf.internal.pageSize.height;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 10;

    pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save("resume.pdf");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded mt-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Resume Preview</h2>

      {resumes.map((resume, i) => (
        <div key={i} id={`resume-${i}`} className="border-b pb-6 mb-6">
          <h3 className="text-2xl font-semibold">{resume.name}</h3>
          <p className="text-gray-600">{resume.email} | {resume.phone}</p>

          {/* Skills */}
          {resume.skills?.length > 0 && (
            <div className="mt-4">
              <h4 className="text-xl font-semibold">Skills</h4>
              <ul className="list-disc list-inside">
                {resume.skills.map((skill, idx) => (
                  <li key={idx}>{skill}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Education */}
          {resume.education?.length > 0 && (
            <div className="mt-4">
              <h4 className="text-xl font-semibold">Education</h4>
              {resume.education.map((edu, idx) => (
                <p key={idx}>
                  {edu.degree} - {edu.school} ({edu.year})
                </p>
              ))}
            </div>
          )}

          {/* Experience */}
          {resume.experience?.length > 0 && (
            <div className="mt-4">
              <h4 className="text-xl font-semibold">Experience</h4>
              {resume.experience.map((exp, idx) => (
                <div key={idx} className="mb-2">
                  <p className="font-medium">{exp.role} @ {exp.company}</p>
                  <p className="text-sm text-gray-600">{exp.duration}</p>
                  <p>{exp.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {resume.projects?.length > 0 && (
            <div className="mt-4">
              <h4 className="text-xl font-semibold">Projects</h4>
              {resume.projects.map((proj, idx) => (
                <div key={idx} className="mb-2">
                  <p className="font-medium">{proj.title}</p>
                  <p>{proj.description}</p>
                  {proj.link && <a href={proj.link} target="_blank" rel="noreferrer" className="text-blue-500 underline">{proj.link}</a>}
                </div>
              ))}
            </div>
          )}

          {/* Download Button */}
          <button
            onClick={() => downloadPDF(i)}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Download as PDF
          </button>
        </div>
      ))}
    </div>
  );
}
