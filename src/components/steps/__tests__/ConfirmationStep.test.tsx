import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@/test/test-utils';
import { ConfirmationStep } from '../ConfirmationStep';

// Mock LottieHexagon component
vi.mock('@/components/ui/LottieHexagon', () => ({
  LottieHexagon: () => <div data-testid="lottie-hexagon">Hexagon</div>,
}));

describe('ConfirmationStep', () => {
  const defaultProps = {
    name: 'John',
    onContinue: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render correctly with user name', () => {
    render(<ConfirmationStep {...defaultProps} />);

    expect(screen.getByText(/Thanks,/)).toBeInTheDocument();
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(
      screen.getByText(/Now, it's time to get a reality check/)
    ).toBeInTheDocument();
    expect(screen.getByText('This will take 2-3 minutes.')).toBeInTheDocument();
    expect(screen.getByTestId('lottie-hexagon')).toBeInTheDocument();
  });

  it('should render continue button', () => {
    render(<ConfirmationStep {...defaultProps} />);

    const continueButton = screen.getByRole('button', { name: 'Continue' });
    expect(continueButton).toBeInTheDocument();
  });

  it('should call onContinue when continue button is clicked', () => {
    render(<ConfirmationStep {...defaultProps} />);

    const continueButton = screen.getByRole('button', { name: 'Continue' });
    fireEvent.click(continueButton);

    expect(defaultProps.onContinue).toHaveBeenCalledTimes(1);
  });

  it('should display different names correctly', () => {
    const propsWithDifferentName = {
      ...defaultProps,
      name: 'Alice',
    };

    render(<ConfirmationStep {...propsWithDifferentName} />);

    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.queryByText('John')).not.toBeInTheDocument();
  });
});
