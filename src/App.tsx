import "./App.css";
import { SignUpSteps } from "./components/SignUpSteps";
import { ThemeProvider } from "./components/theme-provider";
import { Button } from "./components/ui/button";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Button className="text-lg text-slate-50">Click me</Button>

        <SignUpSteps />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
