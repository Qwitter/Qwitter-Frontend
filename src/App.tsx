import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SignUpSteps } from "./components";
import PasswordRest from "./components/PasswordReset/PasswordReset";

import { Login } from "./pages/login/Login";

import { Toaster } from "./components/ui/toaster";
import { Routes, Route, useLocation } from "react-router-dom";
import { LoginSignUp } from "./components/LoginSignUp/LoginSignUp";
import OAuth from "./components/OAuth/OAuth";
import OAuthInterceptor from "./components/OAuth/OAuthInterceptor";
import ProfileComplete from "./components/ProfileComplete/ProfileComplete";
import UserContextProvider from "./contexts/UserContextProvider";
import UpdateEmailPopUp from "./components/UpdateEmailContainer/UpdateEmailContainer";
import CreateTweetContainer from "./components/CreateTweet/CreateTweetContainer";
import { LogOut } from "./components/LogOut/LogOut";
import { PagesContainer } from "./pages/PagesContainer/PagesContainer";
import Authentication from "../src/pages/Authentication/Authentication";
import MessagesNewMessage from "./pages/Messages/MessagesPopup/MessagesNewMessage";
import { EditProfilePopUp } from "@/components/EditProfilePopUp/EditProfilePopUp";
import { ProfileImageViewer } from "./pages/Profile/ProfileImageViewer";
import { MessagesGroupEditPopup } from "./pages/Messages/MessagesPopup/MessagesGroupEditPopup";
import MessagesContextProvider from "./contexts/MessagesContextProvider";
import MessagesAddPeoplePopup from "./pages/Messages/MessagesPopup/MessagesAddPeoplePopup";
import NotificationLoginPopup from "./pages/Notifications/NotificationLoginPopup";
import { ImageOverlay } from "./components/ImageOverlay/ImageOverlay";

const queryClient = new QueryClient();

function App() {
  const location = useLocation();
  const previousLocation = location.state?.previousLocation;
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <UserContextProvider>
          <MessagesContextProvider>
            <Routes location={previousLocation || location}>
              <Route path="/" element={<Authentication />} />
            </Routes>
            {location.pathname !== "/" &&
              !location.pathname.includes("/i/flow") &&
              previousLocation?.pathname !== "/" && <PagesContainer />}
            <Routes>
              {/* this is the popup routs */}
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
              <Route path="/i/flow/logout" element={<LogOut />} />
              <Route
                path="/Messages/compose"
                element={<MessagesNewMessage />}
              />
              <Route
                path="/Messages/:conversationId/group-info"
                element={<MessagesGroupEditPopup />}
              />
              <Route
                path="/Messages/:conversationId/add"
                element={<MessagesAddPeoplePopup />}
              />
              <Route
                path="/profile/:username/settings/profile"
                element={<EditProfilePopUp />}
              />
              <Route
                path="/flow/photo"
                element={<ProfileImageViewer isBanner={false} />}
              />
              <Route
                path="/profile/:username/header_photo"
                element={<ProfileImageViewer isBanner={true} />}
              />
              <Route
                path="/Notification/login"
                element={<NotificationLoginPopup />}
              />
              <Route
                path="/tweet/:tweetId/media"
                element={<ImageOverlay />}
              />
            </Routes>
            <Toaster />
          </MessagesContextProvider>
        </UserContextProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
