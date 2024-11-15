import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useState } from "react";
import axios from 'axios';
import { URL } from '../url';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleRegister = async () => {
    setLoading(true); // Start loading
    try {
      await axios.post(URL + "/api/auth/register", { username, email, password });
      setUsername("");
      setEmail("");
      setPassword("");
      setError(false);
      toast.success("Registration successful!"); // Show success toast
      setTimeout(() => navigate("/login"), 2000); // Delay before navigating to login page
    } catch (err) {
      setError(true);
      toast.error("Registration failed. Please try again.");
      console.log(err);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={2000} />

      {/* Registration Form */}
      <div className="w-full flex justify-center items-center h-[80vh]">
        <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%] bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-xl font-bold text-left">Create an Account</h1>
          <input 
            onChange={(e) => setUsername(e.target.value)} 
            value={username}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded outline-none focus:border-indigo-500" 
            type="text" 
            placeholder="Enter your username" 
          />
          <input 
            onChange={(e) => setEmail(e.target.value)} 
            value={email}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded outline-none focus:border-indigo-500" 
            type="email" 
            placeholder="Enter your email" 
          />
          <input 
            onChange={(e) => setPassword(e.target.value)} 
            value={password}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded outline-none focus:border-indigo-500" 
            type="password" 
            placeholder="Enter your password" 
          />
          <button 
            onClick={handleRegister} 
            disabled={loading} // Disable button when loading
            className={`w-full px-4 py-2 text-lg font-bold text-white ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-500"
            } rounded-lg transition duration-200 ease-in-out`}>
            {loading ? "Registering..." : "Register"}
          </button>
          {error && <h3 className="text-red-500 text-sm">Something went wrong. Please try again.</h3>}
          <div className="flex justify-center items-center space-x-2">
            <p>Already have an account?</p>
            <Link to="/login" className="text-indigo-500 hover:text-indigo-700 transition duration-200">Login</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
