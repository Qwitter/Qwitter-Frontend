import { TextEncoder } from "util";
global.TextEncoder = TextEncoder;
import "isomorphic-fetch";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Login } from "../Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { handlers } from "@/mocks/handlers";
import { setupServer } from "msw/node";
import "@testing-library/jest-dom";
import { PropsWithChildren } from "react";
jest.mock("../../../assets/logo.png", () => "path-to-mock-image");

const server = setupServer(...handlers);
beforeAll(() => {
  server.listen({
    onUnhandledRequest: "warn", // Log unhandled requests
  });
});

afterEach(() => {
  server.resetHandlers();
  server.use(...handlers);
});

afterAll(() => {
  server.close();
});

const mockfn: () => void = jest.fn();

function wrapper({ children }: PropsWithChildren<unknown>) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return (
    <MemoryRouter initialEntries={["/i/flow/login"]}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </MemoryRouter>
  );
}
describe("Login Unit Testing", () => {
  it("Sign In with Google  Testing", () => {
    render(
      <Routes>
        <Route path="/i/flow/login" element={<Login />} />
      </Routes>,
      { wrapper }
    );
    // Check Existence of Login Page
    const title = screen.findByText("Sign in to Quitter");
    expect(title).toBeTruthy();

    // Check Existence of googleSignInButton
    const googleSignInButton = screen.getByText("Sign up with Google");

    expect(googleSignInButton).toBeTruthy();

    // check button validation
    const nextButton = screen.getByTestId("nextButton");
    expect(nextButton).toBeDisabled();
  });

  it("Testing validity of email", async () => {
    render(
      <Routes>
        <Route path="/i/flow/login" element={<Login fn={mockfn} />} />
      </Routes>,
      { wrapper }
    );
    const emailInput = screen.getByTestId("email");
    expect(emailInput).toBeInTheDocument();
    const nextButton = screen.getByTestId("nextButton");
    fireEvent.change(emailInput, { target: { value: "yogmail.com" } });
    expect(nextButton).toBeDisabled();
    fireEvent.change(emailInput, { target: { value: "yousef@gmail.com" } });
    await waitFor(
      () => {
        expect(nextButton).toBeEnabled();
        nextButton.click();
        setTimeout(() => {
          expect(mockfn).toHaveBeenCalledTimes(1);
        }, 1000);
        expect(emailInput).toBeInTheDocument();
      },
      { timeout: 1000 }
    );
  });
  it("Going to password Step", async () => {
    render(
      <Routes>
        <Route path="/i/flow/login" element={<Login fn={mockfn} />} />
      </Routes>,
      { wrapper }
    );
    const emailInput = screen.getByTestId("email");
    expect(emailInput).toBeInTheDocument();
    const nextButton = screen.getByTestId("nextButton");
    fireEvent.change(emailInput, { target: { value: "yousef@gmail.com" } });
    await waitFor(
      () => {
        expect(nextButton).toBeEnabled();
        nextButton.click();
        setTimeout(() => {
          expect(mockfn).toHaveBeenCalledTimes(1);
          const passInput = screen.getByTestId("pass");
          expect(passInput).toBeInTheDocument();
        }, 1000);
      },
      { timeout: 1000 }
    );
  });
});

// to show the file with reports
// npm run test -- CreateTweet.test.tsx --coverage
