import { TextEncoder } from "util";
global.TextEncoder = TextEncoder;
import "isomorphic-fetch";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { setupServer } from "msw/node";
import { handlers } from "@/mocks/handlers";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { MuteButton } from "./MuteButton";

const client = new QueryClient();
const server = setupServer(...handlers);

beforeAll(() => {
  server.listen({
    onUnhandledRequest: "bypass",
  });
});

afterEach(() => {
  server.resetHandlers();
  server.use(...handlers);
});

afterAll(() => {
  server.close();
});

const mockFn: () => void = jest.fn();

describe("MuteButton testing", () => {
  it("mute and unmute testing Senarios", async () => {
    // ARRANGE
    render(
      <BrowserRouter>
        <QueryClientProvider client={client}>
          <MuteButton jestMockMutatuiFn={mockFn} username="yousef02" />
        </QueryClientProvider>
      </BrowserRouter>
    );
    // ASSERT
    const unmuteButton = screen.getByTestId("unmuteButton");
    expect(unmuteButton).toBeInTheDocument();
    await userEvent.click(unmuteButton);
    setTimeout(async () => {
      expect(mockFn).toHaveBeenCalledTimes(1);
      const muteButton = screen.getByTestId("muteButton");
      expect(muteButton).toBeInTheDocument();
      await userEvent.click(muteButton);
      setTimeout(() => {
        expect(mockFn).toHaveBeenCalledTimes(2);
      }, 1000);
    }, 1000);
  });
});
