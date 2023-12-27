import { TextEncoder } from "util";
global.TextEncoder = TextEncoder;
import "isomorphic-fetch";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { setupServer } from "msw/node";
import { handlers } from "@/mocks/handlers";
import { BrowserRouter } from "react-router-dom";
import SearchInput from "../SearchInput";
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

describe('SearchInput', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders without crashing', () => {
        render(
            <BrowserRouter>
                <QueryClientProvider client={client}>
                    <SearchInput />
                </QueryClientProvider>
            </BrowserRouter>
        );
        // Add your assertions here
    });

    it('handles text input and triggers search', async () => {
        render(
            <BrowserRouter>
                <QueryClientProvider client={client}>
                    <SearchInput />
                </QueryClientProvider>
            </BrowserRouter>
        );

        // Simulate user input
        const inputElement = screen.getByTestId('searchBar');
        fireEvent.click(inputElement);

        const textInputElement = screen.getByRole('textbox');
        fireEvent.change(textInputElement, { target: { value: 'testquery' } });

        // Simulate pressing Enter
        await act(async () => {
            fireEvent.keyDown(textInputElement, { key: 'Enter' });
        });
        await waitFor(() => {

            expect(window.location.pathname).toContain('/Explore/search/Top/');
        }, { timeout: 2000 });
    });

    it('handles text input and check default search message', async () => {
        render(
            <BrowserRouter>
                <QueryClientProvider client={client}>
                    <SearchInput />
                </QueryClientProvider>
            </BrowserRouter>
        );

        // Simulate user input
        const inputElement = screen.getByTestId('searchBar');
        fireEvent.click(inputElement);

        fireEvent.change(inputElement, { target: { value: 'testquery' } });

        await waitFor(() => {

            expect(screen.getByTestId('searchMessage')).toBeInTheDocument()
        }, { timeout: 2000 });
    });
    it('handles text input and check search results', async () => {
        render(
            <BrowserRouter>
                <QueryClientProvider client={client}>
                    <SearchInput />
                </QueryClientProvider>
            </BrowserRouter>
        );

        // Simulate user input
        const inputElement = screen.getByTestId('searchBar');
        fireEvent.click(inputElement);

        fireEvent.change(screen.getByPlaceholderText('Search'), { target: { value: 'testquery' } });

        await waitFor(() => {

            expect(screen.getByTestId('trends')).toBeInTheDocument()
            expect(screen.getByTestId('users')).toBeInTheDocument()
        }, { timeout: 2000 });
    });
    it('close poup', async () => {
        render(
            <BrowserRouter>
                <QueryClientProvider client={client}>
                    <SearchInput />
                </QueryClientProvider>
            </BrowserRouter>
        );

        // Simulate user input
        // Simulate user input
        const inputElement = screen.getByTestId('searchBar');
        fireEvent.click(inputElement);



        await waitFor(() => {

            expect(screen.getByTestId('searchBar')).toBeInTheDocument()
            fireEvent.click(window.document.body);

        }, { timeout: 2000 });
    });
    it('Search for in document', async () => {
        render(
            <BrowserRouter>
                <QueryClientProvider client={client}>
                    <SearchInput />
                </QueryClientProvider>
            </BrowserRouter>
        );

        // Simulate user input
        const inputElement = screen.getByTestId('searchBar');
        fireEvent.click(inputElement);
        fireEvent.change(screen.getByPlaceholderText('Search'), { target: { value: 'testquery' } });

        await waitFor(() => {

            expect(screen.getByTestId('targetUser')).toBeInTheDocument();
            (screen.getByTestId('targetUser')).click();
            expect(window.location.pathname).toContain('/profile/');
        }, { timeout: 2000 });
    });

});
