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
import Head from "next/head";
import styles from "@/styles/Authenticate.module.css";

export default function Authenticate(props) {
  const [type, toggle] = useToggle(["login", "register"]);
  const form = useForm({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  const handleSubmit = () => {
    form.onSubmit((values) => {
      console.log(values);
      // Make API call to register/login
      if (type === "register") {
        fetch(`http://localhost:5000/${type}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
          });
      }
    });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>{upperFirst(type)}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Paper radius="md" p="xl" withBorder {...props}>
          <Text size="xl" weight={500}>
            {upperFirst(type)} to our Movie Database!
          </Text>
          <Space h="md" />
          <form onSubmit={() => handleSubmit()}>
            <Stack>
              <TextInput
                required
                label="Email"
                placeholder="you@gmail.com"
                value={form.values.email}
                onChange={(event) =>
                  form.setFieldValue("email", event.currentTarget.value)
                }
                error={form.errors.email && "Invalid email"}
                radius="md"
              />

              {type === "register" && (
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
              )}

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
