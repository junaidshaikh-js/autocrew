import { useState } from "react";
import { useDispatch } from "react-redux";
import Picker from "emoji-picker-react";
import toast from "react-hot-toast";

import { updatePost } from "../../../firebase/firebase-calls";
import { updatePostData } from "../postSlice";
import {
  Box,
  TextField,
  Stack,
  IconButton,
  PhotoCamera,
  Button,
  EmojiEmotionsIcon,
  LoadingButton,
  CircularProgress,
} from "utils/material-ui";

export const EditPostModal = ({ showModal, post: { id, data } }) => {
  const [postText, setPostText] = useState(data.postText);
  const [postImage, setPostImage] = useState({
    url: data.postImageUrl,
    postImageName: data.postImageName,
  });
  const [isPostUpdating, setIsPostUpdating] = useState(false);
  const [changingImage, setChangingImage] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const dispatch = useDispatch();

  const handleEditPostMediaChange = async (e) => {
    if (e.target.files[0].size > 2e6) {
      toast.error("File size should be smaller than 2MB");
      return;
    }

    try {
      setChangingImage(true);
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

      setPostImage({ url: data.url, postImageName: data.original_filename });
    } catch (error) {
      console.log(error);
    } finally {
      setChangingImage(false);
    }
  };

  const onEmojiClick = (event, emojiObject) => {
    setPostText((prevInput) => prevInput + emojiObject.emoji);
  };

  const handleUpdatePost = async () => {
    try {
      setIsPostUpdating(true);
      await updatePost(id, postText, postImage);
      dispatch(updatePostData({ id, postText, postImage }));
      showModal(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsPostUpdating(false);
    }
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "grid",
        placeContent: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: "#a8a8a842",
      }}
      onClick={() => showModal(false)}
    >
      <Box
        sx={{
          backgroundColor: "white",
          p: 2,
          mx: 0,
          borderRadius: "6px",
          width: "min(80vw, 480px)",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Box component="form">
          <TextField
            placeholder="Wrie something interesting"
            sx={{
              my: 1,
            }}
            inputProps={{
              style: {
                height: "70px",
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

          <Box
            sx={{
              width: "70%",
              mx: "auto",
            }}
          >
            {changingImage && (
              <Box
                sx={{
                  minHeight: "200px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CircularProgress size="4rem" />
              </Box>
            )}

            {postImage.url && !changingImage && (
              <img
                src={postImage.url}
                alt={postImage.fileName}
                loading="lazy"
                height="auto"
                width="100%"
              />
            )}
          </Box>
        </Box>

        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
            mx: 2,
            my: 2,
          }}
        >
          <Box>
            <label htmlFor="icon-button-file-edit">
              <input
                hidden
                accept="image/*"
                id="icon-button-file-edit"
                type="file"
                onChange={(e) => handleEditPostMediaChange(e)}
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
            {isPostUpdating ? (
              <LoadingButton loading variant="contained">
                Update
              </LoadingButton>
            ) : (
              <Button
                variant="contained"
                disableRipple
                sx={{
                  mr: 1,
                }}
                onClick={() => handleUpdatePost()}
              >
                Update
              </Button>
            )}

            <Button
              variant="outlined"
              disableElevation
              disableRipple
              sx={{
                textTransform: "none",
              }}
              onClick={() => showModal(false)}
              disabled={isPostUpdating}
            >
              Cancel
            </Button>
          </Box>
        </Stack>

        {showEmojiPicker && (
          <Box
            style={{
              position: "absolute",
              bottom: "40%",
            }}
          >
            <Picker
              pickerStyle={{ width: "70%", zIndex: 1 }}
              onEmojiClick={onEmojiClick}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};
