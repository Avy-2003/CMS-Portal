import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function OfficersListPage() {

  const navigate = useNavigate();

 const [complaintIds, setComplaintIds] = useState({});

  const [officers, setOfficers] = useState([]);
  const [loadingOfficerId, setLoadingOfficerId] = useState(null);



  // fetch officershttps://diplomatic-upliftment-production.up.railway.app
  useEffect(() => {
    axios
      .get("https://diplomatic-upliftment-production.up.railway.app/users/officers/stats")
      .then((res) => {
        console.log("OFFICERS:", res.data);
        setOfficers(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  // assign complaint
  const assignComplaint = (officerId) => {

    setLoadingOfficerId(officerId);

    axios
      .put(
        `https://diplomatic-upliftment-production.up.railway.app/complaints/${complaintIds[officerId]}/assign?officerId=${officerId}`
      )
      .then(() => {
        alert("Complaint Assigned Successfully");

        navigate("/admin");
      })
      .catch((err) => {
        console.error(err);
        alert("Assignment Failed");
      })
      .finally(() => {
        setLoadingOfficerId(null);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Officers Dashboard
          </h1>

          <p className="text-gray-500 mt-1">
            Assign complaint to available officers
          </p>
        </div>

        <button
          onClick={() => navigate("/admin-dashboard")}
          className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg"
        >
          Back
        </button>

      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {officers.length > 0 ? (
          officers.map((o) => (

            <div
              key={o.id}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300 border border-gray-100"
            >

              {/* Top */}
              <div className="flex items-center justify-between mb-5">

                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {o.name}
                  </h2>

                  <p className="text-sm text-gray-400">
                    Officer ID : #{o.id}
                  </p>
                </div>

                {/* Count Badge */}
                <div>
                  <span className="bg-green-100 px-4 py-2 rounded-full text-sm font-bold">
  {o.count} Cases
</span>
                </div>

              </div>

              {/* Details */}
              <div className="space-y-3 text-sm">

                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">Phone</span>
                  <span className="font-medium text-gray-700">
                    {o.phone}
                  </span>
                </div>

                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">Email</span>
                  <span className="font-medium text-gray-700 break-all">
                    {o.email}
                  </span>
                </div>

                <input
  type="number"
  placeholder="Enter Complaint ID"
  value={complaintIds[o.id] || ""}
onChange={(e) =>
  setComplaintIds({
    ...complaintIds,
    [o.id]: e.target.value,
  })
}
  className="w-full border px-3 py-2 rounded-lg mt-4"
/>

              </div>

              {/* Button */}
              <button
                onClick={() => assignComplaint(o.id)}
                disabled={loadingOfficerId === o.id}
                className={`w-full mt-6 py-3 rounded-xl text-white font-semibold transition duration-300
                  
                  ${
                    loadingOfficerId === o.id
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  }
                `}
              >
                {loadingOfficerId === o.id
                  ? "Assigning..."
                  : "Assign Complaint"}
              </button>

            </div>
          ))
        ) : (
          <div className="col-span-full bg-white rounded-xl p-10 text-center shadow">
            <p className="text-gray-400 text-lg">
              No officers found
            </p>
          </div>
        )}

      </div>
    </div>
  );
}