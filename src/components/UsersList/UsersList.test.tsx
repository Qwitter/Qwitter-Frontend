import { TextEncoder } from "util";
global.TextEncoder = TextEncoder;
import "isomorphic-fetch";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { setupServer } from "msw/node";
import { handlers } from "@/mocks/handlers";
import { BrowserRouter } from "react-router-dom";
import { UsersList } from "./UsersList";
import { User } from "@/models/User";

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

const mockUsers: User[] = [
  {
    name: "osama",
    email: "string",
    birthDate: "string",
    userName: "string",
    createdAt: "string",
    location: "string",
    description: "string",
    url: "string",
    passwordChangedAt: "string",
    id: "string",
    google_id: "string",
    profileImageUrl: "string",
    profileBannerUrl: "string",
    verified: true,
    isFollowing: true,
    followersCount: 2,
    followingCount: 1,
  },
  {
    name: "yousef",
    email: "string",
    birthDate: "string",
    userName: "string",
    createdAt: "string",
    location: "string",
    description: "string",
    url: "string",
    passwordChangedAt: "string",
    id: "string",
    google_id: "string",
    profileImageUrl: "string",
    profileBannerUrl: "string",
    verified: true,
    isFollowing: true,
    followersCount: 2,
    followingCount: 1,
  },
];

describe("UsersList testing", () => {
  it("testing UsersList data length", async () => {
    // ARRANGE
    render(
      <BrowserRouter>
        <QueryClientProvider client={client}>
          <UsersList listType="Following" showDesc={true} users={mockUsers} />
        </QueryClientProvider>
      </BrowserRouter>
    );
    // ASSERT
    const userItem = screen.getAllByTestId("userToFollow");
    expect(userItem).toHaveLength(2);
  });
  it("testing UsersList with no users", async () => {
    // ARRANGE
    render(
      <BrowserRouter>
        <QueryClientProvider client={client}>
          <UsersList listType="Following" showDesc={true} users={[]} />
        </QueryClientProvider>
      </BrowserRouter>
    );

    // ASSERT
    expect(screen.getByText("No users to show")).toBeInTheDocument();
  });
});
