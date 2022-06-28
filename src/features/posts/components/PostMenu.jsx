import { useState } from "react";

import {
  Box,
  IconButton,
  MoreVertIcon,
  Menu,
  MenuItem,
} from "utils/material-ui";

export const PostMenu = ({
  setShowEditPostModal,
  setShowDeleteConfirmationModal,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleMenuClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: "10px",
        right: 0,
      }}
    >
      <IconButton
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        title="Post Menu"
        onClick={(e) => handleMenuClick(e)}
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          "aria-labelledby": "menu-button",
        }}
      >
        <MenuItem
          onClick={() => {
            setShowEditPostModal(true);
            setAnchorEl(false);
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            setShowDeleteConfirmationModal(true);
            setAnchorEl(false);
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </Box>
  );
};
