import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { v4 as uuid } from "uuid";

import { Comment } from "./Comment";
import { addComment } from "../../../firebase/firebase-calls";
import { updatePostComment } from "../postSlice";
import {
  Avatar,
  Box,
  Button,
  LoadingButton,
  Stack,
  TextField,
} from "utils/material-ui";

export const CommentSection = ({ post: { id, data } }) => {
  const {
    userDetails: { userData: { profilePicture } = {} },
  } = useSelector((store) => store.userDetail);
  const { token } = useSelector((store) => store.authDetail);
  const dispatch = useDispatch();

  const [commentText, setCommentText] = useState("");
  const [addingComment, setAddingComment] = useState(false);

  const handleReply = async () => {
    try {
      setAddingComment(true);

      const comment = {
        commentId: uuid(),
        commentBy: token,
        commentText,
      };

      await addComment(id, token, comment, data.postBy);
      dispatch(updatePostComment({ id, comment }));
      setCommentText("");
    } catch (error) {
      console.log(error);
    } finally {
      setAddingComment(false);
    }
  };

  return (
    <Box
      component="section"
      sx={{
        backgroundColor: "white",
        borderTop: 1,
        borderColor: "#d7c8c8",
        py: 1,
      }}
    >
      <Stack spacing={2}>
        <Stack
          direction="row"
          spacing={1}
          sx={{
            alignItems: "start",
            mr: 1,
          }}
        >
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
                width: 35,
                height: 35,
                fontSize: "3rem",
                mx: "auto",
                objectFit: "contain",
                border: 1,
              }}
              src={profilePicture}
            />
          </Button>

          <TextField
            sx={{
              flexGrow: 1,
              ml: "0 !important",
            }}
            inputProps={{
              style: {
                padding: 1,
              },
            }}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add your reply..."
            multiline
          ></TextField>

          {addingComment ? (
            <LoadingButton
              loading
              variant="contained"
              sx={{
                alignSelf: "flex-end",
              }}
            >
              Save
            </LoadingButton>
          ) : (
            <Button
              variant="contained"
              onClick={() => handleReply()}
              sx={{
                alignSelf: "flex-end",
              }}
              disableRipple
            >
              Reply
            </Button>
          )}
        </Stack>

        <Box>
          {data.comments.map((_comment) => {
            return (
              <Comment
                comment={_comment}
                postId={id}
                key={_comment.commentId}
              />
            );
          })}
        </Box>
      </Stack>
    </Box>
  );
};
