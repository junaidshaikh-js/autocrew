import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";

import { ReactPortal, ProfileModal } from "components";

import {
  Box,
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
import { useEscape } from "hooks";

const useStyles = makeStyles({
  button: {
    "&.active": {
      background: "lightblue",
    },
  },
});

export const Profile = () => {
  const classes = useStyles();

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const {
    userData: { bio, website, fullName, profilePicture, userName },
  } = useSelector((store) => store.userDetail);

  useEscape(setIsEditingProfile);

  return (
    <Box>
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
          {profilePicture ? (
            <Avatar
              sx={{
                bgcolor: "#1565C0",
                width: 100,
                height: 100,
                fontSize: "3rem",
                mx: "auto",
                objectFit: "contain",
                border: 1,
              }}
              src={profilePicture}
            />
          ) : (
            <Avatar
              sx={{
                bgcolor: "#1565C0",
                width: 100,
                height: 100,
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
                my: "0.5rem",
              }}
            >
              {bio}
            </Typography>
          )}

          {website && (
            <Button
              href={website}
              sx={{
                my: "0.5rem",
                textTransform: "lowercase",
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
    </Box>
  );
};
