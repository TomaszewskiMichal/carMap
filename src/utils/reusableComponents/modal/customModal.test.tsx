import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CustomModal } from './CustomModal';

describe('Render custom modal correctly', () => {
  test('Renders custom modal', () => {
    let open = true;
    render(
      <CustomModal
        open={open}
        onClose={() => (open = false)}
        title={'Some fancy title'}
        body={<div>Some fancy body</div>}
        footerActions={<button onClick={close}>Click me!</button>}
      />
    );
    expect(screen.getByText(/some fancy title/i)).toBeInTheDocument();
    expect(screen.getByText(/some fancy body/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /click me!/i })
    ).toBeInTheDocument();
  });
  test('Renders custom modal without ability to close it', () => {
    let open = true;

    render(
      <CustomModal
        open={open}
        title={'Some fancy title'}
        body={<div>Some fancy body</div>}
        footerActions={<div>Fancy footer</div>}
      />
    );
    const title = screen.getByText(/some fancy title/i);
    const button = screen.queryByRole('button');
    expect(title).toBeInTheDocument();
    expect(button).not.toBeInTheDocument();
  });
  test('Renders custom modal with ability to close it', () => {
    let open = true;

    render(
      <CustomModal
        open={open}
        onClose={() => (open = false)}
        title={'Some fancy title'}
        body={<div>Some fancy body</div>}
        footerActions={<div>Fancy footer</div>}
      />
    );
    const title = screen.getByText(/some fancy title/i);
    const button = screen.getByRole('button');
    expect(title).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
