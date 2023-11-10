import { render, screen } from "@testing-library/react";
import { Step2 } from "../Step2";

test("Sign Up Step 2 Test", () => {
  render(<Step2 nextStep={() => {}} />);
  expect(screen.getByText("Customize your experience")).toBeTruthy();
  expect(
    screen.getByText("Track where you see X content across the web")
  ).toBeTruthy();
  expect(
    screen.getByText(
      "Qwitter uses this data to personalize your experience. This web browsing history will never be stored with your name, email, or phone number."
    )
  ).toBeTruthy();
  expect(
    screen.getByText(
      "By signing up, you agree to our Terms, Privacy Policy, and Cookie Use. Qwitter may use your contact information, including your email address and phone number for purposes outlined in our Privacy Policy."
    )
  ).toBeTruthy();

  expect(screen.getByText("Next")).toBeTruthy();
});
