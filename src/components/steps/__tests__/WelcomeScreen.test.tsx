import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@/test/test-utils';
import { WelcomeScreen } from '../WelcomeScreen';

// Mock components
vi.mock('@/components', () => ({
  HexagonSvg: ({ onLoad }: { onLoad?: () => void }) => (
    <div data-testid="hexagon-svg" onClick={onLoad}>Hexagon SVG</div>
  ),
  FloatingText: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="floating-text">{children}</div>
  ),
}));

describe('WelcomeScreen', () => {
  it('should render correctly', () => {
    const onGetStarted = vi.fn();
    render(<WelcomeScreen onGetStarted={onGetStarted} />);
    
    expect(screen.getByTestId('hexagon-svg')).toBeInTheDocument();
    expect(screen.getByText('Get a reality check')).toBeInTheDocument();
  });

  it('should call onGetStarted when button is clicked', () => {
    const onGetStarted = vi.fn();
    render(<WelcomeScreen onGetStarted={onGetStarted} />);
    
    const button = screen.getByText('Get a reality check');
    fireEvent.click(button);
    
    expect(onGetStarted).toHaveBeenCalled();
  });

  it('should render floating text items', () => {
    const onGetStarted = vi.fn();
    render(<WelcomeScreen onGetStarted={onGetStarted} />);
    
    const floatingTexts = screen.getAllByTestId('floating-text');
    expect(floatingTexts.length).toBeGreaterThan(0);
  });
});