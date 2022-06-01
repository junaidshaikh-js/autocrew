import { useSelector } from "react-redux";

import { Post } from "features";
import { Box, Typography, theme } from "utils/material-ui";

export const Bookmark = () => {
  const { posts } = useSelector((store) => store.posts);
  const {
    userDetails: { bookmarks },
  } = useSelector((store) => store.userDetail);

  const postBookmarkedByUser = posts.filter((_post) =>
    bookmarks?.bookmarks.includes(_post.id)
  );

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
          Your Bookmarks
        </Typography>
      </Box>
      <Box component="section">
        {postBookmarkedByUser.map((post) => (
          <Post post={post} key={post.data.dateCreated} />
        ))}
      </Box>
    </Box>
  );
};
