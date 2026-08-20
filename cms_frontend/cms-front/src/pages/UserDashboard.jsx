import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:8080"; // Replace with your backend URL
export default function UserDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));
  const userId = user?.id;
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

const [complaints, setComplaints] = useState([]);

useEffect(() => {

  const user = JSON.parse(sessionStorage.getItem("user"));

  if (!user || user.role !== "CITIZEN") {
    navigate("/");
  }

}, []);


useEffect(() => {
    if (!userId) return;

    axios
      .get(`${BASE_URL}/complaints/user/${userId}`)
      .then((res) => setComplaints(res.data))
      .catch((err) => console.error(err));
  }, [user?.id]);

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
    .get(`${BASE_URL}/complaints/user/${user.id}/stats`)
    .then((res) => {
      setStats(res.data);
    })
    .catch((err) => {
      console.error(err);
    });
}, [user?.id]);

const [newComplaint, setNewComplaint] = useState({
  category: "",
  title: "",
  description: "",
  location: ""
});

const handleSubmit = () => {
  alert("Submitted complaint successfully");
  if (!newComplaint.category || !newComplaint.location) {
    alert("Category and Location required");
  
    return;
  }

  axios
    .post(`${BASE_URL}/complaints`, {
      ...newComplaint,
      userId: userId
    })
    .then((res) => {
      setComplaints((prev) => [...prev, res.data]);
      setNewComplaint({
        category: "",
        title: "",
        description: "",
        location: ""
      });
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
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Citizen Portal</p>
              <h2 className="mt-3 text-2xl font-semibold">CMS User</h2>
              <p className="mt-2 text-sm text-slate-400">Track your complaints and raise new requests with ease.</p>
            </div>

            <div className="space-y-5 rounded-3xl border border-white/10 bg-slate-900/70 p-5">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Profile</p>
                <p className="mt-3 text-lg font-semibold text-white">{profile.name || "Citizen"}</p>
                <p className="text-sm text-slate-400">{profile.email || "No email available"}</p>
              </div>

              <div className="grid gap-3 rounded-3xl bg-slate-950/90 p-4">
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <span>Phone</span>
                  <span className="font-semibold text-white">{profile.phone || "-"}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <span>Role</span>
                  <span className="font-semibold text-white">Citizen</span>
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
                  <h1 className="text-2xl font-semibold text-slate-900">Citizen Dashboard</h1>
                </div>
                <p className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">My complaints: {complaints.length}</p>
              </div>
            </div>

            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
              <article className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200/80">
                <p className="text-sm text-slate-500">Total Complaints</p>
                <p className="mt-3 text-3xl font-semibold text-slate-900">{stats.total}</p>
              </article>
              <article className="rounded-3xl bg-emerald-50 p-5 shadow-sm ring-1 ring-emerald-200/70">
                <p className="text-sm text-slate-500">Resolved</p>
                <p className="mt-3 text-3xl font-semibold text-emerald-700">{stats.resolved}</p>
              </article>
              <article className="rounded-3xl bg-amber-50 p-5 shadow-sm ring-1 ring-amber-200/70">
                <p className="text-sm text-slate-500">Assigned</p>
                <p className="mt-3 text-3xl font-semibold text-amber-700">{stats.assigned}</p>
              </article>
              <article className="rounded-3xl bg-sky-50 p-5 shadow-sm ring-1 ring-sky-200/70">
                <p className="text-sm text-slate-500">In Progress</p>
                <p className="mt-3 text-3xl font-semibold text-sky-700">{stats.inProgress}</p>
              </article>
              <article className="rounded-3xl bg-indigo-50 p-5 shadow-sm ring-1 ring-indigo-200/70">
                <p className="text-sm text-slate-500">New</p>
                <p className="mt-3 text-3xl font-semibold text-indigo-700">{stats.new}</p>
              </article>
            </section>

            <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/80">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Raise a Complaint</h2>
                  <p className="text-sm text-slate-500">Submit your request and track its progress here.</p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-500">Simple, fast, transparent</span>
              </div>

              <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_320px]">
                <div className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Category</label>
                    <select
                      className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400"
                      value={newComplaint.category}
                      onChange={(e) => setNewComplaint({ ...newComplaint, category: e.target.value })}
                    >
                      <option value="" className="text-slate-400">Select Category</option>
                      <option value="FRAUD">Fraud</option>
                      <option value="HARASSMENT">Harassment</option>
                      <option value="THEFT">Theft</option>
                      <option value="TRAFFIC">Traffic</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700">Title</label>
                    <input
                      className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400"
                      placeholder="Complaint title"
                      value={newComplaint.title}
                      onChange={(e) => setNewComplaint({ ...newComplaint, title: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700">Location</label>
                    <input
                      className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400"
                      placeholder="Location"
                      value={newComplaint.location}
                      onChange={(e) => setNewComplaint({ ...newComplaint, location: e.target.value })}
                    />
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <label className="block text-sm font-medium text-slate-700">Description</label>
                  <textarea
                    rows={8}
                    className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400"
                    placeholder="Describe your issue in detail"
                    value={newComplaint.description}
                    onChange={(e) => setNewComplaint({ ...newComplaint, description: e.target.value })}
                  />

                  <button
                    onClick={handleSubmit}
                    className="mt-5 w-full rounded-3xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    Submit Complaint
                  </button>
                </div>
              </div>
            </section>

            <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/80">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">My Complaints</h2>
                  <p className="text-sm text-slate-500">Review all complaints you have raised and their status.</p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-500">Up to date</span>
              </div>

              <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200 text-sm">
                    <thead className="bg-slate-50 text-slate-600">
                      <tr className="border-b border-slate-200">
                        <th className="px-4 py-4 text-left font-semibold uppercase tracking-wide">C_ID</th>
                        <th className="px-4 py-4 text-left font-semibold uppercase tracking-wide">Title</th>
                        <th className="px-4 py-4 text-left font-semibold uppercase tracking-wide">Description</th>
                        <th className="px-4 py-4 text-left font-semibold uppercase tracking-wide">Status</th>
                        <th className="px-4 py-4 text-left font-semibold uppercase tracking-wide">Location</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                      {complaints.length > 0 ? (
                        complaints.map((c) => (
                          <tr key={c.id} className="transition hover:bg-slate-50">
                            <td className="whitespace-nowrap px-4 py-4 text-slate-700">{c.id}</td>
                            <td className="px-4 py-4 font-medium text-slate-900">{c.title}</td>
                            <td className="max-w-xs px-4 py-4 text-slate-700 truncate">{c.description}</td>
                            <td className="px-4 py-4">
                              <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                c.status === "RESOLVED"
                                  ? "bg-emerald-100 text-emerald-700"
                                  : c.status === "IN_PROGRESS"
                                  ? "bg-amber-100 text-amber-700"
                                  : "bg-sky-100 text-sky-700"
                              }`}>
                                {c.status}
                              </span>
                            </td>
                            <td className="px-4 py-4 text-slate-700">{c.location}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="px-4 py-20 text-center text-slate-500">
                            No complaints found
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