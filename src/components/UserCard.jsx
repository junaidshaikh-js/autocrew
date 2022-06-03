import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Avatar, Box, Stack, Typography } from "utils/material-ui";
import { FollowUnfollowButton } from "./FollowUnfollowButton";

export const UserCard = ({ user }) => {
  const { profilePicture, fullName, userName } = user.data || {};

  const {
    userDetails: { following },
  } = useSelector((store) => store.userDetail);

  const isUserFollowing = following?.following.includes(user.id);

  return (
    <Stack
      component="article"
      direction="row"
      spacing={2}
      sx={{
        alignItems: "center",
        my: 2,
        mr: "0.5rem",
      }}
    >
      <Stack
        direction="row"
        component={Link}
        to={`/${user?.id}`}
        sx={{
          textDecoration: "none",
          color: "currentcolor",
          ml: 1,
          flexGrow: 1,
        }}
      >
        <Box>
          <Avatar
            sx={{
              bgcolor: "#1565C0",
              width: 50,
              height: 50,
              fontSize: "2rem",
              objectFit: "contain",
              border: 1,
            }}
            src={profilePicture}
          />
        </Box>

        <Box
          sx={{
            ml: "0.5rem !important",
          }}
        >
          <Typography ml={0} fontSize="0.875rem">
            {fullName}
          </Typography>

          <Typography
            ml={0}
            sx={{
              color: "#9e9e9e",
            }}
            fontSize="0.75rem"
          >
            @{userName}
          </Typography>
        </Box>
      </Stack>

      <Box
        sx={{
          ml: "auto !important",
        }}
      >
        <FollowUnfollowButton
          isUserFollowing={isUserFollowing}
          userId={user.id}
        />
      </Box>
    </Stack>
  );
};
