import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import axios from "axios";
import justice_bg from "../assets/justice_bg.jpg";

const BASE_URL = import.meta.env.VITE_LOCAL_URL;

export default function Home() {
  const navigate = useNavigate();
  const loginRef = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const scrollToLogin = () => {
    loginRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setError("");
    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      });

      const user = res.data;
      sessionStorage.setItem("user", JSON.stringify(user));

      if (user.role === "ADMIN") {
        navigate("/admin");
      } else if (user.role === "OFFICER") {
        navigate("/officer");
      } else {
        navigate("/user");
      }
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto w-[90vw] max-w-none py-6">
        <nav className="mb-8 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-xl shadow-slate-900/5 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">CMS Portal</h1>
            <p className="mt-1 text-sm text-slate-500">One page login & homepage experience</p>
          </div>
          <button
            onClick={scrollToLogin}
            className="inline-flex items-center justify-center rounded-3xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Login
          </button>
        </nav>

        <main className="grid gap-10 lg:grid-cols-[1.6fr_1fr] items-center">
          <section className="rounded-[2rem] bg-[url('../assets/justice_bg.jpg')] bg-cover bg-center p-10 text-white shadow-2xl shadow-slate-900/10 sm:p-12" style={{ backgroundImage: `url(${justice_bg})` }}>
            <div className="rounded-3xl bg-slate-950/70 p-8 shadow-xl shadow-slate-950/20">
              <p className="text-sm uppercase tracking-[0.3em] text-sky-300">Citizen services</p>
              <h2 className="mt-6 text-4xl font-semibold leading-tight">Raise complaints, track progress, and get fast support.</h2>
              <p className="mt-6 max-w-xl text-slate-200">Submit complaints for local issues, monitor resolution status, and stay connected with officers — all from one page.</p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <button
                  onClick={scrollToLogin}
                  className="inline-flex items-center justify-center rounded-3xl bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
                >
                  Sign in now
                </button>
                <button
                  onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
                  className="inline-flex items-center justify-center rounded-3xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  Learn more
                </button>
              </div>
            </div>
          </section>

          <section ref={loginRef} className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-900/5">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Account access</p>
              <h2 className="text-3xl font-semibold text-slate-900">Login to CMS</h2>
              <p className="text-sm text-slate-500">Use your email and password to access the portal.</p>
            </div>

            <div className="mt-8 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              {error && <p className="text-sm text-rose-600">{error}</p>}

              <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full rounded-3xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
              >
                {loading ? "Signing in..." : "Login"}
              </button>
            </div>
          </section>
        </main>

        <section className="mt-16 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/80">
            <h3 className="font-semibold text-lg text-slate-900">Submit Complaints</h3>
            <p className="mt-3 text-sm text-slate-600">Report issues like garbage, road damage, or safety hazards quickly.</p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/80">
            <h3 className="font-semibold text-lg text-slate-900">Track Status</h3>
            <p className="mt-3 text-sm text-slate-600">Monitor your complaint progress from filing to resolution.</p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/80">
            <h3 className="font-semibold text-lg text-slate-900">Fast Resolution</h3>
            <p className="mt-3 text-sm text-slate-600">Our officers act quickly to resolve issues in your area.</p>
          </div>
        </section>

        <section className="mt-16 grid gap-6 md:grid-cols-3 text-center">
          <div className="rounded-3xl bg-sky-50 p-6 shadow-sm">
            <h3 className="text-2xl font-bold text-sky-700">300+</h3>
            <p className="mt-1 text-sm text-slate-600">Complaints Raised</p>
          </div>
          <div className="rounded-3xl bg-emerald-50 p-6 shadow-sm">
            <h3 className="text-2xl font-bold text-emerald-700">250+</h3>
            <p className="mt-1 text-sm text-slate-600">Resolved</p>
          </div>
          <div className="rounded-3xl bg-amber-50 p-6 shadow-sm">
            <h3 className="text-2xl font-bold text-amber-700">2 hrs</h3>
            <p className="mt-1 text-sm text-slate-600">Avg Response</p>
          </div>
        </section>
      </div>

      <footer className="bg-white py-6 text-center text-sm text-slate-500">
        © 2026 CMS Portal — Improving civic services
      </footer>
    </div>
  );
}