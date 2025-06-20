import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@/test/test-utils';
import { OnboardingStep } from '../OnboardingStep';

// Mock components
vi.mock('@/components', () => ({
  HexagonSvg: () => <div data-testid="hexagon-svg">Hexagon SVG</div>,
  AnimatedText: ({ text, className }: { text: string; className?: string }) => (
    <div data-testid="animated-text" className={className}>
      {text}
    </div>
  ),
}));

describe('OnboardingStep', () => {
  const defaultProps = {
    title: 'Welcome to Onboarding',
    currentStep: 1,
    totalSteps: 3,
    onContinue: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render correctly with default props', () => {
    render(<OnboardingStep {...defaultProps} />);

    expect(screen.getByTestId('hexagon-svg')).toBeInTheDocument();
    expect(screen.getByTestId('animated-text')).toBeInTheDocument();
    expect(screen.getByText('Welcome to Onboarding')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Continue' })
    ).toBeInTheDocument();
  });

  it('should render custom button text', () => {
    const propsWithCustomButton = {
      ...defaultProps,
      buttonText: 'Next Step',
    };

    render(<OnboardingStep {...propsWithCustomButton} />);

    expect(
      screen.getByRole('button', { name: 'Next Step' })
    ).toBeInTheDocument();
  });

  it('should render correct number of progress dots', () => {
    const { container } = render(<OnboardingStep {...defaultProps} />);

    const progressDots = container.querySelectorAll('.w-2.h-2.rounded-full');
    expect(progressDots).toHaveLength(3);
  });

  it('should highlight current step in progress dots', () => {
    const { container } = render(<OnboardingStep {...defaultProps} />);

    const progressDots = container.querySelectorAll('.w-2.h-2.rounded-full');
    expect(progressDots[0]).toHaveClass('bg-purple-500');
    expect(progressDots[1]).toHaveClass('bg-gray-600');
    expect(progressDots[2]).toHaveClass('bg-gray-600');
  });

  it('should call onContinue when button is clicked', () => {
    render(<OnboardingStep {...defaultProps} />);

    const continueButton = screen.getByRole('button', { name: 'Continue' });
    fireEvent.click(continueButton);

    expect(defaultProps.onContinue).toHaveBeenCalledTimes(1);
  });

  it('should render "Continue" for last step with default buttonText', () => {
    const lastStepProps = {
      ...defaultProps,
      isLastStep: true,
    };

    render(<OnboardingStep {...lastStepProps} />);

    expect(
      screen.getByRole('button', { name: 'Continue' })
    ).toBeInTheDocument();
  });

  it('should render custom button text for last step', () => {
    const lastStepProps = {
      ...defaultProps,
      isLastStep: true,
      buttonText: 'Get Started',
    };

    render(<OnboardingStep {...lastStepProps} />);

    expect(
      screen.getByRole('button', { name: 'Get Started' })
    ).toBeInTheDocument();
  });
});
