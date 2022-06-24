import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";

import {
  handlePostLike,
  handleBookmark,
  handlePostDelete,
} from "features/posts/utils";
import {
  CommentSection,
  PostMenu,
  DeleteConfirmationModal,
  EditPostModal,
} from "features";
import { ReactPortal } from "./ReactPortal";
import {
  Box,
  KeyboardBackspaceIcon,
  IconButton,
  Typography,
  Stack,
  Avatar,
  GrayTextP,
  CircularProgress,
  FavoriteIcon,
  FavoriteBorderIcon,
  BookmarkIcon,
  BookmarkBorderIcon,
} from "utils/material-ui";

export const SinglePost = () => {
  const { postId } = useParams();

  const { posts } = useSelector((store) => store.posts);
  const { users } = useSelector((store) => store.users);
  const {
    userDetails: { posts: userPosts, likedPost, bookmarks },
  } = useSelector((store) => store.userDetail);
  const { token } = useSelector((store) => store.authDetail);
  const dispatch = useDispatch();

  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] =
    useState(false);
  const [showEditPostModal, setShowEditPostModal] = useState(false);

  const post = posts.find((_post) => _post.id === postId);
  const { postText, postImageUrl, postImageName, dateCreated, likes } =
    post?.data || {};
  const postBy = users.find((user) => user.id === post?.data.postBy);
  const { data: { profilePicture, fullName, userName } = {} } = postBy || {};
  const isPostPostedByCurrentUser = userPosts?.posts?.includes(postId);
  const isPostLikedByCurrentUser = likedPost?.likedPost.includes(postId);
  const isPostBookmarkedByCurrentUser = bookmarks?.bookmarks.includes(postId);
  const navigate = useNavigate();

  const getPostDate = (dateCreated) => {
    const postDate = new Date(dateCreated);
    const months = [
      "Jan",
      "Feb",
      "March",
      "Apr",
      "May",
      "Jun",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];

    const month = months[postDate.getMonth()];
    const date = postDate.getDate();
    const year = postDate.getFullYear();

    return `${month} ${date}, ${year}`;
  };

  return (
    <>
      {!post ? (
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
        <Box component="main" sx={{ border: 1, p: 1, position: "relative" }}>
          <Stack direction="row" alignItems="center">
            <IconButton
              onClick={() => navigate(-1)}
              sx={{
                mr: 1,
              }}
            >
              <KeyboardBackspaceIcon />
            </IconButton>
            <Typography
              sx={{
                fontWeight: "600",
                fontSize: "1.2rem",
              }}
            >
              Posts
            </Typography>
          </Stack>

          <Stack direction="row" mt={2} mx={2}>
            <Box
              component={Link}
              to={isPostPostedByCurrentUser ? "/profile" : `/${postBy?.id}`}
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
            </Box>

            <Stack
              spacing={1}
              alignItems="center"
              justifyContent="center"
              sx={{
                mb: "0.5rem",
                ml: 1,
              }}
            >
              <Typography>{fullName}</Typography>
              <GrayTextP>@{userName}</GrayTextP>
            </Stack>
          </Stack>

          <Box
            mx={2}
            mt={4}
            mb={2}
            pb={2}
            sx={{
              wordBreak: "break-all",
            }}
          >
            <Typography>{postText}</Typography>

            {postImageUrl && (
              <Box
                component="figure"
                sx={{
                  width: { sm: "0%", md: "80%" },
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

          <Box mx={2}>
            <Typography component="time">
              {new Date(dateCreated).toLocaleTimeString()} <span> • </span>
            </Typography>

            <Typography component="time">{getPostDate(dateCreated)}</Typography>
          </Box>

          <Stack
            direction="row"
            spacing={2}
            sx={{
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
                  }}
                >
                  {likes}
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

          <Box my={2}>
            <CommentSection post={post} />
          </Box>

          {isPostPostedByCurrentUser && (
            <PostMenu
              setShowEditPostModal={setShowEditPostModal}
              setShowDeleteConfirmationModal={setShowDeleteConfirmationModal}
            />
          )}

          {showDeleteConfirmationModal && (
            <ReactPortal>
              <DeleteConfirmationModal
                showModal={setShowDeleteConfirmationModal}
                handleDelete={() => handlePostDelete(post.id, token, dispatch)}
              />
            </ReactPortal>
          )}

          {showEditPostModal && (
            <ReactPortal>
              <EditPostModal showModal={setShowEditPostModal} post={post} />
            </ReactPortal>
          )}
        </Box>
      )}
    </>
  );
};
