import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { URL } from "../url";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const EditPost = () => {
  const { id: postId } = useParams();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPost = async () => {
    try {
      const res = await axios.get(URL + "/api/posts/" + postId);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      setFile(res.data.photo);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load post data!");
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const handleEdit = async (e) => {
    e.preventDefault();

    if (!title || !desc || !file) {
      toast.error("All fields are required.")
      return
  }

    setLoading(true);

    const post = {
      title,
      desc,
      username: user.username,
      userId: user._id,
    };

    const data = new FormData();
    const filename = Date.now() + file.name;
    data.append("img", filename);
    data.append("file", file);
    post.photo = filename;

    try {
      await axios.post(URL + "/api/upload", data);
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error("Image upload failed!");
      return;
    }

    try {
      const res = await axios.put(URL + "/api/posts/" + postId, post, {
        withCredentials: true,
      });
      toast.success("Post updated successfully!");
      navigate("/posts/post/" + res.data._id);
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error("Failed to update post!");
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-8 px-4">
      <br />
      <br />
      <div className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all">
        <h1 className="text-center text-3xl font-semibold text-gray-800 mb-6">
          Edit Post
        </h1>
        <form onSubmit={handleEdit} className="space-y-6">
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700">Title</label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type="text"
              placeholder="Post Title"
              className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700">Choose an Image</label>
            <input
              onChange={handleFileChange}
              type="file"
              id="fileInput"
              accept="image/*"
              className="hidden"
            />
            <label
              htmlFor="fileInput"
              className="block w-full mt-2 py-4 px-4 border-2 border-dashed border-indigo-500 rounded-lg cursor-pointer text-indigo-600 text-center hover:bg-indigo-50 transition"
            >
              {file ? file.name : "Select Image"}
            </label>
          </div>

          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700">Description</label>
            <textarea
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
              rows={5}
              placeholder="Post Description"
              className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg text-lg font-medium hover:bg-indigo-500 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <svg
                  className="w-6 h-6 text-white animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 1116 0 8 8 0 01-16 0z"
                  ></path>
                </svg>
              </div>
            ) : (
              "Update Post"
            )}
          </button>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default EditPost;
