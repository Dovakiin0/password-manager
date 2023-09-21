import {
  Accordion,
  ActionIcon,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { IconCopy, IconWorld } from "@tabler/icons-react";
import { IPassword } from "../types/IPassword";

type Props = {
  password: IPassword;
  copyToClipboard: (value: string, message: string) => void;
};

function PasswordAccordian({ password, copyToClipboard }: Props) {
  return (
    <Accordion variant="separated">
      <Accordion.Item value="customization">
        <Accordion.Control icon={<IconWorld />}>
          {password.websiteUri}
        </Accordion.Control>
        <Accordion.Panel right="1">
          <TextInput
            label="Username"
            readOnly={true}
            value={password.username}
          />
          <ActionIcon
            onClick={() =>
              copyToClipboard(password.username, "Username Copied to clipboard")
            }
          >
            <IconCopy />
          </ActionIcon>
        </Accordion.Panel>
        <Accordion.Panel>
          <PasswordInput
            label="Password"
            readOnly={true}
            value={password.password}
          />
          <ActionIcon
            onClick={() =>
              copyToClipboard(password.password, "Password Copied to clipboard")
            }
          >
            <IconCopy />
          </ActionIcon>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}

export default PasswordAccordian;
