import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Settings } from "./pages/Settings/Settings";
import {
  NotificationAllow,
  PasswordRestPopUp,
  SignUpSteps,
} from "./components";
import OAuth from "./components/OAuth/OAuth";
import PasswordRest from "./components/passwordRest/PasswordRest";
import { SignUpProfile } from "./components/SignUpProfile/SignUpProfile";
import { EditProfilePopUp } from "./components/EditProfilePopUp/EditProfilePopUp";

import Login from "./pages/login/Login";
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        {/* <SignUpProfile /> */}
        {/* <NotificationAllow /> */}
        {/* <Settings /> */}
        {/* <PasswordRest /> */}
        {/* <Authentication /> */}
        {/* <Login /> */}
        {/* <OAuth /> */}
        <SignUpSteps />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
