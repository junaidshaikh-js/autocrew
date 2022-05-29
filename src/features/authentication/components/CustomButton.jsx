import { Button } from "utils/material-ui";

export const CustomButton = ({
  children,
  type = "button",
  fullWidth,
  variant,
  onClick,
  disabled,
}) => {
  return (
    <Button
      variant={variant}
      type={type}
      sx={{
        my: "0.6rem",
        p: 1.2,
      }}
      fullWidth={fullWidth}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};
