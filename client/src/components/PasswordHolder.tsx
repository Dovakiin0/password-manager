import { useClipboard } from "@mantine/hooks";
import { IPassword } from "../types/IPassword";
import PasswordAccordian from "./PasswordAccordian";
import useToast from "../hooks/useToast";

type Props = {
  passwords: IPassword[];
};

function PasswordHolder({ passwords }: Props) {
  const clipboard = useClipboard({ timeout: 500 });
  const { Success } = useToast();

  const copyToClipboard = (value: string, message: string) => {
    clipboard.copy(value);
    Success({ message });
  };

  return (
    <div className="w-full flex flex-col space-y-2">
      {passwords.map((password) => (
        <PasswordAccordian
          password={password}
          copyToClipboard={copyToClipboard}
        />
      ))}
    </div>
  );
}

export default PasswordHolder;
