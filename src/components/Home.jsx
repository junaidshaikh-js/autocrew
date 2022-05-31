import { useState } from "react";
import { useSelector } from "react-redux";

import { Post } from "features";
import { AddPost } from "./AddPost";
import { Box, CircularProgress } from "utils/material-ui";

export const Home = () => {
  const { userDetailLoading } = useSelector((store) => store.userDetail);
  const { posts } = useSelector((store) => store.posts);

  const [loadingPosts, setLoadingPosts] = useState(false);

  return (
    <Box component="main" sx={{ border: 1 }}>
      {userDetailLoading === "loading" ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <CircularProgress size="4rem" />
        </Box>
      ) : (
        <>
          <Box component="section">
            <AddPost
              loadingPosts={loadingPosts}
              setLoadingPosts={setLoadingPosts}
            />
          </Box>

          <Box component="section">
            {posts.map((post) => (
              <Post postData={post} key={post.dateCreated} />
            ))}
          </Box>
        </>
      )}
    </Box>
  );
};
