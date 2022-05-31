import { useSelector } from "react-redux";

import { Post } from "features";
import { Box } from "utils/material-ui";

export const Posts = () => {
  const { posts } = useSelector((store) => store.posts);
  const { token } = useSelector((store) => store.authDetail);

  const postByUser = posts.filter((post) => post.data.postBy === token);
  return (
    <Box component="section">
      {postByUser.map((post) => (
        <Post post={post} key={post.data.dateCreated} />
      ))}
    </Box>
  );
};
