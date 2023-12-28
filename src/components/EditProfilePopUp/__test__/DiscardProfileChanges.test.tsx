import { render, screen } from "@testing-library/react";
import { DiscardProfileChanges } from "../DiscardProfileChanges";

test("Edit Profile Test", () => {
  const mockHandleClose = jest.fn();
  const mockSetShow = jest.fn();

  render(
    <DiscardProfileChanges
      handleClose={mockHandleClose}
      setShowDiscardChanges={mockSetShow}
      showDiscardChanges
    />
  );

  expect(screen.getByText("Discard changes?")).toBeTruthy();
  expect(
    screen.getByText("This can’t be undone and you’ll lose your changes.")
  ).toBeTruthy();
  expect(screen.getByText("Discard"));
  expect(screen.getByText("Cancel"));
});
