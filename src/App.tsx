import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Settings } from "./pages/Settings/Settings";
import { SignUpSteps } from "./components";
import PasswordRest from "./components/PasswordReset/PasswordReset";

import { Login } from "./pages/login/Login";

import { Toaster } from "./components/ui/toaster";
import { Routes, Route, useLocation } from "react-router-dom";
import { Authentication } from "./pages";
import { LoginSignUp } from "./components/LoginSignUp/LoginSignUp";
import OAuth from "./components/OAuth/OAuth";
import OAuthInterceptor from "./components/OAuth/OAuthInterceptor";
import ProfileComplete from "./components/ProfileComplete/ProfileComplete";
import UserContextProvider from "./contexts/UserContextProvider";
import UpdateEmailPopUp from "./components/UpdateEmailContainer/UpdateEmailContainer";
import CreateTweetContainer from "./components/CreateTweet/CreateTweetContainer";
import { LogOut } from "./components/LogOut/LogOut";

const queryClient = new QueryClient();

function App() {
  const location = useLocation();
  const previousLocation = location.state?.previousLocation;
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <UserContextProvider>
          <Routes location={previousLocation || location}>
            {/* this is the main routs*/}
            <Route path="/" element={<Authentication />} />
            <Route path="/Settings/*" element={<Settings />} />
          </Routes>
          <Routes>
            {/* this is the popup routs*/}
            <Route path="/i/flow/signup" element={<SignUpSteps />} />
            <Route
              path="/i/flow/signup/input_flow_data"
              element={<LoginSignUp />}
            />
            <Route path="/i/flow/login" element={<Login />} />
            <Route path="/i/flow/password_reset" element={<PasswordRest />} />
            <Route
              path="/i/flow/single-sign/callback"
              element={<OAuthInterceptor />}
            />
            <Route path="/i/flow/single-sign" element={<OAuth />} />
            <Route path="/i/flow/profile" element={<ProfileComplete />} />
            <Route path="/i/flow/add_email" element={<UpdateEmailPopUp />} />
            <Route path="/compose/tweet" element={<CreateTweetContainer />} />
            <Route path="/logout" element={<LogOut />} />
          </Routes>
          <Toaster />
        </UserContextProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
