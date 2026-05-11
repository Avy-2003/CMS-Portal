import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function OfficerDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [complaints, setComplaints] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    resolved: 0,
    pending: 0,
    inProgress: 0,
    new: 0,
  });

  const [profile, setProfile] = useState({
  name: "",
  phone: "",
  email: ""
});

useEffect(() => {

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.role !== "OFFICER") {
    navigate("/login");
  }

}, []);

useEffect(() => {
  if (!user?.id) return;

  axios
    .get(`http://localhost:8080/users/${user.id}`)
    .then((res) => {
      setProfile(res.data); // full object
    })
    .catch((err) => console.error(err));
}, [user?.id]);


  useEffect(() => {
    if (!user?.id) return;

    axios
      .get(`http://localhost:8080/complaints/officer/${user.id}`)
      .then((res) => {
        setComplaints(res.data);

        // calculate stats
        const data = res.data;

        setStats({
          total: data.length,
          resolved: data.filter(c => c.status === "RESOLVED").length,
          pending: data.filter(c => c.status === "PENDING").length,
          inProgress: data.filter(c => c.status === "IN_PROGRESS").length,
          new: data.filter(c => c.status === "NEW").length,
        });
      })
      .catch((err) => console.error(err));
  }, []);

  // update status
  const updateStatus = (id, status) => {
    axios
      .put(`http://localhost:8080/complaints/${id}/status?status=${status}`)
      .then(() => {
        // refresh data
        window.location.reload();
      })
      .catch((err) => console.error(err));
  };

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
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col">

        {/* Navbar */}
        <div className="bg-white shadow px-6 py-4 flex justify-between">
          <h1 className="font-semibold text-lg">Officer Dashboard</h1>

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

            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-sm text-gray-500">Total</h3>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>

            <div className="bg-green-100 p-4 rounded">
              <h3 className="text-sm text-gray-500">Resolved</h3>
              <p className="text-2xl font-bold text-green-700">{stats.resolved}</p>
            </div>

            <div className="bg-yellow-100 p-4 rounded">
              <h3 className="text-sm text-gray-500">Pending</h3>
              <p className="text-2xl font-bold text-yellow-700">{stats.pending}</p>
            </div>

            <div className="bg-orange-100 p-4 rounded">
              <h3 className="text-sm text-gray-500">In Progress</h3>
              <p className="text-2xl font-bold text-orange-700">{stats.inProgress}</p>
            </div>

             <div className="bg-blue-100 p-4 rounded">
      <h3 className="text-sm text-gray-500">New</h3>
      <p className="text-2xl font-bold text-blue-700">{stats.new}</p>
    </div>

          </div>

          {/* Complaint Table */}
          <div className="bg-white p-6 rounded-2xl shadow-lg mt-6">
  <h2 className="font-semibold text-lg mb-5">Assigned Complaints</h2>

  <div className="overflow-x-auto">
    <table className="w-full text-sm border-collapse">

      {/* Header */}
      <thead>
        <tr className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
           <th className="text-left px-4 py-3">C_ID</th>
          <th className="text-left px-4 py-3">Title</th>
            <th className="text-left px-4 py-3">Description</th>
          <th className="text-left px-4 py-3">Name</th>
          <th className="text-left px-4 py-3">Phone</th>
          <th className="text-left px-4 py-3">Email</th>
          <th className="text-left px-4 py-3">Status</th>
          <th className="text-left px-4 py-3">Location</th>
          <th className="text-left px-4 py-3">Action</th>
        </tr>
      </thead>

      {/* Body */}
     <tbody className="divide-y">
  {complaints.length > 0 ? (
    complaints.map((c) => (
      <tr
        key={c.id}
        className="hover:bg-gray-50 transition duration-200"

        
      >

        {/* C_ID */}
        <td className="px-4 py-3">
          {c.id}
        </td>

        {/* Title */}
        <td className="px-4 py-3 font-medium text-gray-800">
          {c.title}
        </td>
       
       {/* Description */}
        <td className="px-4 py-3 font-medium text-gray-800">
          {c.description}
        </td>
      

        {/* Name */}
        <td className="px-4 py-3">
          {c.userName}
        </td>

        {/* Phone */}
        <td className="px-4 py-3">
          {c.userPhone}
        </td>

        {/* Email */}
        <td className="px-4 py-3">
          {c.userEmail}
        </td>

        {/* Status */}
        <td className="px-4 py-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              c.status === "RESOLVED"
                ? "bg-green-100 text-green-700"
                : c.status === "IN_PROGRESS"
                ? "bg-yellow-100 text-yellow-700"
                : c.status === "NEW"
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {c.status.replace("_", " ")}
          </span>
        </td>

        {/* Location */}
        <td className="px-4 py-3 text-gray-600">
          {c.location}
        </td>

        {/* Action */}
        <td className="px-4 py-3">
          <div className="flex gap-2">
            <button
             onClick={() => updateStatus(c.id, "IN_PROGRESS")}
  disabled={
    c.status === "IN_PROGRESS" || c.status === "RESOLVED"
  }
  className={`px-3 py-1 rounded text-xs text-white ${
    c.status === "IN_PROGRESS" || c.status === "RESOLVED"
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-yellow-500 hover:bg-yellow-600"
  }`}
            >
              Start
            </button>

            <button
              onClick={() => updateStatus(c.id, "RESOLVED")}
              disabled={c.status === "RESOLVED"}
              className={`px-3 py-1 rounded text-xs text-white ${
                c.status === "RESOLVED"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
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
      <td colSpan="7" className="text-center py-6 text-gray-400">
        No complaints assigned
      </td>
    </tr>
  )}
</tbody>
    </table>
  </div>
</div>

        </div>
      </div>
    </div>
  );
}