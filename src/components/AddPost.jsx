import Picker from "emoji-picker-react";
import toast from "react-hot-toast";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { addNewPost, getAllPosts } from "../firebase/firebase-calls";
import {
  Stack,
  Button,
  Box,
  Avatar,
  TextField,
  EmojiEmotionsIcon,
  IconButton,
  PhotoCamera,
  LoadingButton,
} from "utils/material-ui";

const initialPostImageStatus = { url: "", fileName: "" };

export const AddPost = ({ setLoadingPosts, loadingPosts }) => {
  const {
    userData: { profilePicture },
  } = useSelector((store) => store.userDetail);
  const { token } = useSelector((store) => store.authDetail);
  const dispatch = useDispatch();

  const [postText, setPostText] = useState("");
  const [postImage, setPostImage] = useState(initialPostImageStatus);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const onEmojiClick = (event, emojiObject) => {
    setPostText((prevInput) => prevInput + emojiObject.emoji);
  };

  const handlePostMediaChange = async (e) => {
    if (e.target.files[0].size > 2e6) {
      toast.error("File size should be smaller than 2MB");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      formData.append("upload_preset", "fo0akwis");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/junaidshaikh/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();

      setPostImage({ url: data.url, fileName: data.original_filename });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitPost = async () => {
    if (!postText && !postImage.url) {
      toast.error("Add some content");
      return;
    }

    try {
      setLoadingPosts(true);

      await addNewPost(token, postText, postImage);

      dispatch(getAllPosts());
      setPostText("");
      setPostImage(initialPostImageStatus);
      setLoadingPosts(false);
    } catch (error) {
      console.log(error);
      setLoadingPosts(false);
    }
  };

  return (
    <Stack
      component="section"
      direction="row"
      spacing={2}
      sx={{
        backgroundColor: "white",
        px: 1,
        py: 2,
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
        <Box>
          <TextField
            placeholder="Wrie something interesting"
            sx={{
              my: 1,
            }}
            inputProps={{
              style: {
                height: "100px",
                overflow: "auto",
                padding: "0.5rem 0",
              },
              maxLength: 300,
            }}
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            fullWidth
            multiline
          />

          {postImage.url && (
            <img
              src={postImage.url}
              alt={postImage.fileName}
              loading="lazy"
              height="auto"
              width="100%"
            />
          )}
        </Box>

        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
            mx: 2,
          }}
        >
          <Box>
            <label htmlFor="icon-button-file">
              <input
                hidden
                accept="image/*"
                id="icon-button-file"
                type="file"
                onChange={(e) => handlePostMediaChange(e)}
              />
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera />
              </IconButton>
            </label>

            <IconButton
              color="primary"
              aria-label="add to shopping cart"
              onClick={() => setShowEmojiPicker((e) => !e)}
              sx={{
                ml: 1,
              }}
            >
              <EmojiEmotionsIcon />
            </IconButton>
          </Box>
          <Box>
            {loadingPosts ? (
              <LoadingButton loading variant="contained">
                Save
              </LoadingButton>
            ) : (
              <Button
                variant="contained"
                disableRipple
                onClick={() => handleSubmitPost()}
              >
                Post
              </Button>
            )}
          </Box>
        </Stack>

        {showEmojiPicker && (
          <Box
            style={{
              position: "absolute",
            }}
          >
            <Picker
              pickerStyle={{ width: "100%", zIndex: 1 }}
              onEmojiClick={onEmojiClick}
            />
          </Box>
        )}
      </Box>
    </Stack>
  );
};
