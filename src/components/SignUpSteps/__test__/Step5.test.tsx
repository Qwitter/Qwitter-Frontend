import { fireEvent, render, screen } from "@testing-library/react";
import { Step5 } from "../Step5";

test("Sign Up Step 2 Test", () => {
  render(<Step5 nextStep={() => {}} registerUser={() => {}} />);

  // test if UI rendered
  expect(screen.getByText("You'll need a password")).toBeTruthy();
  expect(screen.getByText("Make sure it's 8 characters or more.")).toBeTruthy();
  expect(screen.getByText("Password")).toBeTruthy();

  const passwordInput = screen.getByRole("password");

  // test password less than 8
  fireEvent.change(passwordInput, { target: { value: "12a" } });

  setTimeout(() => {
    expect(
      screen.getByText(
        "Your password needs to be at least 8 characters. Please enter a longer one."
      )
    ).toBeTruthy();

    // test password with only numbers
    fireEvent.change(passwordInput, { target: { value: "123456789" } });
    setTimeout(() => {
      expect(
        screen.getByText("Password must contain at least one letter")
      ).toBeTruthy();

      // test valid password
      fireEvent.change(passwordInput, { target: { value: "123456789a" } });
      setTimeout(() => {
        expect(
          screen.getByText("Password must contain at least one letter")
        ).toBeFalsy();
        expect(
          screen.getByText(
            "Your password needs to be at least 8 characters. Please enter a longer one."
          )
        ).toBeFalsy();
      }, 510);
    }, 510);
  }, 510);
});
