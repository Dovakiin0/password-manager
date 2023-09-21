import React, { useEffect } from "react";
import {
  Button,
  Card,
  Divider,
  Image,
  PasswordInput,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import { ILoginUser } from "../types/IUser";
import { motion } from "framer-motion";
import useAuth from "../hooks/useAuth";

type Props = {};

function Login({}: Props) {
  // const { login, loading, current, authenticated } = useAuth();
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const form = useForm<ILoginUser>({
    initialValues: {
      username: "",
      password: "",
    },
  });

  const handleSubmit = (values: ILoginUser) => {
    // login(values);
  };

  // useEffect(() => {
  //   if (authenticated && current) {
  //     navigate("/");
  //   }
  // }, [authenticated, current]);

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
            Login to your account
          </Text>
          <div className="flex space-x-2">
            <Text color={theme.colors.dark[1]}>Don't have an account? </Text>
            <Link to="/register">
              <Text weight="bold">Sign up</Text>
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
              {...form.getInputProps("username")}
            />
            <PasswordInput
              withAsterisk
              label="Password"
              {...form.getInputProps("password")}
            />
            <Button type="submit" color="cyan" loading={false}>
              Login
            </Button>
          </form>
        </div>
      </Card>
    </motion.div>
  );
}

export default Login;
