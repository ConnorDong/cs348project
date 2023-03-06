import Link from "next/link";
import styles from "@/styles/Home.module.css";
import { Flex, Button } from "@mantine/core";
import { Movie } from "tabler-icons-react";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div>
          <div className={styles.title}>
            MovieDB <Movie size={70} strokeWidth={2} color={"gray"} />
          </div>
          <p className={styles.description}>
            A comprehensive movie database with users, reviews, and real movies.
            Built on the IMDB dataset.
          </p>
        </div>
        <p className={styles.description}>
          Please login or sign up for an account:
        </p>
        <Flex gap="md">
          <Link href="/authenticate">
            <Button size="lg">Login/Register</Button>
          </Link>
        </Flex>
      </main>
    </div>
  );
}
