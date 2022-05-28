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
import { useDispatch, useSelector } from "react-redux";
import { login, loginAsGuest } from "../../firebase/firebase-auth";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

theme.typography.h1 = {
  fontSize: "1.8rem",
  "@media (min-width:600px)": {
    fontSize: "2rem",
  },
};

export const Login = () => {
  const initalFormValues = {
    email: "",
    password: "",
  };

  const [formValues, setFormValues] = useState(initalFormValues);
  const { isLoggingIn, isLoggingInAsGuest } = useSelector(
    (store) => store.authDetail
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { email, password } = formValues;

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(login(formValues));

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
          Login to AutoCrew
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextFormField
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => handleFormChange(e, setFormValues)}
          />

          <TextFormField
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => handleFormChange(e, setFormValues)}
          />

          {isLoggingIn === "loading" ? (
            <LoadingButton
              loading
              variant="contained"
              sx={{
                my: "0.6rem",
                p: 1.2,
              }}
              fullWidth
            >
              Login
            </LoadingButton>
          ) : (
            <CustomButton
              type="submit"
              fullWidth={true}
              variant="contained"
              disabled={isLoggingInAsGuest === "loading"}
            >
              Login
            </CustomButton>
          )}

          {isLoggingInAsGuest === "loading" ? (
            <LoadingButton
              loading
              variant="contained"
              sx={{
                my: "0.6rem",
                p: 1.2,
              }}
              fullWidth
            >
              Login
            </LoadingButton>
          ) : (
            <CustomButton
              fullWidth={true}
              variant="outlined"
              onClick={async () => {
                await dispatch(loginAsGuest());
                navigate("/");
              }}
              disabled={isLoggingIn === "loading"}
            >
              Login as guest
            </CustomButton>
          )}
        </Box>

        <Box my={1} mx={0.5}>
          <GrayTextP>
            Don't have an account?{" "}
            <RouterLink linkText="Sign up" to="/signup" />
          </GrayTextP>
        </Box>
      </Box>
    </Container>
  );
};
