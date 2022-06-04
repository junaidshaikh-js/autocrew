import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { followUser, unfollowUser } from "../firebase/firebase-calls";

import {
  updateUserFollowing,
  updateUserUnfollow,
} from "features/user-data/userSlice";

import { Button, LoadingButton } from "utils/material-ui";

export const FollowUnfollowButton = ({ isUserFollowing, userId }) => {
  const [isFollowingUser, setIsFollowingUser] = useState(false);

  const { token } = useSelector((store) => store.authDetail);
  const dispatch = useDispatch();

  const handleFollow = async () => {
    try {
      setIsFollowingUser(true);
      await followUser(userId, token);
      dispatch(updateUserFollowing(userId));
    } catch (error) {
      console.log(error);
    } finally {
      setIsFollowingUser(false);
    }
  };

  const handleUnfollow = async () => {
    try {
      setIsFollowingUser(true);
      await unfollowUser(userId, token);
      dispatch(updateUserUnfollow(userId));
    } catch (error) {
      console.log(error);
    } finally {
      setIsFollowingUser(false);
    }
  };

  return (
    <>
      {isUserFollowing ? (
        <>
          {isFollowingUser ? (
            <LoadingButton
              loading
              variant="outlined"
              sx={{
                p: 2,
                width: "90px",
              }}
            />
          ) : (
            <Button
              variant="outlined"
              sx={{
                p: 0,
                width: "90px",
              }}
              disableRipple
              onClick={() => handleUnfollow()}
            >
              Unfollow
            </Button>
          )}
        </>
      ) : (
        <>
          {isFollowingUser ? (
            <LoadingButton
              loading
              variant="outlined"
              sx={{
                p: 2,
                width: "90px",
              }}
            />
          ) : (
            <Button
              variant="outlined"
              sx={{
                p: 0,
                width: "90px",
              }}
              disableRipple
              onClick={() => handleFollow()}
            >
              Follow
            </Button>
          )}
        </>
      )}
    </>
  );
};
