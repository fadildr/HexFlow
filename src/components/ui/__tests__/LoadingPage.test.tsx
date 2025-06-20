import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@/test/test-utils';
import { LoadingPage } from '../LoadingPage';

// Mock LottieHexagon
vi.mock('@/components/ui/LottieHexagon', () => ({
  LottieHexagon: ({ onLoad }: { onLoad?: () => void }) => (
    <div data-testid="lottie-hexagon" onClick={onLoad}>
      Lottie Hexagon
    </div>
  ),
}));

describe('LoadingPage', () => {
  it('should render with default message', () => {
    render(<LoadingPage />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.getByTestId('lottie-hexagon')).toBeInTheDocument();
  });

  it('should render with custom message', () => {
    render(<LoadingPage message="Please wait..." />);

    expect(screen.getByText('Please wait...')).toBeInTheDocument();
  });

  it('should call onHexagonLoaded when hexagon loads', () => {
    const onHexagonLoaded = vi.fn();
    render(<LoadingPage onHexagonLoaded={onHexagonLoaded} />);

    const hexagon = screen.getByTestId('lottie-hexagon');
    fireEvent.click(hexagon); // Simulate onLoad

    expect(onHexagonLoaded).toHaveBeenCalledWith(true);
  });
});
