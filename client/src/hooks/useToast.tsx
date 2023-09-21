import { notifications } from "@mantine/notifications";
import {
  IconCheck,
  IconAlertHexagon,
  IconAlertTriangle,
} from "@tabler/icons-react";

interface INotification {
  message: string;
  loading?: boolean;
}

// custom hook that wraps around default notification from mantine
function useToast() {
  const Success = ({ message, loading = false }: INotification) => {
    notifications.show({
      title: "Success",
      autoClose: 5000,
      message: message,
      loading: loading,
      color: "green",
      icon: <IconCheck />,
    });
  };

  const Warning = ({ message, loading = false }: INotification) => {
    notifications.show({
      title: "Warning",
      autoClose: 5000,
      message: message,
      loading: loading,
      color: "green",
      icon: <IconAlertHexagon />,
    });
  };

  const Error = ({ message, loading = false }: INotification) => {
    notifications.show({
      title: "Error",
      autoClose: 5000,
      message: message,
      loading: loading,
      color: "red",
      icon: <IconAlertTriangle />,
    });
  };

  return { Success, Warning, Error };
}
export default useToast;
