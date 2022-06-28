import { useDispatch, useSelector } from "react-redux";

import { handlePostLike, handleBookmark } from "../utils";
import {
  Stack,
  IconButton,
  FavoriteBorderIcon,
  CommentIcon,
  BookmarkBorderIcon,
  FavoriteIcon,
  BookmarkIcon,
  Typography,
} from "utils/material-ui";

export const PostActionBtns = ({
  postId,
  postBy,
  post,
  setShowCommentSection,
}) => {
  const {
    userDetails: { likedPost, bookmarks },
  } = useSelector((store) => store.userDetail);
  const { token } = useSelector((store) => store.authDetail);
  const dispatch = useDispatch();

  const isPostLikedByCurrentUser = likedPost?.likedPost.includes(postId);
  const isPostBookmarkedByCurrentUser = bookmarks?.bookmarks.includes(postId);
  const { likes, comments } = post?.data || {};

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        justifyContent: "space-between",
        mx: 1,
        mt: 2,
      }}
    >
      <IconButton
        aria-label="Like"
        onClick={() => {
          isPostLikedByCurrentUser
            ? handlePostLike("dec", postId, dispatch, token, postBy)
            : handlePostLike("inc", postId, dispatch, token, postBy);
        }}
      >
        {isPostLikedByCurrentUser ? (
          <FavoriteIcon
            sx={{
              color: "red",
            }}
          />
        ) : (
          <FavoriteBorderIcon />
        )}
        {likes > 0 && (
          <Typography
            variant="span"
            sx={{
              ml: 1,
              fontSize: "0.875rem",
              color: "#5e5757",
            }}
          >
            {likes}
          </Typography>
        )}
      </IconButton>

      <IconButton
        aria-label="Comment"
        onClick={() => setShowCommentSection((s) => !s)}
      >
        <CommentIcon />
        {comments.length !== 0 && (
          <Typography
            variant="span"
            sx={{
              ml: 1,
              fontSize: "0.875rem",
              color: "#5e5757",
            }}
          >
            {comments.length}
          </Typography>
        )}
      </IconButton>

      <IconButton
        aria-label="Bookmark"
        onClick={() => {
          isPostBookmarkedByCurrentUser
            ? handleBookmark("remove", postId, token, dispatch)
            : handleBookmark("add", postId, token, dispatch);
        }}
      >
        {isPostBookmarkedByCurrentUser ? (
          <BookmarkIcon />
        ) : (
          <BookmarkBorderIcon />
        )}
      </IconButton>
    </Stack>
  );
};
