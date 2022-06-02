import { useState } from "react";

import {
  Box,
  Checkbox,
  FilterListIcon,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "utils/material-ui";

export const SortPosts = ({ sortPost, setSortPost }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  return (
    <Box>
      <IconButton
        id="sort-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <FilterListIcon />
      </IconButton>

      <Menu
        id="sort-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          "aria-labelledby": "menu-button",
        }}
      >
        <Typography
          textAlign="center"
          sx={{
            fontWeight: "bold",
          }}
        >
          Sort Posts
        </Typography>
        <MenuItem>
          <Checkbox
            checked={sortPost === "latest"}
            onChange={() => setSortPost("latest")}
          />
          Latest
        </MenuItem>

        <MenuItem onClick={() => {}}>
          <Checkbox
            checked={sortPost === "oldest"}
            onChange={() => setSortPost("oldest")}
            inputProps={{ "aria-label": "controlled" }}
          />{" "}
          Oldest
        </MenuItem>
      </Menu>
    </Box>
  );
};
