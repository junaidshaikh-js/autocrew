import { useSelector } from "react-redux";

import { Post } from "features";
import { Box, Typography, theme } from "utils/material-ui";

export const Explore = () => {
  const { posts } = useSelector((store) => store.posts);

  return (
    <Box
      component="main"
      sx={{
        border: 1,
      }}
    >
      <Box component="header" my={2} mx={1}>
        <Typography
          variant="h1"
          theme={theme}
          sx={{
            fontWeight: "bold",
          }}
        >
          Explore
        </Typography>
      </Box>
      <Box component="section">
        {posts.map((post) => (
          <Post postData={post} key={post.dateCreated} />
        ))}
      </Box>
    </Box>
  );
};
