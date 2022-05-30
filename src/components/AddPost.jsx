import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Picker from "emoji-picker-react";

import {
  Stack,
  Button,
  Box,
  Avatar,
  TextField,
  EmojiEmotionsIcon,
  IconButton,
  PhotoCamera,
} from "utils/material-ui";
import toast from "react-hot-toast";

export const AddPost = () => {
  const {
    userData: { profilePicture },
  } = useSelector((store) => store.userDetail);

  const [postText, setPostText] = useState("");
  const [postImage, setPostImage] = useState({ url: "", fileName: "" });
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

      setPostImage({ url: data.url, fileName: data.orignal_filename });
    } catch (error) {
      console.log(error);
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
              width: 70,
              height: 70,
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
            <Button variant="contained" disableRipple>
              Post
            </Button>
          </Box>
        </Stack>

        {showEmojiPicker && (
          <Box
            style={{
              position: "absolute",
            }}
          >
            <Picker
              pickerStyle={{ width: "100%" }}
              onEmojiClick={onEmojiClick}
            />
          </Box>
        )}
      </Box>
    </Stack>
  );
};
