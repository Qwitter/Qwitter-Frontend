import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SignUpSteps, UsernameSuggestion } from "./components";
import { Authentication } from "./pages";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        {/* <NotificationAllow /> */}
        <SignUpSteps />
        {/* <UsernameSuggestion email="marwan.samy992@gamil.com"/> */}
        {/* <Authentication /> */}
        {/* <SignUpButton /> */}
        {/* <OAuth /> */}
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
