import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Settings } from "./pages/Settings/Settings";
import { FindEmailPopUp, PasswordRestPopUp } from "./components";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        {/* <NotificationAllow /> */}
        <Settings />
        <PasswordRestPopUp />
        {/* <Authentication /> */}
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
