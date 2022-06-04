import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";

import { deletePost } from "../../firebase/firebase-calls";
import { updatePostsForDelete } from "features/posts/postSlice";
import { deleteUserPost } from "features/user-data/userSlice";
import { DeleteConfirmationModal } from "./components/DeleteConfirmationModal";
import { EditPostModal } from "./components/EditPostModal";
import { CommentSection } from "./components/CommentSection";
import { PostActionBtns } from "./components/PostActionBtns";
import { ReactPortal } from "components";
import { useEscape } from "hooks";
import { getPostTime } from "./utils";
import {
  Box,
  Stack,
  Avatar,
  Typography,
  GrayTextP,
  IconButton,
  MoreVertIcon,
  Menu,
  MenuItem,
  Collapse,
} from "utils/material-ui";

export const Post = ({ post }) => {
  const { users } = useSelector((store) => store.users);
  const { token } = useSelector((store) => store.authDetail);
  const {
    userDetails: { posts },
  } = useSelector((store) => store.userDetail);
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] =
    useState(false);
  const [showEditPostModal, setShowEditPostModal] = useState(false);
  const [showCommentSection, setShowCommentSection] = useState(false);
  const open = Boolean(anchorEl);

  const { postText, postImageUrl, postImageName, dateCreated } =
    post?.data || {};

  const postBy = users.find((user) => user.id === post?.data.postBy);

  const { data: { profilePicture, fullName, userName } = {} } = postBy || {};

  const isPostPostedByCurrentUser = posts.posts.includes(post.id);

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

        <Box
          sx={{
            flexGrow: 1,
            position: "relative",
          }}
        >
          <Box
            component={Link}
            to={`/post/${post?.id}`}
            sx={{
              textDecoration: "none",
              color: "currentcolor",
            }}
          >
            <Stack
              spacing={1}
              sx={{
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
          </Box>

          <PostActionBtns
            postId={post.id}
            postBy={postBy}
            post={post}
            setShowCommentSection={setShowCommentSection}
          />
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
