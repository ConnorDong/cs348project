import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "@/styles/Movies.module.css";
import { Group, Button, Card, Text, Stack, Center } from "@mantine/core";
import { Space, Star } from "tabler-icons-react";

export default function Genre({ genreInfo, movies, initialNextCursor }) {
  const [paginatedMovies, setPaginatedMovies] = useState(movies);
  const [nextCursor, setNextCursor] = useState(initialNextCursor);

  const loadMore = async () => {
    const res = await fetch(
      `${process.env.HOST}/moviesByGenre?genre=${genreInfo.genre}&cursor=${nextCursor}`
    );
    const data = await res.json();
    setPaginatedMovies([...paginatedMovies, ...data?.movies]);
    setNextCursor(data?.nextCursor);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{genreInfo.genre}</h1>
        <p className={styles.description}>
          A directory of all {genreInfo.genre} movies in MovieDB
        </p>
      </div>
      <Stack>
        {paginatedMovies?.length &&
          paginatedMovies.map((movie) => (
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
        <Button onClick={loadMore}>Load More</Button>
      </Stack>
    </div>
  );
}

Genre.getInitialProps = async (ctx) => {
  const genre = ctx.query.genre;
  const res = await fetch(`${process.env.HOST}/moviesByGenre?genre=${genre}`);
  const data = await res.json();
  console.log(data);

  return {
    genreInfo: data?.genreInfo,
    movies: data?.movies,
    initialNextCursor: data?.nextCursor,
  };
};
