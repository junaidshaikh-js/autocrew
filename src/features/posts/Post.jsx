import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";

import {
  bookmarkPost,
  dislikePost,
  likePost,
  removePostFromBookmark,
} from "../../firebase/firebase-calls";
import { updatePostLike } from "features/posts/postSlice";
import {
  updateLikedPosts,
  updateLikedPostsForDislike,
  addToBookmark,
  removeFromBookmark,
} from "features/user-data/userSlice";
import {
  Box,
  Stack,
  Button,
  Avatar,
  Typography,
  GrayTextP,
  IconButton,
  FavoriteBorderIcon,
  CommentIcon,
  BookmarkBorderIcon,
  FavoriteIcon,
  BookmarkIcon,
} from "utils/material-ui";

export const Post = ({ post }) => {
  const { users } = useSelector((store) => store.users);
  const { token } = useSelector((store) => store.authDetail);
  const {
    userDetails: { likedPost, bookmarks },
  } = useSelector((store) => store.userDetail);
  const dispatch = useDispatch();

  const { postText, postImageUrl, postImageName, likes, comments } =
    post?.data || {};

  const postBy = users.find((user) => user.id === post?.data.postBy);

  const { data: { profilePicture, fullName, userName } = {} } = postBy || {};

  const isPostLikedByCurrentUser = likedPost.likedPost.includes(post.id);
  const isPostBookmarkedByCurrentUser = bookmarks.bookmarks.includes(post.id);

  const handlePostLike = async (postAction) => {
    try {
      if (postAction) {
        await dislikePost(post.id, token);
        dispatch(updatePostLike({ id: post.id, count: -1 }));
        dispatch(updateLikedPostsForDislike(post.id));
      } else {
        await likePost(post.id, token);
        dispatch(updatePostLike({ id: post.id, count: 1 }));
        dispatch(updateLikedPosts(post.id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBookmark = async (postAction) => {
    try {
      if (postAction === "remove") {
        await removePostFromBookmark(post.id, token);
        dispatch(removeFromBookmark(post.id));
        toast.success("Post removed from bookmark");
      } else {
        await bookmarkPost(post.id, token);
        dispatch(addToBookmark(post.id));
        toast.success("Post bookmarked");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box component="article">
      <Stack
        component="section"
        direction="row"
        spacing={2}
        sx={{
          backgroundColor: "white",
          px: 1,
          py: 2,
          borderTop: 1,
        }}
      >
        <Box>
          <Button
            component={Link}
            to="/profile"
            sx={{
              borderRadius: "999px",
            }}
          >
            <Avatar
              sx={{
                bgcolor: "#1565C0",
                width: 60,
                height: 60,
                fontSize: "3rem",
                mx: "auto",
                objectFit: "contain",
                border: 1,
              }}
              src={profilePicture}
            />
          </Button>
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            position: "relative",
          }}
        >
          <Stack
            direction="row"
            spacing={1}
            sx={{
              mt: 1,
              mb: "0.5rem",
            }}
          >
            <Typography>{fullName}</Typography>
            <GrayTextP>{userName}</GrayTextP>
          </Stack>

          <Box>
            <Typography>{postText}</Typography>

            {postImageUrl && (
              <Box
                component="figure"
                sx={{
                  width: "80%",
                  m: 0,
                  mt: 4,
                  border: 1,
                  borderRadius: "10px",
                  objectFit: "contain",
                  overflow: "hidden",
                }}
              >
                <img
                  src={postImageUrl}
                  alt={postImageName}
                  loading="lazy"
                  height="auto"
                  width="100%"
                />
              </Box>
            )}
          </Box>

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
                  ? handlePostLike("dec")
                  : handlePostLike();
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
                  }}
                >
                  {likes}
                </Typography>
              )}
            </IconButton>

            <IconButton aria-label="Comment">
              <CommentIcon />
              {!comments && (
                <Typography
                  variant="span"
                  sx={{
                    ml: 1,
                    fontSize: "0.875rem",
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
                  ? handleBookmark("remove")
                  : handleBookmark();
              }}
            >
              {isPostBookmarkedByCurrentUser ? (
                <BookmarkIcon />
              ) : (
                <BookmarkBorderIcon />
              )}
            </IconButton>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};
