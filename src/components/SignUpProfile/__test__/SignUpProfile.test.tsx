import { fireEvent, render, screen } from "@testing-library/react";
import { SignUpProfile } from "../SignUpProfile";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

test("Sign Up Step 2 Test", () => {
  const { container } = render(
    <QueryClientProvider client={new QueryClient()}>
      <SignUpProfile nextStep={() => {}} />
    </QueryClientProvider>
  );
  expect(screen.getByText("Pick a profile picture")).toBeTruthy();
  expect(
    screen.getByText("Have a favorite selfie? Upload it now.")
  ).toBeTruthy();

  // get the ImagePicker
  const imageTag = container.querySelector("img");
  expect(imageTag).not.toBeNull();

  // test default image
  expect(imageTag?.getAttribute("src")).toBe(
    "https://t4.ftcdn.net/jpg/00/64/67/63/240_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
  );

  expect(screen.getByText("Skip for now")).toBeTruthy();

  // test uploading an image
  const file = new File(["file content"], "file.png", { type: "image/png" });

  // get the input
  const imageInput = container.querySelector("input");
  expect(imageInput).not.toBeNull();

  fireEvent.change(imageInput!, { target: { files: [file] } });
  expect(screen.getByText("Next")).toBeTruthy();
});
