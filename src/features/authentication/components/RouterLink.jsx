import { Link } from "react-router-dom";
import { Button } from "utils/material-ui";

export const RouterLink = ({ linkText, to }) => {
  return (
    <Button component={Link} to={to}>
      {linkText}
    </Button>
  );
};
