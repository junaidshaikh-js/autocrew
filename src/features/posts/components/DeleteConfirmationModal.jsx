import { useLocation, useNavigate } from "react-router-dom";

import { Box, Typography, Button } from "utils/material-ui";

export const DeleteConfirmationModal = ({ showModal, handleDelete }) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "grid",
        placeContent: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: "#a8a8a842",
      }}
      onClick={() => showModal(false)}
    >
      <Box
        sx={{
          backgroundColor: "white",
          p: 2,
          borderRadius: "6px",
          width: "min(90vw, 320px)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Typography
          variant="h5"
          sx={{
            color: "red",
            fontWeight: 600,
            my: 1,
          }}
        >
          Delete Post?
        </Typography>

        <Typography variant="body1" my={2}>
          This can not be undone. This will delete the post from everywhere.
        </Typography>

        <Button
          variant="contained"
          color="error"
          fullWidth
          disableElevation
          disableRipple
          sx={{
            mb: 2,
            textTransform: "none",
          }}
          onClick={() => {
            const re = /\/post\/[a-zA-Z1-9]+/;
            handleDelete();
            if (location.pathname.match(re)) {
              navigate(-1);
            }
          }}
        >
          Delete
        </Button>

        <Button
          variant="outlined"
          fullWidth
          disableElevation
          disableRipple
          sx={{
            textTransform: "none",
          }}
          onClick={() => showModal(false)}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};
