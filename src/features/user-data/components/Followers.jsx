import { Typography } from "@material-ui/core";
import { UserCard } from "components";
import { useSelector } from "react-redux";

import { Box } from "utils/material-ui";

export const Followers = () => {
  const {
    userDetails: { followers },
  } = useSelector((store) => store.userDetail);
  const { users } = useSelector((store) => store.users);

  return (
    <>
      {!followers?.followers.length ? (
        <Box component="section" my={4} textAlign="center">
          <Typography variant="h4">No one is following you</Typography>
        </Box>
      ) : (
        <Box component="section">
          {followers?.followers.map((user) => {
            const userData = users.find((_user) => _user.id === user) || {};

            return <UserCard user={userData} key={user} />;
          })}
        </Box>
      )}
    </>
  );
};
