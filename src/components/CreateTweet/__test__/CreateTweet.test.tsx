import { render, screen, waitFor, fireEvent, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider, useMutation } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import CreateTweetContainer from "../CreateTweetContainer";
import CreateTweetFooter from "../CreateTweetFooter";
import CreateTweetMain from "../CreateTweetMain";
import { UseFormReturn, useForm } from "react-hook-form";
// Mocking react-query useMutation
jest.mock('@tanstack/react-query', () => ({
    ...jest.requireActual('@tanstack/react-query'),
    useMutation: jest.fn(),
}));

const mockUseMutation = useMutation as jest.Mock;

describe("CreateTweetContainer", () => {
    const queryClient = new QueryClient();

    it("should render CreateTweetContainer in popUp mode", async () => {
        mockUseMutation.mockReturnValue({
            mutate: jest.fn(),
            isPending: false,
        });
        render(
            <BrowserRouter>
                <QueryClientProvider client={queryClient}>
                    <CreateTweetContainer mode="popUp" />
                </QueryClientProvider>
            </BrowserRouter>
        );

        // Assert that some elements are rendered based on your component
        expect(screen.getByPlaceholderText("What is happening?!")).toBeTruthy();
        // Add more assertions as needed
    });

    it("should handle text input and submit form", async () => {
        // Mock the useMutation hook to provide expected behavior
        mockUseMutation.mockReturnValue({
            mutate: jest.fn(),
            isPending: false,
        });

        render(
            <BrowserRouter>
                <QueryClientProvider client={queryClient}>
                    <CreateTweetContainer mode="popUp" />
                </QueryClientProvider>
            </BrowserRouter>
        );

        // Type text in the input field
        const inputElement = screen.getByTestId("tweetInput");
        fireEvent.change(inputElement, { target: { value: "Test tweet text" } });

        // Assert that the input value is updated
        expect(inputElement.innerHTML).toContain("Test tweet text");

        // Trigger form submission
        const submitButton = screen.getByTestId("postTweet");
        fireEvent.click(submitButton);

        // Wait for the mutation to be called
        await waitFor(() => {
            expect(mockUseMutation).toHaveBeenCalled();
        });

        // Add more assertions based on the expected behavior after form submission
    });
    it("should close popup", async () => {
        // Mock the useMutation hook to provide expected behavior
        mockUseMutation.mockReturnValue({
            mutate: jest.fn(),
            isPending: false,
        });

        render(
            <BrowserRouter>
                <QueryClientProvider client={queryClient}>
                    <CreateTweetContainer mode="popUp" />
                </QueryClientProvider>
            </BrowserRouter>
        );


        // Trigger form submission
        const submitButton = screen.getByTestId("popupHeaderButton");
        fireEvent.click(submitButton);

        // Wait for the mutation to be called
        setTimeout(() => {

            expect(screen.getByTestId("popupHeaderButton")).toBeNull();
        }, 3000);
        // Add more assertions based on the expected behavior after form submission
    });
    it("should call onSuccess and clearForm on successful mutation", async () => {
        // Mock useMutation to return the expected behavior
        mockUseMutation.mockReturnValue({
            mutate: jest.fn((data) => Promise.resolve(data)), // Simulate a successful mutation
            isPending: false,
        });
        const clearFormMock = jest.fn();


        // Render the component with the mocked useMutation
        render(
            <BrowserRouter>
                <QueryClientProvider client={queryClient}>
                    <CreateTweetContainer mode="reply" />
                </QueryClientProvider>
            </BrowserRouter>
        );
        jest.mock("../CreateTweetContainer", () => ({
            ...jest.requireActual("../CreateTweetContainer"),
            clearForm: clearFormMock,
        }));
        // Trigger some action that calls the mutate function (e.g., submitting a form)
        const submitButton = screen.getByTestId("postTweet");
        fireEvent.click(submitButton);

        // Wait for the asynchronous operations to complete
        await act(async () => {
            // Add any necessary waits for your specific use case
        });

        // Assert that onSuccess behavior is triggered
        expect(mockUseMutation).toHaveBeenCalled();

        // Mock data that the onSuccess callback would receive


        // Assert that onSuccess callback is called with the expected data
        expect(mockUseMutation.mock.calls[0][0].onSuccess).toBeDefined();
        expect(clearFormMock).toBeDefined();


        // Assert that clearForm is called
        // Add assertions based on how clearForm is expected to behave in your component
    });

    it("should call onError and show error toast on failed mutation", async () => {
        // Mock useMutation to return the expected behavior
        mockUseMutation.mockReturnValue({
            mutate: jest.fn(() => Promise.reject(new Error("Test error"))), // Simulate a failed mutation
            isPending: false,
        });

        // Render the component with the mocked useMutation
        render(
            <BrowserRouter>
                <QueryClientProvider client={queryClient}>
                    <CreateTweetContainer mode="home" />
                </QueryClientProvider>
            </BrowserRouter>
        );
        // Trigger some action that calls the mutate function (e.g., submitting a form)
        const submitButton = screen.getByTestId("postTweet");
        fireEvent.click(submitButton);

        // Wait for the asynchronous operations to complete
        await act(async () => {
            // Add any necessary waits for your specific use case
        });

        // Assert that onError behavior is triggered
        expect(mockUseMutation).toHaveBeenCalled();

        // Assert that onError callback is called with the expected error
        const mockMutationFn = mockUseMutation.mock.calls[0][0].mutationFn;
        expect(mockMutationFn).toBeDefined();

        // Assert that the error toast is shown
        // Add assertions based on how the error toast is expected to behave in your component
    });
    it("should call handelSubmit", async () => {
        // Mock useMutation to return the expected behavior
        mockUseMutation.mockReturnValue({
            mutate: jest.fn(() => Promise.reject(new Error("Test error"))), // Simulate a failed mutation
            isPending: false,
        });
        const submit = jest.fn();
        const textfn = jest.fn();
        // Render the component with the mocked useMutation
        render(
            <BrowserRouter>
                <QueryClientProvider client={queryClient}>
                    <CreateTweetFooter files={[]} handleSubmit={submit} handleTextChange={textfn} isValid mode="home" selectedImages={[]} setFiles={() => { }} setSelectedImages={() => { }} setVideoFile={() => { }}
                        text="hello"
                        videoFile={undefined}

                    />
                </QueryClientProvider>
            </BrowserRouter>
        );
        // Trigger some action that calls the mutate function (e.g., submitting a form)
        const submitButton = screen.getByTestId("postTweet");
        fireEvent.click(submitButton);

        // Assert that onError behavior is triggered
        expect(mockUseMutation).toHaveBeenCalled();


        // Assert that the error toast is shown
        // Add assertions based on how the error toast is expected to behave in your component
    });
    it("should call textfn", async () => {
        // Mock useMutation to return the expected behavior
        mockUseMutation.mockReturnValue({
            mutate: jest.fn(() => Promise.reject(new Error("Test error"))), // Simulate a failed mutation
            isPending: false,
        });
        const submit = jest.fn();
        const textfn = jest.fn();
        const form = useForm<{ text: string }>({
        });
        // Render the component with the mocked useMutation
        render(
            <BrowserRouter>
                <QueryClientProvider client={queryClient}>
                    <CreateTweetMain form={form as unknown as UseFormReturn<{ Text: string }>} handleRemoveFile={() => { }} setTweet={() => { }} tweet="h" files={[]} handleSubmit={submit} handleTextChange={textfn} isValid mode="home" selectedImages={[]} setFiles={() => { }} setSelectedImages={() => { }} setVideoFile={() => { }}
                        text="hello"
                        videoFile={undefined}

                    />
                </QueryClientProvider>
            </BrowserRouter>
        );
        // Trigger some action that calls the mutate function (e.g., submitting a form)
        const inputElement = screen.getByTestId("tweetInput");
        fireEvent.change(inputElement, { target: { value: "Test tweet text" } });


        // Assert that onError behavior is triggered
        expect(textfn).toHaveBeenCalled();


        // Assert that the error toast is shown
        // Add assertions based on how the error toast is expected to behave in your component
    });

    // Add more test cases as needed to cover different scenarios
});
