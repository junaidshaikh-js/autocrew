import {
  Container,
  Typography,
  Box,
  createTheme,
  GrayTextP,
} from "utils/material-ui";

import { TextFormField, CustomButton, RouterLink } from "components";

const theme = createTheme();

theme.typography.h1 = {
  fontSize: "1.8rem",
  "@media (min-width:600px)": {
    fontSize: "2rem",
  },
};

export const Signup = () => {
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

        <Box component="form">
          <TextFormField label="First name" />
          <TextFormField label="Last name" />
          <TextFormField label="Username" />
          <TextFormField type="password" label="Password" />
          <TextFormField type="password" label="Confirm password" />

          <CustomButton fullWidth="true" variant="contained" type="submit">
            Sign up
          </CustomButton>
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
