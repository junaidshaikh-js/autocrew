import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getOtherUserData } from "../../firebase/firebase-calls";
import { FollowUnfollowButton } from "components/FollowUnfollowButton";
import { Post } from "features";
import {
  Avatar,
  Box,
  CircularProgress,
  Stack,
  Typography,
  theme,
  GrayTextP,
  Button,
} from "utils/material-ui";

export const ThirdPersonPage = () => {
  const { thirdPersonDetailLoading, thirdPersonDetails } = useSelector(
    (store) => store.thirdPersonDetail
  );
  const {
    userDetails: { following },
  } = useSelector((store) => store.userDetail);
  const { posts } = useSelector((store) => store.posts);
  const dispatch = useDispatch();

  const { userId } = useParams();

  useEffect(() => {
    dispatch(getOtherUserData(userId));
  }, [dispatch, userId]);

  const {
    userData: { profilePicture, fullName, userName, bio, website },
    following: { following: thirdPersonFollowing },
    followers: { followers: thirdPersonFollwers },
    posts: { posts: thirdPersonPosts },
  } = thirdPersonDetails;
  const isUserFollowing = following?.following.includes(userId);
  const postByUser = posts.filter((post) => post.data.postBy === userId);

  console.log(thirdPersonDetails);

  return (
    <Box component="main" sx={{ border: 1 }}>
      {thirdPersonDetailLoading === "loading" ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <CircularProgress size="4rem" />
        </Box>
      ) : (
        <Box>
          <Stack
            component="header"
            direction="column"
            sx={{
              alignItems: "center",
              borderBottom: 1,
              my: 1,
              pb: "1rem",
            }}
          >
            {profilePicture ? (
              <Avatar
                sx={{
                  bgcolor: "#1565C0",
                  width: 100,
                  height: 100,
                  fontSize: "3rem",
                  mx: "auto",
                  objectFit: "contain",
                  border: 1,
                }}
                src={profilePicture}
              />
            ) : (
              <Avatar
                sx={{
                  bgcolor: "#1565C0",
                  width: 100,
                  height: 100,
                  fontSize: "5rem",
                }}
              >
                {fullName?.slice(0, 1)}
              </Avatar>
            )}

            <Typography
              variant="h1"
              theme={theme}
              sx={{
                mt: "1rem",
              }}
            >
              {fullName}
            </Typography>

            <GrayTextP>@{userName}</GrayTextP>

            <Box
              sx={{
                my: 2,
              }}
            >
              <FollowUnfollowButton
                isUserFollowing={isUserFollowing}
                userId={userId}
              />
            </Box>

            {bio && (
              <Typography
                sx={{
                  my: "0.5rem",
                }}
              >
                {bio}
              </Typography>
            )}

            {website && (
              <Button
                href={website}
                sx={{
                  my: "0.5rem",
                  textTransform: "lowercase",
                }}
              >
                {website}
              </Button>
            )}

            <Stack
              direction="row"
              width="80%"
              sx={{
                bgcolor: "white",
                p: 1,
              }}
            >
              <Stack alignItems="center" width="100%">
                <Typography>{thirdPersonPosts?.length}</Typography>
                <Typography
                  sx={{
                    fontWeight: "600",
                  }}
                >
                  Posts
                </Typography>
              </Stack>

              <Stack alignItems="center" width="100%">
                <Typography>{thirdPersonFollwers?.length}</Typography>
                <Typography
                  sx={{
                    fontWeight: "600",
                  }}
                >
                  Followers
                </Typography>
              </Stack>

              <Stack alignItems="center" width="100%">
                <Typography>{thirdPersonFollowing?.length}</Typography>
                <Typography
                  sx={{
                    fontWeight: "600",
                  }}
                >
                  Following
                </Typography>
              </Stack>
            </Stack>
          </Stack>

          <Box component="section">
            {thirdPersonPosts?.length ? (
              <Typography
                variant="h5"
                component="h1"
                fontWeight={600}
                mx={1}
                my={2}
              >
                Recent Posts
              </Typography>
            ) : (
              <Typography
                variant="h5"
                component="h1"
                fontWeight={600}
                mx={1}
                my={2}
                textAlign="center"
              >
                No posts found
              </Typography>
            )}

            {postByUser.map((post) => (
              <Post post={post} key={post.data.dateCreated} />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};
