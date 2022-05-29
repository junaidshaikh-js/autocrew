import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import { ReactPortal } from "./ReactPortal";
import { ProfileModal } from "./ProfileModal";

import { getUserDetail } from "../firebase/firebase-calls";
import {
  Box,
  CircularProgress,
  Avatar,
  Typography,
  theme,
  GrayTextP,
  Button,
  List,
  ListItem,
  makeStyles,
  ListItemText,
  Stack,
} from "utils/material-ui";

const useStyles = makeStyles({
  button: {
    "&.active": {
      background: "lightblue",
    },
  },

  li: {
    padding: 0,
    textAlign: "center",
  },
});

export const Profile = () => {
  const classes = useStyles();

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const {
    userDetailLoading,
    userData: { fullName, profilePicture, userName, bio, website },
  } = useSelector((store) => store.userDetail);
  const { token } = useSelector((store) => store.authDetail);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userDetailLoading === "idle") {
      dispatch(getUserDetail(token));
    }
  }, [dispatch, userDetailLoading, token]);

  return (
    <Box>
      {userDetailLoading === "loading" ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "60vh",
          }}
        >
          <CircularProgress size="4rem" />
        </Box>
      ) : (
        <Box component="main" sx={{ border: 1, p: 1 }}>
          <Stack
            component="header"
            direction="column"
            sx={{
              alignItems: "center",
              borderBottom: 1,
              pb: "1rem",
            }}
          >
            {profilePicture ? null : (
              <Avatar
                sx={{
                  bgcolor: "#1565C0",
                  width: 150,
                  height: 150,
                  fontSize: "5rem",
                }}
              >
                {fullName.slice(0, 1)}
              </Avatar>
            )}

            <Typography
              variant="h1"
              theme={theme}
              sx={{
                mt: "1rem",
              }}
            >
              {fullName}
            </Typography>

            <GrayTextP>{userName}</GrayTextP>

            <Button onClick={() => setIsEditingProfile(true)}>
              Edit Profile
            </Button>

            {bio && (
              <Typography
                sx={{
                  my: "1.5rem",
                }}
              >
                {bio}
              </Typography>
            )}

            {website && (
              <Button
                href={website}
                sx={{
                  my: "1.5rem",
                }}
              >
                {website}
              </Button>
            )}
          </Stack>

          <Box component="section">
            <List
              sx={{
                display: "flex",
                borderBottom: 1,
                py: "1rem",
              }}
            >
              <ListItem
                sx={{
                  p: 0,
                  textAlign: "center",
                  width: "100%",
                }}
              >
                <Button
                  component={NavLink}
                  to="/profile"
                  className={classes.button}
                  end
                  fullWidth
                >
                  <ListItemText primary="Posts" />
                </Button>
              </ListItem>

              <ListItem
                sx={{
                  p: 0,
                  textAlign: "center",
                  width: "100%",
                }}
              >
                <Button
                  component={NavLink}
                  to="/profile/followers"
                  className={classes.button}
                  fullWidth
                >
                  <ListItemText primary="Followers" />
                </Button>
              </ListItem>

              <ListItem
                sx={{
                  p: 0,
                  textAlign: "center",
                  width: "100%",
                }}
              >
                <Button
                  component={NavLink}
                  to="/profile/following"
                  className={classes.button}
                  fullWidth
                >
                  <ListItemText primary="Following" />
                </Button>
              </ListItem>
            </List>

            <Outlet />
          </Box>

          {isEditingProfile && (
            <ReactPortal>
              <ProfileModal setShowModal={setIsEditingProfile} />
            </ReactPortal>
          )}
        </Box>
      )}
    </Box>
  );
};
