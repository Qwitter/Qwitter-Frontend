import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Settings } from "./pages/Settings/Settings";
import { SignUpSteps } from "./components";
import PasswordRest from "./components/PasswordRest/PasswordRest";

import Login from "./pages/login/Login";

import { Toaster } from "./components/ui/toaster";
import { Routes, Route, useLocation } from "react-router-dom";
import { Authentication } from "./pages";
import { LoginSignUp } from "./components/LoginSignUp/LoginSignUp";

const queryClient = new QueryClient();

function App() {
  const location = useLocation();
  const previousLocation = location.state?.previousLocation;

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
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
        </Routes>
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
