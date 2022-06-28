import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { DeleteConfirmationModal } from "./components/DeleteConfirmationModal";
import { EditPostModal } from "./components/EditPostModal";
import { CommentSection } from "./components/CommentSection";
import { PostActionBtns } from "./components/PostActionBtns";
import { PostMenu } from "./components/PostMenu";
import { ReactPortal } from "components";
import { useEscape } from "hooks";
import { getPostTime, handlePostDelete } from "./utils";
import {
  Box,
  Stack,
  Avatar,
  Typography,
  GrayTextP,
  Collapse,
} from "utils/material-ui";

export const Post = ({ post }) => {
  const { users } = useSelector((store) => store.users);
  const { token } = useSelector((store) => store.authDetail);

  const {
    userDetails: { posts },
  } = useSelector((store) => store.userDetail);
  const dispatch = useDispatch();

  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] =
    useState(false);
  const [showEditPostModal, setShowEditPostModal] = useState(false);
  const [showCommentSection, setShowCommentSection] = useState(false);

  const { postText, postImageUrl, postImageName, dateCreated } =
    post?.data || {};

  const postBy = users.find((user) => user.id === post?.data.postBy);

  const { data: { profilePicture, fullName, userName } = {} } = postBy || {};

  const isPostPostedByCurrentUser = posts?.posts.includes(post.id);

  useEscape(setShowDeleteConfirmationModal);
  useEscape(setShowEditPostModal);

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
          borderColor: "#d7c8c8",
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

            <Box
              sx={{
                wordBreak: "break-all",
                mr: 1,
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
          </Box>

          <PostActionBtns
            postId={post.id}
            postBy={postBy}
            post={post}
            setShowCommentSection={setShowCommentSection}
          />
        </Box>

        {isPostPostedByCurrentUser && (
          <PostMenu
            setShowEditPostModal={setShowEditPostModal}
            setShowDeleteConfirmationModal={setShowDeleteConfirmationModal}
          />
        )}
      </Stack>

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

      <Collapse in={showCommentSection}>
        <CommentSection post={post} />
      </Collapse>
    </Box>
  );
};
