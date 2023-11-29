import { TextEncoder } from "util";
global.TextEncoder = TextEncoder;
import "isomorphic-fetch";
import { render, screen } from "@testing-library/react";
import { FindEmailPopUp } from "../FindEmailPopUp";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { setupServer } from "msw/node";
import { handlers } from "@/mocks/handlers";


const mockFn = jest.fn();
const nextStep = jest.fn();
const email = "test@gmail.com";
const invalidEmail = "testx@gmail.com";
const notEmail = "test"
const client = new QueryClient();
const server = setupServer(...handlers);


beforeEach(() => {
    mockFn.mockClear();
    nextStep.mockClear();
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
                <FindEmailPopUp nextStep={nextStep} setEmail={mockFn} />
            </QueryClientProvider>
        );

        // ASSERT
        expect(screen.queryAllByTestId("skeleton")).toHaveLength(0);
        expect(screen.getByText("Find your Qwitter account")).toBeTruthy();
        expect(
            screen.getByText(`Enter the email or username associated with your account to change your password.`)
        ).toBeTruthy();
        expect(screen.getByText("Next")).toBeDisabled();

    });

    it("Should render error when the input isn't an email", async () => {
        const user = userEvent.setup();

        // ARRANGE
        render(
            <QueryClientProvider client={client}>
                <FindEmailPopUp nextStep={nextStep} setEmail={mockFn} />
            </QueryClientProvider>
        );

        // ACT
        const input = screen.getByRole("text");
        await user.type(input, notEmail);
        // ASSERT
        expect(screen.getByText("Must be an email")).toBeTruthy();
        expect(screen.getByText("Next")).toBeDisabled();
    });

    it("Should render error when the email isn't found", async () => {

        render(
            <QueryClientProvider client={client}>
                <FindEmailPopUp nextStep={nextStep} setEmail={mockFn} />
            </QueryClientProvider>
        );

        // ACT
        const input = screen.getByRole("text");
        await userEvent.type(input, invalidEmail);
        const button = screen.getByRole("submitButton");
        expect(button).toBeEnabled();
        await userEvent.click(button);

        // ASSERT
        setTimeout(() => {
            expect(nextStep).toHaveBeenCalled();
            expect(screen.getByText("Email is not Found")).toBeInTheDocument()
            expect(mockFn).not.toHaveBeenCalled();
        }, 3500);
    });

    it("Should process to next state", async () => {

        const user = userEvent.setup();

        // ARRANGE
        render(
            <QueryClientProvider client={client}>
                <FindEmailPopUp nextStep={nextStep} setEmail={mockFn} />
            </QueryClientProvider>
        );

        // ACT
        const input = screen.getByRole("text");
        await user.type(input, email);
        const button = screen.getByRole("submitButton");
        await user.click(button);
        // ASSERT
        setTimeout(() => {
            expect(nextStep).toHaveBeenCalled();
            expect(mockFn).toHaveBeenCalled();
        }, 3500);
    });

});
