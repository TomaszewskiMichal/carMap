import { render, screen } from '@testing-library/react';
import { NavBar } from './NavBar';

test('Renders Navigation Bar', () => {
  render(<NavBar />);
  const navigationTitle = screen.getByText(/rent and ride/i);
  expect(navigationTitle).toBeInTheDocument();
});
