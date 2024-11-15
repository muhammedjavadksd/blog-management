import axios from "axios";
import Footer from "../components/Footer";
import HomePosts from "../components/HomePosts";
import Navbar from "../components/Navbar";
import { URL } from "../url";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import { UserContext } from "../context/UserContext";

const Home = () => {
  const { search } = useLocation();
  const [posts, setPosts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(false);
  const { user } = useContext(UserContext);

  const fetchPosts = async () => {
    setLoader(true);
    try {
      const res = await axios.get(`${URL}/api/posts/${search}`, {
        withCredentials: true, headers: {
          authorization: `Bearer ${user?.token}`
        }
      });
      setPosts(res.data);
      setNoResults(res.data.length === 0);
      setLoader(false);
    } catch (err) {
      console.log(err);
      setLoader(false);
      setNoResults(true);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [search]);

  return (
    <>
      <div className="bg-gray-50 min-h-[80vh] py-10">
        <div className="text-center my-12 px-4">
          <h1 className="text-5xl font-extrabold text-indigo-800 mb-4">
            Explore Our Latest Blogs
          </h1>

        </div>
        <div className="px-8 md:px-[200px]">
          {loader ? (
            <div className="h-[40vh] flex justify-center items-center">
              <Loader />
            </div>
          ) : noResults ? (
            <h3 className="text-center font-bold mt-16 text-gray-600">
              No posts available
            </h3>
          ) : (
            <div className="grid grid-cols-2 gap-8">
              {posts.map((post) => (

                <Link
                  to={user ? `/posts/post/${post._id}` : "/login"}
                  key={post._id}
                  className="block transition-transform transform hover:scale-105"
                >
                  <HomePosts post={post} />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
