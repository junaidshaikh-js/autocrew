import { Link } from "react-router-dom";

import { getPostTime } from "features/posts/utils";
import { Avatar, Box, Stack, Typography, GrayTextP } from "utils/material-ui";

export const NotificationPost = ({ postByUser, post }) => {
  const { postText, postImageUrl, postImageName } = post?.data || {};

  return (
    <>
      {!post ? (
        <Box
          sx={{
            border: 1,
            mt: 1,
            p: 1,
          }}
        >
          <Typography>Post Deleted</Typography>
        </Box>
      ) : (
        <Box
          component={Link}
          to={`/post/${post?.id}`}
          sx={{
            border: 1,
            mt: 1,
            textDecoration: "none",
            color: "currentcolor",
          }}
          aria-label="Go to user profile"
        >
          <Stack
            component="section"
            direction="row"
            spacing={2}
            sx={{
              px: 1,
              py: 1,
            }}
          >
            <Box>
              <Avatar
                sx={{
                  bgcolor: "#1565C0",
                  width: 30,
                  height: 30,
                  objectFit: "contain",
                  border: 1,
                }}
                src={postByUser?.data.profilePicture}
                alt="Profile Picture"
              />
            </Box>

            <Box
              sx={{
                flexGrow: 1,
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
                <Typography>{postByUser?.data.fullName}</Typography>
                <GrayTextP>
                  @{postByUser?.data.userName} •{" "}
                  {getPostTime(post?.data.dateCreated)}
                </GrayTextP>
              </Stack>

              <Box
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
            </Box>
          </Stack>
        </Box>
      )}
    </>
  );
};
