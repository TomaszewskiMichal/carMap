import { render, screen } from '@testing-library/react';
import { ErrorText } from './ErrorText';

test('Renders Error Text', () => {
  render(<ErrorText />);
  const errorText = screen.getByText(
    /Something went wrong. Please try again./i
  );
  expect(errorText).toBeInTheDocument();
});
