import React from "react";
import { Button, Header as Head, Text, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import usePasswordManager from "../hooks/usePasswordManager";
import useAuth from "../hooks/useAuth";

type Props = {};

function Header({}: Props) {
  const { searchPasswordByQuery } = usePasswordManager();
  const { logoutUser } = useAuth();
  return (
    <Head height={{ base: 50, md: 70 }}>
      <div className="flex items-center justify-between h-full ml-5 mr-5">
        <Text size={25} weight="bold">
          PM
        </Text>
        <TextInput
          sx={{ width: 500 }}
          placeholder="Search for passwords.."
          icon={<IconSearch />}
          onChange={(e) => searchPasswordByQuery(e.target.value)}
        />
        <Button color="red" onClick={logoutUser}>
          Logout
        </Button>
      </div>
    </Head>
  );
}

export default Header;
