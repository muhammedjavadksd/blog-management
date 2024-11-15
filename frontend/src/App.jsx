import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { UserContextProvider } from "./context/UserContext";
import CreatePost from "./pages/CreatePost";
import PostDetails from "./pages/PostDetails";
import MyBlogs from "./pages/MyBlogs";
import EditPost from "./pages/EditPost";

function App() {
  return (
    <div>
      <UserContextProvider>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/write" element={<CreatePost />} />

          <Route exact path="/posts/post/:id" element={<PostDetails />} />
          <Route exact path="/myblogs/:id" element={<MyBlogs />} />
          <Route exact path="/edit/:id" element={<EditPost />} />
        </Routes>
        <Footer />
      </UserContextProvider>
    </div>
  );
}

export default App;
