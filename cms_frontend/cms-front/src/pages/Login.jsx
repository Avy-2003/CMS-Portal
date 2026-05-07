import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  

  const handleLogin = async () => {
    try {
      const res = await axios.post("https://diplomatic-upliftment-production.up.railway.app/auth/login", {
        email,
        password,
      });
   
      const user = res.data;
      console.log(user);

      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "ADMIN") {
        navigate("/admin");
      } else if (user.role === "OFFICER") {
        navigate("/officer");
      } else {
        navigate("/user");
      }
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">

      <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-96">

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login to CMS
        </h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Enter your password"
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>

        {/* Contact Admin */}
        <p className="text-sm text-gray-600 text-center mt-4">
          Not registered?{" "}
          <span className="text-blue-600 font-medium">
            Contact Admin
          </span>
        </p>

      </div>
    </div>
  );
};

export default Login;