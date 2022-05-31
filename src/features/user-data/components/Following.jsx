import { useSelector } from "react-redux";

import { UserCard } from "components";
import { Box, Typography } from "utils/material-ui";

export const Following = () => {
  const { userDetails: { following } = {} } = useSelector(
    (store) => store.userDetail
  );
  const { users } = useSelector((store) => store.users);

  return (
    <>
      {!following?.following.length ? (
        <Box component="section" my={4} textAlign="center">
          <Typography variant="h4">You are not following anyone.</Typography>
        </Box>
      ) : (
        <Box>
          {following?.following.map((user) => {
            const userData = users.find((_user) => _user.id === user) || {};

            return <UserCard user={userData} key={user} />;
          })}
        </Box>
      )}
    </>
  );
};
