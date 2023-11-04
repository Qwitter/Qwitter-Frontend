import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Settings } from "./pages/Settings/Settings";
import OAuth from "./components/OAuth/OAuth";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        {/* <NotificationAllow /> */}
        <Settings />
        {/* <Authentication /> */}
        {/* <SignUpButton /> */}
        <OAuth />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
