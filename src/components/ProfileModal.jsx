import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateUserDetail } from "../firebase/firebase-calls";
import { updateUserDetailState } from "features/users/usersSlice";
import {
  Box,
  Typography,
  Stack,
  Button,
  Avatar,
  IconButton,
  CameraAltOutlinedIcon,
  TextField,
  CircularProgress,
  LoadingButton,
} from "utils/material-ui";

export const ProfileModal = ({ setShowModal }) => {
  const {
    userDetails: {
      userData: {
        firstName,
        lastName,
        bio,
        website,
        fullName,
        profilePicture,
      } = {},
    },
  } = useSelector((store) => store.userDetail);
  const { token } = useSelector((store) => store.authDetail);
  const dispatch = useDispatch();

  const [userDetails, setUserDetails] = useState({
    profilePicture,
    firstName,
    lastName,
    bio,
    website,
  });
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [updatingUserDetail, setUpdatingUserDetail] = useState(false);

  const handleUserDetailChange = (e) => {
    const { name, value } = e.target;

    setUserDetails((u) => ({ ...u, [name]: value }));
  };

  const handleProfileChange = async (e) => {
    try {
      setIsImageUploading(true);
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      formData.append("upload_preset", "fo0akwis");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/junaidshaikh/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      setUserDetails((u) => ({ ...u, profilePicture: data.url }));
    } catch (error) {
      console.log(error);
    } finally {
      setIsImageUploading(false);
    }
  };

  const handleUserDetailSubmit = async () => {
    setUpdatingUserDetail(true);
    dispatch(updateUserDetailState({ token, userDetails }));
    await updateUserDetail(token, userDetails, dispatch);
    setUpdatingUserDetail(false);
    setShowModal(false);
  };

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
      onClick={() => setShowModal(false)}
    >
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "6px",
          width: "min(90vw, 540px)",
          p: 1,
        }}
        onClick={(e) => e.stopPropagation()}
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
              {updatingUserDetail ? (
                <LoadingButton loading variant="contained">
                  Save
                </LoadingButton>
              ) : (
                <Button
                  variant="contained"
                  onClick={() => handleUserDetailSubmit()}
                >
                  Save
                </Button>
              )}
              <Button variant="outlined" onClick={() => setShowModal(false)}>
                Cancel
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
              {userDetails.profilePicture ? (
                <Avatar
                  sx={{
                    bgcolor: "#1565C0",
                    width: 100,
                    height: 100,
                    fontSize: "3rem",
                    mx: "auto",
                    filter: "grayscale(50)",
                    objectFit: "contain",
                    border: 1,
                  }}
                  src={userDetails.profilePicture}
                  alt="Profile Picture"
                />
              ) : (
                <Avatar
                  sx={{
                    bgcolor: "#1565C0",
                    width: 100,
                    height: 100,
                    fontSize: "3rem",
                    mx: "auto",
                    filter: "grascale(20%)",
                  }}
                  alt="Profile Picture"
                >
                  {fullName?.slice(0, 1)}
                </Avatar>
              )}

              {isImageUploading ? (
                <CircularProgress
                  sx={{
                    position: "absolute",
                    top: "30%",
                    left: "30%",
                  }}
                  color="secondary"
                />
              ) : (
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
                    name="profilePicture"
                    onChange={(e) => handleProfileChange(e)}
                  />
                  <CameraAltOutlinedIcon fontSize="medium" />
                </IconButton>
              )}
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
                value={userDetails.firstName}
                name="firstName"
                onChange={(e) => handleUserDetailChange(e)}
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
                value={userDetails.lastName}
                name="lastName"
                onChange={(e) => handleUserDetailChange(e)}
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
                value={userDetails.bio}
                name="bio"
                onChange={(e) => handleUserDetailChange(e)}
                fullWidth
                // multiline
              />
            </Box>

            <Box>
              <TextField
                type="text"
                label="Website"
                variant="outlined"
                margin="normal"
                inputProps={{
                  maxLength: 100,
                }}
                value={userDetails.website}
                name="website"
                onChange={(e) => handleUserDetailChange(e)}
                fullWidth
              />
            </Box>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};
