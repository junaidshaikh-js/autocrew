import { useSelector } from "react-redux";

import { Box, Typography, theme } from "utils/material-ui";
import { UserCard } from "./UserCard";

export const SideInfoContainer = () => {
  const { users } = useSelector((store) => store.users);
  const {
    userDetails: { following },
  } = useSelector((store) => store.userDetail);
  const { token } = useSelector((store) => store.authDetail);

  const usersToRecommend = users.filter(
    (user) => !following.following.includes(user.id) && user.id !== token
  );

  return (
    <Box
      component="aside"
      sx={{
        backgroundColor: "white",
        borderRadius: 2,
        display: { xs: "none", md: "block" },
        position: "sticky",
        top: "1rem",
        py: 1,
      }}
    >
      <Typography
        component="p"
        sx={{
          fontWeight: 600,
          p: 2,
          fontSize: "1.5rem",
        }}
        theme={theme}
      >
        Who to follow?{" "}
      </Typography>

      <Box component="section">
        {!usersToRecommend.length ? (
          <Box textAlign="center" py="1rem">
            <Typography variant="h4" fontSize="1.2rem">
              No users to follow
            </Typography>
          </Box>
        ) : (
          usersToRecommend.map((user) => {
            return <UserCard user={user} key={user.id} />;
          })
        )}
      </Box>
    </Box>
  );
};
