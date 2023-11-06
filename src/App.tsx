import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Settings } from "./pages/Settings/Settings";
import { PasswordRestPopUp, SignUpSteps } from "./components";
import OAuth from "./components/OAuth/OAuth";
import PasswordRest from "./components/passwordRest/PasswordRest";
import { SignUpProfile } from "./components/SignUpProfile/SignUpProfile";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        {/* <NotificationAllow /> */}
        {/* <Settings /> */}
        {/* <PasswordRest /> */}
        {/* <Authentication /> */}
        {/* <OAuth /> */}
        {/* <SignUpSteps /> */}
        <SignUpProfile />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
