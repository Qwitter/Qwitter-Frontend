import { TextEncoder } from "util";
global.TextEncoder = TextEncoder;
import "isomorphic-fetch";
import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import { Login } from "../Login";
import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { handlers } from "@/mocks/handlers";
import { setupServer } from "msw/node";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
jest.mock('../../../assets/logo.png', () => 'path-to-mock-image');

const server = setupServer(...handlers);
beforeAll(() => {
    server.listen({
        onUnhandledRequest: 'warn', // Log unhandled requests
    });
});


afterEach(() => {
    server.resetHandlers();
    server.use(...handlers);
});

afterAll(() => {
    server.close();
});

function wrapper({ children }: PropsWithChildren<unknown>) {
    const queryClient = new QueryClient({
        defaultOptions: { queries: { retry: false } },
    });
    return (
        <MemoryRouter initialEntries={['/i/flow/login']}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </MemoryRouter>
    );
}
describe("Login Unit Testing", () => {
    it('Sign In with Google and Apple Testing', () => {
        render(
            <Routes>
                <Route path="/i/flow/login" element={<Login  />} />
            </Routes>,
            { wrapper }
        );
        // Check Existence of Login Page
        const title = screen.findByText('Sign in to Quitter');
        expect(title).toBeTruthy();

        // Check Existence of googleSignInButton and appleSignInButton
        const googleSignInButton = screen.getByText("Sign in with Google");
        const appleSignInButton = screen.getByText("Sign in with Apple");

        expect(googleSignInButton).toBeTruthy();
        expect(appleSignInButton).toBeTruthy();
        //TODO: Check Functionality  of googleSignInButton and appleSignInButton


        // check button validation
        const nextButton = screen.getByTestId("nextButton");
        expect(nextButton).toBeDisabled();
    });

    it("Testing not valid email", async () => {
        render(
            <Routes>
                <Route path="/i/flow/login" element={<Login />} />
            </Routes>,
            { wrapper }
        );
        const emailInput = screen.getByRole("emailInput");
        const nextButton = screen.getByTestId("nextButton");
        await userEvent.type(emailInput, "yogmail.com");
        expect(nextButton).toBeDisabled();
    });

    it("Testing email that doesn't exist", async () => {
        render(
            <Routes>
                <Route path="/i/flow/login" element={<Login />} />
            </Routes>,
            { wrapper }
        );
        const emailInput:HTMLInputElement = screen.getByRole("emailInput");
        const nextButton = screen.getByTestId("nextButton");
        expect(emailInput).toBeTruthy();
        await userEvent.type(emailInput, "yo@gmail.com");
        expect(emailInput.value).toBe("yo@gmail.com");
        expect(nextButton).toBeEnabled();
        userEvent.click(nextButton);
        expect(screen.getByRole("emailInput")).toBeTruthy();    
    });
    it("Testing existed email", async () => {
        const client = new QueryClient();
        render(
            <BrowserRouter>
                <QueryClientProvider client={client}>
                    <Login />
                </QueryClientProvider>
            </BrowserRouter>
        );
        const emailInput:HTMLInputElement = screen.getByRole("emailInput");
        const nextButton = screen.getByTestId("nextButton");
        expect(emailInput).toBeTruthy();
        await userEvent.type(emailInput, "yousef@gmail.com");
        expect(emailInput.value).toBe("yousef@gmail.com");
        expect(nextButton).toBeEnabled();
        await userEvent.click(nextButton);  
        waitFor(() => screen.getByRole('passwordInput'))
        expect(screen.findByTestId("login")).toBeTruthy();
    });
});
