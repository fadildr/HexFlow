import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@/test/test-utils';
import { Header } from '../Header';

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock icons
vi.mock('lucide-react', () => ({
  ArrowLeft: () => <div data-testid="arrow-left-icon">Back</div>,
  RotateCcw: () => <div data-testid="rotate-icon">Refresh</div>,
}));

describe('Header', () => {
  const defaultProps = {
    onBack: vi.fn(),
    onRefresh: vi.fn(),
    showBackButton: true,
    showRefreshButton: true,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render correctly with default props', () => {
    render(<Header {...defaultProps} />);

    expect(screen.getByTestId('arrow-left-icon')).toBeInTheDocument();
    expect(screen.getByTestId('rotate-icon')).toBeInTheDocument();
  });

  it('should call onBack when back button is clicked', () => {
    render(<Header {...defaultProps} />);

    const backButton = screen.getByTestId('arrow-left-icon').parentElement;
    fireEvent.click(backButton!);

    expect(defaultProps.onBack).toHaveBeenCalledTimes(1);
  });

  it('should call onRefresh when refresh button is clicked', () => {
    render(<Header {...defaultProps} />);

    const refreshButton = screen.getByTestId('rotate-icon').parentElement;
    fireEvent.click(refreshButton!);

    expect(defaultProps.onRefresh).toHaveBeenCalledTimes(1);
  });

  it('should not render back button when showBackButton is false', () => {
    render(<Header {...defaultProps} showBackButton={false} />);

    expect(screen.queryByTestId('arrow-left-icon')).not.toBeInTheDocument();
  });

  it('should have proper accessibility', () => {
    render(<Header {...defaultProps} />);

    const buttons = screen.getAllByRole('button');
    
    // Should have back and refresh buttons
    expect(buttons).toHaveLength(2);
    
    // Check that buttons are accessible
    buttons.forEach(button => {
      expect(button.tagName).toBe('BUTTON');
    });
  });
});
