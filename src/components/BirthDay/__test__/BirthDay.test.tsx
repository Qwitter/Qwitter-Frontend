import { render, screen } from "@testing-library/react";
import { default as BirthDayComponent } from "../BirthDay";
import "@testing-library/jest-dom";

const nextStepMockFn = jest.fn();
const setBirthDayMockFn = jest.fn();
const emptyBirthDayMock = null;
// const birthDayMock: BirthDay = {
//   day: 1,
//   month: "January",
//   year: 2000,
// };
describe("BirthDay testing", () => {
  it("Should render Successfully", () => {
    render(
      <BirthDayComponent
        nextStep={nextStepMockFn}
        setBirthDay={setBirthDayMockFn}
        birthDay={emptyBirthDayMock}
      />
    );
    expect(screen.getByText("What's your birth date?")).toBeTruthy();
    expect(screen.getByText("This won't be public.")).toBeTruthy();
    expect(screen.getByText("Next")).toBeTruthy();
  });

  it("Shouldn't submit on empty data", () => {
    render(
      <BirthDayComponent
        nextStep={nextStepMockFn}
        setBirthDay={setBirthDayMockFn}
        birthDay={emptyBirthDayMock}
      />
    );

    const submitButton = screen.getByText("Next");
    expect(submitButton).toBeTruthy();
    submitButton.click();
    expect(nextStepMockFn).not.toHaveBeenCalled();
    expect(setBirthDayMockFn).not.toHaveBeenCalled();
    expect(screen.getByText("Required")).toBeTruthy();
  })

  it('should submit when data is entered', async () => { 
    render(
      <BirthDayComponent
        nextStep={nextStepMockFn}
        setBirthDay={setBirthDayMockFn}
        birthDay={emptyBirthDayMock}
      />
    );

    const monthInput = screen.getByText("Month");
    expect(monthInput).toBeTruthy();
    await monthInput.click();
    const month = screen.getByTestId("January");
    expect(month).toBeTruthy();
    await month.click();

    const dayInput = screen.getByText("Day");
    expect(dayInput).toBeTruthy();
    dayInput.click();
    const day = screen.getByTestId("1");
    expect(day).toBeTruthy();
    day.click();

    const yearInput = screen.getByText("Year");
    expect(yearInput).toBeTruthy();
    yearInput.click();
    const year = screen.getByTestId("2000");
    expect(year).toBeTruthy();
    year.click();

    const submitButton = screen.getByText("Next");
    expect(submitButton).toBeTruthy();
    submitButton.click();
    expect(nextStepMockFn).toHaveBeenCalled();
    expect(setBirthDayMockFn).toHaveBeenCalled();
   })
});
