import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Settings } from "./pages/Settings/Settings";
import { PasswordRestPopUp, SignUpSteps } from "./components";
import { RestPassword } from "./components/RestPassword/RestPassword";
import PasswordRest from "./components/passwordRest/PasswordRest";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        {/* <NotificationAllow /> */}
        <Settings />
        <PasswordRest />
        {/* <Authentication /> */}
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
