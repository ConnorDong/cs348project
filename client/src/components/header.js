import {
  createStyles,
  Header,
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Anchor,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
} from "@mantine/core";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/Header.module.css";

export default function CustomHeader() {
  // Check if we're already authenticated (useEffect since Window object is not available during SSR)
  const router = useRouter();
  const [authToken, setAuthToken] = useState(null);
  useEffect(() => {
    const auth_token = localStorage.getItem("auth_token");
    setAuthToken(auth_token);
  }, [router.asPath]);

  return (
    <Box pos="fixed" top="0" w="100%">
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
              <Button
                variant="subtle"
                color="gray"
                h="100%"
                onClick={() => router.push("/movies")}
              >
                Movies
              </Button>
            )}
          </Button.Group>

          <Group>
            {authToken && (
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
            )}
            {!authToken && (
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
