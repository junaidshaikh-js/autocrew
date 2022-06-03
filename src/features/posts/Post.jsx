import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";

import {
  bookmarkPost,
  deletePost,
  dislikePost,
  likePost,
  removePostFromBookmark,
} from "../../firebase/firebase-calls";
import { updatePostLike, updatePostsForDelete } from "features/posts/postSlice";
import {
  updateLikedPosts,
  updateLikedPostsForDislike,
  addToBookmark,
  removeFromBookmark,
  deleteUserPost,
} from "features/user-data/userSlice";
import { DeleteConfirmationModal } from "./components/DeleteConfirmationModal";
import { EditPostModal } from "./components/EditPostModal";
import { CommentSection } from "./components/CommentSection";
import { ReactPortal } from "components";
import { useEscape } from "hooks";
import { getPostTime } from "./utils";
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
  MoreVertIcon,
  Menu,
  MenuItem,
  Collapse,
} from "utils/material-ui";

export const Post = ({ post }) => {
  const { users } = useSelector((store) => store.users);
  const { token } = useSelector((store) => store.authDetail);
  const {
    userDetails: { likedPost, bookmarks, posts },
  } = useSelector((store) => store.userDetail);
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] =
    useState(false);
  const [showEditPostModal, setShowEditPostModal] = useState(false);
  const [showCommentSection, setShowCommentSection] = useState(false);
  const open = Boolean(anchorEl);

  const {
    postText,
    postImageUrl,
    postImageName,
    likes,
    comments,
    dateCreated,
  } = post?.data || {};

  const postBy = users.find((user) => user.id === post?.data.postBy);

  const { data: { profilePicture, fullName, userName } = {} } = postBy || {};

  const isPostLikedByCurrentUser = likedPost.likedPost.includes(post.id);
  const isPostBookmarkedByCurrentUser = bookmarks.bookmarks.includes(post.id);
  const isPostPostedByCurrentUser = posts.posts.includes(post.id);

  const handlePostLike = async (postAction) => {
    try {
      if (postAction) {
        await dislikePost(post.id, token);
        dispatch(updatePostLike({ id: post.id, count: -1 }));
        dispatch(updateLikedPostsForDislike(post.id));
      } else {
        await likePost(post.id, token, postBy.id);
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

  const handlePostDelete = async () => {
    try {
      await deletePost(post.id, token);
      dispatch(deleteUserPost(post.id));
      dispatch(updatePostsForDelete(post.id));
      toast.success("Post deleted");
    } catch (error) {
      console.log(error);
    }
  };

  const handleMenuClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  useEscape(setShowDeleteConfirmationModal);

  return (
    <Box
      component="article"
      sx={{
        position: "relative",
      }}
    >
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
            spacing={1}
            sx={{
              mt: 1,
              mb: "0.5rem",
              flexDirection: { sm: "column", md: "row" },
            }}
          >
            <Typography>{fullName}</Typography>
            <GrayTextP>
              @{userName} • {getPostTime(dateCreated)}
            </GrayTextP>
          </Stack>

          <Box>
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

        {isPostPostedByCurrentUser && (
          <Box
            sx={{
              position: "absolute",
              top: "4%",
              right: 0,
            }}
          >
            <IconButton
              id="menu-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={(e) => handleMenuClick(e)}
            >
              <MoreVertIcon />
            </IconButton>

            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={() => setAnchorEl(null)}
              MenuListProps={{
                "aria-labelledby": "menu-button",
              }}
            >
              <MenuItem
                onClick={() => {
                  setShowEditPostModal(true);
                  setAnchorEl(false);
                }}
              >
                Edit
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setShowDeleteConfirmationModal(true);
                  setAnchorEl(false);
                }}
              >
                Delete
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Stack>

      {showDeleteConfirmationModal && (
        <ReactPortal>
          <DeleteConfirmationModal
            showModal={setShowDeleteConfirmationModal}
            handleDelete={handlePostDelete}
          />
        </ReactPortal>
      )}

      {showEditPostModal && (
        <ReactPortal>
          <EditPostModal showModal={setShowEditPostModal} post={post} />
        </ReactPortal>
      )}

      <Collapse in={showCommentSection}>
        <CommentSection post={post} />
      </Collapse>
    </Box>
  );
};
