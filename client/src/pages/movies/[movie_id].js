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
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Star, Plus, Trash } from "tabler-icons-react";

export default function Movie({ tmdb_data }) {
  const [data, setData] = useState([]);
  const reviews = [
    {
      username: "user1",
      rating: 5,
      description:
        "This movie was great! This movie was great! This movie was great! This movie was great! This movie was great! This movie was great!This movie was great!This movie was great!This movie was great!This movie was great!This movie was great!",
    },
    { username: "user2", rating: 3, description: "This movie was okay." },
    { username: "user3", rating: 1, description: "This movie was terrible." },
  ];

  useEffect(() => {
    // fetch(`${process.env.HOST}`)
    //   .then((res) => res.json())
    //   .then((data) => setData(data));
  }, []);
  console.log(tmdb_data);

  // Modal state
  const [opened, { open, close }] = useDisclosure(false);
  const [reviewRating, setReviewRating] = useState(3);
  const [reviewDescription, setReviewDescription] = useState("");
  const [reviewError, setReviewError] = useState("");

  const handleSubmit = () => {
    if (reviewDescription.length < 10) {
      setReviewError("Review must be at least 10 characters.");
      return;
    }
    console.table({ reviewDescription, reviewRating });
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
          <Rating fractions={2} defaultValue={3} onChange={setReviewRating} />
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
          <h1 className={styles.title}>Movie Title</h1>
          <p className={styles.year}>2013 • Action</p>
        </div>
        {tmdb_data && (
          <>
            <p className={styles.description}>{tmdb_data?.overview}</p>
            <Image
              src={`https://image.tmdb.org/t/p/original${tmdb_data?.poster_path}`}
              alt="Movie Poster"
              width={300}
              height={450}
            />
          </>
        )}
        <Group spacing="xs">
          <h1 className={styles.secondarytitle}>Reviews</h1>
          <ActionIcon color="blue" variant="filled" mt="0.5rem" onClick={open}>
            <Plus size={48} strokeWidth={2} color={"black"} />
          </ActionIcon>
        </Group>
        <Stack>
          {reviews?.length &&
            reviews.map((review) => (
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Group position="apart">
                  <div style={{ maxWidth: "90%" }}>
                    <Group spacing="xs">
                      <Text fz="xl" fw={500}>
                        {review.username}
                      </Text>
                      {/* ONLY SHOW THIS IF OUR USERID = REVIEW'S USERID */}
                      <ActionIcon onClick={() => console.log("delete this")}>
                        <Trash size={20} strokeWidth={2} color={"gray"} />
                      </ActionIcon>
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
                      {review.rating}
                    </Text>
                  </Center>
                </Group>
              </Card>
            ))}
        </Stack>
      </div>
    </>
  );
}

Movie.getInitialProps = async (ctx) => {
  const movie_id = ctx.query.movie_id;
  // const res = await fetch(`${process.env.HOST}/movie/${movie_id}`);
  // const { data } = await res.json();

  const test_movie_title = "eVERYTHING EVERYWHERE";
  const tmdb_res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=4b7265621335b7d231692d8f65ad1857&language=en-US&page=1&include_adult=true&query=${test_movie_title}`
  );
  const tmdb_data = (await tmdb_res.json())?.results?.[0];

  return { tmdb_data };
};
