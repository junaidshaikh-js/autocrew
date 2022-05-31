import { useSelector, useDispatch } from "react-redux";

import { unfollowUser } from "../../../firebase/firebase-calls";
import { updateUserUnfollow } from "features/user-data/userSlice";
import { Box, Typography, Stack, Button, Avatar } from "utils/material-ui";

export const Following = () => {
  const { userDetails: { following } = {} } = useSelector(
    (store) => store.userDetail
  );
  const { users } = useSelector((store) => store.users);
  const { token } = useSelector((store) => store.authDetail);
  const dispatch = useDispatch();

  const handleUnfollow = async (user) => {
    try {
      await unfollowUser(user, token);
      dispatch(updateUserUnfollow(user));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {!following?.following.length ? (
        <Box component="section" my={4} textAlign="center">
          <Typography variant="h4">You are not following anyone.</Typography>
        </Box>
      ) : (
        <Box>
          {following?.following.map((user) => {
            const userData = users.find((_user) => _user.id === user);

            const { profilePicture, fullName, userName } = userData?.data || {};

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
                key={user}
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
                    ml: "0.5rem !important",
                  }}
                >
                  <Typography>{fullName}</Typography>

                  <Typography
                    ml={0}
                    sx={{
                      color: "#9e9e9e",
                    }}
                  >
                    {userName}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    ml: "auto !important",
                  }}
                >
                  <Button
                    variant="outlined"
                    sx={{
                      p: 1,
                      textTransform: "none",
                    }}
                    disableRipple
                    onClick={() => handleUnfollow(user)}
                  >
                    Unfollow
                  </Button>
                </Box>
              </Stack>
            );
          })}
        </Box>
      )}
    </>
  );
};
