import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@/test/test-utils';
import { AnimatedText } from '../AnimatedText';

// Mock useEffect and useRef
vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...actual,
    useEffect: vi.fn(fn => fn()),
    useRef: vi.fn(() => ({ current: document.createElement('div') })),
  };
});

describe('AnimatedText', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render with correct text', () => {
    render(<AnimatedText text="Hello World" />);

    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const { container } = render(
      <AnimatedText text="Test" className="custom-class" />
    );

    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('custom-class');
  });

  it('should render with font-bagoss class', () => {
    const { container } = render(<AnimatedText text="Test" />);

    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('font-bagoss');
  });

  it('should render with custom className and preserve font-bagoss', () => {
    const { container } = render(
      <AnimatedText text="Test" className="text-white text-lg font-medium" />
    );

    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('font-bagoss', 'text-white', 'text-lg', 'font-medium');
  });
});
