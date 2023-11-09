import { TextEncoder } from "util";
global.TextEncoder = TextEncoder;
import "isomorphic-fetch";
import { render, screen, waitFor } from "@testing-library/react";
import { ChangeUsername } from "../ChangeUsername";
import "@testing-library/jest-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { setupServer } from "msw/node";
import { handlers } from "@/mocks/handlers";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";




const client = new QueryClient();
const server = setupServer(...handlers);

const shortUsername ="as";
const longUsername = "a1a2a3a4a5a6a7a8a9a10a55"
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

describe("ChangeUsername testing", () => {

    it('Should render successfully', async () => {
        // ARRANGE
        render(
            <BrowserRouter>
                <QueryClientProvider client={client}>
                    <ChangeUsername userName="xlxlx" />
                </QueryClientProvider>
            </BrowserRouter>
        );

        // ASSERT
        expect(screen.getByText('Change username')).toBeInTheDocument();
        expect(screen.getByText('Suggestions')).toBeInTheDocument();

        // Use waitFor to wait for the suggestions to be rendered
        setTimeout(() => {
            expect(screen.getByText('Save')).toBeEnabled();
            expect(screen.queryAllByRole('Suggestions')).toHaveLength(5);
        }, 3500);
    });

    it("Should render error when the username is short", async () => {
        // ARRANGE

        render(
            <BrowserRouter>
                <QueryClientProvider client={client}>
                    <ChangeUsername userName="" />
                </QueryClientProvider>
            </BrowserRouter>
        );

        // ACT
        const input = screen.getByRole("usernameInput");
        await userEvent.type(input, shortUsername);
        waitFor(() => screen.getByRole('Suggestions'))

        // ASSERT
        expect(screen.getByText("Username must be at least 4 characters long")).toBeInTheDocument()
        expect(screen.getByText("Save")).not.toBeEnabled();
    });
    it("Should render error when the username is long", async () => {
        // ARRANGE

        render(
            <BrowserRouter>
                <QueryClientProvider client={client}>
                    <ChangeUsername userName="" />
                </QueryClientProvider>
            </BrowserRouter>
        );

        // ACT
        const input = screen.getByRole("usernameInput");
        await userEvent.type(input, longUsername);
        waitFor(() => screen.getByRole('Suggestions'))

        // ASSERT
        expect(screen.getByText("Username cannot be longer than 15 characters")).toBeInTheDocument()
        expect(screen.getByText("Save")).not.toBeEnabled();
    });
    it("Should change the input value with the one suggested", async () => {
        // ARRANGE
        render(
            <BrowserRouter>
                <QueryClientProvider client={client}>
                    <ChangeUsername userName="marwan99" />
                </QueryClientProvider>
            </BrowserRouter>
        );

        // ASSERT
        const input = screen.getByRole("usernameInput");
        //Act
        setTimeout(() => {
            expect(screen.getByText("Save")).toBeEnabled();
            expect(screen.queryAllByRole("Suggestions")).toHaveLength(5);
            const option =screen.queryAllByRole("Suggestions")[0];
            option.click();
            expect("@"+input.textContent).toBe(option.textContent)
        }, 3500);
    }, 8000);

});
