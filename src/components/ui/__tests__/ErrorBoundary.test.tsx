import {
  describe,
  it,
  expect,
  vi,
  beforeAll,
  afterAll,
  beforeEach,
} from 'vitest';
import { render, screen, fireEvent } from '@/test/test-utils';
import { ErrorBoundary } from '../ErrorBoundary';
import { useState } from 'react';

// Mock icons
vi.mock('lucide-react', () => ({
  AlertTriangle: () => <div data-testid="alert-icon">Alert</div>,
  RotateCcw: () => <div data-testid="rotate-icon">Refresh</div>,
}));

// Test component that can throw errors
const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>No Error</div>;
};

describe('ErrorBoundary', () => {
  // Suppress console.error for these tests
  const originalError = console.error;
  beforeAll(() => {
    console.error = vi.fn();
  });

  afterAll(() => {
    console.error = originalError;
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render children when there is no error', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
    );

    expect(screen.getByText('No Error')).toBeInTheDocument();
  });

  it('should render error UI when there is an error', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Try Again')).toBeInTheDocument();
    expect(screen.getByText('Refresh Page')).toBeInTheDocument();
    expect(screen.getByTestId('alert-icon')).toBeInTheDocument();
  });

  it('should reset error state when try again button is clicked', () => {
    const TestWrapper = () => {
      const [hasError, setHasError] = useState(true);
      const [shouldThrow, setShouldThrow] = useState(true);

      const ThrowError = () => {
        if (shouldThrow) {
          throw new Error('Test error');
        }
        return <div>No Error</div>;
      };

      return (
        <div>
          <button
            onClick={() => {
              setHasError(false);
              setShouldThrow(false);
            }}
          >
            Reset Error
          </button>
          {!hasError ? (
            <div>No Error</div>
          ) : (
            <ErrorBoundary>
              <ThrowError />
            </ErrorBoundary>
          )}
        </div>
      );
    };

    render(<TestWrapper />);

    // Initially shows error
    expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument();

    // Click reset error button to change the error state
    const resetButton = screen.getByText('Reset Error');
    fireEvent.click(resetButton);

    expect(screen.getByText('No Error')).toBeInTheDocument();
  });

  it('should refresh page when refresh button is clicked', () => {
    // Mock window.location.reload
    const mockReload = vi.fn();
    Object.defineProperty(window, 'location', {
      value: { reload: mockReload },
      writable: true,
    });

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    const refreshButton = screen.getByText('Refresh Page');
    fireEvent.click(refreshButton);

    expect(mockReload).toHaveBeenCalled();
  });
});
