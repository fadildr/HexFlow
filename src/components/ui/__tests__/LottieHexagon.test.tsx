import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@/test/test-utils';
import { LottieHexagon } from '../LottieHexagon';

// Mock lottie-react
vi.mock('lottie-react', () => ({
  default: ({
    onComplete,
    style,
    ...props
  }: {
    onComplete?: () => void;
    onLoopComplete?: () => void;
    style?: React.CSSProperties;
  }) => (
    <div
      data-testid="lottie-animation"
      style={style}
      onClick={() => {
        // Only trigger onComplete to avoid double calls
        onComplete?.();
      }}
      {...props}
    >
      Lottie Animation
    </div>
  ),
}));

describe('LottieHexagon', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render lottie animation', () => {
    render(<LottieHexagon />);

    expect(screen.getByTestId('lottie-animation')).toBeInTheDocument();
    expect(screen.getByText('Lottie Animation')).toBeInTheDocument();
  });

  it('should apply correct size styling', () => {
    const { container } = render(<LottieHexagon size={200} />);

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveStyle('width: 200px');
    expect(wrapper).toHaveStyle('height: 200px');
  });

  it('should use default size when not provided', () => {
    const { container } = render(<LottieHexagon />);

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveStyle('width: 100%');
    expect(wrapper).toHaveStyle('height: 100%');
  });

  it('should handle onLoad callback correctly', () => {
    const onLoad = vi.fn();
    render(<LottieHexagon onLoad={onLoad} />);

    const animation = screen.getByTestId('lottie-animation');
    fireEvent.click(animation);

    expect(onLoad).toHaveBeenCalledTimes(1);
  });

  it('should not call onLoad when not provided', () => {
    render(<LottieHexagon />);

    const animation = screen.getByTestId('lottie-animation');
    expect(() => fireEvent.click(animation)).not.toThrow();
  });
});
