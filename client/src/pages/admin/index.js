import { useState, useEffect } from 'react';
import { createStyles, Group, Paper, SimpleGrid, Text, rem } from '@mantine/core';
import { Space, Star, ChevronUp, ChevronDown } from "tabler-icons-react";



const useStyles = createStyles((theme) => ({
    root: {
        padding: `calc(${theme.spacing.xl} * 1.5)`,
    },

    value: {
        fontSize: rem(24),
        fontWeight: 700,
        lineHeight: 1,
    },

    diff: {
        lineHeight: 1,
        display: 'flex',
        alignItems: 'center',
    },

    icon: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4],
    },

    title: {
        fontWeight: 700,
        textTransform: 'uppercase',
    },

    container: {
        padding: '1.5rem 30rem',
        minHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
    },

    main: {
        minHeight: '100vh',
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '5px'
    },
    // auth page is centered
    authPage: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '5px'
    },

    header: {
        display: 'flex',
        gap: '0px',
        justifyContent: 'center',
        width: '100%'
    },


    description: {
        fontSize: '1.5rem'
    }


}));

const icons = {
    user: Star,
    discount: Star,
    receipt: Star,
    coin: Star,
};



export default function Admin({ data }) {
    const [adminData, setAdminData] = useState([]);
    const [authToken, setAuthToken] = useState();

    // Get user info
    useEffect(() => {
        const raw_token = localStorage.getItem("auth_token");
        const auth_json = raw_token ? JSON.parse(raw_token) : null;
        console.log("auth_json: ", auth_json)
        setAuthToken(auth_json);
    }, []);

    // Get admin data
    useEffect(() => {
        // Get admin panel data from /admin/userId endpoint
        const fetchAdminData = async () => {
            const res = await fetch(`${process.env.HOST}/admin/${authToken.userId}`, {
                method: "GET",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
            });
            const data = await res.json();
            setAdminData(data.data);
            console.log("Admin data: ", data.data);
        }
        if (authToken) {
            console.log("Fetching admin data with auth token: ", authToken)
            fetchAdminData();
        }
    }, [authToken]);

    const { classes } = useStyles();
    const stats = adminData.map((stat) => {
        const Icon = Star;
        const DiffIcon = false;

        return (
            <Paper withBorder p="md" radius="md" key={stat.name}>
                <Group position="apart">
                    <Text size="xs" color="dimmed" className={classes.title}>
                        {stat.name}
                    </Text>
                    <Icon className={classes.icon} size="1.4rem" stroke={1.5} />
                </Group>

                <Group align="flex-end" spacing="xs" mt={25}>
                    <Text className={classes.value}>{stat.value}</Text>
                </Group>

            </Paper>
        );
    });
    const unauthorizedPage = (
        <div>
            <div >
                <div className={classes.authPage}>
                    <h1 >Unauthorized</h1>
                    <div className={classes.description}>
                        You are not authorized to view this page. Please login with a user that has the Admin role.
                    </div>
                </div>

            </div>

        </div>
    )
    return (
        <div className={classes.root}>
            {stats.length ? null : unauthorizedPage}
            <SimpleGrid
                cols={4}
                breakpoints={[
                    { maxWidth: 'md', cols: 2 },
                    { maxWidth: 'xs', cols: 1 },
                ]}
            >
                {/* If stats is null, show unauthorized */}
                {stats.length ? stats : null}
            </SimpleGrid>
        </div>
    );
}