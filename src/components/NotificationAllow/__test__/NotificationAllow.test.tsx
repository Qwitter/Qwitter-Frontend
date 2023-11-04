import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { NotificationAllow } from "../../index";
import "@testing-library/jest-dom";

describe("NotificationAllow Testing", () => {
  test("UI testing", () => {
    render(<NotificationAllow />);
    expect(screen.getByText("Turn on notification")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Get the most out of Qwitter by staying up to date with what's happening"
      )
    ).toBeTruthy();
  });
  test("Allow function testing", async () => {
    render(<NotificationAllow />);
    const button = screen.getByText("Allow notification");
    // Assert that the button element exists
    expect(button).toBeTruthy();
    fireEvent.click(button);
    await waitFor(() => {
      expect(window).toBeTruthy();
    });
  });
});
