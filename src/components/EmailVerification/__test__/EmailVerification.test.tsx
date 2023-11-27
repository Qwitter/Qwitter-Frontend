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
const setTokenMockFn = jest.fn();
const client = new QueryClient();
const server = setupServer(...handlers);

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
  http.post(
    `${VITE_BACKEND_URL}/api/v1/auth/send-verification-email`,
    failingHandler
  ),
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
        <EmailVerification verificationType="signUp" email={mockEmail} onSuccess={mockFn} />
      </QueryClientProvider>
    );

    // ASSERT
    expect(screen.getAllByTestId("skeleton")).toHaveLength(2);
  });

  it("Should render successfully", () => {
    // ARRANGE
    render(
      <QueryClientProvider client={client}>
        <EmailVerification verificationType="signUp" email={mockEmail} onSuccess={mockFn} />
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
        <EmailVerification verificationType="signUp" email={mockEmail} onSuccess={mockFn} />
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
        <EmailVerification verificationType="signUp" email="wrong email" onSuccess={mockFn} />
      </QueryClientProvider>
    );

    expect(screen.queryAllByTestId("skeleton")).toHaveLength(0);
    expect(screen.getByText("Invalid Email")).toBeTruthy();
    expect(screen.getByText("Please try again")).toBeTruthy();
    expect(screen.getByText("Back")).toBeTruthy();
  });

  it("Should disable submit button when given code less than 6 characters in sign up", async () => {
    const user = userEvent.setup();
    // ARRANGE
    render(
      <QueryClientProvider client={client}>
        <EmailVerification verificationType="signUp" email={mockEmail} onSuccess={mockFn} />
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

  it("Should disable submit button when given code more than 6 characters in sign up", async () => {
    const user = userEvent.setup();
    // ARRANGE
    render(
      <QueryClientProvider client={client}>
        <EmailVerification verificationType="signUp" email={mockEmail} onSuccess={mockFn} />
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

  it("Should disable submit button when given code that contain alphabetical characters in sign up", async () => {
    const user = userEvent.setup();
    // ARRANGE
    render(
      <QueryClientProvider client={client}>
        <EmailVerification verificationType="signUp" email={mockEmail} onSuccess={mockFn} />
      </QueryClientProvider>
    );

    setTimeout(async () => {
      // ACT
      const input = screen.getByRole("textbox", { name: "token" });
      await user.type(input, "12345a");

      // ASSERT
      expect(screen.getByText("Next")).toBeDisabled();
      expect(mockFn).not.toHaveBeenCalled();
    }, 3000);
  });

  it("Should enable next button when given token consists of 6 numbers in sign up", async () => {
    const user = userEvent.setup();
    // ARRANGE
    render(
      <QueryClientProvider client={client}>
        <EmailVerification verificationType="signUp" email={mockEmail} onSuccess={mockFn} />
      </QueryClientProvider>
    );

    setTimeout(async () => {
      // ACT
      const input = screen.getByRole("textbox", { name: "token" });
      await user.type(input, "123456");

      // ASSERT
      expect(screen.getByText("Next")).toBeEnabled();
    }, 3000);
  });

  it("Should disable submit button when given code less than 8 characters in password reset", async () => {
    const user = userEvent.setup();
    // ARRANGE
    render(
      <QueryClientProvider client={client}>
        <EmailVerification
          email={mockEmail}
          verificationType="passwordReset"
          onSuccess={mockFn}
          setToken={setTokenMockFn}
        />
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

  it("Should disable submit button when given code more than 8 characters in password reset", async () => {
    const user = userEvent.setup();
    // ARRANGE
    render(
      <QueryClientProvider client={client}>
        <EmailVerification
          email={mockEmail}
          verificationType="passwordReset"
          onSuccess={mockFn}
          setToken={setTokenMockFn}
        />
      </QueryClientProvider>
    );

    setTimeout(async () => {
      // ACT
      const input = screen.getByRole("textbox", { name: "token" });
      await user.type(input, "123456789");

      // ASSERT
      expect(screen.getByText("Next")).toBeDisabled();
      expect(mockFn).not.toHaveBeenCalled();
    }, 3000);
  });

  it("Should enable submit button when given code that contain alphabetical characters in password reset", async () => {
    const user = userEvent.setup();
    // ARRANGE
    render(
      <QueryClientProvider client={client}>
        <EmailVerification
          email={mockEmail}
          verificationType="passwordReset"
          onSuccess={mockFn}
          setToken={setTokenMockFn}
        />
      </QueryClientProvider>
    );

    setTimeout(async () => {
      // ACT
      const input = screen.getByRole("textbox", { name: "token" });
      await user.type(input, "12345a78");

      // ASSERT
      expect(screen.getByText("Next")).toBeEnabled();
    }, 3000);
  });

  it("Should enable submit button when given token consists of 8 characters in password reset", async () => {
    const user = userEvent.setup();
    // ARRANGE
    render(
      <QueryClientProvider client={client}>
        <EmailVerification
          email={mockEmail}
          verificationType="passwordReset"
          onSuccess={mockFn}
          setToken={setTokenMockFn}
        />
      </QueryClientProvider>
    );

    setTimeout(async () => {
      // ACT
      const input = screen.getByRole("textbox", { name: "token" });
      await user.type(input, "12345678");
      const submitButton = screen.getByText("Next");
      await user.click(submitButton);

      // ASSERT
      expect(submitButton).toBeEnabled();
      expect(mockFn).toHaveBeenCalled();
    }, 3000);
  });

  it("Should highlight that wrong code has been given in sign up", async () => {
    const user = userEvent.setup();
    // ARRANGE
    render(
      <QueryClientProvider client={client}>
        <EmailVerification verificationType="signUp" email={mockEmail} onSuccess={mockFn} />
      </QueryClientProvider>
    );

    setTimeout(async () => {
      // ACT
      const input = screen.getByRole("textbox", { name: "token" });
      await user.type(input, "123456ss");
      await user.click(screen.getByText("Next"));

      // ASSERT
      expect(mockFn).not.toHaveBeenCalled();
      expect(screen.getByText("Invalid token")).toBeTruthy();
    }, 3000);
  });

  it("Should highlight that wrong code has been given in password reset", async () => {
    const user = userEvent.setup();
    // ARRANGE
    render(
      <QueryClientProvider client={client}>
        <EmailVerification
          email={mockEmail}
          verificationType="passwordReset"
          onSuccess={mockFn}
          setToken={setTokenMockFn}
        />
      </QueryClientProvider>
    );

    setTimeout(async () => {
      // ACT
      const input = screen.getByRole("textbox", { name: "token" });
      await user.type(input, "12345678");
      await user.click(screen.getByText("Next"));

      // ASSERT
      expect(mockFn).not.toHaveBeenCalled();
      expect(screen.getByText("Invalid token")).toBeTruthy();
    }, 3000);
  });

  it("Should call onSuccess when given correct code in sign up", async () => {
    const user = userEvent.setup();
    // ARRANGE
    render(
      <QueryClientProvider client={client}>
        <EmailVerification verificationType="signUp" email={mockEmail} onSuccess={mockFn} />
      </QueryClientProvider>
    );

    setTimeout(async () => {
      // ACT
      const input = screen.getByRole("textbox", { name: "token" });
      await user.type(input, "123456");
      await user.click(screen.getByText("Next"));

      // ASSERT
      expect(mockFn).toHaveBeenCalled();
    }, 3000);
  });

  it("Should call onSuccess when given correct code in password reset", async () => {
    const user = userEvent.setup();
    // ARRANGE
    render(
      <QueryClientProvider client={client}>
        <EmailVerification
          email={mockEmail}
          verificationType="passwordReset"
          onSuccess={mockFn}
          setToken={setTokenMockFn}
        />
      </QueryClientProvider>
    );

    setTimeout(async () => {
      // ACT
      const input = screen.getByRole("textbox", { name: "token" });
      await user.type(input, "123456ss");
      await user.click(screen.getByText("Next"));

      // ASSERT
      expect(mockFn).toHaveBeenCalled();
    }, 3000);
  });
});
