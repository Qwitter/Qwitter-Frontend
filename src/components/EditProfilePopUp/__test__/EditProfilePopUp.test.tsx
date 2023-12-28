import { render, screen } from "@testing-library/react";
import { EditProfilePopUp } from "../EditProfilePopUp";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";

test("Edit Profile Test", () => {

  render(
    <BrowserRouter>
      <QueryClientProvider client={new QueryClient()}>
        <Routes>
          <Route
            path="/testPath"
            element={<EditProfilePopUp/>}
          />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );

  expect(screen.findByText("Bio")).toBeTruthy();
  expect(screen.findByText("Name")).toBeTruthy();
  expect(screen.findByText("Save")).toBeTruthy();
  expect(screen.findByText("Website")).toBeTruthy();
  expect(screen.findByText("Birth date")).toBeTruthy();
  expect(screen.findByText("Edit profile")).toBeTruthy();
});
