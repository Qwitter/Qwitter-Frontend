import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Settings } from "./pages/Settings/Settings";
import {
  NotificationAllow,
  PasswordRestPopUp,
  SignUpSteps,
  UsernameSuggestion,
} from "./components";
import OAuth from "./components/OAuth/OAuth";
import PasswordRest from "./components/passwordRest/PasswordRest";
import { SignUpProfile } from "./components/SignUpProfile/SignUpProfile";
import { EditProfilePopUp } from "./components/EditProfilePopUp/EditProfilePopUp";

import Login from "./pages/login/Login";
import EmailVerification from "./components/EmailVerification/EmailVerification";
import { RestPassword } from "./components/RestPassword/RestPassword";
import { Toaster } from "./components/ui/toaster";
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        {/* <SignUpProfile /> */}
        {/* <div className="w-100 h-100 absolute bg-black top-1/4 left-1/4"> */}
        {/* <UsernameSuggestion email="mroansamy99@gmail.com" nextStep={alert} /> */}
        {/* </div>  */}
        {/* <Settings /> */}
        {/* <Authentication /> */}
        {/* <Login /> */}
        <SignUpSteps />
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
