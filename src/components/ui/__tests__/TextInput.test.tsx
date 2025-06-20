import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@/test/test-utils';
import { TextInput } from '../TextInput';

describe('TextInput', () => {
  const defaultProps = {
    id: 'test-input',
    label: 'Test Label',
    value: '',
    onChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render with label', () => {
    render(<TextInput {...defaultProps} />);

    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('should render with placeholder', () => {
    render(<TextInput {...defaultProps} placeholder="Enter text here" />);

    expect(screen.getByPlaceholderText('Enter text here')).toBeInTheDocument();
  });

  it('should call onChange when input value changes', () => {
    render(<TextInput {...defaultProps} />);

    const input = screen.getByLabelText('Test Label');
    fireEvent.change(input, { target: { value: 'new value' } });

    expect(defaultProps.onChange).toHaveBeenCalledWith('new value');
  });

  it('should show required asterisk when required', () => {
    render(<TextInput {...defaultProps} required />);

    expect(screen.getByLabelText('required')).toBeInTheDocument();
  });

  it('should display error message', () => {
    render(<TextInput {...defaultProps} error="This field is required" />);

    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('should be disabled when disabled prop is true', () => {
    render(<TextInput {...defaultProps} disabled />);

    const input = screen.getByLabelText('Test Label');
    expect(input).toBeDisabled();
  });

  it('should have correct input type', () => {
    render(<TextInput {...defaultProps} type="email" />);

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveAttribute('type', 'email');
  });

  it('should have aria-invalid when error exists', () => {
    render(<TextInput {...defaultProps} error="Error message" />);

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('should have aria-describedby when error exists', () => {
    render(<TextInput {...defaultProps} error="Error message" />);

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveAttribute('aria-describedby', 'test-input-error');
  });
});
