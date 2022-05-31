import MuiListItemText from "@mui/material/ListItemText";
import { NavLink, useNavigate } from "react-router-dom";

import { logout } from "../firebase/firebase-auth";
import { useDispatch } from "react-redux";
import { logoutUser } from "features/authentication/authSlice";
import {
  Box,
  List,
  ListItem,
  Button,
  ListItemIcon,
  HomeOutlinedIcon,
  BookmarkBorderOutlinedIcon,
  NotificationsNoneOutlinedIcon,
  RocketOutlinedIcon,
  AccountCircleOutlinedIcon,
  styled,
  makeStyles,
} from "utils/material-ui";
import toast from "react-hot-toast";

const ListItemText = styled(MuiListItemText)({
  "& .MuiListItemText-primary": {
    color: "black",
  },
});

const useStyles = makeStyles({
  button: {
    "&.active": {
      background: "lightblue",
    },
  },
});

export const SideNavigation = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: "sticky",
        top: "1rem",
      }}
    >
      <nav>
        <List>
          <ListItem>
            <Button
              component={NavLink}
              to="/"
              className={classes.button}
              fullWidth
            >
              <ListItemIcon>
                <HomeOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </Button>
          </ListItem>

          <ListItem>
            <Button
              component={NavLink}
              to="/explore"
              fullWidth
              className={classes.button}
            >
              <ListItemIcon>
                <RocketOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Explore" />
            </Button>
          </ListItem>

          <ListItem>
            <Button
              component={NavLink}
              to="/bookmarks"
              fullWidth
              className={classes.button}
            >
              <ListItemIcon>
                <BookmarkBorderOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Bookmarks" />
            </Button>
          </ListItem>

          <ListItem>
            <Button
              component={NavLink}
              to="/notifications"
              fullWidth
              className={classes.button}
            >
              <ListItemIcon>
                <NotificationsNoneOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Notifications" />
            </Button>
          </ListItem>

          {/* TODO: change profile route with username */}
          <ListItem>
            <Button
              component={NavLink}
              to="/profile"
              fullWidth
              className={classes.button}
            >
              <ListItemIcon>
                <AccountCircleOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </Button>
          </ListItem>
        </List>
      </nav>

      <Box
        sx={{
          px: "1rem",
          mt: 4,
        }}
      >
        <Button
          variant="outlined"
          fullWidth
          color="secondary"
          onClick={async () => {
            await logout();
            dispatch(logoutUser());
            localStorage.removeItem("token");
            toast.success("Logged out successfully");
            navigate(0);
          }}
        >
          Log Out
        </Button>
      </Box>
    </Box>
  );
};
