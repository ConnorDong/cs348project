import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/Movie.module.css";
import {
  Modal,
  Group,
  Button,
  ActionIcon,
  Card,
  Text,
  Textarea,
  Stack,
  Center,
  Rating,
  Flex,
  Space,
  Accordion,
  Select,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Star, Plus, Trash } from "tabler-icons-react";

export default function Movie({ data, tmdb_data }) {
  const {
    titleId,
    title,
    year,
    genre,
    directors,
    writers,
    portrayals,
    ratings,
    voteCount,
    reviews,
  } = data;
  const [userReviews, setUserReviews] = useState(reviews);

  // Get logged in user's id
  const [authToken, setAuthToken] = useState(null);
  const [userWatchlists, setUserWatchlists] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`${process.env.HOST}/users/${auth_json.userId}`, {
        method: "GET",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
      const data = await res.json();
      // Put user's watchlists in state
      setUserWatchlists(data?.data?.watchlists);
    };

    const auth_token = localStorage.getItem("auth_token");
    const auth_json = auth_token ? JSON.parse(auth_token) : null;
    setAuthToken(auth_json);
    if (auth_json) {
      // Fetch logged in user's info (for watchlist info)
      fetchUser();
    }
  }, []);

  const [imageError, setImageError] = useState(false);

  // Modal state
  const [
    reviewModalOpened,
    { open: openReviewModal, close: closeReviewModal },
  ] = useDisclosure(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewDescription, setReviewDescription] = useState("");
  const [reviewError, setReviewError] = useState("");
  const [
    watchlistModalOpened,
    { open: openWatchlistModal, close: closeWatchlistModal },
  ] = useDisclosure(false);
  const [selectedWatchlist, setSelectedWatchlist] = useState("");
  const [watchlistError, setWatchlistError] = useState("");
  const [watchlistSuccess, setWatchlistSuccess] = useState("");

  // Handles submitting a review (made by the logged in user)
  const handleSubmit = () => {
    if (reviewDescription.length < 10) {
      setReviewError("Review must be at least 10 characters.");
      return;
    } else {
      // Make API call to create review
      fetch(`${process.env.HOST}/review`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          userId: authToken?.userId,
          titleId: titleId,
          rating: reviewRating,
          description: reviewDescription,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.data?.reviewId) {
            // Add review to reviews array
            const newReviews = [
              ...userReviews,
              {
                reviewId: data.data.reviewId,
                username: authToken?.username,
                rating: reviewRating,
                comment: reviewDescription,
              },
            ];
            setUserReviews(newReviews);
            setReviewDescription("");
            setReviewRating(5);
            closeReviewModal();
          }
        });
    }
  };

  // Handles deleting a review (made by the logged in user)
  const handleDelete = (reviewId) => {
    // Make API call to delete review with reviewId
    fetch(`${process.env.HOST}/review/delete`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ reviewId }),
    }).then((res) => {
      if (res.status === 200) {
        // Remove review from reviews array
        const newReviews = userReviews.filter(
          (review) => review.reviewId !== reviewId
        );
        setUserReviews(newReviews);
      }
    });
  };

  // Handles adding title to a watchlist
  const handleAddTitleToWatchlist = () => {
    console.log(selectedWatchlist);
    // Check if title is already in this watchlist, and if so, show error
    const watchlist = userWatchlists.find(
      (watchlist) => watchlist.watchListId === selectedWatchlist
    );
    console.log("titles: ", watchlist?.titles);
    if (watchlist?.titles?.find((title) => title.tconst === titleId)) {
      setWatchlistError(`${title} is already in this watchlist.`);
      return;
    }

    // Else, ake API call to delete review with reviewId
    fetch(`${process.env.HOST}/watchlists/append`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ listId: selectedWatchlist, tconst: titleId }),
    }).then((res) => {
      if (res.status === 200) {
        // Add title to userWatchlists locally
        const newWatchlists = userWatchlists.map((watchlist) => {
          if (watchlist.watchListId === selectedWatchlist) {
            return {
              ...watchlist,
              titles: [
                ...watchlist.titles,
                { tconst: titleId, primaryTitle: title },
              ],
            };
          }
          return watchlist;
        });
        setUserWatchlists(newWatchlists);
        setWatchlistSuccess("Title added to watchlist!");
      }
    });
  };

  return (
    <>
      <Modal
        opened={reviewModalOpened}
        onClose={closeReviewModal}
        title="Write a Review"
        size="lg"
        centered
      >
        <Stack>
          <Rating
            fractions={2}
            defaultValue={5}
            count={10}
            size="lg"
            onChange={setReviewRating}
          />
          <Textarea
            placeholder="Write your review here - be creative!"
            label="Review description"
            error={reviewError}
            size="md"
            withAsterisk
            value={reviewDescription}
            onChange={(e) => {
              setReviewDescription(e.currentTarget.value);
              setReviewError("");
            }}
          />
          <Button color="blue" variant="filled" onClick={handleSubmit}>
            Submit Review
          </Button>
        </Stack>
      </Modal>
      <Modal
        opened={watchlistModalOpened}
        onClose={() => {
          closeWatchlistModal();
          setWatchlistSuccess("");
        }}
        title={
          <Text>
            Add <b>{title}</b> to a watchlist
          </Text>
        }
        size="lg"
        centered
      >
        <Stack>
          <Select
            value={selectedWatchlist}
            onChange={(value) => {
              setSelectedWatchlist(value);
              setWatchlistError("");
            }}
            name="selectWatchlist"
            label="Select the watchlist you want to add to (remove titles on your profile page):"
            withAsterisk
            dropdownPosition="bottom"
            initiallyOpened={true}
            data={userWatchlists?.map((watchlist) => ({
              value: watchlist.watchListId,
              label: watchlist.name,
            }))}
          />
          <Space h="250px" />
          {watchlistError ? <Text color="red">{watchlistError}</Text> : null}
          {watchlistSuccess ? (
            <Text color="green">{watchlistSuccess}</Text>
          ) : null}
          <Button
            color="blue"
            variant="filled"
            onClick={() => {
              setWatchlistSuccess("");
              handleAddTitleToWatchlist();
            }}
          >
            Add to Watchlist
          </Button>
        </Stack>
      </Modal>
      <div className={styles.container}>
        <div className={styles.header}>
          <Flex gap="sm">
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.year}>
              ({year}) • {genre} • {ratings}
              <Star
                size={28}
                strokeWidth={2}
                color={"rgb(233, 196, 106)"}
                style={{ paddingTop: "8px" }}
              />
              - ({voteCount} votes)
            </p>
          </Flex>
          <div className={styles.crew}>
            <Text fw={700}>
              Director{directors?.split(",")?.length > 1 ? "s" : ""}:
            </Text>
            <Space w="xs" />
            <Text>{directors}</Text>
            <Space w="xs" />
            •
            <Space w="xs" />
            <Text fw={700}>
              Writer{writers?.split(",")?.length > 1 ? "s" : ""}:{" "}
            </Text>
            <Space w="xs" />
            <Text>{writers}</Text>
          </div>
        </div>
        <Button
          color="blue"
          variant="filled"
          maw="180px"
          mb="15px"
          onClick={openWatchlistModal}
        >
          + Add to Watchlist
        </Button>
        {portrayals?.length ? (
          <Accordion defaultValue="customization" mb="xl">
            <Accordion.Item value="customization">
              <Accordion.Control>
                <Text fz="xl" fw={700}>
                  Cast
                </Text>
              </Accordion.Control>
              <Accordion.Panel>
                <Stack>
                  {portrayals?.map((portrayal) => (
                    <Flex
                      sx={{ alignItems: "center" }}
                      key={portrayal.actorName}
                    >
                      <Text fz="1.4rem" fw={500}>
                        {portrayal.actorName}
                      </Text>
                      <Space w="xs" />
                      •
                      <Space w="xs" />
                      <Flex gap="md">
                        {portrayal.portrays.map((role) => (
                          <Text fz="xl" fw={500} key={role}>
                            {role}
                          </Text>
                        ))}
                      </Flex>
                    </Flex>
                  ))}
                </Stack>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        ) : null}
        {tmdb_data && (
          <Flex gap="md">
            {!imageError && (
              <Image
                src={`https://image.tmdb.org/t/p/original/${tmdb_data?.poster_path?.substring(
                  1
                )}`}
                alt="Movie Poster"
                width={300}
                height={450}
                onError={(e) => setImageError(true)}
              />
            )}
            <p className={styles.description}>{tmdb_data?.overview}</p>
          </Flex>
        )}
        <Group spacing="xs">
          <h1 className={styles.secondarytitle}>Reviews</h1>
          <ActionIcon
            color="blue"
            variant="filled"
            mt="0.5rem"
            onClick={openReviewModal}
          >
            <Plus size={48} strokeWidth={2} color={"black"} />
          </ActionIcon>
        </Group>
        <Stack>
          {userReviews?.length ? (
            userReviews.map((review) => (
              <Card
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                key={review.reviewId}
              >
                <Group position="apart">
                  <div style={{ maxWidth: "90%" }}>
                    <Group spacing="xs">
                      <Text fz="xl" fw={500}>
                        {review.username}
                      </Text>
                      {/* ONLY SHOW THIS IF OUR USERNAME = REVIEW'S USERNAME */}
                      {authToken?.username === review.username && (
                        <ActionIcon
                          onClick={() => handleDelete(review.reviewId)}
                        >
                          <Trash size={20} strokeWidth={2} color={"gray"} />
                        </ActionIcon>
                      )}
                    </Group>
                    <Text>{review.comment}</Text>
                  </div>
                  <Center gap="5px">
                    <Star
                      size={28}
                      strokeWidth={2}
                      color={"rgb(233, 196, 106)"}
                    />
                    <Text fz="lg" fw={700} ml="0.3rem">
                      {review.rating}
                    </Text>
                  </Center>
                </Group>
              </Card>
            ))
          ) : (
            <Text fz="xl">
              No user reviews for this movie yet! Be the first to add one by
              clicking on the + button above!
            </Text>
          )}
        </Stack>
      </div>
    </>
  );
}

Movie.getInitialProps = async (ctx) => {
  const movie_id = ctx.query.movie_id;
  // Make POST request to /movies/:movie_id
  const res = await fetch(`${process.env.HOST}/movie/details`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ titleId: movie_id }),
  });
  const data = await res.json();

  const test_movie_title = data?.title;
  const tmdb_res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=4b7265621335b7d231692d8f65ad1857&language=en-US&page=1&include_adult=true&query=${test_movie_title}`
  );
  const tmdb_data = (await tmdb_res.json())?.results?.[0];

  return { data, tmdb_data };
};
