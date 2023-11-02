import { render, screen, fireEvent } from '@testing-library/react';
import { NotificationAllow } from '../components';

describe('NotificationAllow Testing', () => {

  test("UI testing", () => {
    render(<NotificationAllow />)
    expect(screen.getByText('Turn on notification')).toBeTruthy();
    expect(screen.getByText("Get the most out of Qwitter by staying up to date with what's happening")).toBeTruthy();

  })
  test("Allow function testing", async () => {
    render(<NotificationAllow />)
    const button = screen.getByText('Allow notification');
    // Assert that the button element exists
    expect(button).toBeTruthy();
    fireEvent.click(button);
    // await waitFor(() => {
    //   expect(window.Notification.requestPermission).toHaveBeenCalled();
    // });
  })
})