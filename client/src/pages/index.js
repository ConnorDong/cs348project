import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "@/styles/Home.module.css";
import { Flex, Button } from "@mantine/core";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>CS348 Movie Database</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>
          <h1 className={styles.title}>CS348: Movie Database</h1>
          <p className={styles.description}>
            A comprehensive movie database built on the IMDB dataset.
          </p>
        </div>
        <p className={styles.description}>
          Please login or register an account:
        </p>
        <Flex gap="md">
          <Link href="/authenticate">
            <Button size="xl">Login/Register</Button>
          </Link>
        </Flex>
      </main>
    </div>
  );
}
