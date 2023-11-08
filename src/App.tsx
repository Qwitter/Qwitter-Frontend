import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Settings } from "./pages/Settings/Settings";
import {
  NavBar,
  NotificationAllow,
  PasswordRestPopUp,
  PopUpContainer,
  SignUpSteps,
  UsernameSuggestion,
} from "./components";
import OAuth from "./components/OAuth/OAuth";
import PasswordRest from "./components/passwordRest/PasswordRest";
import { SignUpProfile } from "./components/SignUpProfile/SignUpProfile";
import { EditProfilePopUp } from "./components/EditProfilePopUp/EditProfilePopUp";

import Login from "./pages/login/Login";
import EmailVerification from "./components/EmailVerification/EmailVerification";
import { RestPassword } from "./components/ChangePassword/ChangePassword";
import { Toaster } from "./components/ui/toaster";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import temp from './assets/temp.png'

const queryClient = new QueryClient();

function App() {
  const location = useLocation();
  const previousLocation = location.state?.previousLocation;

  return (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Routes location={previousLocation || location} >{/* this is the main routs*/}
            <Route path="/" element={<Authentication />} />
            <Route path="/Settings/*" element={<Settings />} />
          </Routes>
          <Routes >{/* this is the popup routs*/}
            <Route path="/i/flow/signup" element={<SignUpSteps />} />
            <Route path="/i/flow/login" element={<Login />} />
            <Route path="/i/flow/password_reset" element={<PasswordRest />} />

          </Routes>
          <Toaster />
        </ThemeProvider>
      </QueryClientProvider>
  );
}

export default App;
