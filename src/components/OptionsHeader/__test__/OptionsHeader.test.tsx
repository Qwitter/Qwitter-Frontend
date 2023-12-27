import { TextEncoder } from "util";
global.TextEncoder = TextEncoder;
import "isomorphic-fetch";
import {  render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { setupServer } from "msw/node";
import { handlers } from "@/mocks/handlers";
import { BrowserRouter } from "react-router-dom";
import { OptionsHeader } from "../OptionsHeader";
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

describe("OptionsHeader testing", () => {

    it('Should render successfully', async () => {
        // ARRANGE
        render(
            <BrowserRouter>
                <QueryClientProvider client={client}>
                    <OptionsHeader header="hello"  />
                </QueryClientProvider>
            </BrowserRouter>
        );

        // ASSERT
        expect(screen.getByText('hello')).toBeInTheDocument();

    });

    it('Should render not back button', async () => {
        // ARRANGE
        render(
            <BrowserRouter>
                <QueryClientProvider client={client}>
                    <OptionsHeader header="hello" className="lg"   />
                </QueryClientProvider>
            </BrowserRouter>
        );

        // ASSERT
        expect(screen.getByTestId('Back')).toBeTruthy();

    });
    it('back button', async () => {
        // ARRANGE
        render(
            <BrowserRouter>
                <QueryClientProvider client={client}>
                    <OptionsHeader header="hello" defaultBack />
                </QueryClientProvider>
            </BrowserRouter>
        );

        // ASSERT
        (screen.getByTestId('Back')).click();
        await waitFor(() => {
            expect(window.location.pathname).toContain('/');
        }, { timeout: 2000 });

    });

    // it("Should navigate to the a page", async () => {
    //     // ARRANGE

    //     render(
    //         <BrowserRouter>
    //             <QueryClientProvider client={client}>
    //                 <NavBar />
    //             </QueryClientProvider>
    //         </BrowserRouter>
    //     );

    //     // ACT
    //     fireEvent.click(screen.getByText('Settings'));

    //     // ASSERT
    //     await waitFor(() => {
    //         expect(window.location.pathname).toContain('/Settings');
    //     }, { timeout: 2000 });
    // });
    // it("Should open a post popup", async () => {
    //     // ARRANGE

    //     render(
    //         <BrowserRouter>
    //             <QueryClientProvider client={client}>
    //                 <NavBar />
    //             </QueryClientProvider>
    //         </BrowserRouter>
    //     );

    //     // ACT
    //     fireEvent.click(screen.getByText('Post'));

    //     // ASSERT
        
    //     await waitFor(() => {
    //         expect(window.location.pathname).toContain('/compose/tweet');
    //     }, { timeout: 2000 });
    // });
    // it("Should open a logout popup", async () => {
    //     // ARRANGE

    //     render(
    //         <BrowserRouter>
    //             <QueryClientProvider client={client}>
    //                 <NavBar />
    //             </QueryClientProvider>
    //         </BrowserRouter>
    //     );

    //     // ACT
    //     fireEvent.click(screen.getByTestId('logout'));

    //     // ASSERT
        
    //     await waitFor(() => {
    //         expect(window.location.pathname).toContain('/i/flow/logout');
    //     }, { timeout: 2000 });
    // });

});
