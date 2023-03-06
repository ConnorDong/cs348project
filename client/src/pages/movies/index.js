import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "@/styles/Movies.module.css";
import { Group, Button, Card, Text, Stack, Center } from "@mantine/core";
import { Star } from "tabler-icons-react";

export default function Movies() {
  const [data, setData] = useState([
    {
      id: 31,
      title: "Movie Title",
      genre: "Action",
      year: "2013",
      rating: 8.5,
    },
    {
      id: 31,
      title: "Movie Title",
      genre: "Action",
      year: "2013",
      rating: 8.5,
    },
    {
      id: 31,
      title: "Movie Title",
      genre: "Action",
      year: "2013",
      rating: 8.5,
    },
    {
      id: 31,
      title: "Movie Title",
      genre: "Action",
      year: "2013",
      rating: 8.5,
    },
    {
      id: 31,
      title: "Movie Title",
      genre: "Action",
      year: "2013",
      rating: 8.5,
    },
    {
      id: 31,
      title: "Movie Title",
      genre: "Action",
      year: "2013",
      rating: 8.5,
    },
    {
      id: 31,
      title: "Movie Title",
      genre: "Action",
      year: "2013",
      rating: 8.5,
    },
  ]);

  useEffect(() => {
    // fetch(`${process.env.HOST}`)
    //   .then((res) => res.json())
    //   .then((data) => setData(data));
  }, []);
  console.log(data);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Movies</h1>
        <p className={styles.description}>
          A directory of all movies in MovieDB
        </p>
      </div>
      <Stack>
        {data?.length &&
          data.map((movie) => (
            <Link
              href={`/movies/${encodeURIComponent(movie.id)}`}
              style={{ textDecoration: "none" }}
              key={movie.id}
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
                        {movie.title}
                      </Text>
                      <Text color="dimmed">({movie.year})</Text>
                    </Group>

                    <Text>{movie.genre}</Text>
                  </div>
                  <Center gap="5px">
                    <Star
                      size={28}
                      strokeWidth={2}
                      color={"rgb(233, 196, 106)"}
                    />
                    <Text fz="lg" fw={700} ml="0.3rem">
                      {movie.rating}
                    </Text>
                  </Center>
                </Group>
              </Card>
            </Link>
          ))}
      </Stack>
    </div>
  );
}
