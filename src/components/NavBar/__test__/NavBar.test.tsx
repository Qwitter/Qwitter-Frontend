import { TextEncoder } from "util";
global.TextEncoder = TextEncoder;
import "isomorphic-fetch";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { NavBar } from "../NavBar";
import "@testing-library/jest-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { setupServer } from "msw/node";
import { handlers } from "@/mocks/handlers";
import { BrowserRouter } from "react-router-dom";
// import userEvent from "@testing-library/user-event";




const client = new QueryClient();
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

describe("NavBar testing", () => {

    it('Should render successfully', async () => {
        // ARRANGE
        render(
            <BrowserRouter>
                <QueryClientProvider client={client}>
                    <NavBar />
                </QueryClientProvider>
            </BrowserRouter>
        );

        // ASSERT
        expect(screen.getByText('Settings')).toBeInTheDocument();
        expect(screen.getByText('Profile')).toBeInTheDocument();
        expect(screen.getByText('Notifications')).toBeInTheDocument();
        expect(screen.getByText('Messages')).toBeInTheDocument();


    });

    it("Should navigate to the a page", async () => {
        // ARRANGE

        render(
            <BrowserRouter>
                <QueryClientProvider client={client}>
                    <NavBar />
                </QueryClientProvider>
            </BrowserRouter>
        );

        // ACT
        fireEvent.click(screen.getByText('Settings'));

        // ASSERT
        await waitFor(() => {
            expect(window.location.pathname).toContain('/Settings');
        }, { timeout: 2000 });
    });
    it("Should open a post popup", async () => {
        // ARRANGE

        render(
            <BrowserRouter>
                <QueryClientProvider client={client}>
                    <NavBar />
                </QueryClientProvider>
            </BrowserRouter>
        );

        // ACT
        fireEvent.click(screen.getByText('Post'));

        // ASSERT
        
        await waitFor(() => {
            expect(window.location.pathname).toContain('/compose/tweet');
        }, { timeout: 2000 });
    });
    it("Should open a logout popup", async () => {
        // ARRANGE

        render(
            <BrowserRouter>
                <QueryClientProvider client={client}>
                    <NavBar />
                </QueryClientProvider>
            </BrowserRouter>
        );

        // ACT
        fireEvent.click(screen.getByTestId('logout'));

        // ASSERT
        
        await waitFor(() => {
            expect(window.location.pathname).toContain('/i/flow/logout');
        }, { timeout: 2000 });
    });

});
