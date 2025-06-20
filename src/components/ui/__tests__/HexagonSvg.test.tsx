import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@/test/test-utils';
import { HexagonSvg } from '../HexagonSvg';

// Mock Next.js Image
vi.mock('next/image', () => ({
  default: ({
    src,
    alt,
    onLoad,
    ...props
  }: {
    src: string;
    alt: string;
    onLoad?: () => void;
  }) => (
    <img
      src={src}
      alt={alt}
      data-testid="hexagon-image"
      onLoad={onLoad}
      {...props}
    />
  ),
}));

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

// Mock GSAP
vi.mock('gsap', () => ({
  default: {
    timeline: vi.fn(() => ({
      to: vi.fn().mockReturnThis(),
      fromTo: vi.fn().mockReturnThis(),
    })),
    set: vi.fn(),
  },
}));

describe('HexagonSvg', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render hexagon image', () => {
    render(<HexagonSvg />);
    
    const image = screen.getByTestId('hexagon-image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/assets/hexagon.svg');
    expect(image).toHaveAttribute('alt', 'Hexagon background');
  });

  it('should have correct alt text', () => {
    render(<HexagonSvg />);

    const image = screen.getByTestId('hexagon-image');
    expect(image).toHaveAttribute('alt', 'Hexagon background');
  });

  it('should apply custom aria-label', () => {
    render(<HexagonSvg aria-label="Custom hexagon" />);

    const container = screen.getByLabelText('Custom hexagon');
    expect(container).toHaveAttribute('aria-label', 'Custom hexagon');
  });

  it('should call onLoad when image loads', () => {
    const onLoad = vi.fn();
    render(<HexagonSvg onLoad={onLoad} />);

    const image = screen.getByTestId('hexagon-image');
    fireEvent.load(image);

    expect(onLoad).toHaveBeenCalled();
  });

  it('should apply custom className', () => {
    render(<HexagonSvg className="custom-class" />);

    const container = screen.getByLabelText('Hexagon background animation');
    expect(container).toHaveClass('custom-class');
  });
});
