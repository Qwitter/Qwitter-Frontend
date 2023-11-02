import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NotificationAllow, SignUpSteps } from "./components";
import { Authentication } from "./pages";
import {
  BrowserRouter as Router,
  Routes,
  useLocation,
  Route,
} from "react-router-dom";

const queryClient = new QueryClient();

function App() {
  return (
    // <Router>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        {/* <Routes> */}
        {/* <Route path="/" element={<Authentication />} /> */}
        {/* </Routes> */}
        {/* <NotificationAllow /> */}
        {/* <SignUpSteps /> */}
        {/* <Authentication /> */}
      </ThemeProvider>
    </QueryClientProvider>
    // </Router>
  );
}

export default App;
