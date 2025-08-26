// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-12">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        
        {/* Left side */}
        <p className="text-sm">
          © {new Date().getFullYear()} <span className="font-semibold">Malkit Singh</span>. 
          All Rights Reserved.
        </p>

        {/* Right side */}
        <div className="flex space-x-6 mt-3 md:mt-0">
          <a
            href="https://github.com/malkitkang"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/malkit-singh"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
