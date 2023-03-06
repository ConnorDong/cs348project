import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "@/styles/Home.module.css";
import { Flex, Button } from "@mantine/core";

export default function Home() {
  const [data, setData] = useState("");

  useEffect(() => {
    fetch(`${process.env.HOST}`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);
  console.log(data);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div>
          <h1 className={styles.title}>Movies</h1>
          <p className={styles.description}>A list of all movies.</p>
        </div>
      </main>
    </div>
  );
}
