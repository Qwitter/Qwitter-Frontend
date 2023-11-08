import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Settings } from "./pages/Settings/Settings";
import {
  NavBar,
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
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { Authentication } from "./pages";
import temp from './assets/temp.png'

const queryClient = new QueryClient();

function App() {
  // const location = useLocation();
  // const previousLocation = location.state?.previousLocation;

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className='w-full flex flex-row min-h-[750px] z-0 justify-center'>
      <NavBar userName='MarwanSamy' name="XLV" profilePic={temp} />{/*till we know how the roots will work */}
     
        <Router>
          <Routes >{/* this is the main routs*/}
            <Route path="/" element={<Authentication />} />
            <Route path="/Settings" element={<Settings />} />
          </Routes>
          <Routes >{/* this is the popup routs*/}
            <Route path="/i/flow/signup" element={<SignUpSteps />} />
            <Route path="/i/flow/login" element={<Login />} />
          </Routes>
         
          <Toaster />
        </Router>
        </div>
        
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
