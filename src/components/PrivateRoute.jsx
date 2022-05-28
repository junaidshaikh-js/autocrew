import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { Container } from "utils/material-ui";
import { SideNavigation } from "./SideNavigation";
import { SideInfoContainer } from "./SideInfoContainer";
import { Grid } from "utils/material-ui";

export const PrivateRoute = () => {
  const location = useLocation();
  const { token } = useSelector((store) => store.authDetail);

  return token ? (
    <Container
      maxWidth="lg"
      sx={{
        mt: "1rem",
      }}
    >
      <Grid container spacing={2}>
        <Grid item md={3} sm={4}>
          <SideNavigation />
        </Grid>

        <Grid item md={6} sm={8} xs={12}>
          <Outlet />
        </Grid>

        <Grid item md={3}>
          <SideInfoContainer />
        </Grid>
      </Grid>
    </Container>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
