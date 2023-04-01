// Create recommenation page using Nextjs and React
//
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "@/styles/Recommendation.module.css";
import { Group, Button, Card, Text, Stack, Center } from "@mantine/core";
import { Star } from "tabler-icons-react";

export default function Recommendations() {
    // Get logged in user's id
    const [authToken, setAuthToken] = useState(null);
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        const raw_token = localStorage.getItem("auth_token");
        const auth_json = raw_token ? JSON.parse(raw_token) : null;
        console.log("auth_json: ", auth_json)
        setAuthToken(auth_json);

    }, []);

    // Get recommendations
    useEffect(() => {
        // Get recommendations from backend /recommendations/:userId endpoint
        const fetchRecommendations = async (userId) => {
            const res = await fetch(`${process.env.HOST}/recommendations/${userId}`, {
                method: "GET",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
            });
            const data = await res.json();
            setRecommendations(data.data);
            console.log("Recommendations: ", data.data);
        };
        console.log("authToken: ", authToken)
        if (authToken) {
            fetchRecommendations(authToken.userId);
        }

    }, [authToken]);


    // Return a page with a list of recommendations
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Recommendations</h1>
                <p className={styles.description}>Movies recommended for you</p>
            </div>

            <div>
                Recommendations are generated using a collaborative filtering algorithm. To see more recommendations, simply add movies to your watch list and get new matches based on other users' watch lists!

            </div>


            <Stack>
                {recommendations?.length
                    ? recommendations.map((recommendation) => (
                        <Link
                            href={`/movies/${encodeURIComponent(recommendation.recommended_movie)}`}
                            style={{ textDecoration: "none" }}
                            key={recommendation.recommended_movie}
                        >
                            <Card
                                shadow="sm"
                                padding="lg"
                                radius="md"
                                withBorder
                                className={styles.card}
                            >
                                <Group position="center">
                                    <Text size="xl" weight={500}>
                                        {recommendation.primaryTitle}
                                    </Text>

                                    <Text size="xl" weight={200}>
                                        {/* Round recommendation score to 2 decimals */}
                                        Similarity score: {recommendation.score.toFixed(3)}
                                    </Text>
                                </Group>
                            </Card>
                        </Link>
                    ))
                    : null}
            </Stack>
        </div>
    );

}