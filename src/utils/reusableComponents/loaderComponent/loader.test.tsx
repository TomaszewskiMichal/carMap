import { render, screen } from '@testing-library/react';
import { Loader } from './Loader';

test('Renders Loader', () => {
  render(<Loader />);
  const loader = screen.getByRole('progressbar');
  expect(loader).toBeInTheDocument();
});
