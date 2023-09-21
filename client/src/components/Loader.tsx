import { LoadingOverlay } from "@mantine/core";

type Props = {};

function Loader({}: Props) {
  return (
    <LoadingOverlay
      loaderProps={{ size: "lg", color: "red", variant: "dots" }}
      overlayOpacity={0.7}
      overlayColor="#1d1e30"
      visible={true}
    />
  );
}

export default Loader;
