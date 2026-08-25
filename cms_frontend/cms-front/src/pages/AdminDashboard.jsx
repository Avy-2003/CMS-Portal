import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:8080"; // Replace with your backend URL
export default function AdminDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));

  const [stats, setStats] = useState({
    total: 0,
    resolved: 0,
    assigned: 0,
    inProgress: 0,
    newCount: 0,
  });

  const [profile, setProfile] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage] = useState(10);

  const [officer, setOfficer] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    role: "",
  });

  const addOfficer = () => {
    axios
      .post(`${BASE_URL}/users`, officer)
      .then(() => {
        alert(`${officer.role} added successfully`);

        setOfficer({
          name: "",
          phone: "",
          email: "",
          password: "",
          role: "",
        });
      })
      .catch((err) => console.log(err));
  };

    useEffect(() => {
      const user = JSON.parse(sessionStorage.getItem("user"));
    // console.log("USER:", user); // debug

    if (!user || user.role !== "ADMIN") {
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



  const [complaints, setComplaints] = useState([]);

  // 🔍 Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [categoryFilter, setCategoryFilter] = useState("ALL");

  // ✅ Fetch complaints
  useEffect(() => {
    axios
      .get(`${BASE_URL}/complaints/withuser`)
      .then((res) => {
        // console.log("COMPLAINTS WITH USER:", res.data); // debug
        setComplaints(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  // ✅ Fetch stats
  useEffect(() => {
    axios
      .get(`${BASE_URL}/complaints/stats`)
      .then((res) => setStats(res.data))
      .catch((err) => console.error(err));
  }, []);

  // ✅ Update Status
  const updateStatus = (id, status) => {
    axios
      .put(`${BASE_URL}/complaints/${id}/status`, { status })
      .then(() => {
        // update UI
        setComplaints((prev) =>
          prev.map((c) => (c.id === id ? { ...c, status } : c)),
        );

        // refresh stats
        return axios.get(`${BASE_URL}/complaints/stats`);
      })
      .then((res) => setStats(res.data))
      .catch((err) => console.error(err));
  };

  // ✅ Filter logic
  const filteredComplaints = complaints.filter((c) => {
    return (
      (statusFilter === "ALL" || c.status === statusFilter) &&
      (categoryFilter === "ALL" || c.category === categoryFilter) &&
      c.title.toLowerCase().includes(search.toLowerCase())
    );
  });

  
  const totalPages = Math.ceil(
  filteredComplaints.length / itemsPerPage
);

const indexOfLastItem = currentPage * itemsPerPage;

const indexOfFirstItem = indexOfLastItem - itemsPerPage;

const currentComplaints = filteredComplaints.slice(
  indexOfFirstItem,
  indexOfLastItem
);

  useEffect(() => {
  setCurrentPage(1);
}, [statusFilter, categoryFilter, search]);

  return (
    <div className="min-h-screen bg-slate-50 py-6">
      <div className="mx-auto w-[90vw] max-w-none px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
          {/* Sidebar */}
          <aside className="rounded-3xl bg-slate-950 p-6 text-white shadow-xl shadow-slate-900/10 ring-1 ring-white/10">
            <div className="mb-8">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Admin Portal</p>
              <h2 className="mt-3 text-2xl font-semibold">CMS Admin</h2>
              <p className="mt-2 text-sm text-slate-400">Create users, review complaints, and keep the system running.</p>
            </div>

            <div className="space-y-5 rounded-3xl border border-white/10 bg-slate-900/70 p-5">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Profile</p>
                <p className="mt-3 text-lg font-semibold text-white">{profile.name || "Admin"}</p>
                <p className="text-sm text-slate-400">{profile.email || "No email available"}</p>
              </div>

              <div className="grid gap-3 rounded-3xl bg-slate-950/90 p-4">
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <span>Phone</span>
                  <span className="font-semibold text-white">{profile.phone || "-"}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <span>Role</span>
                  <span className="font-semibold text-white">Admin</span>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-3xl bg-slate-900/80 p-5">
              <h3 className="text-sm uppercase tracking-[0.2em] text-slate-400">Create user</h3>
              <div className="mt-5 space-y-3">
                <input
                  type="text"
                  placeholder="User Name"
                  className="w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400"
                  value={officer.name}
                  onChange={(e) => setOfficer({ ...officer, name: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Phone"
                  className="w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400"
                  value={officer.phone}
                  onChange={(e) => setOfficer({ ...officer, phone: e.target.value })}
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400"
                  value={officer.email}
                  onChange={(e) => setOfficer({ ...officer, email: e.target.value })}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400"
                  value={officer.password}
                  onChange={(e) => setOfficer({ ...officer, password: e.target.value })}
                />
                <select
                  className="w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400"
                  value={officer.role}
                  onChange={(e) => setOfficer({ ...officer, role: e.target.value })}
                >
                  <option value="" className="text-slate-400">Select Role</option>
                  <option value="CITIZEN">Citizen</option>
                  <option value="OFFICER">Officer</option>
                  <option value="ADMIN">Admin</option>
                </select>
                <button
                  className="w-full rounded-3xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
                  onClick={addOfficer}
                >
                  Add User
                </button>
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
                  <p className="text-sm text-slate-500">Administrator Overview</p>
                  <h1 className="text-2xl font-semibold text-slate-900">Admin Dashboard</h1>
                </div>
                <p className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">Managing {complaints.length} complaints</p>
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
                <p className="mt-3 text-3xl font-semibold text-indigo-700">{stats.newCount}</p>
              </article>
            </section>

            <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/80">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Complaint Management</h2>
                  <p className="text-sm text-slate-500">Filter, search, and assign complaints from one place.</p>
                </div>
                <div className="flex flex-wrap gap-2 text-sm text-slate-500">
                  <span className="rounded-full bg-slate-100 px-3 py-1">Live filter</span>
                  <span className="rounded-full bg-slate-100 px-3 py-1">Role-based actions</span>
                </div>
              </div>

              <div className="mt-6 grid gap-3 lg:grid-cols-[1fr_auto_auto]">
                <input
                  type="text"
                  placeholder="Search title..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400"
                />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400"
                >
                  <option value="ALL">All Status</option>
                  <option value="NEW">New</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="RESOLVED">Resolved</option>
                </select>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400"
                >
                  <option value="ALL">All Category</option>
                  <option value="FRAUD">Fraud</option>
                  <option value="HARASSMENT">Harassment</option>
                  <option value="THEFT">Theft</option>
                  <option value="TRAFFIC">Traffic</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>

              <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200 text-sm">
                    <thead className="bg-slate-50 text-slate-600">
                      <tr className="border-b border-slate-200">
                        <th className="px-4 py-4 text-left font-semibold uppercase tracking-wide">C_ID</th>
                        <th className="px-4 py-4 text-left font-semibold uppercase tracking-wide">Title</th>
                        <th className="px-4 py-4 text-left font-semibold uppercase tracking-wide">Name</th>
                        <th className="px-4 py-4 text-left font-semibold uppercase tracking-wide">Phone</th>
                        <th className="px-4 py-4 text-left font-semibold uppercase tracking-wide">Email</th>
                        <th className="px-4 py-4 text-left font-semibold uppercase tracking-wide">Category</th>
                        <th className="px-4 py-4 text-left font-semibold uppercase tracking-wide">Status</th>
                        <th className="px-4 py-4 text-left font-semibold uppercase tracking-wide">Location</th>
                        <th className="px-4 py-4 text-left font-semibold uppercase tracking-wide">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                      {currentComplaints.length > 0 ? (
                        currentComplaints.map((c) => (
                          <tr key={c.id} className="transition hover:bg-slate-50">
                            <td className="whitespace-nowrap px-4 py-4 text-slate-700">{c.id}</td>
                            <td className="px-4 py-4 font-medium text-slate-900">{c.title}</td>
                            <td className="px-4 py-4 text-slate-700">{c.user?.name}</td>
                            <td className="px-4 py-4 text-slate-700">{c.user?.phone}</td>
                            <td className="px-4 py-4 text-slate-700">{c.user?.email}</td>
                            <td className="px-4 py-4 text-slate-700">{c.category}</td>
                            <td className="px-4 py-4">
                              <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                c.status === "NEW"
                                  ? "bg-sky-100 text-sky-700"
                                  : c.status === "ASSIGNED"
                                  ? "bg-orange-100 text-orange-700"
                                  : c.status === "IN_PROGRESS"
                                  ? "bg-amber-100 text-amber-700"
                                  : c.status === "RESOLVED"
                                  ? "bg-emerald-100 text-emerald-700"
                                  : c.status === "CLOSED"
                                  ? "bg-slate-100 text-slate-700"
                                  : "bg-slate-100 text-slate-700"
                              }`}>
                                {c.status}
                              </span>
                            </td>
                            <td className="px-4 py-4 text-slate-700">{c.location}</td>
                            <td className="px-4 py-4">
                              <button
                                disabled={c.status !== "NEW"}
                                onClick={() =>
                                  navigate("/assign", {
                                    state: { complaintId: c.id },
                                  })
                                }
                                className="rounded-2xl bg-green-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                Assign
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="9" className="px-4 py-20 text-center text-slate-500">
                            No matching complaints
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>

                  <div className="flex items-center justify-between border-t border-slate-200 px-4 py-4">

  <button
    onClick={() => setCurrentPage((prev) => prev - 1)}
    disabled={currentPage === 1}
    className="rounded-lg border px-4 py-2 disabled:opacity-50"
  >
    Previous
  </button>

  <span className="text-sm text-slate-600">
    Page {currentPage} of {totalPages || 1}
  </span>

  <button
    onClick={() => setCurrentPage((prev) => prev + 1)}
    disabled={currentPage === totalPages || totalPages === 0}
    className="rounded-lg border px-4 py-2 disabled:opacity-50"
  >
    Next
  </button>

</div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

// Reusable Stat Card Component
function StatCard({ title, value, color }) {
  const colors = {
    green: "bg-emerald-50 text-emerald-700",
    yellow: "bg-amber-50 text-amber-700",
    orange: "bg-orange-50 text-orange-700",
    blue: "bg-sky-50 text-sky-700",
  };

  return (
    <div className={`rounded-3xl p-5 shadow-sm ring-1 ring-slate-200/80 ${colors[color] || "bg-white"}`}>
      <h3 className="text-sm font-medium text-slate-500">{title}</h3>
      <p className="mt-3 text-3xl font-semibold text-slate-900">{value}</p>
    </div>
  );
}
