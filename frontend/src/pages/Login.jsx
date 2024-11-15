import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../url";
import { UserContext } from "../context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false); 
  const { setUser,user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${URL}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      setUser(res.data);
      toast.success("Login successful!");
  
      // Redirect to home page after successful login
      
    } catch (err) {
      setError(true);
      toast.error("Login failed. Please try again.");
      console.log(err);
    } finally {
      setLoading(false); // Stop loading
    }
  };
  useEffect(() => {
    if (user) {
      // Redirect to home if the user is already logged in
      navigate("/", { replace: true }); // replace ensures they cannot go back
    }
  }, [user, navigate]);

  return (
    <>
      <ToastContainer position="top-center" autoClose={2000} />

      <div className="w-full flex justify-center items-center h-[80vh] bg-gray-50">
        <div className="flex flex-col justify-center items-center space-y-6 w-[90%] md:w-[30%] p-8 bg-white shadow-lg rounded-lg border border-gray-200">
          <h1 className="text-2xl font-bold text-center text-gray-800">
            Log in to your account
          </h1>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-700 placeholder-gray-500"
            type="text"
            placeholder="Enter your email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-700 placeholder-gray-500"
            type="password"
            placeholder="Enter your password"
          />
          <button
            onClick={handleLogin}
            disabled={loading} // Disable button when loading
            className={`w-full px-4 py-3 font-semibold text-white ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-purple-600 hover:to-indigo-600"
            } rounded-lg shadow-md hover:shadow-lg transform transition-all duration-300`}
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
          {error && (
            <h3 className="text-red-500 text-sm text-center">
              Something went wrong
            </h3>
          )}
          <div className="flex justify-center items-center space-x-3">
            <p className="text-gray-600">New here?</p>
            <Link
              to="/register"
              className="text-indigo-600 hover:text-indigo-800 font-semibold transition-all duration-300"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
