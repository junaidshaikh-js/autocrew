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

export const Login = () => {
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
        <Box component="form">
          <TextFormField label="Username" />

          <TextFormField label="Password" type="password" />

          <CustomButton type="submit" fullWidth="true" variant="contained">
            Login
          </CustomButton>

          <CustomButton fullWidth="true" variant="outlined">
            Login as guest
          </CustomButton>
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
