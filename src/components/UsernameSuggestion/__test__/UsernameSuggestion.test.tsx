import { render, screen, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { UsernameSuggestion } from "../UsernameSuggestion";
import userEvent from "@testing-library/user-event";
import { TextEncoder } from "util";
global.TextEncoder = TextEncoder;
import "isomorphic-fetch";
import "@testing-library/jest-dom";
import { setupServer } from "msw/node";
import { handlers } from "@/mocks/handlers";


const server = setupServer(...handlers);

beforeAll(() => {
    server.listen({
        onUnhandledRequest: 'warn', // Log unhandled requests
    });
    localStorage.setItem('user',`{"id":"99e63bc2-0194-4012-887d-4c0f83c281bb","google_id":null,"name":"Marwan Samy","birthDate":"2002-07-18T21:00:00.000Z","location":"Giza","url":"https://marwan-portfolio-38079.web.app","description":"Dark","protected":false,"verified":false,"followersCount":11,"followingCount":23,"notificationCount":0,"unSeenConversation":0,"createdAt":"2023-12-18T11:35:47.117Z","deletedAt":null,"profileBannerUrl":"https://qwitterstorage.blob.core.windows.net/qwitter/user-99e63bc2-0194-4012-887d-4c0f83c281bb1703326645925.jpeg","profileImageUrl":"https://qwitterstorage.blob.core.windows.net/qwitter/user-99e63bc2-0194-4012-887d-4c0f83c281bb1703186934093.jpeg","email":"mroansamy99@gmail.com","userName":"marwansamy99","password":"$2b$10$70DKBf.U7AIyLJJevX.yDOL9yCfS.aBv9KkLkkMIjfwQr144g87u.","passwordChangedAt":null,"passwordResetToken":null,"passwordResetExpires":null,"tweetCount":{}}`)
    localStorage.setItem('token',"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk5ZTYzYmMyLTAxOTQtNDAxMi04ODdkLTRjMGY4M2MyODFiYiIsImlhdCI6MTcwMzU0ODQ2OSwiZXhwIjoxNzA0NDEyNDY5fQ.q8Nu06lEXpdI4bvGTmbQh4q9M87VmAEc-KSWUojp8zY")

});

afterEach(() => {
    server.resetHandlers();
    server.use(...handlers);
});

afterAll(() => {
    server.close();
});

const client = new QueryClient();

describe("UsernameSuggestion testing", () => {
    it("Should render successfully", async () => {
        // ARRANGE
        render(
            <BrowserRouter>
                <QueryClientProvider client={client}>
                    <UsernameSuggestion nextStep={() => { }} />
                </QueryClientProvider>
            </BrowserRouter>
        );

        // ASSERT
        expect(screen.getByText("What should we call you?")).toBeTruthy();
        // Add more assertions based on your UI
    });

    it("Should submit form and call 'nextStep' on button click", async () => {
        // ARRANGE
        const nextStepMock = jest.fn();
        render(
            <BrowserRouter>
                <QueryClientProvider client={client}>
                    <UsernameSuggestion nextStep={nextStepMock} />
                </QueryClientProvider>
            </BrowserRouter>
        );

        // ACT
        const inputElement = screen.getByTestId("username");
        fireEvent.change(inputElement, { target: { value: "testuser" } });

        const submitButton = screen.getByText("Skip for now");
        fireEvent.click(submitButton);

        // ASSERT
        // Add assertions for the expected behavior after form submission
        expect(nextStepMock).toHaveBeenCalledTimes(1);
    });

    it("Should show suggestions and update input value on suggestion click", async () => {
        // ARRANGE
        render(
            <BrowserRouter>
                <QueryClientProvider client={client}>
                    <UsernameSuggestion nextStep={() => { }} />
                </QueryClientProvider>
            </BrowserRouter>
        );
        await userEvent.type(screen.getByTestId("username"), "marwan");

        // ACT
        const suggestionElement = screen.getByTestId("ShowMore"); // Update with actual data-testid used for suggestions
        
        userEvent.click(suggestionElement);

        // ASSERT
        // Add assertions for the expected behavior after suggestion click
    });

    // Add more test cases as needed to cover different scenarios
});
