import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UsernameSuggestion } from "./components";
import Authentication from "./pages/Authentication/Authentication";
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        {/* <NotificationAllow /> */}
        {/* <UsernameSuggestion email="marwan.samy992@gamil.com"/> */}
        <Authentication />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
