import { TextEncoder } from "util";
global.TextEncoder = TextEncoder;
import "isomorphic-fetch";
import { render, screen } from "@testing-library/react";
import { PasswordRestPopUp } from "../PasswordRestPopUp";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { setupServer } from "msw/node";
import { handlers } from "@/mocks/handlers";


const mockFn = jest.fn();
const validPassword = "123456as";
const invalidPassword = "12345678";
const client = new QueryClient();
const server = setupServer(...handlers);

beforeEach(() => {
    mockFn.mockClear();
});

beforeAll(() => {
    server.listen();
});

afterEach(() => {
    server.resetHandlers();
    server.use(...handlers);
});

afterAll(() => {
    server.close();
});

describe("FindEmailPopUp testing", () => {


    it("Should render successfully", () => {
        // ARRANGE
        render(
            <QueryClientProvider client={client}>
                <PasswordRestPopUp email="test@gmail.com" onSuccess={mockFn} />
            </QueryClientProvider>
        );

        // ASSERT
        expect(screen.getByText("Choose a new Password")).toBeTruthy();
        expect(
            screen.getByText(`strong password`)
        ).toBeTruthy();
        expect(
            screen.getByText(`You'll be logged out of all active X sessions after your password is changed.`)
        ).toBeTruthy();
        expect(screen.getByText("Change password")).toBeDisabled();

    });

    it("Should render error when the password doesn't follow the criteria", async () => {
        const user = userEvent.setup();

        // ARRANGE
        render(
            <QueryClientProvider client={client}>
                <PasswordRestPopUp email="test@gmail.com" onSuccess={mockFn} />
            </QueryClientProvider>
        );

        // ACT
        const input = screen.getByRole("text");
        await user.type(input, "123");
        // ASSERT
        expect(screen.getByText("Your password needs to be at least 8 characters. Please enter a longer one.")).toBeInTheDocument();
        expect(screen.getByText("Change password")).toBeDisabled();
        await user.type(input, invalidPassword);
        expect(screen.getByText("Password must contain at least one letter and one number")).toBeInTheDocument();
        expect(screen.getByText("Change password")).toBeDisabled();
    });

    it("Should render error when the password isn't the same ", async () => {
        const user = userEvent.setup();

        // ARRANGE
        render(
            <QueryClientProvider client={client}>
                <PasswordRestPopUp email="test@gmail.com" onSuccess={mockFn} />
            </QueryClientProvider>
        );

        // ACT
        const passwordInput = screen.getByRole("text");
        const confirmInput = screen.getByRole("confirmPassword");
        await user.type(passwordInput, validPassword);
        await user.type(confirmInput, invalidPassword);
        // ASSERT
        expect(screen.getByText("Passwords doesn't match")).toBeTruthy();
        expect(screen.getByText("Change password")).toBeDisabled();
    });

    it("Should render error when the email isn't found", async () => {
        const user = userEvent;
        render(
            <QueryClientProvider client={client}>
                <PasswordRestPopUp email="test@gmail.com" onSuccess={mockFn} />
            </QueryClientProvider>
        );

        // ACT
        const passwordInput = screen.getByRole("text");
        const confirmInput = screen.getByRole("confirmPassword");
        await user.type(passwordInput, validPassword);
        await user.type(confirmInput, validPassword);
        const button = screen.getByRole("submitButton");
        expect(button).toBeEnabled();
        await userEvent.click(button);

        // ASSERT
        setTimeout(() => {
            expect(mockFn).toHaveBeenCalled();
        }, 3500);
    });

});
