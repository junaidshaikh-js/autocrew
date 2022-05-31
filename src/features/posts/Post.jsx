import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

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
} from "utils/material-ui";

export const Post = ({ postData }) => {
  const { users } = useSelector((store) => store.users);

  const { postText, postImageUrl, postImageName, likes, comments } = postData;

  const postBy = users.find((user) => user.id === postData.postBy);

  const { data: { profilePicture, fullName, userName } = {} } = postBy || {};

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
            <IconButton aria-label="delete">
              <FavoriteBorderIcon />
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
            <IconButton aria-label="delete">
              <CommentIcon />
              {!comments && (
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
            <IconButton aria-label="delete">
              <BookmarkBorderIcon />
            </IconButton>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};
