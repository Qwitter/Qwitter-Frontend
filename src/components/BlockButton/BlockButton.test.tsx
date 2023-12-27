import { TextEncoder } from "util";
global.TextEncoder = TextEncoder;
import "isomorphic-fetch";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { setupServer } from "msw/node";
import { handlers } from "@/mocks/handlers";
import { BrowserRouter } from "react-router-dom";
import { BlockButton } from "./BlockButton";
import userEvent from "@testing-library/user-event";

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

const mockFn = jest.fn();

describe("BlockButton testing", () => {
  it("Block and unblock testing Senarios", async () => {
    // ARRANGE
    render(
      <BrowserRouter>
        <QueryClientProvider client={client}>
          <BlockButton username="yousef02" jestMockMutatuiFn={mockFn} />
        </QueryClientProvider>
      </BrowserRouter>
    );
    // ASSERT
    const unblockButton = screen.getByTestId("unblockButton");
    expect(unblockButton).toBeInTheDocument();
    await userEvent.click(unblockButton);
    const blockButton = screen.getByText("Block");
    expect(blockButton).toBeInTheDocument();
    await userEvent.click(blockButton);
    setTimeout(() => {
      expect(mockFn).toHaveBeenCalledTimes(2);
    }, 1000);
  });
});
