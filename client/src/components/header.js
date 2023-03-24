import {
  Header,
  Group,
  Button,
  Text,
  Box,
  useMantineColorScheme,
  ActionIcon,
} from "@mantine/core";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Sun, MoonStars, User } from "tabler-icons-react";
import styles from "../styles/Header.module.css";

export default function CustomHeader() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  // Check if we're already authenticated (useEffect since Window object is not available during SSR)
  const router = useRouter();
  const [authToken, setAuthToken] = useState(null);
  useEffect(() => {
    const auth_token = localStorage.getItem("auth_token");
    setAuthToken(auth_token);
  }, [router.asPath]);

  return (
    <Box pos="fixed" top="0" w="100%" sx={{ zIndex: "2" }}>
      <Header height={60} px="md">
        <Group position="apart" sx={{ height: "100%" }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <Text
              variant="gradient"
              gradient={{ from: "indigo", to: "cyan", deg: 45 }}
              fz={30}
              fw={700}
            >
              MovieDB
            </Text>
          </Link>

          <Button.Group h="100%">
            <Button
              variant="subtle"
              color="gray"
              h="100%"
              onClick={() => router.push("/")}
            >
              Home
            </Button>
            {authToken && (
              <>
                <Button
                  variant="subtle"
                  color="gray"
                  h="100%"
                  onClick={() => router.push("/movies")}
                >
                  Movies
                </Button>
                <Button
                  variant="subtle"
                  color="gray"
                  h="100%"
                  onClick={() => router.push("/movies")}
                >
                  Genres
                </Button>
                <Button
                  variant="subtle"
                  color="gray"
                  h="100%"
                  onClick={() => router.push("/users")}
                >
                  Users
                </Button>
                <Button
                  variant="subtle"
                  color="gray"
                  h="100%"
                  onClick={() =>
                    router.push(`/users/${JSON.parse(authToken).userId}`)
                  }
                >
                  My Profile
                  <User />
                </Button>
              </>
            )}
          </Button.Group>

          <Group>
            <ActionIcon
              onClick={() => toggleColorScheme()}
              size="lg"
              sx={(theme) => ({
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[6]
                    : theme.colors.gray[0],
                color:
                  theme.colorScheme === "dark"
                    ? theme.colors.yellow[4]
                    : theme.colors.blue[6],
              })}
            >
              {colorScheme === "dark" ? (
                <Sun size="1.2rem" />
              ) : (
                <MoonStars size="1.2rem" />
              )}
            </ActionIcon>
            {authToken ? (
              <Button
                variant="default"
                onClick={() => {
                  localStorage.removeItem("auth_token");
                  setAuthToken(null);
                  router.push("/");
                }}
              >
                Log out
              </Button>
            ) : (
              <Link href="/authenticate">
                <Button>Login/Register</Button>
              </Link>
            )}
          </Group>
        </Group>
      </Header>
    </Box>
  );
}
