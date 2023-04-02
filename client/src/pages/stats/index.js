import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "@/styles/Recommendation.module.css";
import { Group, Button, Card, Text, Stack, Center } from "@mantine/core";
import BarChart from "./components/BarChart";
import GenrePieChart from "./components/GenrePieChart";
import ActorTreemap from "./components/ActorTreemap";
import { Star } from "tabler-icons-react";
import MonoAreaChart from "./components/AreaChart";
import MonoLineChart from "./components/MonoLineChart";
import loadable from '@loadable/component'
import SpriteText from 'three-spritetext';

// https://github.com/vasturiano/react-force-graph/issues/155
const ForceGraph = loadable(() => import('./components/forceGraph'))

export default function Stats() {
    // Get logged in user's id
    const [stats, setStats] = useState([]);

    function genRandomTree(N = 80, reverse = false) {
        const result = {
            nodes: [...Array(N).keys()].map((i) => ({ id: i })),
            links: [...Array(N).keys()]
              .filter((id) => id)
              .map((id) => ({
                [reverse ? "target" : "source"]: id,
                [reverse ? "source" : "target"]: Math.round(Math.random() * (id - 1))
              }))
          }
          console.log("Result is ", result)
        return result;
      }


    // Get stats
    useEffect(() => {
        // Get stats from backend /stats/:userId endpoint
        const fetchStats = async () => {
            const res = await fetch(`${process.env.HOST}/stats`, {
                method: "GET",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
            });
            const data = await res.json();
            setStats(data.data);
            console.log("Stats: ", data.data);
        };
        fetchStats();
    }, []);


    // Return a page with a list of stats
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Stats</h1>
                <p className={styles.description}>Dataset statistics</p>
            </div>

            <div>
                Learn about the IMDB dataset through these statistics and data visualizations!
            </div>
            <div>
                <b>NOTE:</b> You must have the production dataset loaded, or else the visualizations may not be accurate.

            </div>

            <h2>Number of movie releases by year</h2>

            {stats ? <MonoAreaChart data={stats.moviesPerYear} nameKey={"startYear"} dataKey={"num_movies"} /> : null}

            <h2>Proportion of movies by genre</h2>

            {stats.moviesByGenre ? <GenrePieChart data={stats.moviesByGenre} /> : null}

            <h2>Actors that have starred in the most movies</h2>
            {stats.actorsByMovieCount ? <BarChart data={stats.actorsByMovieCount} nameKey={"name"} dataKey={"num_movies"} /> : null}

            <h2>Distribution of movie runtime (minutes)</h2>
            {stats ? <BarChart data={stats.movieRuntimeLengths} nameKey={"runtime_range"} dataKey={"num_movies"} /> : null}

            <h2>Moving Average of Ratings (3 year window)</h2>
            {stats ? <MonoLineChart data={stats.ratingsByYear} nameKey={"startYear"} dataKey={"moving_average"} /> : null}

            <h2>User social network graph</h2>
            {stats ? <ForceGraph
                width={800}
                height={600}
                graphData={stats.socialNetwork}
                nodeLabel="id"
                linkColor={"#000000"}
                nodeThreeObject={node => {
                    const sprite = new SpriteText(node.id);
                    sprite.color = '#ffffff';
                    sprite.textHeight = 8;
                    return sprite;
                  }}
                linkWidth={1}
                zoom={1.0}
                backgroundColor="#1a1b1e00"
                linkDirectionalArrowLength={5}
                linkOpacity={1.0}

            />

                : null}


        </div>
    );

}