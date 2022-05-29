import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AddPost } from "./AddPost";
import { getUserDetail } from "../firebase/firebase-calls";
import { Box, CircularProgress } from "utils/material-ui";

export const Home = () => {
  const { token } = useSelector((store) => store.authDetail);
  const { userDetailLoading } = useSelector((store) => store.userDetail);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userDetailLoading === "idle") {
      dispatch(getUserDetail(token));
    }
  }, [dispatch, userDetailLoading, token]);

  return (
    <Box component="main">
      {userDetailLoading === "loading" ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "60vh",
          }}
        >
          <CircularProgress size="4rem" />
        </Box>
      ) : (
        <AddPost />
      )}
    </Box>
  );
};
