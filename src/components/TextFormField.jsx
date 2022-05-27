import { TextField } from "utils/material-ui";

export const TextFormField = ({ label, type = "text" }) => {
  return (
    <TextField
      id="outlined-basic"
      type={type}
      label={label}
      variant="outlined"
      margin="normal"
      fullWidth
      required
    />
  );
};
