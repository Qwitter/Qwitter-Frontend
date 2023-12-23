import { render, screen, fireEvent, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SearchInput from '../SearchInput';

// Mocking the react-query hooks
jest.mock('@tanstack/react-query', () => ({
    ...jest.requireActual('@tanstack/react-query'),
    useQuery: jest.fn(),
}));

const queryClient = new QueryClient();

describe('SearchInput', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders without crashing', () => {
        render(
            <QueryClientProvider client={queryClient}>
                <SearchInput />
            </QueryClientProvider>
        );
        // Add your assertions here
    });

    it('handles text input and triggers search', async () => {
        const mockedNavigate = jest.fn();
        render(
            <QueryClientProvider client={queryClient}>
                <SearchInput isSearchPage={false} value="" />
            </QueryClientProvider>
        );

        // Simulate user input
        const inputElement = screen.getByTestId('searchBar');
        fireEvent.click(inputElement);

        const textInputElement = screen.getByRole('textbox');
        fireEvent.change(textInputElement, { target: { value: 'test query' } });

        // Simulate pressing Enter
        await act(async () => {
            fireEvent.keyDown(textInputElement, { key: 'Enter' });
        });

        // Add your assertions here, e.g., check if navigation is called with the correct URL
        expect(mockedNavigate).toHaveBeenCalledWith('/Explore/search/Top/?q=test%20query');
    });

    // Add more tests as needed
});
