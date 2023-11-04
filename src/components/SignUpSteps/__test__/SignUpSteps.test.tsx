import { render, screen } from "@testing-library/react";
import { SignUpSteps } from "../../index";
import "@testing-library/jest-dom";

describe("SignUp Popup Test", () => {
  test("Popup testing", () => {
    render(<SignUpSteps />);
    expect(screen.getByText("Create your account")).toBeTruthy();
    expect(screen.getByText("Step 1 of 5")).toBeTruthy();
    expect(screen.getByRole("PopUpIcon")).toBeInTheDocument();
  });
});
