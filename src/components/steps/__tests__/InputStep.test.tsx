import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@/test/test-utils';
import { InputStep } from '../InputStep';

// Mock LottieHexagon component
vi.mock('@/components/ui/LottieHexagon', () => ({
  LottieHexagon: () => <div data-testid="lottie-hexagon">Hexagon</div>,
}));

describe('InputStep', () => {
  const defaultProps = {
    title: 'Enter your name',
    placeholder: 'Your name',
    value: '',
    onChange: vi.fn(),
    onContinue: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render correctly', () => {
    render(<InputStep {...defaultProps} />);

    expect(screen.getByText('Enter your name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Your name')).toBeInTheDocument();
    expect(screen.getByTestId('lottie-hexagon')).toBeInTheDocument();
  });

  it('should call onChange when input value changes', () => {
    const onChange = vi.fn();
    render(<InputStep {...defaultProps} onChange={onChange} />);

    const input = screen.getByPlaceholderText('Your name');
    fireEvent.change(input, { target: { value: 'John' } });

    expect(onChange).toHaveBeenCalledWith('John');
  });

  it('should call onContinue when form is submitted', () => {
    const onContinue = vi.fn();
    render(
      <InputStep
        {...defaultProps}
        value="John"
        onContinue={onContinue}
        canContinue={true}
      />
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(onContinue).toHaveBeenCalled();
  });

  it('should not call onContinue when canContinue is false', () => {
    const onContinue = vi.fn();
    render(
      <InputStep
        {...defaultProps}
        value="John"
        onContinue={onContinue}
        canContinue={false}
      />
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(onContinue).not.toHaveBeenCalled();
  });

  it('should handle Enter key press', () => {
    const onContinue = vi.fn();
    render(
      <InputStep
        {...defaultProps}
        value="John"
        onContinue={onContinue}
        canContinue={true}
      />
    );

    const input = screen.getByPlaceholderText('Your name');
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(onContinue).toHaveBeenCalled();
  });

  it('should show continue button when value is entered', () => {
    render(<InputStep {...defaultProps} value="John" />);
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });
});
