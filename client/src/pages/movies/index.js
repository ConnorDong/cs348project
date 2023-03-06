import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "@/styles/Movies.module.css";
import { Group, Button, Card, Text, Stack, Center } from "@mantine/core";
import { Star } from "tabler-icons-react";

export default function Movies({ movies }) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Movies</h1>
        <p className={styles.description}>
          A directory of all movies in MovieDB
        </p>
      </div>
      <Stack>
        {movies?.length &&
          movies.map((movie) => (
            <Link
              href={`/movies/${encodeURIComponent(movie.titleId)}`}
              style={{ textDecoration: "none" }}
              key={movie.titleId}
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
                      {movie.ratings}
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

Movies.getInitialProps = async (ctx) => {
  const res = await fetch(`${process.env.HOST}/movies`);
  const data = await res.json();

  return { movies: data?.movies };
};
