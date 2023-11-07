import { TextEncoder } from "util";
global.TextEncoder = TextEncoder;
import "isomorphic-fetch";
import { render, screen } from "@testing-library/react";
import EmailVerification from "../EmailVerification";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { setupServer } from "msw/node";
import { handlers } from "@/mocks/handlers";
import { HttpResponse, ResponseResolver, http } from "msw";
const { VITE_BACKEND_URL } = process.env;

const mockFn = jest.fn();
const mockEmail = "sofa5060@gmail.com";
const client = new QueryClient();
const server = setupServer(...handlers);

const CORRECT_TOKEN = "123456";
const WRONG_TOKEN = "123457";

const failingHandler: ResponseResolver = async ({ request }) => {
  const body = (await request.json()) as { email: string };
  const { email } = body;

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return HttpResponse.json(
    {
      message: "Failed to send verification email",
      data: {
        email: `${email}`,
        expires: "2021-10-07T16:00:00.000Z",
      },
    },
    {
      status: 400,
    }
  );
};

const failingHandlers = [
  http.post(`${VITE_BACKEND_URL}/api/user/verify-email`, failingHandler),
];

beforeEach(() => {
  mockFn.mockClear();
});

beforeAll(() => {
  jest.useFakeTimers();
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
  server.use(...handlers);
});

afterAll(() => {
  jest.useRealTimers();
  server.close();
});

describe("EmailVerification testing", () => {
  it("Should render skeleton when loading", () => {
    // ARRANGE
    render(
      <QueryClientProvider client={client}>
        <EmailVerification email={mockEmail} onSuccess={mockFn} />
      </QueryClientProvider>
    );

    // ASSERT
    expect(screen.getAllByTestId("skeleton")).toHaveLength(2);
  });

  it("Should render successfully", () => {
    // ARRANGE
    render(
      <QueryClientProvider client={client}>
        <EmailVerification email={mockEmail} onSuccess={mockFn} />
      </QueryClientProvider>
    );

    // ASSERT
    setTimeout(() => {
      expect(screen.queryAllByTestId("skeleton")).toHaveLength(0);
      expect(screen.getByText("We sent you a code")).toBeTruthy();
      expect(
        screen.getByText(`Enter the code sent to ${mockEmail} below to verify`)
      ).toBeTruthy();
      expect(screen.getByText("Didn't receive email? resend it")).toBeTruthy();
      expect(screen.getByText("Next")).toBeDisabled();
    }, 3000);
  });

  it("Should render error when failed to send verification email", () => {
    // ARRANGE
    render(
      <QueryClientProvider client={client}>
        <EmailVerification email={mockEmail} onSuccess={mockFn} />
      </QueryClientProvider>
    );

    // ACT
    server.use(...failingHandlers);

    // ASSERT
    setTimeout(() => {
      expect(screen.queryAllByTestId("skeleton")).toHaveLength(0);
      expect(screen.getByText("We couldn't send you a code")).toBeTruthy();
      expect(screen.getByText("Please try again later")).toBeTruthy();
      expect(screen.getByText("Retry")).toBeTruthy();
    }, 3000);
  });

  it("Should render error when given wrong email format", () => {
    // ARRANGE
    render(
      <QueryClientProvider client={client}>
        <EmailVerification email="wrong email" onSuccess={mockFn} />
      </QueryClientProvider>
    );

    expect(screen.queryAllByTestId("skeleton")).toHaveLength(0);
    expect(screen.getByText("Invalid Email")).toBeTruthy();
    expect(screen.getByText("Please try again")).toBeTruthy();
    expect(screen.getByText("Back")).toBeTruthy();
  });

  it("Should next button stay disabled when given code less than 6 characters", async () => {
    const user = userEvent.setup();
    // ARRANGE
    render(
      <QueryClientProvider client={client}>
        <EmailVerification email={mockEmail} onSuccess={mockFn} />
      </QueryClientProvider>
    );

    setTimeout(async () => {
      // ACT
      const input = screen.getByRole("textbox", { name: "token" });
      await user.type(input, "12345");

      // ASSERT
      expect(screen.getByText("Next")).toBeDisabled();
      expect(mockFn).not.toHaveBeenCalled();
    }, 3000);
  });

  it("Should disable next button when given code more than 6 characters", async () => {
    const user = userEvent.setup();
    // ARRANGE
    render(
      <QueryClientProvider client={client}>
        <EmailVerification email={mockEmail} onSuccess={mockFn} />
      </QueryClientProvider>
    );

    setTimeout(async () => {
      // ACT
      const input = screen.getByRole("textbox", { name: "token" });
      await user.type(input, "1234567");

      // ASSERT
      expect(screen.getByText("Next")).toBeDisabled();
      expect(mockFn).not.toHaveBeenCalled();
    }, 3000);
  });

  it("Should enable next button when given correct code length", async () => {
    const user = userEvent.setup();
    // ARRANGE
    render(
      <QueryClientProvider client={client}>
        <EmailVerification email={mockEmail} onSuccess={mockFn} />
      </QueryClientProvider>
    );

    setTimeout(async () => {
      // ACT
      const input = screen.getByRole("textbox", { name: "token" });
      await user.type(input, CORRECT_TOKEN);

      // ASSERT
      expect(screen.getByText("Next")).toBeEnabled();
    }, 3000);
  })

  it("Should highlight that wrong code has been given", async () => {
    const user = userEvent.setup();
    // ARRANGE
    render(
      <QueryClientProvider client={client}>
        <EmailVerification email={mockEmail} onSuccess={mockFn} />
      </QueryClientProvider>
    );

    setTimeout(async () => {
      // ACT
      const input = screen.getByRole("textbox", { name: "token" });
      await user.type(input, WRONG_TOKEN);
      await user.click(screen.getByText("Next"));

      // ASSERT
      expect(mockFn).not.toHaveBeenCalled();
      expect(screen.getByText("Invalid token")).toBeTruthy();
    }, 3000);
  })

  it("Should call onSuccess when given correct code", async () => {
    const user = userEvent.setup();
    // ARRANGE
    render(
      <QueryClientProvider client={client}>
        <EmailVerification email={mockEmail} onSuccess={mockFn} />
      </QueryClientProvider>
    );

    setTimeout(async () => {
      // ACT
      const input = screen.getByRole("textbox", { name: "token" });
      await user.type(input, CORRECT_TOKEN);
      await user.click(screen.getByText("Next"));

      // ASSERT
      expect(mockFn).toHaveBeenCalled();
    }, 3000);
  })
});
