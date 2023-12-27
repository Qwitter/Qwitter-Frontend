import { TextEncoder } from "util";
global.TextEncoder = TextEncoder;
import "isomorphic-fetch";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { setupServer } from "msw/node";
import { handlers } from "@/mocks/handlers";
import { BrowserRouter } from "react-router-dom";
import { BlockedProfile } from "./BlockedProfile";
import userEvent from "@testing-library/user-event";

const client = new QueryClient();
const server = setupServer(...handlers);
beforeAll(() => {
  server.listen({
    onUnhandledRequest: "warn", // Log unhandled requests
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
describe("BlockedProfile testing", () => {
  it("BlockedProfile testing", async () => {
    // ARRANGE
    render(
      <BrowserRouter>
        <QueryClientProvider client={client}>
          <BlockedProfile username="yousef02" ViewPostsFunction={mockFn} />
        </QueryClientProvider>
      </BrowserRouter>
    );
    // ASSERT
    expect(screen.getByTestId("username display")).toBeInTheDocument();
    expect(screen.getByTestId("view posts alert")).toBeInTheDocument();
    const viewpostsbutton = screen.getByTestId("viewPosts");
    expect(viewpostsbutton).toBeInTheDocument();
    await userEvent.click(viewpostsbutton);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
