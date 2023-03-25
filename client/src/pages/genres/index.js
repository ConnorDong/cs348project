import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "@/styles/Movies.module.css";
import { Group, Button, Card, Text, Stack, Center } from "@mantine/core";
import { Space, Star } from "tabler-icons-react";

export default function Genres({ genres }) {
  console.log(genres);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Genres</h1>
        <p className={styles.description}>View movies by genre</p>
      </div>
      <Stack>
        {genres?.length &&
          genres.map((genre) => (
            <Link
              href={`/genres/${encodeURIComponent(genre.genre)}`}
              style={{ textDecoration: "none" }}
              key={genre.genre}
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
                        {genre.genre}
                      </Text>
                      <Text color="dimmed">({genre.count} movies)</Text>
                    </Group>

                    <Text>{genre.description}</Text>
                  </div>
                  <Center gap="5px">
                    <Text fz="lg" ml="0.3rem" mr="0.3rem">
                      Average Rating:
                    </Text>
                    <Star
                      size={28}
                      strokeWidth={2}
                      color={"rgb(233, 196, 106)"}
                    />
                    <Text fz="lg" fw={700} ml="0.3rem">
                      {genre.averageRating.toFixed(1)}
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

Genres.getInitialProps = async (ctx) => {
  const res = await fetch(`${process.env.HOST}/genres`);
  const data = await res.json();
  console.log(data);

  return { genres: data?.data };
};
