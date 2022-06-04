import { useState } from "react";
import { useSelector } from "react-redux";

import { Post } from "features";
import { AddPost } from "./AddPost";
import { SortPosts } from "./SortPost";
import { Box, CircularProgress, Typography, Stack } from "utils/material-ui";

export const Home = () => {
  const { userDetailLoading, userDetails: { following } = {} } = useSelector(
    (store) => store.userDetail
  );
  const { posts } = useSelector((store) => store.posts);
  const { token } = useSelector((store) => store.authDetail);

  const [loadingPosts, setLoadingPosts] = useState(false);
  const [sortPost, setSortPost] = useState("latest");
  const [trendingPosts, setTrendingPosts] = useState(false);

  let filteredPosts = posts.filter(({ data }) => {
    return (
      following?.following.includes(data?.postBy) || data?.postBy === token
    );
  });

  if (sortPost === "oldest") {
    filteredPosts = filteredPosts.reverse();
  }

  if (trendingPosts) {
    filteredPosts = filteredPosts.sort((a, b) => {
      return b.data.likes - a.data.likes;
    });
  }

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

          <Stack
            direction="row"
            p={1}
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "white",
              borderTop: 1,
            }}
          >
            <Typography
              variant="h4"
              component="h4"
              sx={{
                fontWeight: 600,
              }}
            >
              Posts
            </Typography>
            <SortPosts
              sortPost={sortPost}
              setSortPost={setSortPost}
              trendingPosts={trendingPosts}
              setTrendingPosts={setTrendingPosts}
            />
          </Stack>

          <Box component="section">
            {filteredPosts.map((post) => (
              <Post post={post} key={post?.data.dateCreated} />
            ))}
          </Box>
        </>
      )}
    </Box>
  );
};
