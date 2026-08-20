import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserDashboard from "./pages/UserDashboard";
import OfficerDashboard from "./pages/OfficerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Home from "./pages/Home";
import AssignOfficerPage from "./pages/AssignOfficerPage";
import ComplaintEmailTemplate from "./ComplaintEmailTemplate";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/officer" element={<OfficerDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/assign" element={<AssignOfficerPage />} />
        <Route path="/complaint-email" element={<ComplaintEmailTemplate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;