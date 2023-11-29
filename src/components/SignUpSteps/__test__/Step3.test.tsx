import { render, screen } from "@testing-library/react";
import { Step3 } from "../Step3";
import { SignUpDataSchema } from "@/models/SignUp";

const userTestData = {
  name: "Mohamed",
  email: "atef@gmail.com",
  day: "11",
  month: "October",
  year: "2001",
  password: "12345678a",
};

const userTestDataParsed = SignUpDataSchema.parse(userTestData);
test("Sign Up Step 2 Test", () => {
  render(<Step3 nextStep={() => {}} userData={userTestDataParsed} />);

  // check the UI to be rendered
  expect(screen.findByText("Name")).toBeTruthy();
  expect(screen.findByText("Email")).toBeTruthy();
  expect(screen.findByText("Date of birth")).toBeTruthy();
  expect(
    screen.findByText(
      "By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use. Qwitter may use your contact information, including your email address and phone number for purposes outlined in our Privacy Policy, like keeping your account secure and personalizing our services, including ads. Learn more. Others will be able to find you by email or phone number, when provided, unless you choose otherwise here."
    )
  ).toBeTruthy();
  expect(screen.findByText("Sign Up"));

  // check the user data to be rendered
  expect(screen.findByText("Mohamed")).toBeTruthy();
  expect(screen.findByText("atef@gmail.com")).toBeTruthy();
  expect(screen.findByText("Oct 2, 2001")).toBeTruthy();
});
