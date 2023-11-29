import { fireEvent, render, screen } from "@testing-library/react";
import { Step1 } from "../Step1";

test("Sign Up Step 1 Test", () => {
  render(<Step1 nextStep={() => {}} addStep1Data={() => {}} />);
  expect(screen.getByText("Create your account")).toBeTruthy();
  expect(screen.getByText("Name")).toBeTruthy();
  expect(screen.getByText("Email")).toBeTruthy();
  expect(screen.getByText("Date of birth")).toBeTruthy();
  expect(screen.getByText("Next")).toBeTruthy();

  const nameInput = screen.getByRole("name");
  const emailInput = screen.getByRole("email");

  // test name
  fireEvent.change(nameInput, {
    // test max input length
    target: { value: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" },
  });
  setTimeout(() => {
    expect(screen.getByText("Name must be less than 50 letters")).toBeTruthy();

    // valid name
    fireEvent.change(nameInput, { target: { value: "Mohamed" } });
    setTimeout(() => {
      expect(screen.getByText("Name must be less than 50 letters")).toBeFalsy();
    }, 510);
  }, 510);

  // test email
  fireEvent.change(emailInput, {
    // already taken name
    target: { value: "test@gmail.com" },
  });
  setTimeout(() => {
    expect(screen.getByText("Email has already been taken")).toBeTruthy();

    // invalid email
    fireEvent.change(emailInput, { target: { value: "atef@gma" } });
    setTimeout(() => {
      expect(screen.getByText("Please enter a valid email")).toBeTruthy();

      // valid email
      fireEvent.change(emailInput, { target: { value: "atef@gmail.com" } });
      setTimeout(() => {
        expect(screen.getByText("Please enter a valid email")).toBeFalsy();
        expect(screen.getByText("Email has already been taken")).toBeFalsy();
      }, 510);
    }, 510);
  }, 510);

  // birthdate has already been tested in BirthDay.test.tsx
});
