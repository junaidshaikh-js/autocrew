export const handleFormChange = (e, setFormValues) => {
  const { name: key, value } = e.target;

  setFormValues((f) => ({ ...f, [key]: value }));
};
