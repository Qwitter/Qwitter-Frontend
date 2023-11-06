/* eslint-disable @typescript-eslint/ban-ts-comment */
import { render, screen } from "@testing-library/react";
import { default as BirthDayComponent } from "../BirthDay";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { BirthDay } from "@/models/BirthDay";

const nextStepMockFn = jest.fn();
const setBirthDayMockFn = jest.fn();
const emptyBirthDayMock = null;
const birthDayMock: BirthDay = {
  day: 1,
  month: "January",
  year: 2005,
};

beforeEach(() => {
  nextStepMockFn.mockClear();
  setBirthDayMockFn.mockClear();
});

describe("BirthDay testing", () => {
  it("Should render successfully", () => {
    // ARRANGE
    render(
      <BirthDayComponent
        nextStep={nextStepMockFn}
        setBirthDay={setBirthDayMockFn}
        birthDay={emptyBirthDayMock}
      />
    );

    // ASSERT
    expect(screen.getByText("What's your birth date?")).toBeTruthy();
    expect(screen.getByText("This won't be public.")).toBeTruthy();
    expect(screen.getByText("Next")).toBeTruthy();
  });

  it("Shouldn't submit on empty data", async () => {
    const user = userEvent.setup();

    // ARRANGE
    render(
      <BirthDayComponent
        nextStep={nextStepMockFn}
        setBirthDay={setBirthDayMockFn}
        birthDay={emptyBirthDayMock}
      />
    );

    // ACT
    const submitButton = screen.getByText("Next");
    await user.click(submitButton);

    // ASSERT
    expect(submitButton).toBeTruthy();
    expect(submitButton).toBeDisabled();
    expect(nextStepMockFn).not.toHaveBeenCalled();
    expect(setBirthDayMockFn).not.toHaveBeenCalled();
  });

  it("should submit when data is entered", async () => {
    const user = userEvent.setup();

    // ARRANGE
    render(
      <BirthDayComponent
        nextStep={nextStepMockFn}
        setBirthDay={setBirthDayMockFn}
        birthDay={emptyBirthDayMock}
      />
    );

    // ACT
    const [monthInput, dayInput, yearInput] = screen.getAllByRole("combobox");
    const monthSelector = monthInput.parentElement?.getElementsByTagName(
      "select"
    )[0] as HTMLSelectElement;
    await user.selectOptions(monthSelector, "January");
    const daySelector = dayInput.parentElement?.getElementsByTagName(
      "select"
    )[0] as HTMLSelectElement;
    await user.selectOptions(daySelector, "1");
    const yearSelector = yearInput.parentElement?.getElementsByTagName(
      "select"
    )[0] as HTMLSelectElement;
    await user.selectOptions(yearSelector, "2000");
    const submitButton = screen.getByText("Next");
    await user.click(submitButton);

    // ASSERT
    expect(monthInput.children[0].textContent).toBe("January");
    expect(dayInput.children[0].textContent).toBe("1");
    expect(yearInput.children[0].textContent).toBe("2000");
    expect(submitButton).toBeTruthy();
    expect(submitButton).toBeEnabled();
    expect(nextStepMockFn).toHaveBeenCalled();
    expect(setBirthDayMockFn).toHaveBeenCalled();
  });

  it("Shouldn't submit when younger than 18", async () => {
    const user = userEvent.setup();

    // ARRANGE
    render(
      <BirthDayComponent
        nextStep={nextStepMockFn}
        setBirthDay={setBirthDayMockFn}
        birthDay={emptyBirthDayMock}
      />
    );

    // ACT
    const [monthInput, dayInput, yearInput] = screen.getAllByRole("combobox");
    const monthSelector = monthInput.parentElement?.getElementsByTagName(
      "select"
    )[0] as HTMLSelectElement;
    await user.selectOptions(monthSelector, "January");
    const daySelector = dayInput.parentElement?.getElementsByTagName(
      "select"
    )[0] as HTMLSelectElement;
    await user.selectOptions(daySelector, "1");
    const yearSelector = yearInput.parentElement?.getElementsByTagName(
      "select"
    )[0] as HTMLSelectElement;
    await user.selectOptions(yearSelector, "2006");
    const submitButton = screen.getByText("Next");
    await user.click(submitButton);
    
    // ASSERT
    expect(monthInput.children[0].textContent).toBe("January");
    expect(dayInput.children[0].textContent).toBe("1");
    expect(yearInput.children[0].textContent).toBe("2006");
    expect(submitButton).toBeDisabled();
    expect(setBirthDayMockFn).not.toHaveBeenCalled();
    expect(nextStepMockFn).not.toHaveBeenCalled();
  });


  it("Shouldn't submit when one of the fields is empty", async () => {
    const user = userEvent.setup();

    // ARRANGE
    render(
      <BirthDayComponent
        nextStep={nextStepMockFn}
        setBirthDay={setBirthDayMockFn}
        birthDay={emptyBirthDayMock}
      />
    );

    // ACT
    const [monthInput, dayInput, yearInput] = screen.getAllByRole("combobox");
    const monthSelector = monthInput.parentElement?.getElementsByTagName(
      "select"
    )[0] as HTMLSelectElement;
    await user.selectOptions(monthSelector, "January");
    const daySelector = dayInput.parentElement?.getElementsByTagName(
      "select"
    )[0] as HTMLSelectElement;
    await user.selectOptions(daySelector, "1");
    const yearSelector = yearInput.parentElement?.getElementsByTagName(
      "select"
    )[0] as HTMLSelectElement;
    await user.selectOptions(yearSelector, "");
    const submitButton = screen.getByText("Next");
    await user.click(submitButton);
    
    // ASSERT
    expect(monthInput.children[0].textContent).toBe("January");
    expect(dayInput.children[0].textContent).toBe("1");
    expect(yearInput.children[0].textContent).toBe("Year");
    expect(submitButton).toBeDisabled();
    expect(setBirthDayMockFn).not.toHaveBeenCalled();
    expect(nextStepMockFn).not.toHaveBeenCalled();
  })

  it("should submit when data is passed in", async () => {
    const user = userEvent.setup();

    // ARRANGE
    render(
      <BirthDayComponent
        nextStep={nextStepMockFn}
        setBirthDay={setBirthDayMockFn}
        birthDay={birthDayMock}
      />
    );

    // ACT
    const submitButton = screen.getByText("Next");
    await user.click(submitButton);

    // ASSERT
    expect(submitButton).toBeTruthy();
    expect(submitButton).toBeEnabled();
    expect(nextStepMockFn).toHaveBeenCalled();
    expect(setBirthDayMockFn).toHaveBeenCalled();
  })
});
