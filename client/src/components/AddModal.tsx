import { Modal, TextInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IPasswordRequest } from "../types/IPassword";

type Props = {
  opened: boolean;
  close: () => void;
  createNewPassword: (value: IPasswordRequest, cb?: () => void) => void;
};

function AddModal({ opened, close, createNewPassword }: Props) {
  const form = useForm<IPasswordRequest>({
    initialValues: {
      username: "",
      password: "",
      websiteUri: "",
    },
  });

  const handleSubmit = (value: IPasswordRequest) => {
    createNewPassword(value, () => close());
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => {
          close();
        }}
        title="Add New Password"
        centered
        size="lg"
      >
        <form
          onSubmit={form.onSubmit((value) => handleSubmit(value))}
          className="flex flex-col space-y-5"
        >
          <TextInput label="Username" {...form.getInputProps("username")} />
          <TextInput
            label="Website URL"
            {...form.getInputProps("websiteUri")}
          />
          <Button type="submit">Generate Password</Button>
        </form>
      </Modal>
    </>
  );
}

export default AddModal;
