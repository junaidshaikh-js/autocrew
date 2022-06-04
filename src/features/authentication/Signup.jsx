import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { TextFormField } from "./components/TextFormField";
import { CustomButton } from "./components/CustomButton";
import { RouterLink } from "./components/RouterLink";
import { handleFormChange, validateForm } from "./utils";
import { signup } from "../../firebase/firebase-auth";
import {
  Container,
  Typography,
  Box,
  createTheme,
  GrayTextP,
  LoadingButton,
  InfoIcon,
} from "utils/material-ui";

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
  const [formErrors, setFormErrors] = useState({
    password: "",
    confirmPassword: "",
  });
  const isSigningUp = useSelector((store) => store.authDetail.isSigningUp);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { firstName, lastName, userName, email, password, confirmPassword } =
    formValues;
  const { password: passwordError, confirmPassword: confirmPasswordError } =
    formErrors;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm(password, confirmPassword);

    if (!Object.keys(errors).length) {
      await dispatch(signup(formValues));
      navigate("/");
    }

    setFormErrors(errors);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "90vh",
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

          <Box>
            <TextFormField
              type="password"
              label="Password"
              value={password}
              name="password"
              onChange={(e) => handleFormChange(e, setFormValues)}
            />

            {passwordError && (
              <Typography
                component="span"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "red",
                  my: "0.5rem",
                }}
              >
                <InfoIcon />
                Password should be atleast 6 character long.
              </Typography>
            )}
          </Box>

          <Box>
            <TextFormField
              type="password"
              label="Confirm password"
              value={confirmPassword}
              name="confirmPassword"
              onChange={(e) => handleFormChange(e, setFormValues)}
            />

            {confirmPasswordError && (
              <Typography
                component="span"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "red",
                  my: "0.5rem",
                }}
              >
                <InfoIcon /> Password doesn't match.
              </Typography>
            )}
          </Box>

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
