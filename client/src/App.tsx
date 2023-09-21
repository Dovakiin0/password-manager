import { Button, MantineProvider, createEmotionCache } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { ThemeOptions } from "./config/ThemeOptions";
import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import Loader from "./components/Loader";

const emotionCache = createEmotionCache({ key: "mantine", prepend: false });

function App() {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={ThemeOptions}
      emotionCache={emotionCache}
    >
      <Notifications position="bottom-center" />
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router} />
      </Suspense>
    </MantineProvider>
  );
}

export default App;
