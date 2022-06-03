import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  getAllPosts,
  getAllUsers,
  getUserDetail,
} from "../firebase/firebase-calls";
import {
  Login,
  Signup,
  Profile,
  Posts,
  Followers,
  Following,
  ThirdPersonPage,
} from "features";
import {
  PrivateRoute,
  Home,
  Explore,
  Bookmark,
  Notification,
} from "components";
import "./App.css";

function App() {
  const { token } = useSelector((store) => store.authDetail);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) dispatch(getUserDetail(token));
  }, [dispatch, token]);

  useEffect(() => {
    if (token) dispatch(getAllPosts());
  }, [dispatch, token]);

  useEffect(() => {
    if (token) dispatch(getAllUsers());
  }, [dispatch, token]);

  return (
    <div>
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: "black",
            color: "#fff",
          },
        }}
      />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/bookmarks" element={<Bookmark />} />
          <Route path="/notifications" element={<Notification />} />
          <Route path="/:userId" element={<ThirdPersonPage />} />
          <Route path="/profile" element={<Profile />}>
            <Route path="/profile" element={<Posts />} />
            <Route path="/profile/followers" element={<Followers />} />
            <Route path="/profile/following" element={<Following />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
