import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "@/styles/User.module.css";
import {
  Modal,
  Group,
  Button,
  ActionIcon,
  Card,
  Text,
  TextInput,
  Stack,
  Center,
  Rating,
  Flex,
  Space,
  Accordion,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Star, Plus, ExternalLink } from "tabler-icons-react";

export default function User({ data }) {
  const router = useRouter();

  const { user, followers, following, reviews, watchlists } = data?.data;
  const [userWatchlists, setUserWatchLists] = useState(watchlists);

  // Get logged in user's id
  const [authToken, setAuthToken] = useState(null);
  useEffect(() => {
    const auth_token = localStorage.getItem("auth_token");
    const auth_json = auth_token ? JSON.parse(auth_token) : null;
    setAuthToken(auth_json);
  }, []);

  // Update userWatchlists when user changes
  useEffect(() => {
    setUserWatchLists(watchlists);
  }, [user]);

  // Calculate memoized values for display
  // User's average rating across all their reviews
  const avgRating = useMemo(
    () => reviews.reduce((a, b) => a + b.rating, 0) / reviews.length || 0,
    [reviews]
  );
  //  If the logged in user is following this user
  const isLoggedInUserFollowing = useMemo(
    () => followers.some((user) => user.userId === authToken?.userId),
    [authToken, user]
  );

  // Modal state
  const [opened, { open, close }] = useDisclosure(false);
  const [newWatchlistName, setNewWatchlistName] = useState("New Watchlist");

  // Handles creating a new watchlist
  const createWatchlist = () => {
    // Make API call to create review
    fetch(`${process.env.HOST}/watchlists/create`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        userId: authToken?.userId,
        listName: newWatchlistName,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.data?.listId) {
          // Add new watchlist to watchlists array
          const newWatchlists = [
            {
              watchListId: data.data.listId,
              name: newWatchlistName,
              titles: [],
            },
            ...watchlists,
          ];
          setUserWatchLists(newWatchlists);
          setNewWatchlistName("New Watchlist");
          close();
        }
      });
  };

  // Handles removing title from a watchlist
  const removeTitleFromWatchlist = (listId, tconst) => {
    fetch(`${process.env.HOST}/watchlists/remove`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        listId,
        tconst,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        router.reload(window.location.pathname);
      });
  };

  // Handles following a user
  const followUser = () => {
    fetch(`${process.env.HOST}/followers/follow`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        userId: authToken?.userId,
        userFollowsId: user?.[0]?.userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        router.reload(window.location.pathname);
      });
  };

  // Handles unfollowing a user
  const unfollowUser = (userFollowsId) => {
    fetch(`${process.env.HOST}/followers/unfollow`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        userId: authToken?.userId,
        userFollowsId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        router.reload(window.location.pathname);
      });
  };

  return (
    // <></>
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={<Text fz="xl">Create a New Watchlist</Text>}
        size="lg"
        centered
      >
        <Stack>
          <TextInput
            placeholder="e.g. Want to Watch!"
            label="Watchlist Name"
            size="md"
            withAsterisk
            value={newWatchlistName}
            onChange={(e) => {
              setNewWatchlistName(e.currentTarget.value);
            }}
          />
          <Button color="blue" variant="filled" onClick={createWatchlist}>
            Create New Watchlist
          </Button>
        </Stack>
      </Modal>
      <div className={styles.container}>
        <div className={styles.header} style={{ maxWidth: "98%" }}>
          <Group position="apart">
            <Flex gap="sm">
              <h1 className={styles.title}>{user?.[0]?.username}</h1>
              <p className={styles.year}>
                average rating given: {avgRating.toFixed(1)}
                <Star
                  size={28}
                  strokeWidth={2}
                  color={"rgb(233, 196, 106)"}
                  style={{ paddingTop: "8px" }}
                />
                - ({reviews?.length} reviews)
              </p>
            </Flex>
            {authToken?.userId ===
            user?.[0]?.userId ? null : isLoggedInUserFollowing ? (
              <Button
                color="red"
                variant="filled"
                onClick={() => unfollowUser(user?.[0]?.userId)}
              >
                Unfollow
              </Button>
            ) : (
              <Button color="blue" variant="filled" onClick={followUser}>
                Follow
              </Button>
            )}
          </Group>
          <div className={styles.crew}>
            <Text fw={700}>Following</Text>
            <Space w="xs" />
            <Text>{following?.length}</Text>
            <Space w="xs" />
            •
            <Space w="xs" />
            <Text fw={700}>Followers</Text>
            <Space w="xs" />
            <Text>{followers?.length}</Text>
          </div>
        </div>
        {following?.length || followers?.length ? (
          <Accordion mb="xl">
            <Accordion.Item value="following">
              <Accordion.Control>
                <Text fz="xl" fw={700}>
                  Following
                </Text>
              </Accordion.Control>
              <Accordion.Panel>
                <Stack mt="5px">
                  {following?.map((following_user) => (
                    <Link
                      href={`/users/${encodeURIComponent(
                        following_user.userId
                      )}`}
                      style={{ textDecoration: "none" }}
                      key={following_user.userId}
                    >
                      <Card
                        shadow="sm"
                        padding="md"
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
                                {following_user.username}
                              </Text>
                            </Group>
                          </div>
                          <Flex
                            gap="lg"
                            sx={{
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {authToken?.userId === user?.[0]?.userId ? (
                              <Button
                                variant="light"
                                color="red"
                                onClick={(e) => {
                                  e.preventDefault();
                                  unfollowUser(following_user.userId);
                                }}
                              >
                                Unfollow
                              </Button>
                            ) : null}
                            <ExternalLink size={28} strokeWidth={2} />
                          </Flex>
                        </Group>
                      </Card>
                    </Link>
                  ))}
                </Stack>
              </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item value="followers">
              <Accordion.Control>
                <Text fz="xl" fw={700}>
                  Followers
                </Text>
              </Accordion.Control>
              <Accordion.Panel>
                <Stack mt="5px">
                  {followers?.map((user) => (
                    <Link
                      href={`/users/${encodeURIComponent(user.userId)}`}
                      style={{ textDecoration: "none" }}
                      key={user.userId}
                    >
                      <Card
                        shadow="sm"
                        padding="md"
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
                            </Group>
                          </div>
                          <Center gap="5px">
                            <ExternalLink size={28} strokeWidth={2} />
                          </Center>
                        </Group>
                      </Card>
                    </Link>
                  ))}
                </Stack>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        ) : null}
        <Group spacing="xs">
          <h1 className={styles.secondarytitle}>Watchlists</h1>
          {authToken?.userId === user?.[0]?.userId && (
            <ActionIcon
              color="blue"
              variant="filled"
              mt="0.5rem"
              onClick={open}
            >
              <Plus size={48} strokeWidth={2} color={"black"} />
            </ActionIcon>
          )}
        </Group>
        {userWatchlists?.length ? (
          <Accordion mb="xl">
            {userWatchlists.map((watchlist) => (
              <Accordion.Item value={watchlist.watchListId}>
                <Accordion.Control>
                  <Text fz="xl" fw={700}>
                    {watchlist.name}
                  </Text>
                </Accordion.Control>
                <Accordion.Panel>
                  {watchlist.titles.length ? (
                    <Stack mt="5px">
                      {watchlist.titles.map((movie) => (
                        <Link
                          href={`/movies/${encodeURIComponent(movie.tconst)}`}
                          style={{ textDecoration: "none" }}
                          key={movie.tconst}
                        >
                          <Card
                            shadow="sm"
                            padding="md"
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
                                    {movie.primaryTitle}
                                  </Text>
                                </Group>
                              </div>
                              <Flex
                                gap="lg"
                                sx={{
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                {authToken?.userId === user?.[0]?.userId ? (
                                  <Button
                                    variant="light"
                                    color="red"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      removeTitleFromWatchlist(
                                        watchlist.watchListId,
                                        movie.tconst
                                      );
                                    }}
                                  >
                                    Remove from Watchlist
                                  </Button>
                                ) : null}
                                <ExternalLink size={28} strokeWidth={2} />
                              </Flex>
                            </Group>
                          </Card>
                        </Link>
                      ))}
                    </Stack>
                  ) : (
                    <Text color="dimmed">
                      No movies in this watchlist yet! Add entries to your
                      watchlists on movie pages.
                    </Text>
                  )}
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        ) : null}
        <Flex gap="sm" sx={{ alignItems: "center" }}>
          <h1 className={styles.secondarytitle}>Reviews</h1>
          <Text color="dimmed" mt="15px">
            (click a review to navigate to its movie page)
          </Text>
        </Flex>
        <Stack>
          {reviews?.length ? (
            reviews.map((review) => (
              <Link
                href={`/movies/${encodeURIComponent(review.tconst)}`}
                style={{ textDecoration: "none" }}
                key={user.userId}
              >
                <Card
                  shadow="sm"
                  padding="lg"
                  radius="md"
                  withBorder
                  key={review.reviewId}
                  sx={{
                    transition: "0.3s ease",
                    "&:hover": {
                      filter: "brightness(.8)",
                    },
                  }}
                >
                  <Group position="apart">
                    <div style={{ maxWidth: "90%" }}>
                      <Group spacing="xs">
                        <Text fz="xl" fw={500}>
                          TITLE GOES HERE
                        </Text>
                      </Group>
                      <Text>{review.description}</Text>
                    </div>
                    <Center gap="5px">
                      <Star
                        size={28}
                        strokeWidth={2}
                        color={"rgb(233, 196, 106)"}
                      />
                      <Text fz="lg" fw={700} ml="0.3rem">
                        {review.rating.toFixed(1)}
                      </Text>
                    </Center>
                  </Group>
                </Card>
              </Link>
            ))
          ) : (
            <Text fz="xl">This user hasn't written any reviews yet!</Text>
          )}
        </Stack>
      </div>
    </>
  );
}

User.getInitialProps = async (ctx) => {
  const user_id = ctx.query.user_id;
  // Make GET request to /users/:user_id
  const res = await fetch(`${process.env.HOST}/users/${user_id}`, {
    method: "GET",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
  const data = await res.json();

  return { data };
};
