import { Link } from 'react-router';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#000a4d] text-white pt-12 pb-6 mt-3">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Column 1: Department Info */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tighter">NDU EEE</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Department of Electrical & Electronic Engineering, Niger Delta
            University. Empowering the next generation of engineers through
            technical excellence.
          </p>
          <div className="flex space-x-4 pt-2">
            {/* Social Icons Placeholder */}
            <div className="w-8 h-8 bg-blue-800 rounded-full flex items-center justify-center hover:bg-blue-600 cursor-pointer transition">
              <span className="text-xs">FB</span>
            </div>
            <div className="w-8 h-8 bg-blue-800 rounded-full flex items-center justify-center hover:bg-blue-600 cursor-pointer transition">
              <span className="text-xs">WA</span>
            </div>
          </div>
        </div>

        {/* Column 2: Quick Navigation */}
        <div>
          <h3 className="text-lg font-bold mb-6 border-b-2 border-blue-500 inline-block">
            Quick Links
          </h3>
          <ul className="space-y-3 text-sm text-gray-400">
            <li>
              <Link to="/" className="hover:text-yellow-400 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/Tutorial" className="hover:text-yellow-400 transition">
                Tutorials
              </Link>
            </li>
            <li>
              <Link
                to="/electrical-wiring"
                className="hover:text-yellow-400 transition"
              >
                Wiring Diagrams
              </Link>
            </li>
            <li>
              <Link to="/Courses" className="hover:text-yellow-400 transition">
                Department Courses
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Essentials */}
        <div>
          <h3 className="text-lg font-bold mb-6 border-b-2 border-blue-500 inline-block">
            Engineering Essentials
          </h3>
          <ul className="space-y-3 text-sm text-gray-400">
            <li>
              <Link
                to="/ee-essentials"
                className="hover:text-yellow-400 transition"
              >
                Circuit Basics
              </Link>
            </li>
            <li>
              <Link to="/machines" className="hover:text-yellow-400 transition">
                Electrical Machines
              </Link>
            </li>
            <li>
              <Link to="/power" className="hover:text-yellow-400 transition">
                Power Systems
              </Link>
            </li>
            <li>
              <Link
                to="/electronics"
                className="hover:text-yellow-400 transition"
              >
                Electronics logic
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Newsletter/Updates */}
        <div>
          <h3 className="text-lg font-bold mb-6 border-b-2 border-blue-500 inline-block">
            Stay Updated
          </h3>
          <p className="text-sm text-gray-400 mb-4">
            Get the latest wiring diagrams and department news.
          </p>
          <form className="flex flex-col space-y-2">
            <input
              type="email"
              placeholder="Email Address"
              className="bg-blue-900/50 border border-blue-700 rounded px-3 py-2 text-sm outline-none focus:border-yellow-400"
            />
            <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded text-sm transition">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-gray-1000 space-y-4 md:space-y-0">
        <p>
          © {currentYear} NDU Electrical & Electronic Engineering. All Rights
          Reserved.
        </p>
        <p> developed by Kingsley festus Osuya</p>

        <div className="flex space-x-6">
          <Link to="/privacy" className="hover:text-white">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:text-white">
            Terms of Service
          </Link>
          <Link to="/contact" className="hover:text-white">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
