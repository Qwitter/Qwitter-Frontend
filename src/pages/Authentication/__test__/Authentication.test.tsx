import { TextEncoder } from "util";
global.TextEncoder = TextEncoder;
import "isomorphic-fetch";
import { render, screen } from "@testing-library/react";
import Authentication from "../Authentication";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { SignUpSteps } from "@/components/SignUpSteps/SignUpSteps";
import { Login } from "@/pages/login/Login";

jest.mock("../../../assets/logo.png", () => "path-to-mock-image");

jest.mock("../../../components/SignUpSteps/SignUpSteps.tsx", () => {
  return {
    SignUpSteps: () => (
      <div data-testid="MockedSignUp-Test-Id">this is SignUpSteps Page</div>
    ),
  };
});

jest.mock("../../login/Login.tsx", () => {
  return {
    Login: () => (
      <div data-testid="MockedLogin-Test-Id">this is Login Page</div>
    ),
  };
});

function wrapper({ children }: PropsWithChildren<unknown>) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return (
    <MemoryRouter initialEntries={["/"]}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </MemoryRouter>
  );
}
describe("Authentication Unit Testing", () => {
  it("Sign Up with Google and Apple Testing", () => {
    //  I need to ensure that my test setup includes a Router context.
    // use MemoryRouter  for testing purposes.
    render(
      <MemoryRouter>
        <Authentication />
      </MemoryRouter>
    );
    // Check Existence of Logo
    const logo = screen.queryByTestId("logo");
    expect(logo).toBeTruthy();
  });
  it("Sign Up Testing", async () => {
    render(
      <Routes>
        <Route path="/" element={<Authentication />} />
        <Route path="/i/flow/signup" element={<SignUpSteps />} />
      </Routes>,
      { wrapper }
    );
    userEvent.click(screen.getByTestId("SignUpButton-Test-Id"));
    await screen.findByTestId("MockedSignUp-Test-Id");
    // screen.debug()
  });
  it("Sign In Testing", async () => {
    render(
      <Routes>
        <Route path="/" element={<Authentication />} />
        <Route path="/i/flow/login" element={<Login />} />
      </Routes>,
      { wrapper }
    );
    userEvent.click(screen.getByTestId("Login-Test-Id"));
    await screen.findByTestId("MockedLogin-Test-Id");
  });
});

// "test": "react-scripts test --watchAll --coverage"
// command to run single test case: npm test Authentication.test.tsx
