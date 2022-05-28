import { createTheme, styled } from "@mui/material/styles";
export { makeStyles } from "@material-ui/core/styles";

export const theme = createTheme();

theme.typography.h1 = {
  fontSize: "1.5rem",
  "@media (min-width:600px)": {
    fontSize: "1.8rem",
  },
};

export { createTheme, styled };
