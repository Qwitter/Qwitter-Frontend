import "./App.css";
import { PopUpContainer } from "./components/PopUpContainer";
import { SignUpSteps } from "./components/SignUpSteps";
import { ThemeProvider } from "./components/theme-provider";
import { Button } from "./components/ui/button";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Logo } from "./assets";
import { HeaderButton } from "./models/PopUpModel";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Button variant="danger">Click me</Button>

        {/* <SignUpSteps /> */}

        <PopUpContainer show={true} headerButton={HeaderButton.back}>
          <img src={Logo} alt="" className="" />
          <Button variant="default" size="full">
            next
          </Button>
        </PopUpContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
