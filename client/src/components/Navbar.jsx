// src/components/Navbar.jsx
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Logo */}
        <h1 className="text-xl font-bold">Smart Resume Builder</h1>

        {/* Links */}
        <div className="space-x-6">
          <Link to="/" className="hover:underline">Build Resume</Link>
          <Link to="/preview" className="hover:underline">Preview Resumes</Link>
          <Link to="/about" className="hover:underline">About</Link>
        </div>
      </div>
    </nav>
  );
}
