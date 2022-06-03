import { useSelector } from "react-redux";

import { NotificationCard } from "./NotificationCard";
import { Box } from "utils/material-ui";

export const Notification = () => {
  const { users } = useSelector((store) => store.users);
  const { posts } = useSelector((store) => store.posts);
  const { userDetails: { notifications } = {} } = useSelector(
    (store) => store.userDetail
  );

  return (
    <Box
      component="main"
      sx={{
        border: 1,
      }}
    >
      {notifications?.notifications
        .map((_notification) => {
          if (_notification.notificationType === "follow") {
            const user = users.find(
              (_user) => _user.id === _notification.notificationDetails
            );

            return <NotificationCard type="follow" user={user} />;
          }

          if (_notification.notificationType === "like") {
            const user = users.find(
              (_user) => _user.id === _notification.notificationDetails
            );

            const post = posts.find(
              (_post) => _post.id === _notification.postId
            );

            const postByUser = users.find(
              (_user) => _user.id === post?.data.postBy
            );

            return (
              <NotificationCard
                type="like"
                user={user}
                post={post}
                postByUser={postByUser}
              />
            );
          }

          if (_notification.notificationType === "comment") {
            const commentBy = users.find(
              (_user) => _user.id === _notification.notificationDetails
            );

            const post = posts.find(
              (_post) => _post.id === _notification.postId
            );

            const postByUser = users.find(
              (_user) => _user.id === post?.data.postBy
            );

            return (
              <NotificationCard
                type="comment"
                user={commentBy}
                post={post}
                postByUser={postByUser}
              />
            );
          }

          return _notification.notificationDetails;
        })
        .reverse()}
    </Box>
  );
};
