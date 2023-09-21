import { Text, Button } from "@mantine/core";
import PasswordHolder from "../components/PasswordHolder";
import usePasswordManager from "../hooks/usePasswordManager";
import AddModal from "../components/AddModal";
import { useDisclosure } from "@mantine/hooks";

type Props = {};

function Home({}: Props) {
  const { passwords, createNewPassword } = usePasswordManager();
  const [opened, { open, close }] = useDisclosure();

  return (
    <>
      <AddModal
        opened={opened}
        close={close}
        createNewPassword={createNewPassword}
      />
      <div className="flex flex-col items-center p-5 space-y-5">
        <div className="flex items-center justify-between w-1/3 ml-2 mr-2">
          <Text size="xl">Passwords</Text>
          <Button color="cyan" onClick={open}>
            Add New
          </Button>
        </div>
        <div className="w-1/3">
          <PasswordHolder passwords={passwords} />
        </div>
      </div>
    </>
  );
}

export default Home;
