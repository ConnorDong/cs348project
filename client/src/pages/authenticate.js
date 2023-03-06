import { useEffect } from "react";
import { useRouter } from "next/router";
import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Anchor,
  Stack,
  Space,
} from "@mantine/core";
import styles from "@/styles/Authenticate.module.css";

export default function Authenticate(props) {
  const [type, toggle] = useToggle(["login", "register"]);
  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },

    validate: {
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  const handleSubmit = (values) => {
    // Make API call to register/login
    fetch(`${process.env.HOST}/${type}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        console.table(data);
        const { userId, username } = data?.data || {};
        if (userId && username) {
          localStorage.setItem(
            "auth_token",
            JSON.stringify({ userId, username })
          );
          router.push("/movies");
        }
      });
  };

  // Check if we're already authenticated (useEffect since Window object is not available during SSR)
  const router = useRouter();
  useEffect(() => {
    const auth_token = localStorage.getItem("auth_token");
    if (auth_token) {
      router.push("/movies");
    }
  }, []);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Paper radius="md" p="xl" w={400} withBorder {...props}>
          <Text size="xl" weight={500}>
            {/* Login to MovieDB! / Register for MovieDB! */}
            {upperFirst(type)} {type == "login" ? "to" : "for"} MovieDB!
          </Text>
          <Space h="md" />
          <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <Stack>
              <TextInput
                required
                label="Username"
                placeholder="Your username"
                value={form.values.username}
                onChange={(event) =>
                  form.setFieldValue("username", event.currentTarget.value)
                }
                radius="md"
              />

              <PasswordInput
                required
                label="Password"
                placeholder="Your password"
                value={form.values.password}
                onChange={(event) =>
                  form.setFieldValue("password", event.currentTarget.value)
                }
                error={
                  form.errors.password &&
                  "Password should include at least 6 characters"
                }
                radius="md"
              />
            </Stack>

            <Group position="apart" mt="xl">
              <Anchor
                component="button"
                type="button"
                color="dimmed"
                onClick={() => toggle()}
                size="xs"
              >
                {type === "register"
                  ? "Already have an account? Login"
                  : "Don't have an account? Register"}
              </Anchor>
              <Button type="submit" radius="xl">
                {upperFirst(type)}
              </Button>
            </Group>
          </form>
        </Paper>
      </main>
    </div>
  );
}
