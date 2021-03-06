import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { NotificationPost } from "./NotificationPost";
import {
  Avatar,
  Box,
  FavoriteIcon,
  Stack,
  Typography,
  CommentIcon,
  PermIdentityIcon,
} from "utils/material-ui";

export const NotificationCard = ({ type, user, post, postByUser }) => {
  const { token } = useSelector((store) => store.authDetail);
  const { profilePicture, fullName } = user?.data || {};

  return (
    <Stack direction="row" spacing={2} p={2} m={2} sx={{ bgcolor: "white" }}>
      <Box alignSelf="flex-start" flexBasis="10%" fontSize="48px">
        {type === "like" ? (
          <FavoriteIcon
            fontSize="48"
            sx={{
              color: "#F91880",
            }}
          />
        ) : type === "comment" ? (
          <CommentIcon fontSize="48" />
        ) : (
          <PermIdentityIcon fontSize="48" />
        )}
      </Box>

      <Stack flexGrow={1}>
        <Box
          component={Link}
          to={token === user?.id ? "/profile" : `/${user?.id}`}
          sx={{
            textDecoration: "none",
            color: "currentcolor",
          }}
          aria-label="Go to user profile"
        >
          <Box mb={2}>
            <Avatar
              sx={{
                bgcolor: "#1565C0",
                width: 35,
                height: 35,
                fontSize: "3rem",
                objectFit: "contain",
                border: 1,
              }}
              src={profilePicture}
              alt="Profile Picture"
            />
          </Box>

          <Box>
            <Typography
              component="span"
              sx={{
                fontWeight: "600",
              }}
            >
              {fullName}
            </Typography>
            <Typography component="span">
              {" "}
              {type === "like"
                ? "liked your post"
                : type === "comment"
                ? "commented on your post"
                : "followed you"}
            </Typography>
          </Box>
        </Box>

        {type !== "follow" && (
          <NotificationPost post={post} postByUser={postByUser} />
        )}
      </Stack>
    </Stack>
  );
};
