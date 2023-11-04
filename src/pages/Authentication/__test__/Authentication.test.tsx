import { render, screen } from '@testing-library/react'
import Authentication from "../Authentication";

it.only('does something', () => {
    render(<Authentication />);
    const logo = screen.queryByTestId('logo');
    expect(logo).toBeTruthy();
    const submitButton = screen.queryByText('Sign in')
    expect(submitButton).toBeTruthy()
});


// "test": "react-scripts test --watchAll --coverage"
// command to run single test case: npm test Authentication.test.tsx