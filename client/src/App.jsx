import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ResumeForm from "./components/ResumeForm";
import ResumePreview from "./components/ResumePreview";
import ResumeFullView from "./components/ResumeFullView"; 
import Navbar from "./components/Navbar";
import About from "./components/About";
import Footer from "./components/Footer";

export default function App() {
  return (
    <Router>
      <Navbar /> {/* Always on top */}
      <Routes>
        <Route path="/" element={<ResumeForm />} />
        <Route path="/preview" element={<ResumePreview />} />
        <Route path="/resume/:id" element={<ResumeFullView />} />
        <Route path="/about" element={<About />} />

      </Routes>
      <Footer />
    </Router>
  );
}
