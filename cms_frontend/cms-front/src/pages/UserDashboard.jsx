import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function UserDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;
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

const [complaints, setComplaints] = useState([]);

useEffect(() => {

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.role !== "CITIZEN") {
    navigate("/login");
  }

}, []);


useEffect(() => {
    if (!userId) return;

    axios
      .get(`http://localhost:8080/complaints/user/${userId}`)
      .then((res) => setComplaints(res.data))
      .catch((err) => console.error(err));
  }, [user?.id]);

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
    .get(`http://localhost:8080/complaints/user/${user.id}/stats`)
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
  if (!newComplaint.category || !newComplaint.location) {
    alert("Category and Location required");
    return;
  }

  axios
    .post("http://localhost:8080/complaints", {
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
    

    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-blue-400 text-white p-6">
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
          <h1 className="font-semibold text-lg">Citizen Dashboard</h1>

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
      <h3 className="text-sm text-gray-500">Total Complaints</h3>
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
      <h3 className="text-sm text-gray-500">In-Progress</h3>
      <p className="text-2xl font-bold text-orange-700">{stats.inProgress}</p>
    </div>

    <div className="bg-blue-100 p-4 rounded">
      <h3 className="text-sm text-gray-500">New</h3>
      <p className="text-2xl font-bold text-blue-700">{stats.new}</p>
    </div>

  </div>
</div>

          {/* Raise Complaint */}
    <div className="flex justify-center">
  <div className="bg-white p-6 rounded shadow mb-6 w-full max-w-md">
    <h2 className="font-semibold mb-4 text-center">Raise Complaint</h2>

    {/* Category Dropdown */}
    <select
      className="w-full mb-3 p-2 border rounded"
      value={newComplaint.category}
      onChange={(e) =>
        setNewComplaint({ ...newComplaint, category: e.target.value })
      }
    >
      <option value="">Select Category</option>
      <option value="FRAUD">Fraud</option>
      <option value="HARASSMENT">Harassment</option>
      <option value="THEFT">Theft</option>
      <option value="TRAFFIC">Traffic</option>
      <option value="OTHER">Other</option>
    </select>

    {/* Title */}
    <input
      placeholder="Title"
      className="w-full mb-3 p-2 border rounded"
      value={newComplaint.title}
      onChange={(e) =>
        setNewComplaint({ ...newComplaint, title: e.target.value })
      }
    />

    {/* Description */}
    <textarea
      placeholder="Description"
      className="w-full mb-3 p-2 border rounded"
      value={newComplaint.description}
      onChange={(e) =>
        setNewComplaint({ ...newComplaint, description: e.target.value })
      }
    />

    {/* Location */}
    <input
      placeholder="Location"
      className="w-full mb-4 p-2 border rounded"
      value={newComplaint.location}
      onChange={(e) =>
        setNewComplaint({ ...newComplaint, location: e.target.value })
      }
    />

    {/* Submit */}
    <button
      onClick={handleSubmit}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
    >
      Submit Complaint
    </button>
  </div>
</div>

          {/* Complaint List */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
  <h2 className="font-semibold text-lg mb-4">My Complaints</h2>

  <div className="overflow-x-auto">
    <table className="w-full text-sm border-collapse">
      
      {/* Header */}
      <thead>
        <tr className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
          <th className="text-left px-4 py-3">C_ID</th>
          <th className="text-left px-4 py-3">Title</th>
          <th className="text-left px-4 py-3">Description</th>
          <th className="text-left px-4 py-3">Status</th>
          <th className="text-left px-4 py-3">Location</th>
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
              <td className="px-4 py-3 font-medium text-gray-800">
                {c.id}
              </td>

              <td className="px-4 py-3 font-medium text-gray-800">
                {c.title}
              </td>

              <td className="px-4 py-3">
                {c.description}
              </td>

              <td className="px-4 py-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    c.status === "RESOLVED"
                      ? "bg-green-100 text-green-700"
                      : c.status === "IN_PROGRESS"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {c.status}
                </span>
              </td>

              <td className="px-4 py-3 text-gray-600">
                {c.location}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="3" className="text-center py-6 text-gray-400">
              No complaints found
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