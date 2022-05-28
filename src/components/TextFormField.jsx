import { TextField } from "utils/material-ui";

export const TextFormField = ({
  label,
  type = "text",
  value,
  name,
  onChange,
}) => {
  return (
    <TextField
      type={type}
      name={name}
      value={value}
      label={label}
      variant="outlined"
      margin="normal"
      onChange={onChange}
      fullWidth
      required
    />
  );
};
