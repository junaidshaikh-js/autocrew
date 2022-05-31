import { useSelector, useDispatch } from "react-redux";

import { followUser } from "../firebase/firebase-calls";
import { updateUserFollowing } from "features/user-data/userSlice";
import { Avatar, Box, Button, Stack, Typography } from "utils/material-ui";

export const UserCard = ({ user }) => {
  const { profilePicture, fullName, userName } = user.data || {};

  const { token } = useSelector((store) => store.authDetail);
  const { userDetails: { following } = {} } = useSelector(
    (store) => store.userDetail
  );
  const dispatch = useDispatch();

  const handleFollow = async () => {
    try {
      await followUser(user.id, token);
      dispatch(updateUserFollowing(user.id));
    } catch (error) {
      console.log(error);
    }
  };

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
      <Box>
        <Button
          sx={{
            borderRadius: "999px",
          }}
        >
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
        </Button>
      </Box>

      <Box
        sx={{
          ml: "0 !important",
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
          {userName}
        </Typography>
      </Box>

      <Box
        sx={{
          ml: "auto !important",
        }}
      >
        {!isUserFollowing && (
          <Button
            variant="outlined"
            sx={{
              p: 0,
            }}
            disableRipple
            onClick={() => handleFollow()}
          >
            Follow
          </Button>
        )}
      </Box>
    </Stack>
  );
};
