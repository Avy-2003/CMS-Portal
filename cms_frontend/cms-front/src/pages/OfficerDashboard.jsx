import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:8080"; // Replace with your backend URL
export default function OfficerDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));

  const [complaints, setComplaints] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    resolved: 0,
    assigned: 0,
    inProgress: 0,
    new: 0,
  });

  const [profile, setProfile] = useState({
  name: "",
  phone: "",
  email: ""
});

useEffect(() => {

  const user = JSON.parse(sessionStorage.getItem("user"));

  if (!user || user.role !== "OFFICER") {
    navigate("/");
  }

}, []);

useEffect(() => {
  if (!user?.id) return;

  axios
    .get(`${BASE_URL}/users/${user.id}`)
    .then((res) => {
      setProfile(res.data); // full object
    })
    .catch((err) => console.error(err));
}, [user?.id]);


  useEffect(() => {
    if (!user?.id) return;

    axios
      .get(`${BASE_URL}/complaints/officer/${user.id}`)
      .then((res) => {
        setComplaints(res.data);

        // calculate stats
        const data = res.data;

        setStats({
          total: data.length,
          resolved: data.filter(c => c.status === "RESOLVED").length,
          assigned: data.filter(c => c.status === "ASSIGNED").length,
          inProgress: data.filter(c => c.status === "IN_PROGRESS").length,
          new: data.filter(c => c.status === "NEW").length,
        });
      })
      .catch((err) => console.error(err));
  }, []);

  // update status
  const updateStatus = (id, status) => {
    axios
      .put(`${BASE_URL}/complaints/${id}/status?status=${status}`)
      .then(() => {
        // refresh data
        window.location.reload();
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="min-h-screen bg-slate-50 py-6">
      <div className="mx-auto w-[90vw] max-w-none px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
          {/* Sidebar */}
          <aside className="rounded-3xl bg-slate-950 p-6 text-white shadow-xl shadow-slate-900/10 ring-1 ring-white/10">
            <div className="mb-8">
              
              <h2 className="mt-3 text-2xl font-semibold">CMS Portal</h2>
              <p className="mt-2 text-sm text-slate-400">Manage complaints, track status, and update resolutions.</p>
            </div>

            <div className="space-y-5 rounded-3xl border border-white/10 bg-slate-900/70 p-5">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Profile</p>
                <p className="mt-3 text-lg font-semibold text-white">{profile.name || "Officer"}</p>
                <p className="text-sm text-slate-400">{profile.email || "No email available"}</p>
              </div>

              <div className="grid gap-3 rounded-3xl bg-slate-950/90 p-4">
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <span>Phone</span>
                  <span className="font-semibold text-white">{profile.phone || "-"}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <span>Role</span>
                  <span className="font-semibold text-white">Officer</span>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-3xl bg-slate-900/80 p-5">
              <h3 className="text-sm uppercase tracking-[0.2em] text-slate-400">Quick overview</h3>
              <div className="mt-5 grid gap-3">
                <div className="rounded-3xl bg-slate-950/80 p-4">
                  <p className="text-xs text-slate-400">Total</p>
                  <p className="mt-2 text-2xl font-semibold text-white">{stats.total}</p>
                </div>
                <div className="rounded-3xl bg-slate-950/80 p-4">
                  <p className="text-xs text-slate-400">New Complaints</p>
                  <p className="mt-2 text-2xl font-semibold text-sky-300">{stats.assigned}</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                sessionStorage.clear();
                navigate("/");
              }}
              className="mt-8 w-full rounded-3xl bg-rose-500 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-600"
            >
              Logout
            </button>
          </aside>

          {/* Main content */}
          <main className="space-y-6">
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/80">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-slate-500">Welcome back,</p>
                  <h1 className="text-2xl font-semibold text-slate-900">Officer Dashboard</h1>
                </div>
                <p className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">Assigned complaints: {stats.total}</p>
              </div>
            </div>

            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
              <article className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200/80">
                <p className="text-sm text-slate-500">Total</p>
                <p className="mt-3 text-3xl font-semibold text-slate-900">{stats.total}</p>
              </article>
              <article className="rounded-3xl bg-emerald-50 p-5 shadow-sm ring-1 ring-emerald-200/70">
                <p className="text-sm text-slate-500">Resolved</p>
                <p className="mt-3 text-3xl font-semibold text-emerald-700">{stats.resolved}</p>
              </article>
              <article className="rounded-3xl bg-sky-50 p-5 shadow-sm ring-1 ring-sky-200/70">
                <p className="text-sm text-slate-500">Assigned</p>
                <p className="mt-3 text-3xl font-semibold text-sky-700">{stats.assigned}</p>
              </article>
              <article className="rounded-3xl bg-amber-50 p-5 shadow-sm ring-1 ring-amber-200/70">
                <p className="text-sm text-slate-500">In Progress</p>
                <p className="mt-3 text-3xl font-semibold text-amber-700">{stats.inProgress}</p>
              </article>
              <article className="rounded-3xl bg-indigo-50 p-5 shadow-sm ring-1 ring-indigo-200/70">
                <p className="text-sm text-slate-500">New</p>
                <p className="mt-3 text-3xl font-semibold text-indigo-700">{stats.new}</p>
              </article>
            </section>

            <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/80">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Assigned Complaints</h2>
                  <p className="text-sm text-slate-500">View complaint details and update status quickly.</p>
                </div>
                <div className="flex flex-wrap gap-2 text-sm text-slate-500">
                  <span className="rounded-full bg-slate-100 px-3 py-1">Updated live</span>
                  <span className="rounded-full bg-slate-100 px-3 py-1">Officer view</span>
                </div>
              </div>

              <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200 text-sm">
                    <thead className="bg-slate-50 text-slate-600">
                      <tr className="border-b border-slate-200">
                        <th className="px-4 py-4 text-left font-semibold uppercase tracking-wide">C_ID</th>
                        <th className="px-4 py-4 text-left font-semibold uppercase tracking-wide">Title</th>
                        <th className="px-4 py-4 text-left font-semibold uppercase tracking-wide">Description</th>
                        <th className="px-4 py-4 text-left font-semibold uppercase tracking-wide">Name</th>
                        <th className="px-4 py-4 text-left font-semibold uppercase tracking-wide">Phone</th>
                        <th className="px-4 py-4 text-left font-semibold uppercase tracking-wide">Email</th>
                        <th className="px-4 py-4 text-left font-semibold uppercase tracking-wide">Status</th>
                        <th className="px-4 py-4 text-left font-semibold uppercase tracking-wide">Location</th>
                        <th className="px-4 py-4 text-left font-semibold uppercase tracking-wide">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                      {complaints.length > 0 ? (
                        complaints.map((c) => (
                          <tr key={c.id} className="transition hover:bg-slate-50">
                            <td className="whitespace-nowrap px-4 py-4 text-slate-700">{c.id}</td>
                            <td className="px-4 py-4 font-medium text-slate-900">{c.title}</td>
                            <td className="max-w-xs px-4 py-4 text-slate-700 truncate">{c.description}</td>
                            <td className="px-4 py-4 text-slate-700">{c.userName}</td>
                            <td className="px-4 py-4 text-slate-700">{c.userPhone}</td>
                            <td className="px-4 py-4 text-slate-700">{c.userEmail}</td>
                            <td className="px-4 py-4">
                              <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                c.status === "RESOLVED"
                                  ? "bg-emerald-100 text-emerald-700"
                                  : c.status === "IN_PROGRESS"
                                  ? "bg-amber-100 text-amber-700"
                                  : c.status === "NEW"
                                  ? "bg-sky-100 text-sky-700"
                                  : "bg-slate-100 text-slate-700"
                              }`}>
                                {c.status.replace("_", " ")}
                              </span>
                            </td>
                            <td className="px-4 py-4 text-slate-700">{c.location}</td>
                            <td className="px-4 py-4">
                              <div className="flex flex-wrap gap-2">
                                <button
                                  onClick={() => updateStatus(c.id, "IN_PROGRESS")}
                                  disabled={c.status === "IN_PROGRESS" || c.status === "RESOLVED"}
                                  className={`rounded-2xl px-3 py-2 text-xs font-semibold text-white transition ${
                                    c.status === "IN_PROGRESS" || c.status === "RESOLVED"
                                      ? "bg-slate-300 cursor-not-allowed"
                                      : "bg-amber-500 hover:bg-amber-600"
                                  }`}
                                >
                                  Start
                                </button>
                                <button
                                  onClick={() => updateStatus(c.id, "RESOLVED")}
                                  disabled={c.status === "RESOLVED"}
                                  className={`rounded-2xl px-3 py-2 text-xs font-semibold text-white transition ${
                                    c.status === "RESOLVED"
                                      ? "bg-slate-300 cursor-not-allowed"
                                      : "bg-emerald-600 hover:bg-emerald-700"
                                  }`}
                                >
                                  Resolve
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="9" className="px-4 py-20 text-center text-slate-500">
                            No complaints assigned yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}