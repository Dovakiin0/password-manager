import { useEffect } from "react";
import {
  Button,
  Card,
  Divider,
  PasswordInput,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import { IRegisterUser } from "../types/IUser";
import useAuth from "../hooks/useAuth";

function Register() {
  const { register, current, loading } = useAuth();
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const form = useForm<IRegisterUser>({
    initialValues: {
      password: "",
      confirm_password: "",
      username: "",
    },
    validate: {
      confirm_password: (value, values) =>
        values.password !== value ? "Password Does not match" : null,
      username: (value) =>
        value.length <= 3 ? "Username must be more than 3 characters" : null,
      password: (value) =>
        value.length === 0 ? "Password cannot be empty" : null,
    },
  });

  const handleSubmit = (values: IRegisterUser) => {
    register(values, () => {
      navigate("/");
    });
  };

  useEffect(() => {
    if (current) {
      navigate("/");
    }
  }, [current]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        opacity: 1,
        scale: 1,
        transition: { ease: "easeOut", delay: 0.5 },
      }}
      className="w-screen h-screen flex flex-col space-y-4 items-center justify-center"
    >
      <div className="">
        <Text weight="bold" size={25}>
          Password Manager
        </Text>
      </div>
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        className={`w-full xl:w-1/4`}
      >
        <div className="m-2 flex flex-col space-y-2">
          <Text size={25} weight={"bold"}>
            Create New Account
          </Text>
          <div className="flex space-x-2">
            <Text color={theme.colors.dark[1]}>Already have an account? </Text>
            <Link to="/login">
              <Text weight="bold">Sign in</Text>
            </Link>
          </div>
          <Divider />
          <form
            onSubmit={form.onSubmit((values) => handleSubmit(values))}
            className="flex flex-col space-y-5"
          >
            <TextInput
              withAsterisk
              label="Username"
              placeholder="Your Usernam"
              {...form.getInputProps("username")}
            />
            <PasswordInput
              withAsterisk
              label="Your password"
              placeholder="Your password"
              {...form.getInputProps("password")}
            />

            <PasswordInput
              withAsterisk
              label="Confirm Password"
              placeholder="Confirm Password"
              {...form.getInputProps("confirm_password")}
            />
            <Button type="submit" color="cyan" loading={loading}>
              Register
            </Button>
          </form>
        </div>
      </Card>
    </motion.div>
  );
}

export default Register;
