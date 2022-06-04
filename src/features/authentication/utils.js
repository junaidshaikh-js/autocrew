export const handleFormChange = (e, setFormValues) => {
  const { name: key, value } = e.target;

  setFormValues((f) => ({ ...f, [key]: value }));
};

export const validateForm = (password, confirmPassword) => {
  const errors = {};

  if (password.length < 6) {
    errors.password = "Password must be 6 character long.";
  }

  if (password !== confirmPassword) {
    errors.confirmPassword = "Password does not match.";
  }

  return errors;
};
