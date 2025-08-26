// src/pages/About.jsx
export default function About() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded mt-8">
      <h2 className="text-3xl font-bold text-blue-600 mb-4">About Smart Resume Builder</h2>
      <p className="text-gray-700 mb-4">
        Welcome to <span className="font-semibold">Smart Resume Builder</span> – 
        a project built by <span className="font-bold">Malkit Singh</span>.  
        This tool helps users create professional resumes quickly by filling out a simple form.  
        Your data is securely stored in a MongoDB database, and you can preview and 
        download your resume as a PDF anytime.
      </p>

      <h3 className="text-xl font-semibold text-gray-800 mb-2">✨ Key Features:</h3>
      <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
        <li>Easy-to-use form for entering resume details</li>
        <li>Dynamic sections for Education, Experience, and Projects</li>
        <li>Preview resumes in a clean, formatted layout</li>
        <li>Download your resume as a PDF</li>
        <li>Built using <span className="font-semibold">React, Node.js, Express, and MongoDB</span></li>
      </ul>

      <h3 className="text-xl font-semibold text-gray-800 mb-2">📌 Project Goals:</h3>
      <p className="text-gray-700 mb-4">
        The goal of this project is to make resume building simple and efficient, 
        especially for students, job seekers, and professionals who want to generate 
        high-quality resumes in just a few minutes.
      </p>

      <h3 className="text-xl font-semibold text-gray-800 mb-2">👨‍💻 About the Developer:</h3>
      <p className="text-gray-700">
        I’m <span className="font-bold">Malkit Singh</span>, a passionate Full-Stack Web Developer.  
        This project is part of my journey to build real-world applications using the 
        MERN stack and showcase my skills in modern web development.
      </p>
    </div>
  );
}
