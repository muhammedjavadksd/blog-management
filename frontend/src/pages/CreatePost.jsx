import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { URL } from '../url'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const CreatePost = () => {
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const { user } = useContext(UserContext)
    const navigate = useNavigate()

    const handleCreate = async (e) => {
        e.preventDefault()

        if (!title || !desc || !file) {
            toast.error("All fields are required.")
            return
        }

        setLoading(true)

        const post = {
            title,
            desc,
            username: user.username,
            userId: user._id,
        }

        if (file) {
            const data = new FormData()
            const filename = Date.now() + file.name
            data.append("img", filename)
            data.append("file", file)
            post.photo = filename

            try {
                await axios.post(URL + "/api/upload", data, { withCredentials: true })
            } catch (err) {
                console.log(err)
                setLoading(false)
                toast.error("Image upload failed!")
                return
            }
        }

        try {
            const res = await axios.post(URL + "/api/posts/create", post, { withCredentials: true })
            toast.success("Post created successfully!")
            navigate("/posts/post/" + res.data._id)
        } catch (err) {
            console.log(err)
            setLoading(false)
            toast.error("Failed to create post!")
        }
    }

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0]
        setFile(selectedFile)
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-center text-3xl font-semibold text-gray-800 mb-6">Create a Post</h1>
                <form onSubmit={handleCreate} className="space-y-5">
                    <input
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        placeholder="Post Title"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring focus:ring-indigo-500"
                    />

                    <div className="w-full">
                        <label className="block text-gray-600 font-medium mb-1">Choose an Image</label>
                        <input
                            onChange={handleFileChange}
                            type="file"
                            id="fileInput"
                            accept="image/*" // Only allow image files
                            className="hidden"
                        />
                        <label
                            htmlFor="fileInput"
                            className="block w-full text-center py-2 px-4 border border-dashed border-indigo-500 rounded-lg cursor-pointer text-indigo-600 hover:bg-indigo-50 focus:bg-indigo-50 transition"
                        >
                            {file ? file.name : "Select Image"}
                        </label>
                    </div>

                    <textarea
                        onChange={(e) => setDesc(e.target.value)}
                        rows={5}
                        placeholder="Post Description"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring focus:ring-indigo-500"
                    />

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-3 rounded-lg text-lg font-medium hover:bg-indigo-500 transition"
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="flex justify-center items-center">
                                <svg className="w-6 h-6 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 1116 0 8 8 0 01-16 0z"></path>
                                </svg>
                            </div>
                        ) : (
                            "Create Post"
                        )}
                    </button>
                </form>
            </div>

            <ToastContainer />
        </div>
    )
}

export default CreatePost
