import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ProfileSections } from "../ProfileSections";

test("Profile Main Test", () => {
  render(
    <BrowserRouter>
      <ProfileSections />
    </BrowserRouter>
  );

  expect(screen.getByText("Posts")).toBeTruthy();
  expect(screen.getByText("Replies")).toBeTruthy();
  expect(screen.getByText("Media")).toBeTruthy();
  expect(screen.getByText("Likes")).toBeTruthy();
});
