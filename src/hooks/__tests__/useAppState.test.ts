import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAppState } from '../useAppState';
import { AppStep } from '@/types/app';

// Mock constants
vi.mock('@/constants/app', () => ({
  LOADING_TIMEOUT: 1000,
}));

describe('useAppState', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with correct initial state', () => {
    const { result } = renderHook(() => useAppState());
    
    expect(result.current.state).toEqual({
      currentStep: AppStep.Welcome,
      firstName: '',
      email: '',
      isLoading: true,
      hexagonLoaded: false,
    });
  });

  it('should update firstName', () => {
    const { result } = renderHook(() => useAppState());
    
    act(() => {
      result.current.actions.setFirstName('John');
    });
    
    expect(result.current.state.firstName).toBe('John');
  });

  it('should update email', () => {
    const { result } = renderHook(() => useAppState());
    
    act(() => {
      result.current.actions.setEmail('john@example.com');
    });
    
    expect(result.current.state.email).toBe('john@example.com');
  });

  it('should go to next step', () => {
    const { result } = renderHook(() => useAppState());
    
    act(() => {
      result.current.actions.goToNextStep();
    });
    
    expect(result.current.state.currentStep).toBe(AppStep.OnboardingStep1);
  });

  it('should reset app state', () => {
    const { result } = renderHook(() => useAppState());
    
    // Modify state first
    act(() => {
      result.current.actions.setFirstName('John');
      result.current.actions.setEmail('john@example.com');
      result.current.actions.goToNextStep();
    });
    
    // Reset
    act(() => {
      result.current.actions.resetApp();
    });
    
    expect(result.current.state.firstName).toBe('');
    expect(result.current.state.email).toBe('');
    expect(result.current.state.currentStep).toBe(AppStep.Welcome);
  });
});