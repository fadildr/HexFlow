import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test/test-utils';
import { FloatingText } from '../FloatingText';

describe('FloatingText', () => {
  const mockItems = [
    {
      text: 'Test item 1',
      position: 'top-4 left-4',
      maxWidth: '200px',
      animation: 'fadeInUp',
      delay: '0.2s',
      transform: 'translateY(10px)',
    },
    {
      text: 'Test item 2',
      position: 'bottom-4 right-4',
      maxWidth: '180px',
      animation: 'fadeInDown',
      delay: '0.4s',
      transform: 'translateY(-10px)',
    },
  ];

  it('should render all items', () => {
    render(<FloatingText items={mockItems} />);

    expect(screen.getByText('Test item 1')).toBeInTheDocument();
    expect(screen.getByText('Test item 2')).toBeInTheDocument();
  });

  it('should apply correct positioning classes', () => {
    render(<FloatingText items={mockItems} />);

    const item1 = screen.getByText('Test item 1');
    const item2 = screen.getByText('Test item 2');

    expect(item1).toHaveClass('top-4', 'left-4');
    expect(item2).toHaveClass('bottom-4', 'right-4');
  });

  it('should handle empty items array', () => {
    const { container } = render(<FloatingText items={[]} />);

    expect(container.firstChild).toHaveClass('absolute', 'inset-0');
    expect(container.firstChild?.childNodes.length).toBe(0);
  });

  it('should apply animation styles', () => {
    render(<FloatingText items={mockItems} />);

    const item1 = screen.getByText('Test item 1');
    const item2 = screen.getByText('Test item 2');

    expect(item1).toHaveStyle('transform: translateY(10px)');
    expect(item2).toHaveStyle('transform: translateY(-10px)');
  });

  it('should apply common styling classes', () => {
    render(<FloatingText items={mockItems} />);

    const item1 = screen.getByText('Test item 1');
    
    expect(item1).toHaveClass(
      'absolute',
      'text-white',
      'text-sm',
      'font-medium',
      'opacity-0',
      'glass-effect',
      'backdrop-blur-sm',
      'rounded-lg',
      'p-3',
      'shadow-lg',
      'border'
    );
  });
});
