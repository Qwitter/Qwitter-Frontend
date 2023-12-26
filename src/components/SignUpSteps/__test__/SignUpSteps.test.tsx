import { render, screen, fireEvent } from "@testing-library/react";
import { SignUpSteps } from "../SignUpSteps";
import { BrowserRouter as Router } from "react-router-dom";
jest.mock("../../../assets/logo.png", () => "path-to-mock-image");
test("Sign UP UI Test", () => {
  render(
    <Router>
      {" "}
      <SignUpSteps />
    </Router>
  );
  expect(screen.getByText("Step 1 of 5")).toBeTruthy();
  expect(screen.getByText("Create your account")).toBeTruthy();
  expect(screen.getByText("Name")).toBeTruthy();
  expect(screen.getByText("Email")).toBeTruthy();
  expect(screen.getByText("Date of birth")).toBeTruthy();
  expect(screen.getByText("Next")).toBeTruthy();
  fireEvent.click(screen.getByText("Next"));

  expect(screen.getByText("Step 2 of 5"));
  expect(screen.getByText("Customize your experience"));
  expect(screen.getByText("Track where you see X content across the web"));
  expect(
    screen.getByText(
      "X uses this data to personalize your experience. This web browsing history will never be stored with your name, email, or phone number."
    )
  );
  expect(
    screen.getByText(
      "By signing up, you agree to our Terms, Privacy Policy, and Cookie Use. X may use your contact information, including your email address and phone number for purposes outlined in our Privacy Policy. Learn more"
    )
  );
  expect(screen.getByText("Next"));
  fireEvent.click(screen.getByText("Next"));

  expect(screen.getByText("Step 1 of 5")).toBeTruthy();
  expect(screen.getByText("Create your account")).toBeTruthy();
  expect(screen.getByText("Name")).toBeTruthy();
  expect(screen.getByText("Email")).toBeTruthy();
  expect(screen.getByText("Date of birth")).toBeTruthy();
  expect(
    screen.getByText(
      "By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use. Twitter may use your contact information, including your email address and phone number for purposes outlined in our Privacy Policy, like keeping your account secure and personalizing our services, including ads. Learn more. Others will be able to find you by email or phone number, when provided, unless you choose otherwise here."
    )
  ).toBeTruthy();

  fireEvent.click(screen.getByText("Next"));
  expect(screen.getByText("You'll beed a password"));
  expect(screen.getByText("Make sure it's 8 characters or more."));
  expect(screen.getByText("Password"));
  expect(screen.getByText("Next"));
});
