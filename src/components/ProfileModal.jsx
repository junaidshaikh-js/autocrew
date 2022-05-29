import { useSelector } from "react-redux";

import {
  Box,
  Typography,
  Stack,
  Button,
  Avatar,
  IconButton,
  CameraAltOutlinedIcon,
  TextField,
} from "utils/material-ui";

export const ProfileModal = ({ setShowModal }) => {
  const { profilePicture, fullName } = useSelector(
    (store) => store.userDetail.userData
  );

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "grid",
        placeContent: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: "#a8a8a842",
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "6px",
          width: "min(90vw, 540px)",
          p: 1,
        }}
      >
        <Box>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              justifyContent: "space-between",
              p: 1,
            }}
          >
            <Typography variant="h6" component="h1">
              Edit Profile
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button variant="contained">Save</Button>
              <Button variant="outlined" onClick={() => setShowModal(false)}>
                Cancle
              </Button>
            </Stack>
          </Stack>

          <Stack
            component="form"
            sx={{
              my: 2,
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: "fit-content",
                mx: "auto",
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
                    filter: "grayscale(50)",
                  }}
                  src={profilePicture}
                />
              ) : (
                <Avatar
                  sx={{
                    bgcolor: "#1565C0",
                    width: 100,
                    height: 100,
                    fontSize: "3rem",
                    mx: "auto",
                    filter: "opacity(50%)",
                  }}
                >
                  {fullName?.slice(0, 1)}
                </Avatar>
              )}

              <IconButton
                color="secondary"
                component="label"
                sx={{
                  position: "absolute",
                  top: "0",
                  width: "100%",
                  height: "100%",
                }}
              >
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  aria-label="Select Profile Picture"
                />
                <CameraAltOutlinedIcon fontSize="medium" />
              </IconButton>
            </Box>

            <Box>
              <TextField
                type="text"
                label="First Name"
                variant="outlined"
                margin="normal"
                inputProps={{
                  maxLength: 25,
                }}
                fullWidth
              />
            </Box>

            <Box>
              <TextField
                type="text"
                label="Last Name"
                variant="outlined"
                margin="normal"
                inputProps={{
                  maxLength: 25,
                }}
                fullWidth
              />
            </Box>

            <Box>
              <TextField
                type="text"
                label="Bio"
                variant="outlined"
                margin="normal"
                inputProps={{
                  maxLength: 160,
                }}
                fullWidth
                multiline
              />
            </Box>

            <Box>
              <TextField
                type="text"
                label="Website"
                variant="outlined"
                margin="normal"
                inputProps={{
                  maxLength: 160,
                }}
                fullWidth
              />
            </Box>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};
