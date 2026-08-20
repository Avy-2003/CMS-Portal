import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_LOCAL_URL;
export default function AssignOfficerPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedComplaintId = location.state?.complaintId || "";

  const [complaintIds, setComplaintIds] = useState({});
  const [officers, setOfficers] = useState([]);
  const [loadingOfficerId, setLoadingOfficerId] = useState(null);


  // fetch officers
  useEffect(() => {
    axios
      .get(`${BASE_URL}/users/officers/stats`)
      .then((res) => setOfficers(res.data))
      .catch((err) => console.error(err));
  }, []);

  const assignComplaint = (officerId) => {
    const complaintId = complaintIds[officerId] || selectedComplaintId;

    if (!complaintId) {
      alert("Please enter or select a complaint ID before assigning.");
      return;
    }

    setLoadingOfficerId(officerId);

    axios
      .put(`${BASE_URL}/complaints/${complaintId}/assign?officerId=${officerId}`)
      .then(() => {
        alert("Complaint assigned successfully.");
        navigate("/admin");
      })
      .catch((err) => {
        console.error(err);
        alert("Assignment failed. Please try again.");
      })
      .finally(() => setLoadingOfficerId(null));
  };

  return (
    <div className="min-h-screen bg-slate-50 py-6">
      <div className="mx-auto w-[90vw] max-w-none px-4 sm:px-6 lg:px-8">
        <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Officer Assignment</p>
              <h1 className="mt-3 text-3xl font-semibold text-slate-900">Assign Complaint to Officer</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                Assign complaints to the right officer quickly. Use the complaint ID from the admin complaint list or enter it manually below.
              </p>
            </div>
            <button
              onClick={() => navigate("/admin")}
              className="inline-flex items-center justify-center rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Back to Admin
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {officers.length > 0 ? (
            officers.map((officer) => (
              <div
                key={officer.id}
                className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900">{officer.name}</h2>
                    <p className="mt-1 text-sm text-slate-500">Officer #{officer.id}</p>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                    {officer.count} cases
                  </span>
                </div>

                <div className="mt-6 space-y-4 text-sm text-slate-600">
                  <div className="rounded-3xl bg-slate-50 p-4">
                    <p className="text-slate-500">Phone</p>
                    <p className="mt-1 font-medium text-slate-900">{officer.phone}</p>
                  </div>
                  <div className="rounded-3xl bg-slate-50 p-4">
                    <p className="text-slate-500">Email</p>
                    <p className="mt-1 break-all font-medium text-slate-900">{officer.email}</p>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <label className="block text-sm font-medium text-slate-700">Complaint ID</label>
                  <input
                    type="number"
                    placeholder={selectedComplaintId ? `Complaint ID (${selectedComplaintId})` : "Enter complaint ID"}
                    value={complaintIds[officer.id] ?? selectedComplaintId}
                    onChange={(e) =>
                      setComplaintIds((prev) => ({
                        ...prev,
                        [officer.id]: e.target.value,
                      }))
                    }
                    className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <button
                  onClick={() => assignComplaint(officer.id)}
                  disabled={loadingOfficerId === officer.id}
                  className={`mt-6 w-full rounded-3xl px-4 py-3 text-sm font-semibold text-white transition ${
                    loadingOfficerId === officer.id
                      ? "bg-slate-400 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  }`}
                >
                  {loadingOfficerId === officer.id ? "Assigning..." : "Assign Complaint"}
                </button>
              </div>
            ))
          ) : (
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-10 text-center shadow-sm">
              <p className="text-lg font-medium text-slate-700">No officers available right now.</p>
              <p className="mt-2 text-sm text-slate-500">Refresh the page or come back later.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}