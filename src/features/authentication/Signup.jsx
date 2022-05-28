import { useState } from "react";

import {
  Container,
  Typography,
  Box,
  createTheme,
  GrayTextP,
  LoadingButton,
} from "utils/material-ui";
import { TextFormField, CustomButton, RouterLink } from "components";
import { handleFormChange } from "./utils";
import { signup } from "../../firebase/firebase-auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

theme.typography.h1 = {
  fontSize: "1.8rem",
  "@media (min-width:600px)": {
    fontSize: "2rem",
  },
};

export const Signup = () => {
  const initalFormValues = {
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [formValues, setFormValues] = useState(initalFormValues);
  const isSigningUp = useSelector((store) => store.authDetail.isSigningUp);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { firstName, lastName, userName, email, password, confirmPassword } =
    formValues;

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(signup(formValues));

    navigate("/");
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        component="main"
        sx={{
          backgroundColor: "white",
          width: "100%",
          p: 2,
        }}
      >
        <Typography
          variant="h1"
          color="primary"
          align="center"
          sx={{
            fontWeight: "bold",
          }}
          theme={theme}
          gutterBottom
        >
          Sign up to AutoCrew
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextFormField
            label="First name"
            value={firstName}
            name="firstName"
            onChange={(e) => handleFormChange(e, setFormValues)}
          />

          <TextFormField
            label="Last name"
            value={lastName}
            name="lastName"
            onChange={(e) => handleFormChange(e, setFormValues)}
          />

          <TextFormField
            label="Username"
            value={userName}
            name="userName"
            onChange={(e) => handleFormChange(e, setFormValues)}
          />

          <TextFormField
            label="Email"
            value={email}
            type="email"
            name="email"
            onChange={(e) => handleFormChange(e, setFormValues)}
          />

          <TextFormField
            type="password"
            label="Password"
            value={password}
            name="password"
            onChange={(e) => handleFormChange(e, setFormValues)}
          />

          <TextFormField
            type="password"
            label="Confirm password"
            value={confirmPassword}
            name="confirmPassword"
            onChange={(e) => handleFormChange(e, setFormValues)}
          />

          {isSigningUp === "loading" ? (
            <LoadingButton
              loading
              variant="contained"
              sx={{
                my: "0.6rem",
                p: 1.2,
              }}
              fullWidth
            >
              Sign up
            </LoadingButton>
          ) : (
            <CustomButton fullWidth={true} variant="contained" type="submit">
              Sign up
            </CustomButton>
          )}
        </Box>

        <Box my={1} mx={0.5}>
          <GrayTextP>
            Have an account already?{" "}
            <RouterLink linkText="Log in" to="/login" />
          </GrayTextP>
        </Box>
      </Box>
    </Container>
  );
};
