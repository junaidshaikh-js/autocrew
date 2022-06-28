import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { deleteComment } from "../../../firebase/firebase-calls";
import { deletePostComment } from "features/posts/postSlice";
import {
  Avatar,
  Box,
  Button,
  GrayTextP,
  IconButton,
  Menu,
  MenuItem,
  MoreVertIcon,
  Stack,
  Typography,
} from "utils/material-ui";

export const Comment = ({ postId, comment }) => {
  const { users } = useSelector((store) => store.users);
  const { token } = useSelector((store) => store.authDetail);
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);

  const { id, data } =
    users.find((_user) => _user.id === comment.commentBy) || {};

  const { profilePicture, fullName, userName } = data || {};
  const isCommentByCurrentUser = id === token;
  const open = Boolean(anchorEl);

  const handleCommentDelete = async () => {
    try {
      await deleteComment(postId, comment);
      dispatch(deletePostComment({ id: postId, commentId: comment.commentId }));
      toast.success("Comment deleted");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack
      component="article"
      direction="row"
      spacing={1}
      my={1}
      sx={{
        borderBottom: 1,
        borderColor: "#d7c8c8",
        pb: 2,
        wordBreak: "break-all",
      }}
    >
      <Box>
        <Button
          component={Link}
          to="/profile"
          sx={{
            borderRadius: "999px",
          }}
          aria-label="Go to user profile"
        >
          <Avatar
            sx={{
              bgcolor: "#1565C0",
              width: 35,
              height: 35,
              fontSize: "3rem",
              mx: "auto",
              objectFit: "contain",
              border: 1,
            }}
            src={profilePicture}
            alt="Profile Picture"
          />
        </Button>
      </Box>

      <Stack spacing={2} flexGrow={1}>
        <Box>
          <Stack
            direction="row"
            spacing={1}
            sx={{
              mt: 1,
              mb: "0.5rem",
              alignItems: "center",
            }}
          >
            <Typography>{fullName}</Typography>
            <GrayTextP>@{userName}</GrayTextP>
          </Stack>
        </Box>

        <Box>{comment.commentText}</Box>
      </Stack>

      {isCommentByCurrentUser && (
        <Box
          sx={{
            alignSelf: "flex-start",
          }}
        >
          <IconButton
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            <MoreVertIcon />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={() => setAnchorEl(null)}
            MenuListProps={{
              "aria-labelledby": "menu-button",
            }}
          >
            <MenuItem onClick={() => handleCommentDelete()}>Delete</MenuItem>
          </Menu>
        </Box>
      )}
    </Stack>
  );
};
