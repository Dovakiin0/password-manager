import {
  Accordion,
  ActionIcon,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { IconCopy, IconEye, IconWorld } from "@tabler/icons-react";
import { IPassword } from "../types/IPassword";
import { useState } from "react";

type Props = {
  password: IPassword;
  copyToClipboard: (value: string, message: string) => void;
};

function PasswordAccordian({ password, copyToClipboard }: Props) {
  const [togglePassword, setTogglePassword] = useState(false);
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
            rightSection={
              <ActionIcon
                onClick={() =>
                  copyToClipboard(
                    password.username,
                    "Username Copied to clipboard",
                  )
                }
              >
                <IconCopy />
              </ActionIcon>
            }
          />
        </Accordion.Panel>
        <Accordion.Panel>
          <TextInput
            type={togglePassword ? "text" : "password"}
            label="Password"
            readOnly={true}
            value={password.password}
            rightSection={
              <div className="flex items-center space-x-2 mr-10">
                <ActionIcon onClick={() => setTogglePassword((prev) => !prev)}>
                  <IconEye />
                </ActionIcon>
                <ActionIcon
                  onClick={() =>
                    copyToClipboard(
                      password.password,
                      "Password Copied to clipboard",
                    )
                  }
                >
                  <IconCopy />
                </ActionIcon>
              </div>
            }
          />
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}

export default PasswordAccordian;
