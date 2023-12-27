import { TextEncoder } from "util";
global.TextEncoder = TextEncoder;
import "isomorphic-fetch";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { setupServer } from "msw/node";
import { handlers } from "@/mocks/handlers";
import { BrowserRouter } from "react-router-dom";
import { Trend } from "@/models/Trend";
import { TrendList } from "./TrendList";

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

const mockTrends: Trend[] = [
  {
    location: "Egypt",
    trend: "zamalek",
    count: 20,
  },
  {
    location: "Australia",
    trend: "dollar price",
    count: 10,
  },
];

describe("TrendsList testing", () => {
  it("testing TrendsList data length", async () => {
    // ARRANGE
    render(
      <BrowserRouter>
        <QueryClientProvider client={client}>
          <TrendList Trends={mockTrends} />
        </QueryClientProvider>
      </BrowserRouter>
    );
    // ASSERT
    const userItem = screen.getAllByTestId("trend");
    expect(userItem).toHaveLength(2);
  });
});
