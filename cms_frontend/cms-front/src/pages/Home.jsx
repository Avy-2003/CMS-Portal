import { useNavigate } from "react-router-dom";
import justice_bg from "../assets/justice_bg.jpg";


export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      <div className="flex-1 max-w-7xl mx-auto px-6 bg-cover bg-center relative pt-5"
  style={{ backgroundImage: `url(${justice_bg})` }}>
        {/* Navbar */}
        <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-sm rounded-md">
          <h1 className="text-xl font-bold text-blue-600">
            CMS Portal
          </h1>

          <button
            onClick={() => navigate("/login")}
            className="text-sm bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700"
          >
            Login
          </button>
        </nav>

        {/* Hero Section */}
        <section className="text-center mt-16 px-6">
          <h2 className="text-4xl font-bold text-gray-800">
            Raise Complaints Easily
          </h2>

          <p className="mt-4 text-gray-600 max-w-xl mx-auto">
            Report issues in your area, track progress, and get updates quickly.
            Making your city cleaner and safer.
          </p>

          <button
            onClick={() => navigate("/login")}
            className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Get Started
          </button>
        </section>

        {/* Features */}
        <section className="mt-16 grid gap-6 px-8 md:grid-cols-3">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="font-semibold text-lg">Submit Complaints</h3>
            <p className="text-sm text-gray-600 mt-2">
              Quickly report issues like theft, garbage, or road damage.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="font-semibold text-lg">Track Status</h3>
            <p className="text-sm text-gray-600 mt-2">
              Stay updated with real-time progress of your complaint.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="font-semibold text-lg">Fast Resolution</h3>
            <p className="text-sm text-gray-600 mt-2">
              Officers take action quickly for better service.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="mt-16 px-8 grid md:grid-cols-3 gap-6 text-center">
          <div className="bg-blue-100 p-6 rounded-xl">
            <h3 className="text-2xl font-bold text-blue-700">300+</h3>
            <p className="text-sm text-gray-600 mt-1">Complaints Raised</p>
          </div>

          <div className="bg-green-100 p-6 rounded-xl">
            <h3 className="text-2xl font-bold text-green-700">250+</h3>
            <p className="text-sm text-gray-600 mt-1">Resolved</p>
          </div>

          <div className="bg-yellow-100 p-6 rounded-xl">
            <h3 className="text-2xl font-bold text-yellow-700">2 hrs</h3>
            <p className="text-sm text-gray-600 mt-1">Avg Response</p>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-white pt-6 pb-4 text-center text-sm text-gray-500">
        © 2026 CMS Portal — Improving civic services
      </footer>
    </div>
  );
}