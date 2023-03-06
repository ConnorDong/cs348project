import { useState, useEffect } from "react";
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
    ratings,
    voteCount,
    reviews,
  } = data;
  console.table(data);
  const [userReviews, setUserReviews] = useState(reviews);

  // Get logged in user's id
  const [authToken, setAuthToken] = useState(null);
  useEffect(() => {
    const auth_token = localStorage.getItem("auth_token");
    const auth_json = auth_token ? JSON.parse(auth_token) : null;
    setAuthToken(auth_json);
  }, []);

  const [imageError, setImageError] = useState(false);

  // Modal state
  const [opened, { open, close }] = useDisclosure(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewDescription, setReviewDescription] = useState("");
  const [reviewError, setReviewError] = useState("");

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
            close();
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

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
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
        </div>
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
          <ActionIcon color="blue" variant="filled" mt="0.5rem" onClick={open}>
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
