import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NotificationAllow, SignUpSteps } from "./components";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <NotificationAllow />
        {/* <SignUpSteps /> */}
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
