import { TextEncoder } from "util";
global.TextEncoder = TextEncoder;
import "isomorphic-fetch";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { setupServer } from "msw/node";
import { handlers } from "@/mocks/handlers";
import { BrowserRouter } from "react-router-dom";
import { UsersListItem } from "./UsersListItem";

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

// const mockFn = jest.fn();

describe("UsersListItem testing", () => {
  it("testing follow list", async () => {
    // ARRANGE
    render(
      <BrowserRouter>
        <QueryClientProvider client={client}>
          <UsersListItem
            description="desc"
            followersCount={10}
            followingCount={20}
            isFollowing={true}
            listType="following"
            name="yousef osama"
            username="yousef02"
            profileImageUrl=""
            showDesc={true}
            verified={false}
          />
        </QueryClientProvider>
      </BrowserRouter>
    );
    // ASSERT
    const userItem = screen.getByTestId("userToFollow");
    expect(userItem).toBeInTheDocument();
    const username = screen.getByText("@yousef02");
    expect(username).toBeInTheDocument();
    const description = screen.getByText("desc");
    expect(description).toBeInTheDocument();
    userItem.click();
    screen.debug();
    await waitFor(
      () => {
        expect(window.location.pathname).toContain("/Profile");
      },
      { timeout: 1000 }
    );
  });
});
