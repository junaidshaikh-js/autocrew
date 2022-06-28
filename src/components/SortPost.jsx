import { useState } from "react";

import {
  Box,
  Checkbox,
  FilterListIcon,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  FormControlLabel,
} from "utils/material-ui";

export const SortPosts = ({
  sortPost,
  setSortPost,
  trendingPosts,
  setTrendingPosts,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  return (
    <Box>
      <IconButton
        id="sort-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        title="Filter Posts"
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
          Filter Posts
        </Typography>
        <MenuItem>
          <FormControlLabel
            control={
              <Checkbox
                checked={trendingPosts}
                onChange={() => setTrendingPosts((t) => !t)}
              />
            }
            label="Trending"
          />
        </MenuItem>

        <Typography
          textAlign="center"
          sx={{
            fontWeight: "bold",
          }}
        >
          Sort Posts
        </Typography>
        <MenuItem>
          <FormControlLabel
            control={
              <Checkbox
                checked={sortPost === "latest"}
                onChange={() => setSortPost("latest")}
                disabled={trendingPosts}
              />
            }
            label="Latest"
          />
        </MenuItem>

        <MenuItem>
          <FormControlLabel
            control={
              <Checkbox
                checked={sortPost === "oldest"}
                onChange={() => setSortPost("oldest")}
                disabled={trendingPosts}
              />
            }
            label="Oldest"
          />
        </MenuItem>
      </Menu>
    </Box>
  );
};
