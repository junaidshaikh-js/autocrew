import { Box, Typography, theme } from "utils/material-ui";

export const SideInfoContainer = () => {
  return (
    <Box
      component="aside"
      sx={{
        backgroundColor: "white",
        borderRadius: 2,
        display: { xs: "none", md: "block" },
        position: "sticky",
        top: "1rem",
      }}
    >
      <Typography
        component="p"
        sx={{
          fontWeight: 600,
          p: 2,
          fontSize: "1.5rem",
        }}
        theme={theme}
      >
        Who to follow?{" "}
      </Typography>
    </Box>
  );
};
