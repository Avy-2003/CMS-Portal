import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [stats, setStats] = useState({
    total: 0,
    resolved: 0,
    pending: 0,
    inProgress: 0,
    newCount: 0,
  });

  const [profile, setProfile] = useState({
  name: "",
  phone: "",
  email: ""
});

const [officer, setOfficer] = useState({
  name: "",
  phone: "",
  email: "",
  password: "",
  role: ""
});

const addOfficer = () => {

  axios.post("https://diplomatic-upliftment-production.up.railway.app/users", officer)
    .then(() => {
      alert(`${officer.role} added successfully`);

      setOfficer({
        name: "",
        phone: "",
        email: "",
        password: "",
        role: ""
      });
    })
    .catch((err) => console.log(err));
};



useEffect(() => {

  const user = JSON.parse(localStorage.getItem("user"));
  // console.log("USER:", user); // debug

  if (!user || user.role !== "ADMIN") {
    navigate("/login");
  }

}, []);

useEffect(() => {
  if (!user?.id) return;

  axios
    .get(`https://diplomatic-upliftment-production.up.railway.app/users/${user.id}`)
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
    .get("https://diplomatic-upliftment-production.up.railway.app/complaints/withuser")
    .then((res) => {
      // console.log("COMPLAINTS WITH USER:", res.data); // debug
      setComplaints(res.data);
    })
    .catch((err) => console.error(err));
}, []);

  // ✅ Fetch stats
  useEffect(() => {
    axios
      .get("https://diplomatic-upliftment-production.up.railway.app/complaints/stats")
      .then((res) => setStats(res.data))
      .catch((err) => console.error(err));
  }, []);

  // ✅ Update Status
  const updateStatus = (id, status) => {
    axios
      .put(`https://diplomatic-upliftment-production.up.railway.app/complaints/${id}/status`, { status })
      .then(() => {
        // update UI
        setComplaints((prev) =>
          prev.map((c) =>
            c.id === id ? { ...c, status } : c
          )
        );

        // refresh stats
        return axios.get("https://diplomatic-upliftment-production.up.railway.app/complaints/stats");
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

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-indigo-500 text-white p-6">
        <h2 className="text-xl font-bold mb-8">CMS Portal</h2>

       <ul className="space-y-4">
          <li className="cursor-pointer hover:text-gray-200">Name</li>
          <input className="w-full mb-3 p-2 border rounded bg-lime-900"
  value={profile.name} disabled
  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
/>
          <li className="cursor-pointer hover:text-gray-200 ">Phone</li>
          <input className="w-full mb-3 p-2 border rounded bg-lime-900"
  value={profile.phone} disabled
  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
/>
          <li className="cursor-pointer hover:text-gray-200">Email</li>
          <input className="w-full mb-3 p-2 border rounded bg-lime-900"
  value={profile.email} disabled
  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
/>
        </ul>

        {/* Add Officer Section */}
<div className="mt-10">
  <h3 className="text-lg font-bold mb-4">Add User</h3>

  <input
    type="text"
    placeholder="User Name"
    className="w-full mb-3 p-2 border rounded bg-white text-black"
    value={officer.name}
    onChange={(e) => setOfficer({ ...officer, name: e.target.value })}
  />

  <input
    type="text"
    placeholder="Phone"
    className="w-full mb-3 p-2 border rounded bg-white text-black"
    value={officer.phone}
    onChange={(e) => setOfficer({ ...officer, phone: e.target.value })}
  />

  <input
    type="email"
    placeholder="Email"
    className="w-full mb-3 p-2 border rounded bg-white text-black"
    value={officer.email}
    onChange={(e) => setOfficer({ ...officer, email: e.target.value })}
  />

  <input
    type="password"
    placeholder="Password"
    className="w-full mb-3 p-2 border rounded bg-white text-black"
    value={officer.password}
    onChange={(e) => setOfficer({ ...officer, password: e.target.value })}
  />

   <select
  className="w-full mb-3 p-2 border rounded bg-white text-black"
  value={officer.role}
  onChange={(e) =>
    setOfficer({ ...officer, role: e.target.value })
  }
>
  <option value="">Select Role</option>
  <option value="CITIZEN">Citizen</option>
  <option value="OFFICER">Officer</option>
  <option value="ADMIN">Admin</option>
</select>

  <button
    className="w-full bg-green-600 hover:bg-green-700 py-2 rounded font-semibold"
    onClick={addOfficer}
  >
    Add User
  </button>
</div>
      </div>

      

      {/* Main */}
      <div className="flex-1">

        {/* Navbar */}
        <div className="bg-white shadow px-6 py-4 flex justify-between">
          <h1 className="font-semibold text-lg">Admin Dashboard</h1>

          <div>
           
            <button
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">

          {/* Stats */}
          <div className="grid grid-cols-5 gap-6 mb-6">
            <StatCard title="Total" value={stats.total} />
            <StatCard title="Resolved" value={stats.resolved} color="green" />
            <StatCard title="Pending" value={stats.pending} color="yellow" />
            <StatCard title="In Progress" value={stats.inProgress} color="orange" />
            <StatCard title="New" value={stats.newCount} color="blue" />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-4">
            <input
              type="text"
              placeholder="Search title..."
              className="border p-2 rounded w-64"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              className="border p-2 rounded"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="ALL">All Status</option>
              <option value="NEW">New</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="RESOLVED">Resolved</option>
            </select>

            <select
              className="border p-2 rounded"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="ALL">All Category</option>
              <option value="FRAUD">Fraud</option>
              <option value="HARASSMENT">Harassment</option>
              <option value="THEFT">Theft</option>
              <option value="TRAFFIC">Traffic</option>
              <option value="OTHER">Other</option>
            </select>

           
          </div>

          {/* Table */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="font-semibold text-lg mb-4">All Complaints</h2>

            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-100">
                    <th className="p-3 text-left">C_ID</th>
                  <th className="p-3 text-left">Title</th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Phone</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Category</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Location</th>
                  <th className="p-3 text-left">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredComplaints.length > 0 ? (
                  filteredComplaints.map((c) => (
                    <tr key={c.id} className="border-b hover:bg-gray-50">

                      <td className="p-3">{c.id}</td>
                      <td className="p-3">{c.title}</td>
                      <td className="p-3">{c.user?.name}</td>
                      <td className="p-3">{c.user?.phone}</td>
                      <td className="p-3">{c.user?.email}</td>
                      <td className="p-3">{c.category}</td>

                      <td className="p-3">
                        <span className={`px-2 py-1 rounded text-xs ${
                          c.status === "RESOLVED"
                            ? "bg-green-100 text-green-700"
                            : c.status === "IN_PROGRESS"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100"
                        }`}>
                          {c.status}
                        </span>
                      </td>

                      <td className="p-3">{c.location}</td>

                      <td className="p-3 space-x-2">
                        <button
                          disabled={c.status !== "NEW"}
                          onClick={() => navigate("/assign", { state: { complaintId: c.id } })}
                          className="bg-green-600 disabled:opacity-50 text-white px-2 py-1 rounded text-xs"
                        >
                          Assign
                        </button>

                      
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-6 text-gray-400">
                      No matching complaints
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>

        </div>
      </div>
    </div>
  );
}

// Reusable Stat Card Component
function StatCard({ title, value, color }) {
  const colors = {
    green: "bg-green-100 text-green-700",
    yellow: "bg-yellow-100 text-yellow-700",
    orange: "bg-orange-100 text-orange-700",
    blue: "bg-blue-100 text-blue-700",
  };

  return (
    <div className={`p-4 rounded shadow ${colors[color] || "bg-white"}`}>
      <h3 className="text-sm">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}