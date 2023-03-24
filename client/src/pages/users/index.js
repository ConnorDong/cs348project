import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "@/styles/Users.module.css";
import { Group, Button, Card, Text, Stack, Center } from "@mantine/core";
import { ExternalLink } from "tabler-icons-react";

export default function Users({ server_users }) {
  const [users, setUsers] = useState([]);
  const [loggedInUserInfo, setLoggedInUserInfo] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`${process.env.HOST}/users/${auth_json.userId}`, {
        method: "GET",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
      const data = await res.json();
      // Put user's followers + following userIds in state as an object of 2 sets
      const followers = new Set();
      const following = new Set();
      data?.data?.followers?.forEach((follower) =>
        followers.add(follower?.userId)
      );
      data?.data?.following?.forEach((follow) => following.add(follow?.userId));
      setLoggedInUserInfo({
        followers,
        following,
      });
    };

    // Set auth token
    const auth_token = localStorage.getItem("auth_token");
    const auth_json = auth_token ? JSON.parse(auth_token) : null;
    setAuthToken(auth_json);
    if (auth_json) {
      // Move logged in user to top of list
      const userIndex = server_users.findIndex(
        (user) => user.userId === auth_json.userId
      );
      const user = server_users.splice(userIndex, 1);
      server_users.unshift(user[0]);
      setUsers(server_users);
      // Fetch logged in user's info (for following info)
      fetchUser();
    }
  }, []);
  console.table(loggedInUserInfo);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Users</h1>
        <p className={styles.description}>Discover other MovieDB users</p>
      </div>
      <Stack>
        {users?.length
          ? users.map((user) => (
              <Link
                href={`/users/${encodeURIComponent(user.userId)}`}
                style={{ textDecoration: "none" }}
                key={user.userId}
              >
                <Card
                  shadow="sm"
                  padding="lg"
                  radius="md"
                  withBorder
                  sx={{
                    transition: "0.3s ease",
                    "&:hover": {
                      filter: "brightness(.8)",
                    },
                  }}
                >
                  <Group position="apart">
                    <div>
                      <Group spacing="xs">
                        <Text fz="xl" fw={500}>
                          {user.username}
                        </Text>
                        {authToken.userId == user.userId && (
                          <Text color="dimmed">(it's you!)</Text>
                        )}
                        {/* If user follows you: */}
                        {loggedInUserInfo?.followers?.has(user.userId) && (
                          <Text color="dimmed">(follows you!)</Text>
                        )}
                        {/* If you follow user: */}
                        {loggedInUserInfo?.following?.has(user.userId) && (
                          <>
                            {loggedInUserInfo?.followers?.has(user.userId) && (
                              <Text color="dimmed">|</Text>
                            )}
                            <Text color="dimmed">(following)</Text>
                          </>
                        )}
                      </Group>
                    </div>
                    <Center gap="5px">
                      <ExternalLink size={28} strokeWidth={2} />
                      {/* <Text fz="lg" fw={700} ml="0.3rem">
                      {user?.ratings}
                    </Text> */}
                    </Center>
                  </Group>
                </Card>
              </Link>
            ))
          : null}
      </Stack>
    </div>
  );
}

Users.getInitialProps = async (ctx) => {
  const res = await fetch(`${process.env.HOST}/users`);
  const data = await res.json();

  return { server_users: data?.data };
};
