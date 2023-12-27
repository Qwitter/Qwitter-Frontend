import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { NotificationAllow } from "../../index";
import "@testing-library/jest-dom";

const mockFn = jest.fn()

describe("NotificationAllow Testing", () => {
  test("UI testing", () => {
    render(<NotificationAllow nextStep={mockFn}/>);
    expect(screen.getByText("Turn on notifications")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Get the most out of Qwitter by staying up to date with what's happening"
      )
    ).toBeTruthy();
  });
  test("Allow function testing", async () => {
    render(<NotificationAllow nextStep={mockFn}/>);
    const button = screen.getByText("Allow notifications");
    // Assert that the button element exists
    expect(button).toBeTruthy();
    fireEvent.click(button);
    await waitFor(() => {
      expect(window).toBeTruthy();
    });
  });
  test("Allow function to be accepted", async () => {
    render(<NotificationAllow nextStep={mockFn}/>);
    const button = screen.getByText("Allow notifications");
    // Assert that the button element exists
    expect(button).toBeTruthy();
    fireEvent.click(button);
    await waitFor(() => {
      expect(mockFn).not.toHaveBeenCalled();
    });
  });
  test("Allow function to not be accepted", async () => {
    render(<NotificationAllow nextStep={mockFn}/>);
    const button = screen.getByText("Skip for now");
    // Assert that the button element exists
    expect(button).toBeTruthy();
    fireEvent.click(button);
    await waitFor(() => {
      expect(mockFn).toHaveBeenCalled();
    });
  });
});
